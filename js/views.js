// Vistas principales y arranque
"use strict";

const VIEWS = {};
function setNav(v) { $$("#nav a").forEach(a => a.classList.toggle("active", a.dataset.view === v)); }
function go(v, ...args) { stopSpeech(); KEY = null; setNav(v); VIEWS[v](...args); main().scrollTop = 0; refreshSide(); }

function missionCards(day) {
  const plan = dayPlan(day), ds = S.days[day] || {missions: {}};
  return plan.missions.map(m => {
    const d = ds.missions[m.id];
    let extra = "";
    if (m.id === "srs") { const n = dueCards().length; extra = n ? ` - <b style="color:var(--orange)">${n} pendientes</b>` : ""; }
    if (d && d.score != null) extra += ` - ${d.score}%`;
    return `<div class="mission ${d ? "done" : ""}" data-m="${m.id}"><div class="check">${d ? "OK" : ""}</div><div class="ic">${m.ic}</div>
      <div><div class="tt">${esc(m.titulo)}</div><div class="ds">${esc(m.desc.length > 140 ? m.desc.slice(0, 137) + "..." : m.desc)}${extra}</div></div><div class="xp">+${m.xp} XP</div></div>`;
  }).join("");
}
function bindMissions(day) { $$(".mission").forEach(el => el.onclick = () => { KEY = null; MISSIONS[el.dataset.m](day); main().scrollTop = 0; }); }

VIEWS.hoy = () => {
  const day = S.currentDay, plan = dayPlan(day), expected = Math.min(TOTAL_DAYS, diffDays(S.startDate, todayISO()) + 1);
  const delta = (completedDays() + 1) - expected;
  const doneToday = Object.entries(S.days).filter(([d, x]) => x.completed && x.date === todayISO()).map(([d]) => d);
  const status = delta > 0 ? `<span class="pill g">${delta} dia(s) adelantado </span>` : delta < 0 ? `<span class="pill r">${-delta} dia(s) atrasado - haz 2 dias hoy</span>` : `<span class="pill b">Al dia con el calendario</span>`;
  const ds = S.days[day] || {missions: {}}; const nDone = plan.missions.filter(m => ds.missions[m.id]).length;
  main().innerHTML = `<div class="wrap">
    <div class="hero"><div class="row"><span class="pill" style="background:${plan.ph.color};color:#04210f">Fase ${plan.ph.n}: ${plan.ph.nombre} - ${plan.ph.nivel}</span>${status}<div class="spacer"></div><span class="mute">Nivel estimado: <b style="color:var(--text)">${cefrFor(day)}</b></span></div>
      <h1 style="margin-top:12px">Dia ${day} de ${TOTAL_DAYS} - Semana ${plan.week}: ${esc(plan.W.tema)}</h1>
      <div class="mute">${esc(plan.W.objetivo)}</div>
      <div class="bigbar"><div style="width:${progress100()}%"></div></div>
      <div class="row mute" style="font-size:13px"><span>Progreso total <b style="color:var(--text)">${progress100()} / 100</b></span><div class="spacer"></div><span>Hoy: ${nDone}/${plan.missions.length} misiones - ${Math.round(act().min)} min - ${act().xp} XP</span></div></div>
    ${S.finished ? `<div class="note"> Terminaste los 182 dias! Sigue con el SRS diario y la inmersion para llegar a C1.</div>` : ""}
    ${doneToday.length ? `<div class="note">OK Hoy ya completaste el dia ${doneToday.join(", ")}. Modo agresivo: puedes avanzar con el dia ${day} ahora, o descansar y volver manana. El repaso SRS si hazlo siempre.</div>` : ""}
    <div class="row"><h2 style="margin:8px 0">Misiones del dia ${day}</h2><div class="spacer"></div><span class="mute" style="font-size:13px">Orden recomendado: de arriba hacia abajo - ~2 h</span></div>
    <div class="grid">${missionCards(day)}</div>
    <h2>Esta semana</h2>
    <div class="grid g3">
      <div class="card"><h3>Gramatica</h3><div class="mute">${esc(GRAMMAR[plan.week].titulo)}</div><button class="btn small" style="margin-top:8px" id="seeG">Ver leccion</button></div>
      <div class="card"><h3>Lectura</h3><div class="mute">${esc(plan.W.lectura.titulo)}</div></div>
      <div class="card"><h3>Meta de la fase</h3><div class="mute" style="font-size:13px">${esc(plan.ph.meta)}</div></div>
    </div></div>`;
  bindMissions(day);
  $("#seeG").onclick = () => lessonView(plan.week, () => go("hoy"));
};

VIEWS.mision = day => {
  if (day === S.currentDay) return VIEWS.hoy();
  const plan = dayPlan(day), done = S.days[day]?.completed;
  main().innerHTML = `<div class="wrap"><div class="row"><button class="btn small" id="bk"><- Plan</button><span class="pill">${done ? "Completado - modo repaso (XP reducido)" : "Pendiente"}</span></div>
    <h1 style="margin-top:12px">Dia ${day} - Semana ${plan.week}: ${esc(plan.W.tema)}</h1><p class="sub">${esc(plan.W.objetivo)}</p>
    <div class="grid">${missionCards(day)}</div></div>`;
  $("#bk").onclick = () => go("plan");
  bindMissions(day);
};

VIEWS.repaso = () => {
  const n = dueCards().length;
  const upcoming = [1, 2, 3, 7].map(d => Object.values(S.cards).filter(c => c.due <= Date.now() + d * 86400000).length);
  main().innerHTML = `<div class="wrap"><h1>Repaso espaciado (SRS)</h1><p class="sub">El algoritmo te muestra cada palabra justo antes de que la olvides. Repasar cada dia es la parte mas importante del plan.</p>
    <div class="grid g4">
      <div class="stat"><b style="color:var(--orange)">${n}</b><small>pendientes ahora</small></div>
      <div class="stat"><b>${learnedCount()}</b><small>tarjetas totales</small></div>
      <div class="stat"><b>${matureCount()}</b><small>dominadas (>=21 dias)</small></div>
      <div class="stat"><b>${upcoming[2]}</b><small>pendientes en 3 dias</small></div></div>
    <div class="row" style="margin-top:18px"><button class="btn primary" id="st" ${n ? "" : "disabled"}>Repasar ${n} tarjetas</button><button class="btn" id="extra" ${learnedCount() ? "" : "disabled"}>Repaso extra (20 al azar)</button></div></div>`;
  $("#st").onclick = () => runSRS(k => { if (S.days[S.currentDay] && !S.days[S.currentDay].missions.srs && dueCards().length === 0) completeMission(S.currentDay, "srs", {reviewed: k}); finishScreen("Repaso terminado OK", `<p>${k} tarjetas repasadas.</p>`, () => go("repaso")); }, () => go("repaso"));
  $("#extra").onclick = () => {
    const ids = sample(Object.keys(S.cards), 20); const pool = ids.map(id => CONTENT.byId[id]).filter(Boolean);
    const rand = Math.random; const all = CONTENT.words;
    runItems(pool.map((e, k) => k % 2 ? vocabMC(e, all, rand, true) : vocabListen(e, all, rand)), {title: "Repaso extra", requeue: true, onBack: () => go("repaso"), onFinish: s => { addXP(10); save(); finishScreen(`${s}%`, "<p>Repaso extra completado.</p>", () => go("repaso")); }});
  };
};

VIEWS.plan = () => {
  const cur = S.currentDay;
  main().innerHTML = `<div class="wrap"><h1>Plan de 26 semanas</h1><p class="sub">Haz clic en un dia desbloqueado para abrirlo. Dia 7 de cada semana = examen. Checkpoints mensuales en semanas ${CHECKPOINTS.join(", ")}.</p>
    ${FASES.map(f => `<h2 style="color:${f.color}">Fase ${f.n} - ${f.nombre} (${f.nivel})</h2><p class="mute" style="margin-top:-4px">${esc(f.meta)}</p>` +
      Array.from({length: f.semanas[1] - f.semanas[0] + 1}, (_, k) => f.semanas[0] + k).map(w => {
        const W = WEEKS[w], first = (w - 1) * 7 + 1, curW = weekOf(cur) === w, past = weekOf(cur) > w;
        const ex = S.exams[w];
        return `<div class="week ${curW ? "cur" : past ? "past" : ""}"><div class="num">${w}</div><div style="flex:1"><div class="row"><b>${esc(W.tema)}</b>${CHECKPOINTS.includes(w) ? `<span class="pill y">Checkpoint</span>` : ""}${ex ? `<span class="pill ${ex.best >= PASS_EXAM ? "g" : "r"}">Examen ${ex.best}%</span>` : ""}</div>
          <div class="mute" style="font-size:13px">${esc(GRAMMAR[w].titulo)} - ${CONTENT.byWeek[w].length} palabras - Lectura: ${esc(W.lectura.titulo)}</div>
          <div class="days">${Array.from({length: 7}, (_, i) => { const d = first + i, done = S.days[d]?.completed, lock = d > cur; return `<span class="${done ? "done" : ""} ${d === cur ? "cur" : ""} ${lock ? "lock" : ""}" data-d="${lock ? "" : d}" title="Dia ${d}">${i === 6 ? "" : d}</span>`; }).join("")}</div></div></div>`;
      }).join("")).join("")}</div>`;
  $$(".days span").forEach(s => s.onclick = () => { if (s.dataset.d) VIEWS.mision(+s.dataset.d); });
};

VIEWS.gramatica = () => {
  main().innerHTML = `<div class="wrap"><h1>Biblioteca de gramatica</h1><p class="sub">Las 26 unidades del plan. Puedes leer cualquiera y practicarla cuando quieras (practica libre).</p>
    <div class="grid g2">${Array.from({length: 26}, (_, k) => k + 1).map(w => `<div class="card" style="cursor:pointer" data-w="${w}"><span class="pill ${w <= 8 ? "g" : w <= 18 ? "b" : "p"}">Unidad ${w}</span><h3 style="margin-top:8px">${esc(GRAMMAR[w].titulo)}</h3><div class="mute" style="font-size:13px">Semana ${w} - ${GRAMMAR[w].ejercicios.length} ejercicios</div></div>`).join("")}</div></div>`;
  $$("[data-w]").forEach(c => c.onclick = () => {
    const w = +c.dataset.w;
    lessonView(w, () => go("gramatica"), () => runItems(grammarItems(w, 10, Math.random), {title: "Practica libre - U" + w, onBack: () => go("gramatica"),
      onAnswer: (it, ok) => { S.stats.gramTotal++; if (ok) S.stats.gramOk++; }, onFinish: s => { addXP(5); save(); finishScreen(`${s}%`, "<p>Practica libre terminada.</p>", () => go("gramatica")); }}), "Practicar 10 ejercicios");
  });
};

VIEWS.diccionario = () => {
  main().innerHTML = `<div class="wrap"><h1>Diccionario del plan</h1><p class="sub">${CONTENT.words.length} palabras y expresiones con ejemplo y audio.</p>
    <div class="row"><input class="txt" id="q" placeholder="Buscar en ingles o espanol..." style="flex:1"><select class="txt" id="wk" style="width:180px"><option value="">Todas las semanas</option>${Array.from({length: 26}, (_, k) => `<option value="${k + 1}">Semana ${k + 1}</option>`).join("")}</select>
    <select class="txt" id="stt" style="width:170px"><option value="">Todas</option><option value="l">Aprendidas</option><option value="n">No vistas</option></select></div>
    <div class="card" style="margin-top:12px;padding:6px;overflow-x:auto"><table class="tbl" id="tb"></table></div></div>`;
  const draw = () => {
    const q = $("#q").value.toLowerCase().trim(), wk = +$("#wk").value, st = $("#stt").value;
    const rows = CONTENT.words.filter(e => (!wk || e.week === wk) && (!q || e.en.toLowerCase().includes(q) || e.es.toLowerCase().includes(q)) && (!st || (st === "l") === !!S.cards[e.id])).slice(0, 300);
    $("#tb").innerHTML = `<tr><th></th><th>Ingles</th><th>Espanol</th><th>Ejemplo</th><th>Sem.</th><th></th></tr>` + rows.map(e => `<tr><td><button class="audio small" data-say="${esc(e.en)}">></button></td><td><b>${esc(e.en)}</b></td><td>${esc(e.es)}</td>
      <td class="mute" style="cursor:pointer" data-say="${esc(e.ex)}">${esc(e.ex)}</td><td>${e.week}</td><td>${S.cards[e.id] ? `<span class="pill g">OK</span>` : `<button class="btn small" data-add="${esc(e.id)}">+ SRS</button>`}</td></tr>`).join("") + (rows.length === 300 ? `<tr><td colspan="6" class="mute">Mostrando 300. Filtra para ver mas.</td></tr>` : "");
    bindAudio($("#tb"));
    $$("[data-add]").forEach(b => b.onclick = () => { addCards([CONTENT.byId[b.dataset.add]]); save(); refreshSide(); draw(); toast("Anadida al repaso"); });
  };
  $("#q").oninput = draw; $("#wk").onchange = draw; $("#stt").onchange = draw; draw(); $("#q").focus();
};

VIEWS.diario = () => {
  const es = Object.entries(S.journal).filter(([, j]) => j.text && j.text.trim()).sort((a, b) => b[0] - a[0]);
  const total = es.reduce((a, [, j]) => a + (j.words || 0), 0);
  main().innerHTML = `<div class="wrap"><h1>Mi diario en ingles</h1><p class="sub">${es.length} textos - ${total} palabras escritas en total. Relee tus primeros textos de vez en cuando: veras el progreso.</p>
    ${es.length ? es.map(([d, j]) => `<div class="card" style="margin-bottom:10px"><div class="row"><b>Dia ${d}</b><span class="mute">${j.date || ""} - ${j.words || 0} palabras</span><div class="spacer"></div><button class="btn small" data-d="${d}">Editar</button></div>
      <div class="mute" style="font-size:12px;margin:4px 0">${esc(j.prompt || "")}</div><div style="white-space:pre-wrap">${esc(j.text)}</div></div>`).join("") : `<div class="card mute">Aun no has escrito nada. La mision de escritura aparece cada dia.</div>`}</div>`;
  $$("[data-d]").forEach(b => b.onclick = () => runWriting(+b.dataset.d));
};

VIEWS.progreso = () => {
  const totalMin = Object.values(S.activity).reduce((a, x) => a + (x.min || 0), 0);
  const st = S.stats;
  const cells = []; const start = S.startDate;
  for (let i = 0; i < TOTAL_DAYS; i++) { const d = addDaysISO(start, i), a = S.activity[d]; const v = a ? a.missions : 0; cells.push(`<div class="${v >= 9 ? "l4" : v >= 6 ? "l3" : v >= 3 ? "l2" : v ? "l1" : ""}" title="${d}: ${v} misiones, ${a ? Math.round(a.min) : 0} min"></div>`); }
  const exams = Object.entries(S.exams).sort((a, b) => a[0] - b[0]);
  main().innerHTML = `<div class="wrap"><h1>Tu progreso</h1><p class="sub">Inicio: ${S.startDate} - Meta: ${addDaysISO(S.startDate, TOTAL_DAYS - 1)}</p>
    <div class="hero"><div class="row"><b style="font-size:40px">${progress100()}</b><span class="mute">/ 100</span><div class="spacer"></div><span class="pill b">Nivel estimado ${cefrFor(S.currentDay)}</span><span class="pill y">Nivel ${level()} - ${S.xp} XP</span></div>
    <div class="bigbar"><div style="width:${progress100()}%"></div></div></div>
    <div class="grid g4">
      <div class="stat"><b>${completedDays()}</b><small>dias completados / ${TOTAL_DAYS}</small></div>
      <div class="stat"><b>${streak()} </b><small>racha actual</small></div>
      <div class="stat"><b>${Math.round(totalMin / 60 * 10) / 10} h</b><small>tiempo total de estudio</small></div>
      <div class="stat"><b>${learnedCount()}</b><small>palabras en SRS (${matureCount()} dominadas)</small></div>
      <div class="stat"><b>${st.dictTotal ? Math.round(100 * st.dictOk / st.dictTotal) : 0}%</b><small>precision en dictado</small></div>
      <div class="stat"><b>${st.speechN ? Math.round(st.speechSum / st.speechN) : 0}%</b><small>pronunciacion promedio</small></div>
      <div class="stat"><b>${st.gramTotal ? Math.round(100 * st.gramOk / st.gramTotal) : 0}%</b><small>aciertos de gramatica</small></div>
      <div class="stat"><b>${Object.values(S.journal).reduce((a, j) => a + (j.words || 0), 0)}</b><small>palabras escritas</small></div></div>
    <h2>Calendario de 182 dias</h2><div class="card"><div class="heat" style="grid-template-rows:repeat(7,1fr);grid-auto-flow:column">${cells.join("")}</div>
    <div class="mute" style="font-size:12px;margin-top:8px">Cada columna es una semana del plan. Mas verde = mas misiones ese dia.</div></div>
    <h2>Examenes</h2><div class="card">${exams.length ? `<table class="tbl"><tr><th>Semana</th><th>Tipo</th><th>Mejor nota</th><th>Intentos</th><th>Fecha</th></tr>${exams.map(([w, e]) => `<tr><td>${w}</td><td>${e.checkpoint ? "Checkpoint" : "Semanal"}</td><td><span class="pill ${e.best >= PASS_EXAM ? "g" : "r"}">${e.best}%</span></td><td>${e.tries}</td><td>${e.date}</td></tr>`).join("")}</table>` : `<span class="mute">Tu primer examen es el dia 7.</span>`}</div>
    <h2>Hoja de ruta</h2><div class="grid g3">${FASES.map(f => { const tot = (f.semanas[1] - f.semanas[0] + 1) * 7, dn = Object.entries(S.days).filter(([d, x]) => x.completed && weekOf(+d) >= f.semanas[0] && weekOf(+d) <= f.semanas[1]).length; return `<div class="card"><b style="color:${f.color}">Fase ${f.n} - ${f.nivel}</b><div class="mute" style="font-size:13px;margin:4px 0 10px">${esc(f.meta)}</div><div class="bar"><div style="width:${100 * dn / tot}%;background:${f.color}"></div></div><small class="mute">${dn}/${tot} dias</small></div>`; }).join("")}</div></div>`;
};

VIEWS.ajustes = () => {
  loadVoices();
  main().innerHTML = `<div class="wrap"><h1>Ajustes</h1>
    <div class="card"><h3>Voz en ingles</h3><p class="mute" style="font-size:13px">Las voces \"Natural\" de Microsoft Edge son las mas realistas (requieren internet). Si no aparecen, abre la app con el acceso directo del escritorio.</p>
      <div class="row"><select class="txt" id="vc" style="flex:1"><option value="">Automatica (mejor disponible)</option>${VOICES.map(v => `<option ${v.name === S.settings.voice ? "selected" : ""}>${esc(v.name)}</option>`).join("")}</select><button class="btn" id="tv">> Probar</button></div>
      <label style="display:block;margin-top:12px">Velocidad: <b id="rv">${S.settings.rate}</b><input type="range" id="rt" min="0.5" max="1.3" step="0.05" value="${S.settings.rate}" style="width:100%"></label>
      <label style="display:block;margin-top:8px"><input type="checkbox" id="ap" ${S.settings.autoplay ? "checked" : ""}> Reproducir audio automaticamente</label></div>
    <div class="card" style="margin-top:14px"><h3>Calendario</h3><label>Fecha de inicio del plan <input type="date" class="txt" id="sd" value="${S.startDate}" style="width:220px"></label>
      <p class="mute" style="font-size:13px">Se usa para saber si vas adelantado o atrasado.</p>
      <h3 style="margin-top:14px">Ya sabes algo de ingles?</h3><div class="row"><select class="txt" id="jw" style="width:200px">${Array.from({length: 26}, (_, k) => `<option value="${k + 1}">Empezar en semana ${k + 1}</option>`).join("")}</select><button class="btn" id="jb">Saltar</button></div>
      <p class="mute" style="font-size:13px">Las palabras de las semanas saltadas se anaden al SRS para repasarlas.</p></div>
    <div class="card" style="margin-top:14px"><h3>Respaldo</h3><p class="mute" style="font-size:13px">${WEB ? "Tu progreso se guarda en este dispositivo. Para pasarlo a otro (PC o celular) usa Copiar codigo de progreso y pegalo alla. Agrega esta pagina a la pantalla de inicio para que el iPhone no borre los datos." : CLOUD ? (DB ? "Tu progreso se guarda en la nube de claude.ai y se sincroniza entre el PC y el celular. Abre siempre el mismo link." : "No hay conexion con la nube: el progreso se guarda solo en este dispositivo.") : "El progreso se guarda automaticamente en <code>Documents\\InglesIntensivo\\data\\progreso.json</code>, con copia diaria en <code>data\\respaldos</code>."}</p>
      <div class="row"><button class="btn" id="ex">v Exportar progreso</button><label class="btn">^ Importar<input type="file" id="im" accept=".json" style="display:none"></label><div class="spacer"></div><button class="btn danger" id="rs">Reiniciar todo</button></div>
      <div class="row" id="rsBox" hidden style="margin-top:12px"><span>Esto borra TODO tu progreso. Escribe <b>BORRAR</b>:</span><input class="txt" id="rsTxt" style="width:140px"><button class="btn danger" id="rsOk">Confirmar</button></div>
      <h3 style="margin-top:16px">Pasar progreso a otro dispositivo</h3>
      <div class="row"><button class="btn" id="cpShow">Copiar codigo de progreso</button><button class="btn" id="cpLoad">Pegar codigo de progreso</button></div>
      <textarea class="txt" id="cpTxt" hidden style="min-height:120px;margin-top:8px;font-size:12px"></textarea>
      <div class="row" id="cpBox" hidden style="margin-top:8px"><div class="spacer"></div><button class="btn primary" id="cpOk">Cargar este codigo</button></div></div></div>`;
  $("#vc").onchange = e => { S.settings.voice = e.target.value; save(); };
  $("#tv").onclick = () => speak("Hi Diego! This is your English voice. Let's practice every day.");
  $("#rt").oninput = e => { S.settings.rate = +e.target.value; $("#rv").textContent = S.settings.rate; save(); };
  $("#ap").onchange = e => { S.settings.autoplay = e.target.checked; save(); };
  $("#sd").onchange = e => { S.startDate = e.target.value; save(); toast("Fecha guardada"); };
  $("#jb").onclick = () => {
    const w = +$("#jw").value, d = (w - 1) * 7 + 1;
    if (d <= S.currentDay) return toast("Ya estas en esa semana o mas adelante");
    for (let k = 1; k < w; k++) addCards(CONTENT.byWeek[k]);
    S.currentDay = d; save(); refreshSide(); toast(`Saltaste a la semana ${w}`); go("hoy");
  };
  $("#ex").onclick = async () => {
    const data = JSON.stringify(S, null, 1), filename = `ingles_progreso_${todayISO()}.json`;
    if (CLOUD) {
      const dl = window.claude && window.claude.use ? await window.claude.use("downloads").catch(() => null) : null;
      if (!dl) return toast("Exportar no esta disponible aqui");
      try { await dl.save({filename, data}); } catch (e) { toast("Descarga cancelada"); }
      return;
    }
    const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([data], {type: "application/json"})); a.download = filename; a.click();
  };
  $("#im").onchange = async e => { try { const d = JSON.parse(await e.target.files[0].text()); if (!d.version) throw 0; S = Object.assign(DEFAULT_STATE(), d); save(); toast("Progreso importado"); go("hoy"); } catch (err) { toast("Archivo invalido"); } };
  $("#cpShow").onclick = () => {
    const t = $("#cpTxt"), code = JSON.stringify(S);
    t.hidden = false; $("#cpBox").hidden = true; t.value = code; t.focus(); t.select();
    try { navigator.clipboard.writeText(code).then(() => toast("Codigo copiado. Envialo a ti mismo y pegalo en el otro dispositivo."), () => toast("Selecciona todo el texto y copialo")); } catch (e) { toast("Selecciona todo el texto y copialo"); }
  };
  $("#cpLoad").onclick = () => { const t = $("#cpTxt"); t.hidden = false; t.value = ""; t.placeholder = "Pega aqui el codigo"; $("#cpBox").hidden = false; t.focus(); };
  $("#cpOk").onclick = () => {
    try {
      const d = JSON.parse($("#cpTxt").value.trim()); if (!d.version || !d.days) throw 0;
      S = Object.assign(DEFAULT_STATE(), d); save(); refreshSide(); toast(`Progreso cargado: dia ${S.currentDay}, ${S.xp} XP`); go("hoy");
    } catch (err) { toast("Codigo invalido: copialo completo"); }
  };
  $("#rs").onclick = () => { $("#rsBox").hidden = false; $("#rsTxt").focus(); };
  $("#rsOk").onclick = () => { if ($("#rsTxt").value.trim() === "BORRAR") { S = DEFAULT_STATE(); save(); go("hoy"); toast("Progreso reiniciado"); } else toast("Escribe BORRAR para confirmar"); };
};

// ---------- Arranque ----------
$$("#nav a").forEach(a => a.onclick = () => go(a.dataset.view));
(async () => {
  try { await loadState(); } catch (e) { console.warn("carga", e); }
  try { if (!S.activity || !Object.keys(S.days).length) save(); } catch (e) {}
  try { refreshSide(); go("hoy"); } catch (e) { showFatal(e); }
  const ld = document.getElementById("loading"); if (ld) ld.remove();
})();
