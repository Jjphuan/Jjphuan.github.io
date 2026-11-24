/*
  English / 中文 toggle.
  English is the text in the page. Chinese (Simplified) is the data-zh attribute.
  The choice is remembered on this browser under the key ree-lang.
*/
(function () {
  var KEY = "ree-lang";

  function clean(text) {
    return (text || "").replace(/\s+/g, " ").trim();
  }

  function apply(lang) {
    var zh = lang === "zh";
    document.documentElement.lang = zh ? "zh-Hans" : "en";
    document.documentElement.dataset.lang = zh ? "zh" : "en";

    document.querySelectorAll("[data-zh]").forEach(function (el) {
      if (!el.dataset.en) el.dataset.en = clean(el.textContent);
      el.textContent = zh ? (el.dataset.zh || "").trim() : el.dataset.en;
      if (el.tagName !== "TITLE") el.lang = zh ? "zh-Hans" : "en";
    });

    document.querySelectorAll("[data-ph-zh]").forEach(function (el) {
      if (!el.dataset.phEn) el.dataset.phEn = el.getAttribute("placeholder") || "";
      el.setAttribute("placeholder", zh ? el.dataset.phZh : el.dataset.phEn);
    });

    document.querySelectorAll("[data-aria-zh]").forEach(function (el) {
      if (!el.dataset.ariaEn) el.dataset.ariaEn = el.getAttribute("aria-label") || "";
      el.setAttribute("aria-label", zh ? el.dataset.ariaZh : el.dataset.ariaEn);
    });

    document.querySelectorAll("[data-lang-toggle]").forEach(function (btn) {
      btn.textContent = zh ? "EN" : "中文";
      btn.setAttribute("aria-label", zh ? "Switch to English" : "切换到中文");
      btn.lang = zh ? "en" : "zh-Hans";
    });

    document.dispatchEvent(
      new CustomEvent("ree-lang", { detail: { lang: zh ? "zh" : "en" } })
    );
  }

  var saved = "en";
  try {
    saved = localStorage.getItem(KEY) || "en";
  } catch (err) {
    saved = "en";
  }
  if (saved !== "zh") saved = "en";
  apply(saved);

  document.querySelectorAll("[data-lang-toggle]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var next = document.documentElement.dataset.lang === "zh" ? "en" : "zh";
      try {
        localStorage.setItem(KEY, next);
      } catch (err) {
        /* private mode */
      }
      apply(next);
    });
  });
})();
