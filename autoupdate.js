// Auto-actualizacion (version web): si hay una version nueva publicada, recarga la pagina sin cache.
(function () {
  function check() {
    var cur = (document.querySelector('script[src*="js/core.js"]') || {}).src || "";
    var m = cur.match(/v=(\d+)/);
    if (!m || !window.fetch) return;
    fetch(location.pathname + "?nc=" + Date.now(), {cache: "no-store"}).then(function (r) { return r.text(); }).then(function (h) {
      var n = h.match(/js\/core\.js\?v=(\d+)/);
      if (!n || +n[1] <= +m[1]) return;
      try { if (sessionStorage.getItem("ingles_upd") === n[1]) return; sessionStorage.setItem("ingles_upd", n[1]); } catch (e) {}
      location.replace(location.pathname + "?v=" + n[1]);
    }).catch(function () {});
  }
  window.addEventListener("load", function () { setTimeout(check, 1500); });
  document.addEventListener("visibilitychange", function () { if (document.visibilityState === "visible") check(); });
})();
