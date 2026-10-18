// Banco ampliado de practica: vocabulario (5 tipos de ejercicio por palabra), dictado (banco de frases por semana)
// y pronunciacion (sonidos dificiles, pares minimos y frases utiles). Tambien la practica libre ilimitada.
"use strict";

// ---------- Vocabulario ----------
const escRe = s => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
// Completar: la frase de ejemplo con la palabra tapada
function vocabCloze(entry) {
  const ex = entry.ex || "";
  const words = entry.en.replace(/\(.*?\)/g, "").split("/")[0].trim();
  if (!words || !ex) return null;
  const m = ex.match(new RegExp("\\b" + escRe(words) + "\\b", "i"));
  if (!m) return null;
  return {t: "fill", q: ex.slice(0, m.index) + "___" + ex.slice(m.index + m[0].length) + "  (" + entry.es + ")", a: [m[0]]};
}
// Escribir: de espanol a ingles, escribiendo la palabra
function vocabWrite(entry) {
  const ans = entry.en.replace(/\(.*?\)/g, "").split("/").map(s => s.trim()).filter(Boolean);
  return {t: "tr", q: entry.es, a: ans.length ? ans : [entry.en]};
}
// Dos ejercicios por palabra: uno de reconocer y uno de producir
function vocabExercises(entry, pool, rand, k) {
  const rec = k % 3 === 0 ? vocabMC(entry, pool, rand, false) : k % 3 === 1 ? vocabListen(entry, pool, rand) : vocabMC(entry, pool, rand, true);
  const prod = (k % 2 === 0 ? vocabCloze(entry) : null) || vocabWrite(entry);
  return [rec, prod];
}
// Un ejercicio al azar de cualquiera de los 5 tipos
function vocabAny(entry, pool, rand) {
  const r = Math.floor(rand() * 5);
  if (r === 0) return vocabMC(entry, pool, rand, false);
  if (r === 1) return vocabMC(entry, pool, rand, true);
  if (r === 2) return vocabListen(entry, pool, rand);
  if (r === 3) return vocabCloze(entry) || vocabWrite(entry);
  return vocabWrite(entry);
}
function learnedOrCurrent() {
  const learned = Object.keys(S.cards).map(id => CONTENT.byId[id]).filter(Boolean);
  if (learned.length >= 20) return learned;
  const w = weekOf(S.currentDay), out = [];
  for (let k = 1; k <= w; k++) out.push(...CONTENT.byWeek[k]);
  return out;
}
function freeVocab() {
  const words = learnedOrCurrent(), rand = Math.random, pool = CONTENT.words;
  const items = sample(words, 15, rand).map(e => vocabAny(e, pool, rand));
  runItems(items, {title: "Practica libre de vocabulario", requeue: true, onBack: () => go("practica"),
    onFinish: s => { addXP(5); save(); finishScreen(`${s}%`, `<p>15 palabras practicadas.</p><button class="btn" id="again" style="margin-top:10px">Practicar 15 mas</button>`, () => go("practica")); $("#again").onclick = freeVocab; }});
}

// ---------- Dictado ----------
const _sentCache = {};
const QWORDS = /^(What|Where|When|Why|How|Who|Which|Whose|Do|Does|Did|Is|Are|Am|Was|Were|Have|Has|Had|Can|Could|Will|Would|Should|Shall|Must|May)( |$)/;
const endP = t => t + (QWORDS.test(t) && !/^Have (a|an|fun|a nice)( |$)/.test(t) ? "?" : ".");
// Numeros en palabras (para dictados de numeros, horas, precios y fechas)
function numWords(n) {
  const a = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
  const t = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
  if (n < 20) return a[n];
  if (n < 100) return t[Math.floor(n / 10)] + (n % 10 ? "-" + a[n % 10] : "");
  if (n < 1000) return a[Math.floor(n / 100)] + " hundred" + (n % 100 ? " and " + numWords(n % 100) : "");
  return numWords(Math.floor(n / 1000)) + " thousand" + (n % 1000 ? (n % 1000 < 100 ? " and " : " ") + numWords(n % 1000) : "");
}
const yearWords = y => y >= 2000 && y < 2010 ? "two thousand and " + numWords(y - 2000) : numWords(Math.floor(y / 100)) + " " + (y % 100 < 10 ? "oh " + numWords(y % 100) : numWords(y % 100));
const timeWords = (h, m) => m === 0 ? numWords(h) + " o'clock" : numWords(h) + " " + (m < 10 ? "oh " + numWords(m) : numWords(m));
// 30 frases con numeros por semana, mas grandes a medida que avanza el plan
function numberSentences(week) {
  const r = rng(week * 7919), pick = arr => arr[Math.floor(r() * arr.length)], int = (lo, hi) => lo + Math.floor(r() * (hi - lo + 1));
  const names = ["Ana", "Tom", "Carla", "Nico", "Laura", "Pedro", "Sofia", "Diego", "Kate", "Sam"];
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const things = ["camera", "jacket", "ticket", "book", "bike", "phone", "lamp", "backpack"];
  const max = week <= 4 ? 20 : week <= 10 ? 100 : 999;
  const T = [
    () => `${pick(names)} is ${numWords(int(5, 60))} years old.`,
    () => `The train leaves at ${timeWords(int(1, 12), pick([0, 5, 10, 15, 20, 30, 45, 50]))}.`,
    () => `The ${pick(things)} costs ${numWords(int(2, max))} dollars.`,
    () => `My room is number ${numWords(int(1, max))}.`,
    () => `We have ${numWords(int(2, 20))} students in the class.`,
    () => `The meeting is on ${pick(days)} at ${timeWords(int(8, 11), pick([0, 15, 30]))}.`,
    () => `I was born in ${yearWords(int(1960, 2009))}.`,
    () => `Her birthday is on the ${["first", "second", "third", "fifth", "tenth", "twelfth", "fifteenth", "twentieth", "twenty-first", "thirtieth"][int(0, 9)]} of ${pick(months)}.`,
    () => `The museum opens at ${timeWords(int(8, 10), pick([0, 30]))} and closes at ${timeWords(int(5, 7), 0)}.`,
    () => `It is ${numWords(int(1, 35))} degrees today.`,
    () => `The flight takes ${numWords(int(2, 14))} hours.`,
    () => `There are ${numWords(int(2, max))} people in the building.`,
    () => `My phone number is ${Array.from({length: 7}, () => numWords(int(0, 9))).join(" ")}.`,
    () => `The bus number ${numWords(int(1, 99))} goes to the airport.`,
    () => `We walked ${numWords(int(2, 25))} kilometers yesterday.`,
    () => `The hotel is on the ${["first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth"][int(0, 9)]} floor.`
  ];
  const out = new Set();
  for (let i = 0; out.size < 30 && i < 200; i++) out.add(T[i % T.length]());
  return [...out];
}
const okLen = s => { const n = s.split(" ").length; return n >= 4 && n <= 16; };
// Banco de frases de una semana: ejemplos de vocabulario, las 6 lecturas y las frases completas de la unidad de gramatica
function weekSentences(week) {
  if (_sentCache[week]) return _sentCache[week];
  const set = new Set();
  CONTENT.byWeek[week].forEach(e => e.ex && set.add(e.ex.trim()));
  for (let dw = 1; dw <= 6; dw++) splitSentences(readingFor(week, dw).texto).forEach(s => set.add(s.trim()));
  (GRAMMAR_EXTRA[week] || []).forEach(e => {
    if (e[0] === "o") set.add(endP(e[1]));
    if (e[0] === "t") set.add(e[2].split("|")[0] + (/^(What|Where|When|Why|How|Who|Do|Does|Did|Is|Are|Was|Were|Have|Has|Can|Will|Would|Should)\b/.test(e[2]) ? "?" : "."));
  });
  (window.FRASES && FRASES[week] || []).forEach(s => set.add(s));
  numberSentences(week).forEach(s => set.add(s));
  // Frases completas a partir de los ejercicios de completar y de opcion multiple (con la respuesta correcta puesta)
  const fillIn = (q, ans) => {
    if (/->|"/.test(q)) return null;
    const clean = q.replace(/\s*\([^)]*\)/g, "");
    if (!clean.includes("___")) return null;
    let out = ans.startsWith("'") ? clean.replace(/\s*___/, ans) : clean.replace("___", ans);
    out = out.charAt(0).toUpperCase() + out.slice(1);
    if (QWORDS.test(out) && out.endsWith(".")) out = out.slice(0, -1) + "?";
    return out;
  };
  (GRAMMAR_EXTRA[week] || []).forEach(e => {
    let s = null;
    if (e[0] === "f") s = fillIn(e[1], e[2].split("|")[0]);
    if (e[0] === "m") { const o = e[2].split("|"); s = e[1].startsWith("Elige") ? o[e[3]] : fillIn(e[1], o[e[3]]); }
    if (s && /[.?!]$/.test(s)) set.add(s);
  });
  GRAMMAR[week].ejercicios.forEach(x => {
    if (x.t === "mc" && x.q.includes("___")) { const s = fillIn(x.q, x.o[x.a]); if (s && /[.?!]$/.test(s)) set.add(s); }
    if (x.t === "fill") { const s = fillIn(x.q, x.a[0]); if (s && /[.?!]$/.test(s)) set.add(s); }
    if (x.t === "order") set.add(endP(x.a));
  });
  return (_sentCache[week] = [...set].filter(s => okLen(s) && !/___/.test(s) && !/(Mr|Mrs|Ms|Dr)\.$/.test(s)));
}
function dictationFor(day, rand) {
  const week = weekOf(day), dw = dowOf(day);
  const today = sample(wordsForDay(day).map(e => e.ex).filter(Boolean), 4, rand);
  const reading = sample(splitSentences(readingFor(week, dw).texto).filter(okLen), 3, rand);
  const bank = weekSentences(week).filter(s => !today.includes(s) && !reading.includes(s));
  const review = week > 1 ? sample(weekSentences(1 + Math.floor(rand() * (week - 1))), 1, rand) : [];
  const out = [...today, ...reading, ...sample(bank, 10 - today.length - reading.length - review.length, rand), ...review];
  return shuffle([...new Set(out)], rand);
}
function freeDictation() {
  const w = weekOf(S.currentDay), rand = Math.random, all = [];
  for (let k = 1; k <= w; k++) all.push(...weekSentences(k));
  runItems(sample(all, 10, rand).map(s => ({t: "dict", s})), {title: "Dictado libre", onBack: () => go("practica"),
    onAnswer: (it, ok, x) => { S.stats.dictTotal++; S.stats.dictOk += (x.score || 0) / 100; },
    onFinish: s => { addXP(5); save(); finishScreen(`Dictado: ${s}%`, `<button class="btn" id="again" style="margin-top:10px">10 frases mas</button>`, () => go("practica")); $("#again").onclick = freeDictation; }});
}

// ---------- Pronunciacion ----------
const REAL_PAIRS = new Set(["i", "b-v", "th", "sh-ch", "h", "final", "z", "j-y", "vocales-a", "w", "r"]);
const soundOfDay = day => SONIDOS[(day - 1) % SONIDOS.length];
// Pantalla del sonido: explicacion + pares para escuchar y repetir
function soundIntro(snd, onBack, onNext, nextLabel) {
  KEY = null;
  main().innerHTML = `<div class="wrap"><div class="row"><button class="btn small" id="backBtn"><- Volver</button><span class="pill p">Sonido del dia</span></div>
    <h1 style="margin-top:12px">${esc(snd.titulo)}</h1>
    <div class="card" style="font-size:16px">${esc(snd.tip)}</div>
    <h2>Escucha y repite cada par</h2>
    <div class="grid g2">${snd.pares.map(p => { const [a, b] = p.split("|"); return `<div class="card row" style="gap:8px">${audioBtns(a, "small")}<b>${esc(a)}</b><span class="mute">vs</span>${REAL_PAIRS.has(snd.id) ? audioBtns(b, "small") : ""}<b>${esc(b)}</b></div>`; }).join("")}</div>
    <div class="row" style="margin-top:18px"><div class="spacer"></div><button class="btn primary" id="goOn">${nextLabel} -></button></div></div>`;
  bindBack(onBack); bindAudio();
  $("#goOn").onclick = onNext;
}
// Escucha una palabra del par y elige cual fue
function pairItems(snd, rand, n) {
  if (!REAL_PAIRS.has(snd.id)) return [];
  return sample(snd.pares, n, rand).map(p => {
    const o = p.split("|"), a = Math.floor(rand() * 2);
    return {t: "listen", audio: o[a], o, a};
  });
}
function speakingFor(day, rand) {
  const week = weekOf(day), dw = dowOf(day), snd = soundOfDay(day);
  const ex = sample(wordsForDay(day).map(e => e.ex).filter(Boolean), 2, rand);
  const rd = sample(splitSentences(readingFor(week, dw).texto).filter(s => s.split(" ").length <= 18), 2, rand);
  const fr = (FRASES[week] || []).slice(((dw - 1) * 2) % 10, ((dw - 1) * 2) % 10 + 2);
  const so = sample(snd.frases, 2, rand);
  return {snd, sents: [...ex, ...rd, ...fr, ...so]};
}
function freeSound(snd) {
  const rand = Math.random, back = () => go("practica");
  soundIntro(snd, back, () => {
    const after = () => runSpeaking(snd.frases, back, avg => { addXP(5); save(); finishScreen(`Pronunciacion: ${avg}%`, "", back); });
    const items = pairItems(snd, rand, 6);
    if (!items.length) return after();
    runItems(items, {title: "Escucha: cual dijo?", onBack: back, onFinish: () => after()});
  }, REAL_PAIRS.has(snd.id) ? "Ejercicio de oido y luego hablar" : "Practicar frases");
}
function freeShadowing() {
  const w = weekOf(S.currentDay), all = [];
  for (let k = 1; k <= w; k++) all.push(...(FRASES[k] || []));
  const bank = []; for (let k = 1; k <= w; k++) bank.push(...weekSentences(k));
  runSpeaking([...sample(all, 4, Math.random), ...sample(bank, 4, Math.random)], () => go("practica"), avg => { addXP(5); save(); finishScreen(`Pronunciacion: ${avg}%`, `<button class="btn" id="again" style="margin-top:10px">8 frases mas</button>`, () => go("practica")); $("#again").onclick = freeShadowing; });
}

// ---------- Vista: practica libre ----------
VIEWS.practica = () => {
  const w = weekOf(S.currentDay);
  let nVocab = learnedOrCurrent().length, nSent = 0, nG = 0;
  for (let k = 1; k <= w; k++) { nSent += weekSentences(k).length; nG += GRAMMAR[k].ejercicios.length + extraBank(k).length; }
  main().innerHTML = `<div class="wrap"><h1>Practica libre</h1><p class="sub">Ejercicios extra e ilimitados con todo lo que ya viste (hasta la semana ${w}). No reemplazan las misiones del dia: suman XP y te dan mas soltura.</p>
    <div class="grid g2">
      <div class="card"><h3>Vocabulario</h3><div class="mute" style="font-size:13px">${nVocab} palabras - 5 tipos de ejercicio</div><button class="btn primary" style="margin-top:10px" id="pV">15 ejercicios</button></div>
      <div class="card"><h3>Dictado</h3><div class="mute" style="font-size:13px">${nSent} frases disponibles</div><button class="btn primary" style="margin-top:10px" id="pD">10 frases</button></div>
      <div class="card"><h3>Gramatica</h3><div class="mute" style="font-size:13px">${nG} ejercicios de tus unidades</div><button class="btn primary" style="margin-top:10px" id="pG">Elegir unidad</button></div>
      <div class="card"><h3>Shadowing</h3><div class="mute" style="font-size:13px">${Object.values(FRASES).flat().length} frases utiles + ${nSent} del banco</div><button class="btn primary" style="margin-top:10px" id="pS">8 frases</button></div>
    </div>
    <h2>Sonidos dificiles para hispanohablantes</h2>
    <div class="grid g2">${SONIDOS.map((s, i) => `<div class="card" style="cursor:pointer" data-snd="${i}"><b>${esc(s.titulo)}</b><div class="mute" style="font-size:13px">${s.pares.length} pares - ${s.frases.length} frases</div></div>`).join("")}</div></div>`;
  $("#pV").onclick = freeVocab; $("#pD").onclick = freeDictation; $("#pG").onclick = () => go("gramatica"); $("#pS").onclick = freeShadowing;
  $$("[data-snd]").forEach(c => c.onclick = () => freeSound(SONIDOS[+c.dataset.snd]));
};
