/*
  Fictional shop line for Senja Kopi. Not Ree's personal number.
  Change WA_NUMBER (digits only) and WA_DISPLAY, then refresh.
  With JavaScript off, the links in index.html still use 60000000000.
*/
(function () {
  var WA_NUMBER = "60000000000";
  var WA_DISPLAY = "+60 00-000 0000";

  function isZh() {
    return document.documentElement.dataset.lang === "zh";
  }

  function hrefFor(text) {
    return "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(text);
  }

  function paint() {
    document.querySelectorAll("[data-wa-display]").forEach(function (el) {
      el.textContent = WA_DISPLAY;
    });
    document.querySelectorAll("[data-wa-en]").forEach(function (el) {
      var text = isZh() ? el.getAttribute("data-wa-zh") : el.getAttribute("data-wa-en");
      el.href = hrefFor(text);
    });
  }

  paint();
  document.addEventListener("ree-lang", paint);
})();
