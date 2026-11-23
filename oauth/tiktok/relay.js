// Forwards TikTok's OAuth redirect (one-time code + state) to the local BEYOND FRAME Publisher.
// The code is useless without the PKCE verifier and client secret, which exist only in the desktop app.
(function () {
  var TARGET = "http://127.0.0.1:8787/oauth/tiktok/callback/";
  var ALLOWED = ["code", "state", "scopes", "error", "error_description", "error_type"];
  var src = new URLSearchParams(window.location.search);
  var out = new URLSearchParams();
  ALLOWED.forEach(function (k) {
    if (src.has(k)) out.set(k, src.get(k));
  });
  // Drop the code from this page's address and history.
  window.history.replaceState(null, "", window.location.pathname);
  if (!out.has("state") || (!out.has("code") && !out.has("error"))) {
    document.getElementById("msg").textContent = "Nothing to forward: open this page only through TikTok sign-in from the BEYOND FRAME app.";
    return;
  }
  var url = TARGET + "?" + out.toString();
  var link = document.getElementById("go");
  link.href = url;
  link.hidden = false;
  window.location.replace(url);
})();
