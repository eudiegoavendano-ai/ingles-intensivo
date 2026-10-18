// Corrector con Claude: en la version de claude.ai usa la cuenta de Claude del usuario (capacidad "sample").
// En la version web (GitHub) copia el texto y abre el corrector en claude.ai.
"use strict";
const CORRECTOR_URL = "https://claude.ai/artifact/LGS8QvKVBnQaeUWNi1N5P5";
let _samplePromise = null;
function getSample() {
  if (!_samplePromise) _samplePromise = (window.claude && window.claude.use) ? window.claude.use("sample").catch(() => null) : Promise.resolve(null);
  return _samplePromise;
}
const SAMPLE_MSG = {
  not_granted: "No diste permiso para usar Claude en esta pagina. Recarga y acepta el aviso para corregir.",
  sampling_disabled: "Claude no esta disponible para esta cuenta.",
  rate_limited: "Llegaste al limite de uso por ahora. Intenta en un rato.",
  session_expired: "Tu sesion de claude.ai expiro. Vuelve a iniciar sesion.",
  invalid_json: "Claude respondio en un formato inesperado. Presiona Corregir otra vez.",
  refused: "Claude no pudo corregir este texto. Revisa que este en ingles.",
  prompt_too_large: "El texto es demasiado largo. Corrige una parte a la vez."
};

function correctionPrompt(text, info) {
  return `Eres mi profesor personal de ingles. Soy hispanohablante (Chile), nivel aproximado ${info.level}, dia ${info.day} de un plan intensivo de 6 meses. ` +
    `Esta semana estudio la gramatica: "${info.grammar}".\nConsigna del ejercicio: ${info.prompt}\n\nMi texto:\n"""\n${text.slice(0, 6000)}\n"""\n\n` +
    `Corrige mi texto con exigencia (como un profesor de ingles para el nivel indicado). Responde SOLO con un objeto JSON con esta forma exacta:\n` +
    `{"nota": numero del 1 al 10, "nivel": "nivel CEFR estimado del texto, ej A2", "resumen": "2 frases en espanol sobre como esta el texto", ` +
    `"corregido": "mi texto completo corregido en ingles", "errores": [{"original": "fragmento con error", "correccion": "fragmento corregido", "explicacion": "explicacion breve en espanol"}], ` +
    `"top3": ["los 3 errores mas importantes que debo dejar de cometer, en espanol"], "nativo": [{"original": "una frase mia", "nativa": "como la diria un nativo"}], ` +
    `"gramatica_semana": "en espanol: si use bien la gramatica de la semana y como mejorarla", "siguiente": "en espanol: una cosa concreta para subir de nivel"}\n` +
    `Incluye maximo 15 errores y 2 frases en "nativo". Si el texto no esta en ingles o no cumple la consigna, dilo en "resumen" y pon una nota baja.`;
}

function correctionHTML(r) {
  const color = r.nota >= 8 ? "var(--accent)" : r.nota >= 5 ? "var(--yellow)" : "var(--red)";
  const list = a => Array.isArray(a) ? a : [];
  return `<div class="row" style="align-items:center;gap:14px"><div class="big-score" style="color:${color}">${esc(String(r.nota ?? "-"))}/10</div><div><b>Nivel estimado: ${esc(r.nivel || "-")}</b><div class="mute">${esc(r.resumen || "")}</div></div></div>
    ${r.corregido ? `<h3 style="margin-top:14px">Texto corregido</h3><div class="card" style="white-space:pre-wrap">${esc(r.corregido)}</div>` : ""}
    ${list(r.errores).length ? `<h3 style="margin-top:14px">Errores (${list(r.errores).length})</h3><table class="tbl"><tr><th>Tu texto</th><th>Correccion</th><th>Por que</th></tr>${list(r.errores).map(e => `<tr><td style="color:var(--red)">${esc(e.original || "")}</td><td style="color:var(--accent)">${esc(e.correccion || "")}</td><td class="mute">${esc(e.explicacion || "")}</td></tr>`).join("")}</table>` : ""}
    ${list(r.top3).length ? `<h3 style="margin-top:14px">Tus 3 errores clave</h3>${list(r.top3).map(t => `<div>- ${esc(t)}</div>`).join("")}` : ""}
    ${list(r.nativo).length ? `<h3 style="margin-top:14px">Como lo diria un nativo</h3>${list(r.nativo).map(n => `<div style="margin:6px 0"><span class="mute">${esc(n.original || "")}</span><br><b>${esc(n.nativa || "")}</b></div>`).join("")}` : ""}
    ${r.gramatica_semana ? `<div class="note" style="margin-top:12px"><b>Gramatica de la semana:</b> ${esc(r.gramatica_semana)}</div>` : ""}
    ${r.siguiente ? `<div class="note"><b>Siguiente paso:</b> ${esc(r.siguiente)}</div>` : ""}`;
}

// Corrige y muestra el resultado en el elemento box. Devuelve el resultado o null.
async function runClaudeCorrection(text, info, box, btn) {
  const sample = await getSample();
  if (!sample) { box.innerHTML = `<p class="mute">Claude no esta disponible en esta vista.</p>`; return null; }
  if ((text.match(/[A-Za-z']+/g) || []).length < 5) { toast("Escribe al menos unas frases antes de corregir"); return null; }
  btn.disabled = true; box.innerHTML = `<p class="mute">Claude esta corrigiendo tu texto... (puede tardar hasta un minuto)</p>`;
  try {
    const r = await sample.json(correctionPrompt(text, info));
    if (!r || typeof r !== "object") throw {code: "invalid_json"};
    box.innerHTML = correctionHTML(r);
    return r;
  } catch (e) {
    box.innerHTML = `<p style="color:var(--red)">${esc(SAMPLE_MSG[e && e.code] || "No se pudo corregir ahora. Intenta de nuevo en un momento.")}</p>`;
    return null;
  } finally { btn.disabled = false; }
}

function writingInfo(day) {
  const plan = dayPlan(day), m = plan.missions.find(x => x.id === "writing");
  return {day, level: cefrFor(day), grammar: GRAMMAR[plan.week].titulo, prompt: m ? m.desc : "Texto libre"};
}

// Boton dentro de la mision de escritura
function attachClaudeButton(day, getText, holder) {
  if (CLOUD) {
    getSample().then(sample => {
      if (!sample) return;
      holder.innerHTML = `<button class="btn primary" id="clBtn">Corregir con Claude</button><div id="clOut" class="card" style="margin-top:12px" hidden></div>`;
      $("#clBtn").onclick = async () => {
        const out = $("#clOut"); out.hidden = false;
        const r = await runClaudeCorrection(getText(), writingInfo(day), out, $("#clBtn"));
        if (r) { S.journal[day] = Object.assign(S.journal[day] || {}, {claude: {nota: r.nota, nivel: r.nivel, fecha: todayISO()}}); save(); }
      };
    });
  } else {
    holder.innerHTML = `<button class="btn" id="clOpen">Corregir con Claude (abre claude.ai)</button>
      <p class="mute" style="font-size:12px">Copia tu texto y abre el corrector en claude.ai con tu cuenta de Claude. Alla toca "Corrector Claude", pega y corrige. (En el iPhone claude.ai no abre: usa el PC.)</p>`;
    $("#clOpen").onclick = () => {
      const t = getText();
      try { navigator.clipboard.writeText(t).then(() => toast("Texto copiado. Pegalo en el Corrector Claude."), () => {}); } catch (e) {}
      window.open(CORRECTOR_URL, "_blank", "noopener");
    };
  }
}

// Vista "Corrector Claude"
VIEWS.corrector = () => {
  const day = S.currentDay, info = writingInfo(day);
  const myText = (S.journal[day] && S.journal[day].text) || "";
  main().innerHTML = `<div class="wrap"><h1>Corrector Claude</h1>
    <p class="sub">Pega o escribe un texto en ingles y Claude lo corrige con tu cuenta de claude.ai: nota, texto corregido, tabla de errores y como lo diria un nativo.</p>
    <div id="crBody"></div></div>`;
  const body = $("#crBody");
  if (!CLOUD) {
    body.innerHTML = `<div class="card"><p>La correccion con Claude funciona en la version de claude.ai (en el PC), porque usa tu cuenta de Claude.</p>
      <ol><li>Toca el boton: copia tu texto de hoy y abre claude.ai.</li><li>Alla entra a <b>Corrector Claude</b>, pega el texto y presiona <b>Corregir con Claude</b>.</li></ol>
      <button class="btn primary" id="crOpen">Copiar mi texto de hoy y abrir claude.ai</button></div>`;
    $("#crOpen").onclick = () => { try { navigator.clipboard.writeText(myText).then(() => toast(myText ? "Texto copiado" : "Hoy aun no escribiste nada"), () => {}); } catch (e) {} window.open(CORRECTOR_URL, "_blank", "noopener"); };
    return;
  }
  body.innerHTML = `<label>Consigna (opcional)<input class="txt" id="crP" value="${esc(info.prompt)}"></label>
    <label style="display:block;margin-top:10px">Tu texto en ingles<textarea class="txt" id="crT" lang="en" placeholder="Pega aqui tu texto...">${esc(myText)}</textarea></label>
    <div class="row" style="margin-top:12px"><span class="mute" style="font-size:13px">Nivel ${esc(info.level)} - Gramatica: ${esc(info.grammar)}</span><div class="spacer"></div><button class="btn primary" id="crGo">Corregir con Claude</button></div>
    <div id="crOut" class="card" style="margin-top:14px" hidden></div>`;
  getSample().then(s => { if (!s) { $("#crGo").disabled = true; $("#crOut").hidden = false; $("#crOut").innerHTML = `<p class="mute">Claude no esta disponible en esta vista.</p>`; } });
  $("#crGo").onclick = () => { const out = $("#crOut"); out.hidden = false; runClaudeCorrection($("#crT").value, Object.assign({}, info, {prompt: $("#crP").value || "Texto libre"}), out, $("#crGo")); };
};
