// Nucleo: estado, contenido, utilidades, voz, SRS y plan diario
"use strict";

const TOTAL_DAYS = 182;
const CHECKPOINTS = [4, 8, 13, 17, 22, 26];
const PASS_EXAM = 75;
const PASS_GRAMMAR = 70;

// ---------- Utilidades ----------
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const todayISO = () => { const d = new Date(); d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); return d.toISOString().slice(0, 10); };
const addDaysISO = (iso, n) => { const d = new Date(iso + "T12:00:00"); d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10); };
const diffDays = (a, b) => Math.round((new Date(b + "T12:00:00") - new Date(a + "T12:00:00")) / 86400000);

function rng(seed) { // mulberry32
  let t = seed >>> 0;
  return () => { t += 0x6D2B79F5; let r = Math.imul(t ^ t >>> 15, 1 | t); r ^= r + Math.imul(r ^ r >>> 7, 61 | r); return ((r ^ r >>> 14) >>> 0) / 4294967296; };
}
function shuffle(arr, rand = Math.random) { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function sample(arr, n, rand = Math.random) { return shuffle(arr, rand).slice(0, n); }

// Numeros a palabras: el reconocedor de voz (y a veces el usuario) escribe "7:00", "10", "$15", "21st", "1995"
const NUM_A = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
const NUM_T = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
function numToWords(n) {
  if (n < 20) return NUM_A[n];
  if (n < 100) return NUM_T[Math.floor(n / 10)] + (n % 10 ? " " + NUM_A[n % 10] : "");
  if (n < 1000) return NUM_A[Math.floor(n / 100)] + " hundred" + (n % 100 ? " and " + numToWords(n % 100) : "");
  if (n < 1000000) return numToWords(Math.floor(n / 1000)) + " thousand" + (n % 1000 ? (n % 1000 < 100 ? " and " : " ") + numToWords(n % 1000) : "");
  return String(n);
}
const ORD_A = {one: "first", two: "second", three: "third", five: "fifth", eight: "eighth", nine: "ninth", twelve: "twelfth"};
function ordToWords(n) {
  const w = numToWords(n).split(" "), last = w.pop();
  const o = ORD_A[last] || (last.endsWith("y") ? last.slice(0, -1) + "ieth" : last + "th");
  return [...w, o].join(" ");
}
function yearToWords(y) {
  if (y >= 2000 && y < 2010) return "two thousand and " + numToWords(y - 2000);
  const lo = y % 100;
  return numToWords(Math.floor(y / 100)) + " " + (lo === 0 ? "hundred" : lo < 10 ? "oh " + numToWords(lo) : numToWords(lo));
}
function spellNumbers(s) {
  return s
    .replace(/\$\s?(\d+)(?:\.\d{2})?/g, (m, d) => d + " dollars")
    .replace(/(\d+)\s?%/g, "$1 percent")
    .replace(/(\d)[,.](\d{3})(?!\d)/g, "$1$2")
    .replace(/(^|[^\d])(\d{1,2}):(\d{2})(?!\d)/g, (m, p, h, mm) => p + numToWords(+h) + (mm === "00" ? "" : " " + (+mm < 10 ? "oh " + numToWords(+mm) : numToWords(+mm))))
    .replace(/(\d+)(st|nd|rd|th)(?![a-z])/g, (m, n) => ordToWords(+n))
    .replace(/(^|[^\d])(1[5-9]\d\d|20\d\d)(?!\d)/g, (m, p, y) => p + yearToWords(+y))
    .replace(/\d+/g, n => numToWords(+n))
    .replace(/(^|\s)(a\.?m\.?|p\.?m\.?)(?=\s|$)/g, " ")
    .replace(/(^|\s)o'?clock(?=[\s.,!?]|$)/g, " ");
}
// Normalizacion para comparar respuestas en ingles (los numeros se pasan a palabras primero)
function normalize(s) {
  return spellNumbers(String(s).toLowerCase().replace(/[\u2019\u2018`\u00b4]/g, "'"))
    .replace(/won't/g, "will not").replace(/can't/g, "can not").replace(/cannot/g, "can not")
    .replace(/shan't/g, "shall not").replace(/n't\b/g, " not")
    .replace(/'m\b/g, " am").replace(/'re\b/g, " are").replace(/'ve\b/g, " have")
    .replace(/'ll\b/g, " will").replace(/'d\b/g, " would")
    .replace(/[^a-z0-9'aeiounu\s-]/g, " ")
    .replace(/-/g, " ")
    .replace(/\s+/g, " ").trim();
}
function words(s) { return normalize(s).split(" ").filter(Boolean); }

function levenshtein(a, b) {
  const m = a.length, n = b.length; if (!m) return n; if (!n) return m;
  let prev = Array.from({length: n + 1}, (_, i) => i);
  for (let i = 1; i <= m; i++) {
    const cur = [i];
    for (let j = 1; j <= n; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    prev = cur;
  }
  return prev[n];
}
function similarity(a, b) { a = normalize(a); b = normalize(b); const L = Math.max(a.length, b.length) || 1; return 1 - levenshtein(a, b) / L; }

// Compara una respuesta con variantes aceptadas -> {ok, close, best}
function forms(s) { const n = normalize(s); return [n, n.replace(/'s\b/g, " is"), n.replace(/'s\b/g, " has")]; }
function checkAnswer(input, variants) {
  const inF = forms(input);
  let best = 0, bestV = variants[0];
  for (const v of variants) {
    if (forms(v).some(f => inF.includes(f))) return {ok: true, close: false, best: v};
    const s = similarity(input, v); if (s > best) { best = s; bestV = v; }
  }
  return {ok: false, close: best >= 0.88, best: bestV, score: best};
}

// Alineacion palabra a palabra (LCS) para dictado y voz
function wordDiff(target, input) {
  const T = words(target), I = words(input);
  const dp = Array.from({length: T.length + 1}, () => new Array(I.length + 1).fill(0));
  for (let i = T.length - 1; i >= 0; i--) for (let j = I.length - 1; j >= 0; j--)
    dp[i][j] = (T[i] === I[j] || levenshtein(T[i], I[j]) <= (T[i].length > 6 ? 1 : 0)) ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  const out = []; let i = 0, j = 0, hits = 0;
  while (i < T.length && j < I.length) {
    const eq = T[i] === I[j] || levenshtein(T[i], I[j]) <= (T[i].length > 6 ? 1 : 0);
    if (eq) { out.push({w: T[i], t: "ok"}); hits++; i++; j++; }
    else if (dp[i + 1][j] >= dp[i][j + 1]) { out.push({w: T[i], t: "miss"}); i++; }
    else { out.push({w: I[j], t: "bad"}); j++; }
  }
  while (i < T.length) out.push({w: T[i++], t: "miss"});
  while (j < I.length) out.push({w: I[j++], t: "bad"});
  return {parts: out, score: T.length ? Math.round(100 * hits / T.length) : 0};
}
function diffHTML(parts) {
  return `<div class="diff">` + parts.map(p => `<span class="w-${p.t}">${esc(p.w)}</span>`).join(" ") + `</div>`;
}

// ---------- Contenido ----------
const CONTENT = {words: [], byWeek: {}, byId: {}, lookup: {}};
(function buildContent() {
  const seen = new Set();
  for (let w = 1; w <= 26; w++) {
    const list = [];
    (VOCAB[w] || "").trim().split("\n").forEach(line => {
      const [en, es, ex] = line.split("|").map(s => (s || "").trim());
      if (!en || !es) return;
      const id = (en + "::" + es).toLowerCase();
      if (seen.has(id)) return;
      seen.add(id);
      const e = {id, en, es, ex: ex || "", week: w};
      list.push(e); CONTENT.words.push(e); CONTENT.byId[id] = e;
      const k = en.toLowerCase();
      if (!CONTENT.lookup[k]) CONTENT.lookup[k] = e;
    });
    CONTENT.byWeek[w] = list;
  }
})();

function lookupWord(raw) {
  const w = raw.toLowerCase().replace(/[^a-z']/g, "");
  if (!w) return null;
  const L = CONTENT.lookup;
  const cands = [w, w.replace(/'s$/, ""), w.replace(/s$/, ""), w.replace(/es$/, ""), w.replace(/ies$/, "y"), w.replace(/ed$/, ""), w.replace(/ed$/, "e"), w.replace(/d$/, ""), w.replace(/ing$/, ""), w.replace(/ing$/, "e"), w.replace(/(.)\1ing$/, "$1"), w.replace(/(.)\1ed$/, "$1"), w.replace(/ier$/, "y"), w.replace(/iest$/, "y"), w.replace(/er$/, ""), w.replace(/est$/, ""), w.replace(/ly$/, "")];
  for (const c of cands) if (L[c]) return L[c];
  return null;
}

function weekOf(day) { return Math.ceil(day / 7); }
// Lectura del dia: dia 1 = lectura principal de la semana; dias 2 a 6 = lecturas extra (data/lecturas_*.js)
function readingFor(week, dw) {
  const r = dw >= 2 && dw <= 6 ? ((window.LECTURAS || {})[week] || [])[dw - 2] : null;
  if (!r) return WEEKS[week].lectura;
  const rand = rng(week * 1000 + dw * 37);
  return {titulo: r.t, texto: r.x, preguntas: r.q.map(([q, o, a], j) => {
    const opts = o.split("|");
    if (opts.length === 2 && /^(yes|no)( |,|$)/i.test(opts[0])) return {q, o: opts, a};
    const order = shuffle(opts.map((_, i) => i), rand); // mezcla las opciones para que la correcta no sea siempre la misma
    return {q, o: order.map(i => opts[i]), a: order.indexOf(a)};
  })};
}
function dowOf(day) { return ((day - 1) % 7) + 1; }
function phaseOf(week) { return FASES.find(f => week >= f.semanas[0] && week <= f.semanas[1]); }
function wordsForDay(day) {
  const w = weekOf(day), dw = dowOf(day);
  if (dw === 7) return [];
  const list = CONTENT.byWeek[w]; const size = Math.ceil(list.length / 6);
  return list.slice((dw - 1) * size, dw * size);
}
function cefrFor(day) {
  if (day <= 14) return "A0->A1"; if (day <= 35) return "A1"; if (day <= 56) return "A2";
  if (day <= 91) return "A2+ / B1-"; if (day <= 126) return "B1"; if (day <= 154) return "B1+"; return "B2";
}
function splitSentences(text) {
  return text.replace(/\n+/g, " ").match(/[^.!?]+[.!?]+["']?/g)?.map(s => s.trim()).filter(s => s.length > 3) || [text];
}

// Misiones de un dia
function dayPlan(day) {
  const week = weekOf(day), dw = dowOf(day), W = WEEKS[week], ph = phaseOf(week);
  const isExam = dw === 7, isCheckpoint = isExam && CHECKPOINTS.includes(week);
  const immMin = ph.n === 1 ? 20 : ph.n === 2 ? 30 : 45;
  const minWords = Math.round(W.escritura.min * (dw === 6 ? 1 : 0.6));
  const m = [];
  m.push({id: "srs", ic: "R", titulo: "Repaso espaciado", desc: "Repasa todas las tarjetas pendientes antes de aprender material nuevo.", xp: 20});
  if (!isExam) {
    const nw = wordsForDay(day).length;
    m.push({id: "vocab", ic: "*", titulo: `Vocabulario nuevo (${nw})`, desc: "Aprende las palabras del dia en contexto + mini-quiz.", xp: 30});
    m.push({id: "grammar", ic: "S", titulo: dw === 1 ? `Leccion: ${GRAMMAR[week].titulo}` : `Practica: ${GRAMMAR[week].titulo}`, desc: dw === 1 ? "Lee la leccion y haz los ejercicios (>=70%)." : "Ejercicios de la unidad + repaso de unidades anteriores (>=70%).", xp: 30});
    m.push({id: "listening", ic: "D", titulo: "Dictado", desc: "Escucha 10 frases y escribelas exactamente.", xp: 25});
    m.push({id: "speaking", ic: "P", titulo: "Pronunciacion y shadowing", desc: "Sonido dificil del dia + 8 frases para escuchar y repetir.", xp: 25});
    const R = readingFor(week, dw), listenFirst = dw === 4 || dw === 6;
    m.push({id: "reading", ic: "L", titulo: `Lectura: ${R.titulo}`, desc: listenFirst ? "Texto nuevo en modo escucha: primero escuchalo sin leer, luego leelo y responde." : "Texto nuevo: lee con audio, toca palabras para traducir y responde.", xp: 25, readingWeek: week, readingDw: dw, listenFirst});
    m.push({id: "writing", ic: "/", titulo: `Escritura (min. ${minWords} palabras)`, desc: dw === 6 || dw === 3 ? W.escritura.consigna : dailyWritingPrompt(day), xp: 30, minWords});
  } else {
    m.push({id: "exam", ic: "E", titulo: isCheckpoint ? `CHECKPOINT MENSUAL (semanas 1-${week})` : `Examen semana ${week}`, desc: `Vocabulario + gramatica + dictado. Aprobar con >=${PASS_EXAM}%.`, xp: isCheckpoint ? 200 : 100, checkpoint: isCheckpoint});
    m.push({id: "writing", ic: "/", titulo: `Reflexion semanal (min. ${Math.round(W.escritura.min * 0.5)} palabras)`, desc: "En ingles: que aprendiste esta semana?, que fue dificil?, que haras mejor la proxima?", xp: 30, minWords: Math.round(W.escritura.min * 0.5)});
  }
  const vd = videoOfDay(week, dw);
  m.push({id: "immersion", ic: "I", titulo: `Inmersion real (${isExam ? immMin + 15 : immMin} min)`, desc: vd ? `${vd.rewatch ? "Vuelve a ver" : "Clase del dia"}: ${vd.v.t} (${vd.v.min} min).` : (dw === 1 || isExam ? W.inmersion : dailyImmersion(day, ph.n)), xp: 20, minutes: isExam ? immMin + 15 : immMin});
  return {day, week, dw, isExam, isCheckpoint, W, ph, missions: m};
}

function dailyWritingPrompt(day) {
  const P = [
    "Escribe sobre tu dia de hoy usando al menos 5 palabras nuevas de hoy y la gramatica de la semana.",
    "Escribe 8 frases propias con las palabras nuevas de hoy (una por linea, cada una distinta).",
    "Describe una foto o video que hayas hecho recientemente: donde, cuando, que se ve, por que te gusta.",
    "Escribe un mensaje de WhatsApp a un amigo extranjero contandole tus novedades.",
    "Escribe sobre algo que te preocupa o te entusiasma esta semana."
  ];
  return P[day % P.length];
}
// Video del dia: cada semana tiene 4 clases (0 gramatica, 1 gramatica en espanol o complementaria, 2 vocabulario, 3 escucha)
const VIDEO_ORDER = [0, 2, 3, 1, 2, 3, 0];
// Dia 1: clase de gramatica de la semana. Dias 2 a 7: un video propio del dia (data/videos_dia.js), ligado a la lectura o al repaso
function videoOfDay(week, dw) {
  const L = (window.VIDEOS || {})[week] || [];
  const D = ((window.VIDEOS_DIA || {})[week] || [])[dw - 2];
  if (dw >= 2 && D) return {v: D, idx: -1, rewatch: false, daily: true};
  if (!L.length) return null;
  const i = dw === 1 ? 0 : VIDEO_ORDER[(dw - 1) % 7];
  return {v: L[i] || L[0], idx: i, rewatch: false};
}
const ytUrl = id => "https://www.youtube.com/watch?v=" + encodeURIComponent(id);
const ytSearch = q => "https://www.youtube.com/results?search_query=" + encodeURIComponent(q);
function dailyImmersion(day, phase) {
  const T = {
    1: ["Mira un video corto para principiantes (BBC Learning English / Easy English) y repite frases en voz alta.", "Escucha 2 canciones en ingles leyendo la letra (busca 'lyrics') y canta encima.", "Mira un capitulo de dibujos animados en ingles con subtitulos en ingles."],
    2: ["Escucha un episodio de podcast para estudiantes (6 Minute English, Luke's English Podcast).", "Mira tu serie elegida en ingles con subtitulos en ingles.", "Mira un vlog de viajes en ingles y anota 5 expresiones naturales."],
    3: ["Mira tu serie en ingles; intenta 10 minutos SIN subtitulos.", "Escucha un podcast nativo (no para estudiantes) mientras caminas o editas.", "Mira un video de Kurzgesagt / Vox / TED y resume la idea en voz alta en 1 minuto."]
  };
  const list = T[phase]; return list[day % list.length];
}

// ---------- Estado ----------
const DEFAULT_STATE = () => ({
  version: 1, startDate: todayISO(), currentDay: 1, xp: 0,
  days: {}, cards: {}, activity: {}, journal: {}, exams: {},
  stats: {dictOk: 0, dictTotal: 0, speechSum: 0, speechN: 0, gramOk: 0, gramTotal: 0},
  settings: {voice: "", rate: 0.9, autoplay: true}
});
let S = DEFAULT_STATE();
let saveTimer = null, lastInteraction = Date.now();

// Modo local (servidor Python en el PC) o nube (Artifact de claude.ai con db, sincroniza PC y celular)
// WEB = pagina publica (GitHub Pages): guarda en el dispositivo y permite microfono
const WEB = /github\.io$/.test(location.hostname) || /[?&]web(=|&|$)/.test(location.search);
const CLOUD = !WEB && !/^(127\.0\.0\.1|localhost)$/.test(location.hostname);
let DB = null, lastSaved = {}, writing = false, pending = false, lastSyncAt = 0, dirty = false;

function applyState(data) {
  S = Object.assign(DEFAULT_STATE(), data, {settings: Object.assign(DEFAULT_STATE().settings, data.settings || {}), stats: Object.assign(DEFAULT_STATE().stats, data.stats || {})});
}
// Tarjetas comprimidas en 3 documentos (uno por fase) para respetar el limite de 256 KiB por documento
function cardsPart(n) {
  const out = {};
  for (const [id, c] of Object.entries(S.cards)) {
    const w = CONTENT.byId[id]?.week || 1, p = w <= 8 ? 1 : w <= 18 ? 2 : 3;
    if (p === n) out[id] = [Math.round(c.ease * 100) / 100, c.iv, c.reps, c.lapses, Math.round(c.due / 1000), c.added || ""];
  }
  return {c: out};
}
function unpackCards(doc) {
  const out = {};
  for (const [id, a] of Object.entries(doc?.c || {})) out[id] = {ease: a[0], iv: a[1], reps: a[2], lapses: a[3], due: a[4] * 1000, added: a[5]};
  return out;
}
function cloudDocs() {
  const {cards, journal, ...rest} = S;
  const docs = {"progreso/principal": rest, "progreso/tarjetas1": cardsPart(1), "progreso/tarjetas2": cardsPart(2), "progreso/tarjetas3": cardsPart(3)};
  for (const [d, j] of Object.entries(S.journal)) docs["diario/d" + d] = {day: +d, ...j};
  return docs;
}
async function cloudLoad() {
  const [m, c1, c2, c3, dj] = await Promise.all([DB.doc("progreso/principal").get(), DB.doc("progreso/tarjetas1").get(), DB.doc("progreso/tarjetas2").get(), DB.doc("progreso/tarjetas3").get(), DB.collection("diario").get()]);
  if (!m.exists) return false;
  const data = {...m.data(), cards: {...unpackCards(c1.data()), ...unpackCards(c2.data()), ...unpackCards(c3.data())}, journal: {}};
  dj.docs.forEach(d => { const {day, ...j} = d.data(); data.journal[day] = j; });
  applyState(data);
  lastSaved = {}; for (const [p, v] of Object.entries(cloudDocs())) lastSaved[p] = JSON.stringify(v);
  lastSyncAt = S.updatedAt || 0;
  return true;
}
function withTimeout(p, ms) { return Promise.race([Promise.resolve(p), new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), ms))]); }
async function loadState() {
  let data = null;
  if (CLOUD) {
    DB = window.claude && window.claude.use ? await withTimeout(window.claude.use("db"), 8000).catch(() => null) : null;
    if (DB) { try { if (await withTimeout(cloudLoad(), 15000)) return; } catch (e) { console.warn("db", e); } }
  } else if (!WEB) {
    try { const r = await fetch("/api/state"); if (r.ok) data = await r.json(); } catch (e) {}
  }
  if (!data || !data.version) { try { data = JSON.parse(localStorage.getItem("ingles_state") || "null"); } catch (e) {} }
  if ((!data || !data.version) && WEB && window.SEED_STATE) data = window.SEED_STATE;
  if (data && data.version) applyState(data);
  if (WEB && typeof SYNC !== "undefined") await SYNC.pullOnStart();
}
function setSaveLabel(t, cls = "") { const el = $("#saveState"); if (el) { el.textContent = "*  " + t; el.className = "save-state " + cls; } }
async function flushCloud() {
  if (writing) { pending = true; return; }
  writing = true;
  try {
    do {
      pending = false; dirty = false;
      S.updatedAt = Date.now();
      const docs = cloudDocs();
      for (const [p, v] of Object.entries(docs)) {
        const js = JSON.stringify(v);
        if (p !== "progreso/principal" && lastSaved[p] === js) continue;
        await DB.doc(p).set(v); lastSaved[p] = js;
      }
      lastSyncAt = S.updatedAt;
    } while (pending);
    setSaveLabel("guardado en la nube");
  } catch (e) { setSaveLabel("error al guardar (" + (e.code || "red") + ")", "err"); }
  writing = false;
}
function save() {
  dirty = true;
  setSaveLabel("guardando...", "saving");
  clearTimeout(saveTimer);
  saveTimer = setTimeout(async () => {
    if (WEB) S.updatedAt = Date.now();
    const body = JSON.stringify(S);
    try { localStorage.setItem("ingles_state", body); } catch (e) {}
    if (WEB) { let ok = true; try { localStorage.setItem("ingles_state", body); } catch (e) { ok = false; } if (!ok) return setSaveLabel("no se pudo guardar", "err"); if (typeof SYNC !== "undefined" && SYNC.enabled()) return SYNC.pushSoon(); return setSaveLabel("guardado en este dispositivo"); }
    if (CLOUD) { if (DB) return flushCloud(); return setSaveLabel("sin nube (solo este dispositivo)", "err"); }
    try {
      const r = await fetch("/api/state", {method: "POST", headers: {"Content-Type": "application/json"}, body});
      if (!r.ok) throw new Error(r.status);
      setSaveLabel("guardado");
    } catch (e) { setSaveLabel("sin servidor (copia local)", "err"); }
  }, 1200);
}
// Al volver a la app (p. ej. tras usarla en el otro dispositivo) trae el progreso mas reciente
document.addEventListener("visibilitychange", async () => {
  if (!CLOUD || !DB) return;
  if (document.visibilityState === "hidden") { if (dirty) { clearTimeout(saveTimer); flushCloud(); } return; }
  try {
    const m = await DB.doc("progreso/principal").get();
    if (m.exists && (m.data().updatedAt || 0) > lastSyncAt && !writing) { await cloudLoad(); refreshSide(); if (typeof go === "function") go("hoy"); toast("Progreso sincronizado"); }
  } catch (e) {}
});
function act() { const t = todayISO(); return S.activity[t] || (S.activity[t] = {xp: 0, min: 0, missions: 0}); }
function addXP(n) { S.xp += n; act().xp += n; refreshSide(); }
function dayState(d) { return S.days[d] || (S.days[d] = {missions: {}, completed: false}); }

function completeMission(day, id, extra = {}) {
  const ds = dayState(day); const plan = dayPlan(day); const mis = plan.missions.find(m => m.id === id);
  const first = !ds.missions[id];
  ds.missions[id] = Object.assign({done: true, date: todayISO()}, extra);
  if (first && mis) { addXP(day === S.currentDay ? mis.xp : Math.round(mis.xp / 3)); act().missions++; }
  if (!ds.completed && plan.missions.every(m => ds.missions[m.id])) {
    ds.completed = true; ds.date = todayISO();
    addXP(50);
    if (day === S.currentDay && S.currentDay < TOTAL_DAYS) S.currentDay++;
    else if (day === TOTAL_DAYS) S.finished = todayISO();
    save(); celebrate(`Dia ${day} completado! +50 XP bonus`);
    return true;
  }
  save(); return false;
}

function streak() {
  let s = 0, d = todayISO();
  const has = iso => S.activity[iso] && S.activity[iso].missions > 0;
  if (!has(d)) d = addDaysISO(d, -1);
  while (has(d)) { s++; d = addDaysISO(d, -1); }
  return s;
}
function level() { return Math.floor(Math.sqrt(S.xp / 60)) + 1; }
function completedDays() { return Object.values(S.days).filter(d => d.completed).length; }
function progress100() { return Math.min(100, Math.round(completedDays() / TOTAL_DAYS * 1000) / 10); }

// ---------- SRS (SM-2 simplificado) ----------
function addCards(entries) {
  const due = Date.now() + 20 * 3600 * 1000;
  entries.forEach(e => { if (!S.cards[e.id]) S.cards[e.id] = {ease: 2.5, iv: 0, reps: 0, lapses: 0, due, added: todayISO()}; });
}
function dueCards() {
  const now = Date.now();
  return Object.entries(S.cards).filter(([id, c]) => c.due <= now && CONTENT.byId[id]).map(([id]) => id);
}
function gradeCard(id, g) { // g: 0 otra vez, 1 dificil, 2 bien, 3 facil
  const c = S.cards[id]; const DAY = 86400000;
  if (g === 0) { c.lapses++; c.reps = 0; c.iv = 0; c.ease = Math.max(1.3, c.ease - 0.2); c.due = Date.now() + 10 * 60000; return; }
  if (g === 1) { c.iv = Math.max(1, Math.round((c.iv || 1) * 1.2)); c.ease = Math.max(1.3, c.ease - 0.15); }
  if (g === 2) { c.iv = c.reps === 0 ? 1 : c.reps === 1 ? 3 : Math.round(c.iv * c.ease); }
  if (g === 3) { c.iv = c.reps === 0 ? 3 : Math.round(Math.max(c.iv, 1) * c.ease * 1.3); c.ease += 0.15; }
  c.reps++; c.due = Date.now() + c.iv * DAY - 3 * 3600000; // margen de 3 h para repasar el mismo horario
}
function learnedCount() { return Object.keys(S.cards).length; }
function matureCount() { return Object.values(S.cards).filter(c => c.iv >= 21).length; }

// ---------- Voz ----------
let VOICES = [];
const HAS_TTS = typeof window.speechSynthesis !== "undefined" && typeof window.SpeechSynthesisUtterance !== "undefined";
function stopSpeech() { try { if (HAS_TTS) speechSynthesis.cancel(); } catch (e) {} }
function loadVoices() { try { VOICES = speechSynthesis.getVoices().filter(v => /^en(-|_)/i.test(v.lang)); } catch (e) { VOICES = []; } }
if (HAS_TTS) { loadVoices(); try { speechSynthesis.addEventListener("voiceschanged", loadVoices); } catch (e) { speechSynthesis.onvoiceschanged = loadVoices; } }
function pickVoice() {
  if (S.settings.voice) { const v = VOICES.find(v => v.name === S.settings.voice); if (v) return v; }
  return VOICES.find(v => /natural/i.test(v.name) && /en-US/i.test(v.lang)) || VOICES.find(v => /en-US/i.test(v.lang)) || VOICES[0];
}
function speak(text, rate, onend) {
  if (!HAS_TTS) return;
  if (!VOICES.length) loadVoices();
  const busy = speechSynthesis.speaking || speechSynthesis.pending;
  stopSpeech();
  const u = new SpeechSynthesisUtterance(text);
  const v = pickVoice(); if (v) { u.voice = v; u.lang = v.lang; } else u.lang = "en-US";
  u.rate = rate || S.settings.rate;
  if (onend) u.onend = onend;
  // Safari en iOS pierde la frase si speak() va justo despues de cancel()
  if (busy) setTimeout(() => { try { speechSynthesis.speak(u); } catch (e) {} }, 80);
  else { try { speechSynthesis.speak(u); } catch (e) {} }
  return u;
}
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
function listen(onResult, onError) {
  if (!SR) { onError && onError("no-sr"); return null; }
  const r = new SR(); r.lang = "en-US"; r.interimResults = false; r.maxAlternatives = 3;
  r.onresult = e => { const alts = [...e.results[0]].map(a => a.transcript); onResult(alts); };
  r.onerror = e => onError && onError(e.error);
  r.start(); return r;
}

// ---------- UI global ----------
function toast(msg) { const t = $("#toast"); t.textContent = msg; t.classList.add("show"); clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove("show"), 2600); }
function celebrate(msg) {
  toast(msg);
  const c = document.createElement("div"); c.className = "confetti";
  const cols = ["#22c55e", "#60a5fa", "#f472b6", "#facc15", "#fb923c"];
  for (let i = 0; i < 90; i++) { const p = document.createElement("i"); p.style.left = Math.random() * 100 + "vw"; p.style.background = cols[i % 5]; p.style.animationDelay = Math.random() * 0.8 + "s"; p.style.animationDuration = 2 + Math.random() * 1.5 + "s"; c.appendChild(p); }
  document.body.appendChild(c); setTimeout(() => c.remove(), 4500);
}
function refreshSide() {
  $("#sStreak").textContent = streak(); $("#sXp").textContent = S.xp; $("#sWords").textContent = learnedCount();
  const n = dueCards().length; $("#dueBadge").textContent = n || "";
}

// Seguimiento de tiempo activo
["click", "keydown", "mousemove"].forEach(ev => addEventListener(ev, () => lastInteraction = Date.now(), {passive: true}));
setInterval(() => {
  if (document.visibilityState === "visible" && Date.now() - lastInteraction < 120000) { act().min = Math.round((act().min + 0.5) * 10) / 10; if (Math.round(act().min * 2) % (CLOUD ? 10 : 4) === 0) save(); }
}, 30000);
