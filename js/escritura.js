// Revisor automatico de escritura: valida oraciones reales, vocabulario y gramatica de la semana,
// variedad de palabras y errores tipicos del hispanohablante. La mision solo se completa si se cumple todo.
"use strict";

const W_IRREG = ("be was were been am is are have has had do does did done go goes went gone get got gotten make made take took taken see saw seen come came " +
  "know knew known think thought give gave given find found tell told say said become became leave left feel felt bring brought begin began begun keep kept " +
  "hold held write wrote written stand stood hear heard let mean meant set meet met run ran pay paid sit sat speak spoke spoken lie lay lead led read grow grew grown " +
  "lose lost fall fell fallen send sent build built understand understood draw drew drawn break broke broken spend spent cut rise rose rose drive drove driven buy bought " +
  "wear wore worn choose chose chosen eat ate eaten drink drank drunk sleep slept swim swam swum fly flew flown forget forgot forgotten sing sang sung teach taught " +
  "catch caught fight fought sell sold win won throw threw thrown ride rode ridden steal stole stolen hide hid hidden wake woke woken shake shook shaken bite bit bitten " +
  "put hurt cost shut hit quit can could will would shall should may might must ought").split(" ");
const W_VERBS = ("live work play study like love hate want need help call watch listen look walk talk cook clean travel visit start finish stop try use open close " +
  "move stay wait ask answer arrive enjoy prefer decide plan hope learn change happen remember believe agree carry cry follow improve include join laugh miss order " +
  "pass practice prepare rain relax rent save share smile snow touch turn wash wish worry dance jump kill kiss marry offer paint pick print push rest shop shout " +
  "check climb collect create describe design develop discover edit explain film fix hike hire invite manage mention notice phone post produce record reply return " +
  "film photograph protect publish recommend recycle reduce repeat search seem show solve support suggest teach thank text train translate upload vote win wonder " +
  "book borrow lend count dream drop fill hurry kick knock land last lock mark matter mix name need own park pray print pull reach reach realize receive rescue " +
  "brush burn complain cover deliver destroy enter expect fail fit guess imagine increase interview introduce iron mind obey pause plant prefer promise rescue sign " +
  "smell sound spell suffer surprise taste test trust type wonder worry exercise feed bake fry boil grill cancel celebrate check connect contact continue cycle").split(" ");
const W_FUNC = ("i you he she it we they me him her us them my your his its our their mine yours hers ours theirs this that these those a an the and or but because so " +
  "if when while although though however then also too very really not no yes there here what where who whom whose which why how all some any many much more most " +
  "few little lot lots of in on at to from for with without about after before during since until by into onto over under between behind near next opposite up down " +
  "out off again always usually often sometimes never rarely ever already yet just still only every each other another than as like one two three first last " +
  "today tomorrow yesterday now later soon ago week month year day night morning afternoon evening time people person thing things way good bad big small new old").split(" ");
const W_ES = new Set(("que el la los las del por para con una unos unas pero porque como mas muy tambien yo tu ella ellos nosotros es son esta estan estoy soy eres " +
  "tengo tiene tienen hay donde cuando quien este esta estos estas ese esa eso mucho muchos poco nada algo todo todos siempre nunca ahora hoy ayer manana bien mal " +
  "casa trabajo amigo amigos familia padre madre hermano hermana dia noche semana quiero puedo hacer hago fue era").split(" "));

let _vocabSet = null, _verbSet = null;
function writingSets() {
  if (_verbSet) return;
  const verbs = new Set(W_IRREG);
  const addForms = v => {
    if (!/^[a-z]+$/.test(v)) return;
    verbs.add(v);
    verbs.add(/(s|sh|ch|x|o)$/.test(v) ? v + "es" : /[^aeiou]y$/.test(v) ? v.slice(0, -1) + "ies" : v + "s");
    verbs.add(/e$/.test(v) ? v + "d" : /[^aeiou]y$/.test(v) ? v.slice(0, -1) + "ied" : v + "ed");
    verbs.add(/ie$/.test(v) ? v.slice(0, -2) + "ying" : /[^e]e$/.test(v) ? v.slice(0, -1) + "ing" : v + "ing");
    if (/^[^aeiou]*[aeiou][bdgmnprt]$/.test(v)) { verbs.add(v + v.slice(-1) + "ed"); verbs.add(v + v.slice(-1) + "ing"); }
  };
  W_VERBS.forEach(addForms); W_IRREG.forEach(addForms);
  // Verbos del vocabulario del plan: entradas cuya traduccion es un infinitivo en espanol
  CONTENT.words.forEach(e => { if (/(ar|er|ir)(se)?( |$|\/|,|\()/.test(e.es)) { const b = e.en.replace(/^to /, "").split(/[ /(]/)[0].toLowerCase(); addForms(b); } });
  _verbSet = verbs;
  _vocabSet = new Set([...W_FUNC, ...verbs]);
  CONTENT.words.forEach(e => e.en.toLowerCase().split(/[^a-z']+/).forEach(w => w && _vocabSet.add(w)));
}

// Gramatica de cada unidad: cuenta usos (texto en minusculas, contracciones expandidas)
const PART = "(\\w+ed|been|done|gone|seen|taken|given|written|eaten|known|made|had|got|gotten|found|told|said|bought|brought|thought|left|lost|met|read|heard|felt|kept|sent|spent|built|broken|chosen|driven|flown|forgotten|won|sold|paid|put|run|come|become|begun|drunk|swum|sung|stolen|worn|ridden|woken|fallen|grown|drawn|thrown|understood|taught|caught)";
const GRAM_RX = {
  1: [/\b(am|is|are)\b/g], 2: [/\b(my|your|his|her|our|their|its)\b/g, /'s\b/g, /\b(this|that|these|those)\b/g],
  3: [/\b(i|you|we|they|he|she|it)\s+(usually\s+|always\s+|often\s+|never\s+|sometimes\s+)?(\w+s|\w+)\b(?!\s+(ing))/g],
  4: [/\b(do|does) not\b/g, /\b(do|does)\s+(i|you|he|she|it|we|they)\b/g, /\b(some|any)\b/g],
  5: [/\bthere (is|are|was|were)\b/g, /\b(next to|between|behind|in front of|opposite|under|near)\b/g],
  6: [/\b(can|could)( not)? \w+/g, /\b(always|usually|often|sometimes|never|rarely|hardly ever)\b/g, /\b(like|love|hate|enjoy|prefer)\s+\w+ing\b/g],
  7: [/\b(am|is|are)\s+(not\s+)?\w+ing\b/g], 8: [/\b(was|were)\b/g, /\b\w{2,}ed\b/g],
  9: [/\bdid\b/g, /\b(went|saw|took|ate|bought|met|made|had|got|came|found|left|lost|gave|told|said|wrote|drove|flew|slept|spent|thought|felt|knew|began|swam|drank|ran|sat|stood)\b/g],
  10: [/\b\w+er than\b/g, /\bmore \w+ than\b/g, /\bthe (most \w+|\w+est|best|worst)\b/g, /\b(better|worse) than\b/g, /\bas \w+ as\b/g],
  11: [/\bgoing to\b/g, /\bwill\b/g], 12: [/\b(should|must|have to|has to|had to)\b/g],
  13: [new RegExp("\\b(have|has)\\s+(just\\s+|already\\s+|never\\s+|ever\\s+|not\\s+)?" + PART + "\\b", "g")],
  14: [new RegExp("\\b(have|has)\\s+(just\\s+|already\\s+|never\\s+|not\\s+)?" + PART + "\\b", "g"), /\b(for|since)\b/g],
  15: [/\b(was|were)\s+\w+ing\b/g, new RegExp("\\bhad\\s+(already\\s+|never\\s+|just\\s+)?" + PART + "\\b", "g")],
  16: [/\b(much|many|a lot of|lots of|a few|a little|few|little|too|enough)\b/g],
  17: [/\b(if|unless|when|as soon as)\b[^.!?]*\bwill\b/g, /\bif\b[^.!?]*\b(is|are|am|do|does|\w+s)\b[^.!?]*\b(will|can|must|should)\b/g, /\bunless\b/g],
  18: [/\b(enjoy|avoid|finish|mind|stop|keep|suggest|miss|consider|imagine)\s+\w+ing\b/g, /\b(want|decide|decided|hope|plan|need|would like|promise|agree|learn|try|forget)\s+to\s+\w+/g],
  19: [new RegExp("\\b(is|are|was|were|be|been|being)\\s+" + PART + "\\b", "g")], 20: [/\bif\b[^.!?]*\b(would|could)\b/g, /\bwish\b/g],
  21: [/\b(who|which|whose|where)\b/g, /\b\w+ that \w+/g], 22: [/\b(said|told|asked)\b/g],
  23: [/\bwill be \w+ing\b/g, new RegExp("\\bwill have " + PART + "\\b", "g"), /\b(must|might|may|could|can not)\s+(be|have)\b/g],
  24: [/\b(would|should|could) have\b/g, /\b(although|however|despite|in my opinion|on the other hand|even though|moreover|in conclusion)\b/g],
  25: [/\bused to\b/g, /\b(get|got|getting|be|am|is|are|was|were) used to\b/g, /\b(\w+)\s+(up|out|off|down|on|back|over)\b/g],
  26: [/\b(have|has) been\b/g, /\b(was|were)\s+\w+ing\b/g, /\bwould\b/g, /\bwill\b/g, /\bif\b/g, /\b(who|which|where)\b/g]
};
function grammarUses(week, low) {
  const rx = GRAM_RX[week] || [];
  let n = 0;
  rx.forEach(r => { r.lastIndex = 0; n += (low.match(r) || []).length; });
  return n;
}

// Errores tipicos del hispanohablante (bloquean hasta corregirlos)
const AUX_BEFORE = /\b(does|did|do|can|could|will|would|should|must|might|may|to|not|does not|did not|let|make|help)\s*$/;
function typicalErrors(text) {
  const t = " " + text.toLowerCase().replace(/[\u2019\u2018]/g, "'").replace(/\s+/g, " ") + " ";
  const out = [];
  const add = (re, msg) => { const m = t.match(re); if (m) out.push({found: m[0].trim(), msg}); };
  add(/\bi('m| am) agree\b/, 'Se dice "I agree" (sin am).');
  add(/\bpeople is\b/, 'People es plural: "people are".');
  add(/\bmore (better|worse|bigger|smaller|easier|cheaper|faster|older|younger|taller)\b/, 'No uses "more" con comparativos en -er: "better", no "more better".');
  add(/\bmore (good|bad)\b/, 'Comparativo irregular: "better" / "worse".');
  add(/\bi have (\d+|[a-z]+(-[a-z]+)?) years( old)?\b(?! of)/, 'La edad va con be: "I am 30 (years old)", no "I have 30 years".');
  add(/\bdepends of\b/, 'Se dice "depends on".');
  add(/\bexplain (me|him|her|us|them)\b/, 'Se dice "explain to me", no "explain me".');
  add(/\b(must|can|should|could|might|will|would) to \w+/, 'Despues de un modal no va "to": "I can go", no "I can to go".');
  add(/\b(doesn't|does not|didn't|did not) (\w+ed|has|goes|does|went|saw|was|were|likes|wants|works|lives)\b/, 'Despues de does/did el verbo va en forma base: "doesn\'t like", "didn\'t go".');
  add(/\bdid (you|he|she|it|we|they|i) (\w+ed|went|saw|ate|took|made|had|got|came|bought)\b/, 'En preguntas con did el verbo va en base: "Did you go?", no "Did you went?".');
  add(/\b(in) (monday|tuesday|wednesday|thursday|friday|saturday|sunday)s?\b/, 'Con dias se usa "on": "on Monday".');
  add(/\bsince (\d+|two|three|four|five|six|seven|eight|nine|ten|many|a few) (years|months|weeks|days|hours)\b/, 'Para duracion se usa "for": "for three years" ("since" es para un punto: since 2020).');
  add(/ a (apple|orange|hour|honest|umbrella|egg|idea|island|office|old|interesting|important|engineer|artist|actor|amazing|incredible|ugly|elephant)\b/, 'Antes de sonido vocal va "an": "an apple", "an hour".');
  add(/ an (car|house|dog|cat|book|big|small|good|new|university|uniform|useful|european|one)\b/, 'Antes de sonido consonante va "a": "a car", "a university".');
  add(/\b(he|she|it) (don't|do not)\b/, 'Tercera persona: "he doesn\'t", no "he don\'t".');
  add(/\bthe (life|nature|love|money|society) (is|are)\b/, 'En general, sin "the": "Life is...", "Money is...".');
  add(/\bi am disagree\b/, 'Se dice "I disagree".');
  add(/\bmake (a )?(photo|photos|picture|pictures)\b/, 'Se dice "take a photo", no "make a photo".');
  add(/\bis (very )?(important|necessary|possible) (that )?(learn|study|go|have|do|practice)\b/, 'Falta "to": "It is important to learn".');
  add(/\b(you|we|they) (is|was)\b|\bi is\b/, 'Concordancia: "I am / you are / we were...".');
  add(/\b(he|she|it) (are|were)\b/, 'Concordancia: "he is / she was".');
  // Tercera persona sin -s: "she have", "he go", "it work" (si no hay auxiliar antes)
  const re3 = /\b(he|she|it)\s+(have|go|do|want|like|need|live|work|play|study|watch|make|know|think|say|get|take)\b/g;
  let m;
  while ((m = re3.exec(t))) { if (!AUX_BEFORE.test(t.slice(0, m.index))) { out.push({found: m[0], msg: `Tercera persona en presente lleva -s: "${m[1]} ${m[2] === "have" ? "has" : m[2] === "do" ? "does" : m[2] === "go" ? "goes" : m[2] === "study" ? "studies" : m[2] === "watch" ? "watches" : m[2] + "s"}".`}); break; } }
  return out;
}

// Analiza un texto y devuelve requisitos cumplidos / pendientes
function analyzeWriting(text, ctx) {
  writingSets();
  const minLen = ctx.week <= 8 ? 4 : ctx.week <= 18 ? 5 : 6;
  const copied = ctx.copied || new Set();
  const raw = text.replace(/[ \t]+/g, " ").trim();
  // Cada linea puede tener varias oraciones; el final de linea tambien cierra una oracion
  const parts = [].concat(...raw.split(/\n+/).map(line => line.match(/[^.!?]+[.!?]*/g) || []));
  const seen = new Set();
  const sentences = parts.map(p => p.trim()).filter(p => /[A-Za-z]/.test(p)).map(s => {
    const orig = s.match(/[A-Za-z']+/g) || [];
    const ws = orig.map(w => w.toLowerCase());
    const low = normalize(s);
    let reason = "";
    const es = ws.filter(w => W_ES.has(w) && !_vocabSet.has(w)).length;
    const known = ws.filter((w, i) => (i > 0 && /^[A-Z]/.test(orig[i])) || _vocabSet.has(w) || _vocabSet.has(w.replace(/'s$/, "")) || _vocabSet.has(w.replace(/(s|es|ed|ing|ly|er|est)$/, "")) || _vocabSet.has(w.replace(/ie[sd]$/, "y"))).length;
    if (ws.length < minLen) reason = `muy corta (minimo ${minLen} palabras)`;
    else if (es >= 2 || (ws.length && known / ws.length < 0.5)) reason = "no parece ingles";
    else if (!ws.some(w => _verbSet.has(w) || /^\w+'(m|re|s|ve|ll|d)$/.test(w) || /n't$/.test(w))) reason = "no tiene verbo";
    else if (seen.has(low)) reason = "repetida";
    else if (copied.has(low)) reason = "copiada de un ejemplo (escribela con tus palabras)";
    else if (!/^["'(]?[A-Z]/.test(s)) reason = "debe empezar con mayuscula";
    seen.add(low);
    return {s, ok: !reason, reason, n: ws.length};
  });
  const valid = sentences.filter(x => x.ok);
  const validWords = valid.reduce((a, x) => a + x.n, 0);
  const allWords = (raw.match(/[A-Za-z']+/g) || []).map(w => w.toLowerCase());
  const unique = new Set(allWords).size;
  const variety = allWords.length ? unique / allWords.length : 0;
  const lowAll = " " + normalize(valid.map(x => x.s).join(" ")) + " ";
  const usedVocab = ctx.vocab.filter(v => lowAll.includes(" " + normalize(v) + " "));
  const gUses = grammarUses(ctx.week, lowAll);
  const errs = typicalErrors(raw);
  const checks = [
    {ok: validWords >= ctx.minWords, label: `Palabras en oraciones validas: ${validWords} / ${ctx.minWords}`},
    {ok: valid.length >= ctx.minSent, label: `Oraciones validas: ${valid.length} / ${ctx.minSent}`},
    ctx.vocab.length ? {ok: usedVocab.length >= ctx.minVocab, label: `Palabras nuevas de hoy usadas: ${usedVocab.length} / ${ctx.minVocab}`} : null,
    {ok: gUses >= ctx.minGram, label: `Gramatica de la semana ("${GRAMMAR[ctx.week].titulo}") usada: ${Math.min(gUses, 99)} / ${ctx.minGram}`},
    {ok: allWords.length < 30 || variety >= 0.45, label: `Variedad de palabras: ${Math.round(variety * 100)}% (minimo 45%, no repitas lo mismo)`},
    {ok: !errs.length, label: errs.length ? `Errores tipicos por corregir: ${errs.length}` : "Sin errores tipicos detectados"}
  ].filter(Boolean);
  return {checks, sentences, errs, usedVocab, ok: checks.every(c => c.ok)};
}
