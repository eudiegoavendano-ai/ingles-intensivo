// Sincronizacion automatica (version web): guarda el progreso en un Gist secreto de la cuenta de GitHub del usuario.
// El token (solo permiso "gist") y el id del Gist se guardan en este dispositivo, nunca dentro del progreso.
"use strict";
const SYNC = (() => {
  const K_TOKEN = "ingles_sync_token", K_GIST = "ingles_sync_gist", K_USER = "ingles_sync_user";
  const FILE = "ingles_intensivo_progreso.json", API = "https://api.github.com";
  const get = k => { try { return localStorage.getItem(k) || ""; } catch (e) { return ""; } };
  const put = (k, v) => { try { if (v) localStorage.setItem(k, v); else localStorage.removeItem(k); } catch (e) {} };
  let pushTimer = null, busy = false, again = false, pendingPush = false;

  const enabled = () => WEB && !!get(K_TOKEN) && !!get(K_GIST);
  const user = () => get(K_USER);

  async function gh(path, opts = {}, token = get(K_TOKEN)) {
    const headers = {"Authorization": "Bearer " + token, "Accept": "application/vnd.github+json"};
    if (opts.body) headers["Content-Type"] = "application/json";
    const r = await fetch(API + path, Object.assign({cache: "no-store"}, opts, {headers}));
    if (!r.ok) { const e = new Error("GitHub " + r.status); e.status = r.status; throw e; }
    return r.status === 204 ? null : r.json();
  }
  async function fileFromGist(g) {
    const f = g && g.files && g.files[FILE];
    if (!f) return null;
    const txt = f.truncated ? await (await fetch(f.raw_url, {cache: "no-store"})).text() : f.content;
    return JSON.parse(txt);
  }
  const readRemote = async () => fileFromGist(await gh("/gists/" + get(K_GIST)));
  const writeRemote = () => gh("/gists/" + get(K_GIST), {method: "PATCH", body: JSON.stringify({files: {[FILE]: {content: JSON.stringify(S)}}})});

  function errText(e) {
    if (e && e.status === 401) return "token invalido o vencido";
    if (e && e.status === 404) return "no se encontro el archivo en GitHub";
    return "sin conexion";
  }

  async function push() {
    if (!enabled()) return;
    if (busy) { again = true; return; }
    busy = true; pendingPush = false;
    try {
      setSaveLabel("sincronizando...", "saving");
      await writeRemote();
      setSaveLabel("sincronizado en la nube");
    } catch (e) { pendingPush = true; setSaveLabel("guardado aqui; nube: " + errText(e), "err"); }
    busy = false;
    if (again) { again = false; push(); }
  }
  function pushSoon() {
    if (!enabled()) return;
    pendingPush = true;
    clearTimeout(pushTimer);
    pushTimer = setTimeout(push, 3000);
  }
  // Trae el progreso de la nube si es mas nuevo que el de este dispositivo
  async function pull() {
    if (!enabled() || busy || pendingPush) return false;
    const remote = await readRemote();
    if (remote && remote.version && (remote.updatedAt || 0) > (S.updatedAt || 0)) {
      applyState(remote);
      try { localStorage.setItem("ingles_state", JSON.stringify(S)); } catch (e) {}
      return true;
    }
    return false;
  }
  async function pullOnStart() {
    if (!enabled()) return;
    try { await withTimeout(pull(), 8000); setSaveLabel("sincronizado en la nube"); }
    catch (e) { setSaveLabel("nube: " + errText(e) + " (uso lo guardado aqui)", "err"); }
  }

  // Conecta con un token nuevo. Devuelve {created} o {remote} si ya habia progreso en la nube.
  async function connect(token) {
    token = token.trim();
    const me = await gh("/user", {}, token);
    let found = null;
    for (let page = 1; page <= 5 && !found; page++) {
      const list = await gh(`/gists?per_page=100&page=${page}`, {}, token);
      found = list.find(g => g.files && g.files[FILE]);
      if (list.length < 100) break;
    }
    put(K_TOKEN, token); put(K_USER, me.login);
    if (found) {
      put(K_GIST, found.id);
      return {remote: await fileFromGist(await gh("/gists/" + found.id, {}, token))};
    }
    const g = await gh("/gists", {method: "POST", body: JSON.stringify({description: "Ingles Intensivo - progreso (no borrar)", public: false, files: {[FILE]: {content: JSON.stringify(S)}}})}, token);
    put(K_GIST, g.id);
    return {created: true};
  }
  function disconnect() { put(K_TOKEN, ""); put(K_GIST, ""); put(K_USER, ""); clearTimeout(pushTimer); pendingPush = false; }

  // Al volver a la app: bajar cambios; al salir: subir lo pendiente
  document.addEventListener("visibilitychange", async () => {
    if (!enabled()) return;
    if (document.visibilityState === "hidden") { if (pendingPush) { clearTimeout(pushTimer); push(); } return; }
    try {
      if (await pull()) { refreshSide(); if (typeof go === "function") go("hoy"); toast("Progreso actualizado desde la nube"); }
    } catch (e) {}
  });

  return {enabled, user, push, pushSoon, pull, pullOnStart, connect, disconnect, readRemote};
})();
