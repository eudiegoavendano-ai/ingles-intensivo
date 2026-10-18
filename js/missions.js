// Ejecutores de misiones: SRS, vocabulario, ejercicios, dictado, voz, lectura, escritura, inmersion, examen
"use strict";

let KEY = null; // manejador de teclado de la vista activa
addEventListener("keydown", e => { if (KEY) KEY(e); });
const main = () => $("#main");

function topbar(title, pct, onBack) {
  return `<div class="topbar"><button class="btn small" id="backBtn"><- Volver</button><b>${esc(title)}</b>
  <div class="bar"><div style="width:${pct}%"></div></div><span class="mute">${Math.round(pct)}%</span></div>`;
}
function bindBack(onBack) { const b = $("#backBtn"); if (b) b.onclick = () => { stopSpeech(); KEY = null; onBack(); }; }
function audioBtns(text, cls = "") {
  return `<button class="audio ${cls}" data-say="${esc(text)}" title="Escuchar">></button><button class="audio slow ${cls}" data-say="${esc(text)}" data-slow="1" title="Lento">lento</button>`;
}
function bindAudio(root = document) {
  $$("[data-say]", root).forEach(b => b.onclick = e => { e.stopPropagation(); speak(b.dataset.say, b.dataset.slow ? 0.6 : S.settings.rate); });
}
function backToDay(day) { return () => { KEY = null; VIEWS.mision(day); }; }
function finishScreen(title, html, onBack) {
  KEY = e => { if (e.key === "Enter") { KEY = null; onBack(); } };
  main().innerHTML = `<div class="exo"><div class="card" style="text-align:center;padding:34px">
    <h1>${title}</h1>${html}<div class="row" style="justify-content:center;margin-top:20px"><button class="btn primary" id="okBtn">Continuar Enter</button></div></div></div>`;
  $("#okBtn").onclick = () => { KEY = null; onBack(); };
}

// ---------- Ejecutor generico de items ----------
// tipos: mc, fill, order, tr, listen (elige lo que oyes), dict (dictado)
function runItems(items, opts) {
  let queue = items.map((it, i) => ({...it, _i: i})), pos = 0;
  const firstTry = {}, total = items.length;
  const render = () => {
    if (pos >= queue.length) {
      const ok = Object.values(firstTry).filter(Boolean).length;
      const scored = items.filter(i => i.t !== "dict").length;
      let pts = 0, max = 0;
      items.forEach((it, i) => { if (it.t === "dict") { pts += (firstTry["d" + i] || 0) / 100; max++; } else { pts += firstTry[i] ? 1 : 0; max++; } });
      return opts.onFinish(Math.round(100 * pts / Math.max(1, max)), {ok, scored});
    }
    const it = queue[pos];
    const pct = 100 * Math.min(pos, total) / total;
    let body = "";
    if (it.t === "mc" || it.t === "listen") {
      const order = it._order || (it._order = shuffle(it.o.map((o, k) => k)));
      body = `${it.t === "listen" ? `<div class="row" style="margin:12px 0">${audioBtns(it.audio)}<span class="mute">Escucha y elige</span></div>` : `<div class="q">${esc(it.q)}</div>`}
        ${it.ctx ? `<p class="mute">${esc(it.ctx)}</p>` : ""}
        <div class="opts">${order.map((k, n) => `<button class="opt" data-k="${k}"><span class="kbd">${n + 1}</span> ${esc(it.o[k])}</button>`).join("")}</div>`;
    } else if (it.t === "fill" || it.t === "tr") {
      body = `<div class="mute">${it.t === "tr" ? "Traduce al ingles" : "Completa el espacio"}</div><div class="q">${esc(it.q)}</div>
        <input class="txt" id="ans" autocomplete="off" spellcheck="false" placeholder="Escribe tu respuesta y presiona Enter">`;
    } else if (it.t === "order") {
      const ws = it.a.split(" ");
      let sh = shuffle(ws); if (ws.length > 1 && sh.join(" ") === it.a) sh = sh.reverse();
      it._sh = it._sh || sh;
      body = `<div class="mute">Ordena la frase</div><div class="chips" id="built" style="margin:14px 0"></div><div class="chips" id="pool" style="border-style:solid"></div>`;
    } else if (it.t === "dict") {
      body = `<div class="mute">Dictado: escucha y escribe la frase completa</div><div class="row" style="margin:14px 0">${audioBtns(it.s)}</div>
        <input class="txt" id="ans" autocomplete="off" spellcheck="false" placeholder="Escribe lo que escuchas...">`;
    }
    main().innerHTML = `<div class="exo">${topbar(opts.title, pct)}<div class="card">${it.label ? `<span class="pill b">${esc(it.label)}</span>` : ""}${body}<div id="fb"></div>
      <div class="row" style="margin-top:16px"><span class="mute" style="font-size:12px">${pos + 1} / ${queue.length}</span><div class="spacer"></div><button class="btn primary" id="go">Comprobar Enter</button></div></div></div>`;
    bindBack(opts.onBack); bindAudio();
    const go = $("#go"); let answered = false;
    const next = () => { pos++; render(); };
    const judge = (ok, correctHTML, extra = "") => {
      answered = true;
      const key = it._i;
      if (it.t === "dict") { if (!(("d" + key) in firstTry)) firstTry["d" + key] = extra.score; }
      else if (!(key in firstTry)) firstTry[key] = ok;
      if (!ok && opts.requeue && it.t !== "dict") queue.push({...it, _order: null, _sh: null});
      opts.onAnswer && opts.onAnswer(it, ok, extra);
      $("#fb").innerHTML = `<div class="feedback ${ok ? "ok" : "bad"}">${ok ? "OK Correcto!" : "X Respuesta correcta:"} ${correctHTML}</div>${it.explain ? `<div class="note">${it.explain}</div>` : ""}`;
      go.textContent = "Continuar Enter"; go.onclick = next; go.focus();
      if (it.say) speak(it.say);
    };
    if (it.t === "mc" || it.t === "listen") {
      if (it.t === "listen" && S.settings.autoplay) setTimeout(() => speak(it.audio), 250);
      const pick = btn => {
        if (answered) return; const k = +btn.dataset.k;
        $$(".opt").forEach(b => { if (+b.dataset.k === it.a) b.classList.add("ok"); });
        if (k !== it.a) btn.classList.add("bad");
        judge(k === it.a, k === it.a ? "" : `<b>${esc(it.o[it.a])}</b>`);
      };
      $$(".opt").forEach(b => b.onclick = () => pick(b));
      go.onclick = () => {}; go.textContent = "Elige una opcion";
      KEY = e => { if (!answered && /^[1-9]$/.test(e.key)) { const b = $$(".opt")[+e.key - 1]; if (b) pick(b); } else if (answered && e.key === "Enter") next(); };
    } else if (it.t === "fill" || it.t === "tr" || it.t === "dict") {
      const inp = $("#ans"); inp.focus();
      if (it.t === "dict" && S.settings.autoplay) setTimeout(() => speak(it.s), 300);
      const check = () => {
        if (answered) return next();
        const v = inp.value.trim(); if (!v) return;
        inp.disabled = true;
        if (it.t === "dict") {
          const d = wordDiff(it.s, v);
          judge(d.score >= 90, `<br><b>${esc(it.s)}</b>${diffHTML(d.parts)}<div class="mute">Precision: ${d.score}%</div>`, {score: d.score});
        } else {
          const r = checkAnswer(v, it.a);
          if (!r.ok && r.close && it.t === "tr") judge(true, `(casi perfecto) <b>${esc(r.best)}</b>`);
          else judge(r.ok, r.ok ? (it.a.length > 1 && it.t === "tr" ? `<span class="mute">Tambien: ${esc(it.a[0])}</span>` : "") : `<b>${esc(it.a[0])}</b>${r.close ? " <span class='mute'>(casi! revisa la ortografia)</span>" : ""}`);
        }
      };
      go.onclick = check;
      KEY = e => { if (e.key === "Enter") { e.preventDefault(); check(); } };
    } else if (it.t === "order") {
      const built = [], pool = it._sh.map((w, i) => ({w, i, used: false}));
      const draw = () => {
        $("#built").innerHTML = built.map((p, n) => `<span class="chip" data-n="${n}">${esc(p.w)}</span>`).join("");
        $("#pool").innerHTML = pool.map(p => p.used ? "" : `<span class="chip" data-i="${p.i}">${esc(p.w)}</span>`).join("");
        $$("#pool .chip").forEach(c => c.onclick = () => { if (answered) return; const p = pool[+c.dataset.i]; p.used = true; built.push(p); speak(p.w, 1); draw(); });
        $$("#built .chip").forEach(c => c.onclick = () => { if (answered) return; const p = built.splice(+c.dataset.n, 1)[0]; p.used = false; draw(); });
      };
      draw();
      const check = () => {
        if (answered) return next();
        if (built.length < pool.length) return toast("Usa todas las palabras");
        const ok = normalize(built.map(p => p.w).join(" ")) === normalize(it.a);
        judge(ok, ok ? "" : `<b>${esc(it.a)}</b>`); speak(it.a);
      };
      go.onclick = check;
      KEY = e => { if (e.key === "Enter") check(); else if (e.key === "Backspace" && !answered && built.length) { built.pop().used = false; draw(); } };
    }
  };
  render();
}

// ---------- Construccion de items ----------
// Convierte un ejercicio compacto de GRAMMAR_EXTRA al formato de runItems
function extraItem(e, rand) {
  if (e[0] === "m") { const o = e[2].split("|"), order = shuffle(o.map((_, i) => i), rand); return {t: "mc", q: e[1], o: order.map(i => o[i]), a: order.indexOf(e[3])}; }
  if (e[0] === "f") return {t: "fill", q: e[1], a: e[2].split("|")};
  if (e[0] === "o") return {t: "order", a: e[1]};
  return {t: "tr", q: e[1], a: e[2].split("|")};
}
// Dias de practica (2 a 6): 6 ejercicios nuevos distintos cada dia + 2 de la leccion + 2 de repaso de unidades anteriores.
// Si repite el intento, los 6 nuevos se sacan al azar del banco completo.
// Banco extra de una unidad sin repetidos (GRAMMAR_EXTRA trae ~120 por unidad)
const _bankCache = {};
function extraBank(week) {
  if (_bankCache[week]) return _bankCache[week];
  const seen = new Set(GRAMMAR[week].ejercicios.map(x => x.t + "|" + (x.q || x.a)));
  const tmap = {m: "mc", f: "fill", o: "order", t: "tr"};
  return (_bankCache[week] = ((window.GRAMMAR_EXTRA || {})[week] || []).filter(e => {
    const k = tmap[e[0]] + "|" + (e[0] === "m" && e[1].startsWith("Elige") ? e[1] + e[2] : e[1]);
    if (seen.has(k)) return false; seen.add(k); return true;
  }));
}
// Todos los ejercicios de una unidad (leccion + banco extra), listos para runItems
function unitAll(week, rand) {
  return [...GRAMMAR[week].ejercicios.map(x => ({...x})), ...extraBank(week).map(e => extraItem(e, rand))].map(x => ({...x, label: "Unidad " + week}));
}
function practiceItems(week, dw, rand, tries) {
  const bank = extraBank(week);
  if (!bank.length) return grammarItems(week, 8, rand, 2);
  const fixed = shuffle(bank, rng(week * 991)); // mismo orden siempre: cada dia toma su parte sin repetir
  const per = 8;
  const picked = tries ? sample(bank, per, rand) : fixed.slice((dw - 2) * per, (dw - 1) * per);
  const items = picked.map(e => ({...extraItem(e, rand), label: "Unidad " + week}));
  items.push(...grammarItems(week, 2, rand, 2));
  return shuffle(items, rand);
}
function grammarItems(week, n, rand, spiral = 0) {
  const unit = GRAMMAR[week].ejercicios.map(x => ({...x, label: "Unidad " + week}));
  let items = n >= unit.length ? shuffle(unit, rand) : sample(unit, n, rand);
  if (spiral && week > 1) {
    for (let k = 0; k < spiral; k++) {
      const w = 1 + Math.floor(rand() * (week - 1));
      const ex = GRAMMAR[w].ejercicios[Math.floor(rand() * GRAMMAR[w].ejercicios.length)];
      items.push({...ex, label: "Repaso unidad " + w});
    }
  }
  return items;
}
function vocabMC(entry, pool, rand, reverse = false) {
  const others = sample(pool.filter(p => p.id !== entry.id && p.es !== entry.es && p.en !== entry.en), 3, rand);
  const opts = shuffle([entry, ...others], rand);
  return reverse
    ? {t: "mc", q: `Como se dice \"${entry.es}\"?`, o: opts.map(o => o.en), a: opts.indexOf(entry), say: entry.en, ctx: ""}
    : {t: "mc", q: `Que significa \"${entry.en}\"?`, o: opts.map(o => o.es), a: opts.indexOf(entry), say: entry.en, ctx: entry.ex};
}
function vocabListen(entry, pool, rand) {
  const others = sample(pool.filter(p => p.id !== entry.id && p.en !== entry.en), 3, rand);
  const opts = shuffle([entry, ...others], rand);
  return {t: "listen", audio: entry.en, o: opts.map(o => `${o.en} - ${o.es}`), a: opts.indexOf(entry)};
}
function poolAround(week) {
  const p = []; for (let w = Math.max(1, week - 2); w <= Math.min(26, week + 1); w++) p.push(...CONTENT.byWeek[w]); return p;
}

// ---------- SRS ----------
function runSRS(onDone, onBack) {
  let queue = shuffle(dueCards()); const total = queue.length; let done = 0;
  if (!total) { onDone(0); return; }
  const render = () => {
    if (!queue.length) { save(); return onDone(done); }
    const id = queue[0], e = CONTENT.byId[id], c = S.cards[id];
    const rev = (c.reps + id.length) % 2 === 1; // alterna direccion
    let flipped = false;
    main().innerHTML = `<div class="exo">${topbar(`Repaso - quedan ${queue.length}`, 100 * done / Math.max(total, done + queue.length))}
      <div class="flash" id="fc">
        ${rev ? `<div class="mute">Como se dice en ingles?</div><div class="w">${esc(e.es)}</div>` : `<div class="w">${esc(e.en)}</div><div class="row" style="justify-content:center">${audioBtns(e.en, "small")}</div>`}
        <div id="back" style="display:none">
          ${rev ? `<div class="w" style="color:var(--accent)">${esc(e.en)}</div>` : `<div class="tr">${esc(e.es)}</div>`}
          <div class="ex">${esc(e.ex)}</div><div class="row" style="justify-content:center">${audioBtns(e.ex, "small")}</div>
        </div>
      </div>
      <div id="ctrl" style="margin-top:16px;text-align:center"><button class="btn primary" id="flip">Mostrar respuesta <span class="kbd">Espacio</span></button></div>
      <p class="mute" style="text-align:center;font-size:12px;margin-top:14px">Intenta recordar ANTES de girar. Calificate con honestidad: eso hace que el algoritmo funcione.</p></div>`;
    bindBack(onBack); bindAudio();
    if (!rev && S.settings.autoplay) speak(e.en);
    const iv = g => { const t = {...c}; const old = S.cards[id]; S.cards[id] = t; gradeCard(id, g); const d = Math.max(0, Math.round((t.due - Date.now()) / 86400000)); S.cards[id] = old; return g === 0 ? "10 min" : d < 1 ? "<1 d" : d + " d"; };
    const flip = () => {
      if (flipped) return; flipped = true; $("#back").style.display = "block"; if (rev) speak(e.en); else if (e.ex) speak(e.ex);
      $("#ctrl").innerHTML = `<div class="grades">
        <button class="btn danger" data-g="0">Otra vez<small>${iv(0)} - 1</small></button>
        <button class="btn" data-g="1">Dificil<small>${iv(1)} - 2</small></button>
        <button class="btn primary" data-g="2">Bien<small>${iv(2)} - 3</small></button>
        <button class="btn" data-g="3">Facil<small>${iv(3)} - 4</small></button></div>`;
      $$("[data-g]").forEach(b => b.onclick = () => grade(+b.dataset.g));
    };
    const grade = g => {
      gradeCard(id, g); queue.shift();
      if (g === 0) queue.splice(Math.min(queue.length, 4), 0, id); else done++;
      addXP(1); refreshSide(); render();
    };
    $("#flip").onclick = flip;
    KEY = ev => { if (ev.key === " " || ev.key === "Enter") { ev.preventDefault(); flip(); } else if (flipped && /^[1-4]$/.test(ev.key)) grade(+ev.key - 1); };
  };
  render();
}

// ---------- Misiones ----------
const MISSIONS = {
  srs(day) {
    const back = backToDay(day);
    runSRS(n => { completeMission(day, "srs", {reviewed: n}); finishScreen("Repaso al dia OK", n ? `<p>Repasaste <b>${n}</b> tarjetas.</p>` : `<p>No tienes tarjetas pendientes. Perfecto!</p>`, back); }, back);
  },

  vocab(day) {
    const list = wordsForDay(day), week = weekOf(day), back = backToDay(day);
    let i = 0;
    const show = () => {
      if (i >= list.length) return quiz();
      const e = list[i];
      main().innerHTML = `<div class="exo">${topbar(`Palabras nuevas ${i + 1}/${list.length}`, 50 * i / list.length)}
        <div class="flash"><div class="w">${esc(e.en)}</div><div class="tr">${esc(e.es)}</div>
        <div class="row" style="justify-content:center">${audioBtns(e.en)}</div>
        <div class="ex">\"${esc(e.ex)}\"</div><div class="row" style="justify-content:center">${audioBtns(e.ex, "small")}</div></div>
        <div class="note">Repite en voz alta la palabra 3 veces y la frase 1 vez. Imagina una situacion tuya donde la usarias.</div>
        <div class="row"><button class="btn" id="prev" ${i ? "" : "disabled"}><- Anterior</button><div class="spacer"></div><button class="btn primary" id="nx">Siguiente Enter</button></div></div>`;
      bindBack(back); bindAudio();
      if (S.settings.autoplay) speak(e.en, S.settings.rate, () => setTimeout(() => speak(e.ex), 400));
      $("#nx").onclick = () => { i++; show(); };
      $("#prev").onclick = () => { i--; show(); };
      KEY = ev => { if (ev.key === "Enter" || ev.key === "ArrowRight") { i++; show(); } else if (ev.key === "ArrowLeft" && i) { i--; show(); } };
    };
    const quiz = () => {
      const rand = rng(day * 31), pool = poolAround(week);
      const items = [];
      list.forEach((e, k) => items.push(...vocabExercises(e, pool, rand, k))); // 2 ejercicios por palabra: reconocer + producir
      runItems(shuffle(items, rand), {title: "Fijacion de vocabulario", requeue: true, onBack: back,
        onFinish: score => { addCards(list); completeMission(day, "vocab", {score}); refreshSide(); finishScreen("Vocabulario aprendido OK", `<p>${list.length} palabras anadidas a tu repaso espaciado.</p><p class="mute">Precision al primer intento: ${score}%</p>`, back); }});
    };
    show();
  },

  grammar(day) {
    const week = weekOf(day), dw = dowOf(day), back = backToDay(day), G = GRAMMAR[week];
    const start = () => {
      const rand = rng(day * 17 + (S.days[day]?.gTries || 0));
      const items = dw === 1 ? grammarItems(week, 99, rand) : practiceItems(week, dw, rand, S.days[day]?.gTries || 0);
      runItems(items, {title: G.titulo, onBack: back,
        onAnswer: (it, ok) => { S.stats.gramTotal++; if (ok) S.stats.gramOk++; },
        onFinish: score => {
          const ds = dayState(day); ds.gTries = (ds.gTries || 0) + 1;
          if (score >= PASS_GRAMMAR) { completeMission(day, "grammar", {score}); finishScreen(`${score}% OK`, `<p>Unidad practicada!</p>`, back); }
          else { save(); finishScreen(`${score}%`, `<p>Necesitas >=${PASS_GRAMMAR}% para completar. Relee la leccion y vuelve a intentarlo (los ejercicios cambian).</p>`, () => MISSIONS.grammar(day)); }
        }});
    };
    lessonView(week, back, start, dw === 1 ? "Empezar ejercicios" : "Ir a la practica");
  },

  listening(day) {
    const back = backToDay(day), rand = rng(day * 7);
    const sents = dictationFor(day, rand); // 10 frases: vocabulario del dia, lectura del dia, banco de la semana y repaso
    runItems(sents.map(s => ({t: "dict", s})), {title: "Dictado", onBack: back,
      onAnswer: (it, ok, x) => { S.stats.dictTotal++; S.stats.dictOk += (x.score || 0) / 100; },
      onFinish: score => { completeMission(day, "listening", {score}); finishScreen(`Dictado: ${score}%`, `<p>${score >= 85 ? "Excelente oido!" : "Repite manana las frases dificiles con el boton ."}</p>`, back); }});
  },

  speaking(day) {
    const back = backToDay(day), rand = rng(day * 11), week = weekOf(day);
    const {snd, sents} = speakingFor(day, rand);
    soundIntro(snd, back, () => runSpeaking(sents, back, avg => { completeMission(day, "speaking", {score: avg}); finishScreen(`Pronunciacion: ${avg}%`, `<p class="mute">Consejo: imita el ritmo y la entonacion, no solo los sonidos. Las palabras importantes se acentuan; las pequenas (a, the, to, of) se reducen.</p>`, back); }), "Practicar 8 frases");
  },

  reading(day) {
    const plan = dayPlan(day), m = plan.missions.find(x => x.id === "reading"), back = backToDay(day);
    runReading(m.readingWeek, m.readingDw, m.listenFirst, back, score => { completeMission(day, "reading", {score}); finishScreen(`Comprension: ${score}%`, `<p>Lectura completada.</p>`, back); });
  },

  writing(day) { runWriting(day); },
  immersion(day) { runImmersion(day); },
  exam(day) { runExam(day); }
};

function lessonView(week, onBack, onStart, startLabel) {
  KEY = null;
  const G = GRAMMAR[week];
  main().innerHTML = `<div class="wrap lesson"><div class="row"><button class="btn small" id="backBtn"><- Volver</button><span class="pill b">Unidad ${week}</span></div>
    <h1 style="margin-top:12px">${esc(G.titulo)}</h1>
    <div class="card" style="margin-top:12px">${G.explicacion}</div>
    <h2>Ejemplos</h2><div class="exlist">${G.ejemplos.map(([en, es]) => `<div>${audioBtns(en, "small")}<b>${esc(en)}</b><span class="mute">- ${esc(es)}</span></div>`).join("")}</div>
    <h2>Errores tipicos del hispanohablante</h2><div class="card">${G.errores.map(e => `<div style="margin:4px 0">${esc(e)}</div>`).join("")}</div>
    ${onStart ? `<div class="row" style="margin-top:20px"><div class="spacer"></div><button class="btn primary" id="startBtn">${startLabel} -></button></div>` : ""}</div>`;
  bindBack(onBack); bindAudio();
  if (onStart) $("#startBtn").onclick = onStart;
}

// ---------- Pronunciacion ----------
function runSpeaking(sents, onBack, onDone) {
  let i = 0; const scores = []; let mediaRec = null, chunks = [];
  const render = () => {
    if (i >= sents.length) { const avg = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0; S.stats.speechSum += avg; S.stats.speechN++; save(); return onDone(avg); }
    const s = sents[i]; let tried = false;
    main().innerHTML = `<div class="exo">${topbar(`Shadowing ${i + 1}/${sents.length}`, 100 * i / sents.length)}
      <div class="card" style="text-align:center">
        <div class="mute">1) Escucha  2) Repite imitando el ritmo  3) Presiona  y dila</div>
        <div class="q" style="margin:18px 0">${esc(s)}</div>
        <div class="row" style="justify-content:center">${audioBtns(s)}${CLOUD ? "" : `<button class="rec" id="rec" title="Hablar"></button><button class="btn small" id="myrec">(o) Grabar mi voz</button><audio id="play" controls style="display:none;height:34px"></audio>`}</div>
        <div id="res" style="margin-top:14px"></div></div>
      <div class="row" style="margin-top:14px"><button class="btn small" id="skip">Saltar</button><div class="spacer"></div><button class="btn primary" id="nx" disabled>Siguiente Enter</button></div></div>`;
    bindBack(onBack); bindAudio();
    if (S.settings.autoplay) setTimeout(() => speak(s), 300);
    const res = $("#res"), nx = $("#nx");
    const selfRate = msg => {
      res.innerHTML = `<p class="mute">${msg}</p><div class="row" style="justify-content:center"><button class="btn" data-s="40">Me costo</button><button class="btn" data-s="70">Regular</button><button class="btn primary" data-s="95">Me salio bien</button></div>`;
      $$("[data-s]", res).forEach(b => b.onclick = () => { scores[i] = +b.dataset.s; nx.disabled = false; nx.focus(); });
    };
    if (CLOUD) selfRate("Repite la frase en voz alta 3 veces imitando el audio (usa  si va rapido) y calificate con honestidad:");
    else $("#rec").onclick = () => {
      const btn = $("#rec"); btn.classList.add("on"); stopSpeech();
      const r = listen(alts => {
        btn.classList.remove("on");
        const best = alts.map(a => wordDiff(s, a)).sort((a, b) => b.score - a.score)[0];
        scores[i] = Math.max(scores[i] || 0, best.score); tried = true;
        res.innerHTML = `<div class="big-score" style="color:${best.score >= 85 ? "var(--accent)" : best.score >= 60 ? "var(--yellow)" : "var(--red)"}">${best.score}%</div>
          <div class="mute">Lo que se entendio: \"${esc(alts[0])}\"</div>${diffHTML(best.parts)}<p class="mute" style="font-size:12px">Amarillo = palabras que no se reconocieron. Repite si quieres mejorar el puntaje.</p>`;
        nx.disabled = false;
      }, err => { btn.classList.remove("on"); selfRate(err === "no-sr" ? "Tu navegador no tiene reconocimiento de voz. Usa \"Grabar mi voz\", comparate con el audio y calificate:" : `No se pudo usar el microfono (${err}). Graba tu voz, comparate y calificate:`); });
      if (r) setTimeout(() => { try { r.stop(); } catch (e) {} }, 9000);
    };
    if (!CLOUD) $("#myrec").onclick = async () => {
      const b = $("#myrec");
      if (mediaRec && mediaRec.state === "recording") { mediaRec.stop(); return; }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({audio: true});
        chunks = []; mediaRec = new MediaRecorder(stream);
        mediaRec.ondataavailable = e => chunks.push(e.data);
        mediaRec.onstop = () => { stream.getTracks().forEach(t => t.stop()); const a = $("#play"); a.src = URL.createObjectURL(new Blob(chunks)); a.style.display = "inline-block"; a.play(); b.textContent = "(o) Grabar de nuevo"; if (!tried) selfRate("Compara tu grabacion con el audio original y calificate:"); };
        mediaRec.start(); b.textContent = "[] Detener";
      } catch (e) { toast("No se pudo acceder al microfono"); }
    };
    const go = () => { if (!nx.disabled) { i++; render(); } };
    nx.onclick = go; $("#skip").onclick = () => { scores[i] = scores[i] || 0; i++; render(); };
    KEY = e => { if (e.key === "Enter") go(); };
  };
  render();
}

// ---------- Lectura ----------
function runReading(week, dw, listenFirst, onBack, onDone) {
  const L = readingFor(week, dw); KEY = null;
  const sents = splitSentences(L.texto);
  let idx = 0, playing = false;
  const textHTML = () => {
    let k = 0;
    return L.texto.split(/\n/).map(par => (par.match(/[^.!?]+[.!?]+["']?|[^.!?]+$/g) || [par]).map(s => {
      const sh = s.replace(/[A-Za-z']+/g, w => `<span class="wd">${w}</span>`);
      return `<span class="sent" data-s="${k++}">${sh}</span>`;
    }).join("")).join("\n");
  };
  main().innerHTML = `<div class="wrap"><div class="row"><button class="btn small" id="backBtn"><- Volver</button><span class="pill p">Lectura semana ${week}</span><div class="spacer"></div>
    <button class="btn small" id="playAll">> Escuchar todo</button><button class="btn small" id="stopAll">#</button></div>
    <h1 style="margin-top:12px">${esc(L.titulo)}</h1>
    ${listenFirst ? `<div class="note warn" id="lf">Modo escucha: primero escucha el texto completo SIN leerlo. Cuanto entiendes? Luego muestralo. <button class="btn small" id="reveal">Mostrar texto</button></div>` : `<p class="mute">Toca cualquier palabra para ver su traduccion y oirla. Lee una vez en silencio, luego escucha y lee en voz alta.</p>`}
    <div class="card reading" id="rtext" style="${listenFirst ? "filter:blur(7px);user-select:none" : ""}">${textHTML()}</div>
    <div class="row" style="margin-top:16px"><div class="spacer"></div><button class="btn primary" id="qs">Responder preguntas -></button></div></div>`;
  bindBack(() => { playing = false; onBack(); });
  const playFrom = n => {
    playing = true; idx = n;
    const step = () => {
      $$(".sent").forEach(s => s.classList.toggle("on", +s.dataset.s === idx));
      if (!playing || idx >= $$(".sent").length) { playing = false; $$(".sent").forEach(s => s.classList.remove("on")); return; }
      const el = $(`.sent[data-s="${idx}"]`);
      speak(el ? el.textContent : sents[idx], S.settings.rate, () => { idx++; step(); });
    };
    step();
  };
  $("#playAll").onclick = () => playFrom(0);
  $("#stopAll").onclick = () => { playing = false; stopSpeech(); };
  if ($("#reveal")) $("#reveal").onclick = () => { $("#rtext").style.filter = ""; $("#rtext").style.userSelect = ""; $("#lf").remove(); };
  let gl = null;
  $("#rtext").onclick = e => {
    const w = e.target.closest(".wd"); if (gl) { gl.remove(); gl = null; } if (!w) return;
    speak(w.textContent, 0.85);
    const hit = lookupWord(w.textContent);
    gl = document.createElement("div"); gl.className = "gloss";
    gl.innerHTML = hit ? `<b>${esc(hit.en)}</b> - ${esc(hit.es)}<br><span class="mute" style="font-size:12px">${esc(hit.ex)}</span>` : `<b>${esc(w.textContent)}</b> <span class="mute">- buscala en el diccionario o con Claude</span>`;
    const r = w.getBoundingClientRect(); gl.style.left = Math.min(innerWidth - 300, r.left) + "px"; gl.style.top = (r.bottom + 6) + "px";
    document.body.appendChild(gl); setTimeout(() => { if (gl) { gl.remove(); gl = null; } }, 4500);
  };
  $("#qs").onclick = () => {
    playing = false; stopSpeech(); if (gl) gl.remove();
    runItems(L.preguntas.map(q => ({t: "mc", q: q.q, o: q.o, a: q.a})), {title: "Comprension lectora", onBack: () => runReading(week, dw, false, onBack, onDone), onFinish: score => onDone(score)});
  };
}

// ---------- Escritura ----------
function runWriting(day) {
  KEY = null;
  const plan = dayPlan(day), m = plan.missions.find(x => x.id === "writing"), back = backToDay(day);
  const J = S.journal[day] || {text: ""}; const todayWords = wordsForDay(day);
  main().innerHTML = `<div class="wrap"><div class="row"><button class="btn small" id="backBtn"><- Volver</button><span class="pill y">Escritura - Dia ${day}</span></div>
    <h1 style="margin-top:12px">${esc(m.titulo)}</h1>
    <div class="note">${esc(m.desc)}</div>
    <div class="row mute" style="font-size:13px">Gramatica a usar: <b style="color:var(--text)">${esc(GRAMMAR[plan.week].titulo)}</b></div>
    ${todayWords.length ? `<div class="row" style="margin:8px 0;font-size:13px" id="wl">${todayWords.map(e => `<span class="pill" data-w="${esc(e.en.toLowerCase())}">${esc(e.en)}</span>`).join("")}</div>` : ""}
    <textarea class="txt" id="wt" spellcheck="true" lang="en" placeholder="Write here in English...">${esc(J.text || "")}</textarea>
    <div class="row" style="margin-top:10px"><b id="wc">0</b><span class="mute">/ ${m.minWords} palabras validas</span><div class="bar" style="flex:1"><div id="wb"></div></div></div>
    <div class="card" style="margin-top:14px"><h3>Revisor automatico</h3><p class="mute" style="font-size:13px">Solo cuentan oraciones reales en ingles: con sujeto y verbo, de ${plan.week <= 8 ? 4 : plan.week <= 18 ? 5 : 6}+ palabras, sin repetir ni copiar ejemplos. Para completar debes cumplir todo.</p><div id="wfb"></div></div>
    <div class="card" style="margin-top:14px"><h3>Checklist de autocorreccion</h3>
      ${["Cada oracion tiene sujeto (I, it, she...)", "Use la -s en he/she/it en presente", "Los adjetivos van antes del sustantivo", "Revise los tiempos verbales (pasado, presente perfecto...)", "Use conectores (and, but, because, however...)", "Use al menos 5 palabras nuevas de esta semana"].map((c, k) => `<label style="display:block;margin:4px 0"><input type="checkbox" class="ck"> ${c}</label>`).join("")}
    </div>
    <div class="row" style="margin-top:16px"><button class="btn" id="cp"> Copiar prompt para que Claude me corrija</button><div class="spacer"></div><button class="btn primary" id="fin" disabled>Guardar y completar</button></div>
    <div id="clHolder" style="margin-top:12px"></div>
    <p class="mute" style="font-size:12px">Truco agresivo: corrige con Claude, estudia cada correccion y reescribe aqui la version corregida antes de completar.</p></div>`;
  bindBack(back);
  const wt = $("#wt");
  // Requisitos del revisor segun el tipo de consigna
  const reflection = plan.dw === 7;
  const vocab = (reflection ? CONTENT.byWeek[plan.week] : todayWords).map(e => e.en.replace(/\(.*?\)/g, "").split("/")[0].trim().toLowerCase()).filter(Boolean);
  const copied = new Set([...CONTENT.byWeek[plan.week].map(e => normalize(e.ex || "")), ...splitSentences(readingFor(plan.week, Math.min(6, plan.dw)).texto).map(normalize)]);
  const ctx = {week: plan.week, minWords: m.minWords, vocab, copied,
    minSent: /8 frases/.test(m.desc) ? 8 : Math.min(8, Math.max(3, Math.ceil(m.minWords / 15))),
    minVocab: Math.min(/5 palabras/.test(m.desc) ? 5 : 3, vocab.length),
    minGram: reflection ? 1 : 2};
  let timer = null;
  const review = () => {
    const an = analyzeWriting(wt.value, ctx);
    const vw = an.sentences.filter(x => x.ok).reduce((a, x) => a + x.n, 0);
    $("#wc").textContent = vw; $("#wb").style.width = Math.min(100, 100 * vw / m.minWords) + "%";
    const bad = an.sentences.filter(x => !x.ok);
    $("#wfb").innerHTML = an.checks.map(c => `<div style="margin:4px 0;color:${c.ok ? "var(--accent)" : "var(--red)"}">${c.ok ? "OK" : "X"} - ${esc(c.label)}</div>`).join("") +
      (an.errs.length ? `<div class="note" style="margin-top:10px">${an.errs.map(e => `<div><b>"${esc(e.found)}"</b>: ${esc(e.msg)}</div>`).join("")}</div>` : "") +
      (bad.length ? `<div style="margin-top:10px;font-size:13px"><b>Oraciones que no cuentan:</b>${bad.slice(0, 8).map(x => `<div class="mute">- "${esc(x.s.slice(0, 70))}" -> ${esc(x.reason)}</div>`).join("")}</div>` : "");
    const checked = $$(".ck").every(c => c.checked);
    $("#fin").disabled = !(an.ok && checked);
    $("#fin").textContent = an.ok && !checked ? "Marca el checklist para completar" : "Guardar y completar";
    $$("#wl .pill").forEach(p => p.classList.toggle("g", an.usedVocab.includes(p.dataset.w.replace(/\(.*?\)/g, "").split("/")[0].trim())));
    return {an, vw};
  };
  const upd = () => {
    const n = (wt.value.match(/[A-Za-z']+/g) || []).length;
    S.journal[day] = {text: wt.value, words: n, date: todayISO(), prompt: m.desc};
    clearTimeout(timer); timer = setTimeout(review, 250);
  };
  wt.oninput = () => { upd(); save(); }; $$(".ck").forEach(c => c.onchange = review); upd(); review(); wt.focus();
  if (typeof attachClaudeButton === "function") attachClaudeButton(day, () => wt.value, $("#clHolder"));
  $("#cp").onclick = () => {
    const p = `Actua como mi profesor de ingles personal. Mi nivel actual es ${cefrFor(day)} y estoy en el dia ${day} de un plan intensivo de 6 meses. Esta semana estudio: "${GRAMMAR[plan.week].titulo}".\n\nConsigna: ${m.desc}\n\nMi texto:\n"""\n${wt.value}\n"""\n\nPor favor:\n1. Devuelveme el texto corregido completo.\n2. Haz una tabla con cada error: original -> correccion -> explicacion breve en espanol.\n3. Dime los 3 errores mas importantes que debo dejar de cometer.\n4. Reescribe 2 de mis frases como las diria un nativo.\n5. Ponle una nota del 1 al 10 y dime que haria que mi texto suba de nivel.`;
    const fallback = () => {
      let ta = $("#cpText");
      if (!ta) { ta = document.createElement("textarea"); ta.id = "cpText"; ta.className = "txt"; ta.style.minHeight = "160px"; ta.style.marginTop = "10px"; $("#cp").parentElement.after(ta); }
      ta.value = p; ta.focus(); ta.select(); toast("Selecciona y copia este texto manualmente");
    };
    try { navigator.clipboard.writeText(p).then(() => toast("Prompt copiado. Pegalo en Claude."), fallback); } catch (e) { fallback(); }
  };
  $("#fin").onclick = () => { const r = review(); if (!r.an.ok) return toast("Aun faltan requisitos del revisor"); upd(); completeMission(day, "writing", {words: r.vw}); finishScreen("Texto guardado OK", `<p>${r.vw} palabras validas escritas. Lo encuentras en \"Mi diario\".</p>`, back); };
}

// ---------- Inmersion ----------
function immersionVideosHTML(plan) {
  const L = (window.VIDEOS || {})[plan.week] || [], vd = videoOfDay(plan.week, plan.dw);
  if (!vd) return `<div class="card" style="font-size:17px">${esc(plan.missions.find(x => x.id === "immersion").desc)}</div>`;
  const R = readingFor(plan.week, plan.dw);
  const tip = plan.dw === 1 ? "Clase de la gramatica de esta semana. Miralo con subtitulos en INGLES y pausa para repetir los ejemplos en voz alta."
    : plan.dw >= 7 ? "Repaso de escucha de la semana: miralo primero SIN subtitulos y anota cuanto entiendes; despues con subtitulos en INGLES."
    : `Video elegido para el tema de hoy (lectura: "${esc(R.titulo)}"). Miralo con subtitulos en INGLES y anota 5 expresiones nuevas.`;
  const link = (v, big) => `<a class="card vid${big ? " big" : ""}" href="${ytUrl(v.id)}" target="_blank" rel="noopener">
      <span class="pill ${big ? "g" : "b"}">${esc(v.k)} - ${v.min} min</span>
      <b>${esc(v.t)}</b><small>${esc(v.ch)} - YouTube</small></a>`;
  const g = GRAMMAR[plan.week].titulo;
  return `<h2>Clase del dia (semana ${plan.week}: ${esc(plan.W.tema)})</h2>
    ${link(vd.v, true)}
    <div class="note">${tip}</div>
    <h2>Mas clases de esta semana</h2>
    <div class="grid g2">${L.map((v, i) => i === vd.idx ? "" : link(v, false)).join("")}</div>
    <p class="mute" style="font-size:13px;margin-top:10px">Quieres mas? <a href="${ytSearch(g + " english lesson")}" target="_blank" rel="noopener">Buscar mas clases de "${esc(g)}" en YouTube</a>.</p>
    <p class="mute" style="font-size:13px">Idea extra: ${esc(plan.W.inmersion)}</p>`;
}
function runImmersion(day) {
  KEY = null;
  const plan = dayPlan(day), m = plan.missions.find(x => x.id === "immersion"), back = backToDay(day);
  const prev = dayState(day).missions.immersion || {};
  main().innerHTML = `<div class="wrap"><div class="row"><button class="btn small" id="backBtn"><- Volver</button><span class="pill g">Inmersion - Fase ${plan.ph.n}</span></div>
    <h1 style="margin-top:12px">${esc(m.titulo)}</h1>
    ${immersionVideosHTML(plan)}
    <h2>Recursos recomendados para tu fase</h2>
    <div class="grid g2">${RECURSOS[plan.ph.n].map(([n, u]) => `<a class="card" href="${u}" target="_blank" rel="noopener" style="text-decoration:none;color:var(--text)">^ ${esc(n)}</a>`).join("")}</div>
    <div class="note">Regla de oro: subtitulos en INGLES, nunca en espanol. Si no entiendes nada, baja el nivel del contenido; si entiendes todo, subelo.</div>
    <h2>Registro</h2>
    <div class="grid g2"><label>Minutos hechos<input class="txt" id="mins" type="number" min="0" value="${prev.minutes || m.minutes}"></label>
    <label>Que viste/escuchaste?<input class="txt" id="what" value="${esc(prev.what || (videoOfDay(plan.week, plan.dw) || {v: {t: ""}}).v.t)}" placeholder="Ej: Friends T1E3"></label></div>
    <label style="display:block;margin-top:10px">3 palabras o frases nuevas que escuchaste<input class="txt" id="new3" value="${esc(prev.new3 || "")}" placeholder="Ej: no way, hang out, I'm starving"></label>
    <div class="row" style="margin-top:16px"><div class="spacer"></div><button class="btn primary" id="fin">Completar inmersion OK</button></div></div>`;
  bindBack(back);
  $("#fin").onclick = () => {
    const mins = +$("#mins").value || 0;
    if (mins < m.minutes * 0.5) return toast(`Haz al menos ${Math.ceil(m.minutes * 0.5)} minutos `);
    act().min += mins;
    completeMission(day, "immersion", {minutes: mins, what: $("#what").value, new3: $("#new3").value});
    finishScreen("Inmersion registrada OK", `<p>${mins} minutos de ingles real.</p>`, back);
  };
}

// ---------- Examen ----------
function runExam(day) {
  const week = weekOf(day), back = backToDay(day), cp = CHECKPOINTS.includes(week);
  const tries = S.exams[week]?.tries || 0, rand = rng(week * 101 + tries * 7);
  main().innerHTML = `<div class="exo"><div class="card" style="text-align:center;padding:34px">
    <h1>${cp ? " Checkpoint mensual" : "Examen semanal"} - Semana ${week}</h1>
    <p class="mute">${cp ? `Acumulativo: vocabulario y gramatica de las semanas 1 a ${week}.` : `Contenido de la semana ${week} + repaso.`}</p>
    <p>15 de vocabulario - 10 de gramatica - 5 de dictado. Necesitas <b>${PASS_EXAM}%</b> para aprobar.</p>
    ${S.exams[week] ? `<p class="mute">Mejor nota anterior: ${S.exams[week].best}% (${tries} intento/s)</p>` : ""}
    <div class="row" style="justify-content:center;margin-top:16px"><button class="btn" id="backBtn">Volver</button><button class="btn primary" id="go">Comenzar examen</button></div></div></div>`;
  bindBack(back);
  $("#go").onclick = () => {
    const vpool = cp ? [].concat(...Array.from({length: week}, (_, k) => CONTENT.byWeek[k + 1])) : CONTENT.byWeek[week];
    const items = [];
    sample(vpool, 15, rand).forEach((e, k) => items.push({...(k % 2 ? vocabMC(e, vpool, rand, true) : vocabMC(e, vpool, rand)), label: "Vocabulario"}));
    if (cp) { for (let k = 0; k < 10; k++) { const w = 1 + Math.floor(rand() * week); const ex = GRAMMAR[w].ejercicios; items.push({...ex[Math.floor(rand() * ex.length)], label: "Gramatica U" + w}); } }
    else items.push(...grammarItems(week, 10, rand).map(x => ({...x, label: "Gramatica"})));
    sample(vpool.map(e => e.ex).filter(Boolean), 5, rand).forEach(s => items.push({t: "dict", s, label: "Dictado"}));
    runItems(items, {title: cp ? "Checkpoint" : "Examen", onBack: back, onFinish: score => {
      const ex = S.exams[week] || (S.exams[week] = {best: 0, tries: 0});
      ex.tries++; ex.best = Math.max(ex.best, score); ex.last = score; ex.date = todayISO(); ex.checkpoint = cp;
      if (score >= PASS_EXAM) { completeMission(day, "exam", {score}); finishScreen(`Aprobado! ${score}%`, `<p>${score >= 90 ? "Nivel dominado. Sigue a este ritmo." : "Bien. Repasa los fallos en el SRS."}</p>`, back); }
      else { save(); finishScreen(`${score}% - aun no`, `<p>Necesitas ${PASS_EXAM}%. Repasa la leccion, el diccionario de la semana y vuelve a intentarlo (las preguntas cambian).</p>`, back); }
    }});
  };
}
