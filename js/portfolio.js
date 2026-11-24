/*
  Fills WhatsApp and email links from /ree.config.js.
*/
(function () {
  var c = window.REE_CONTACT;
  if (!c) return;

  function isZh() {
    return document.documentElement.dataset.lang === "zh";
  }

  function waHref() {
    var text = isZh() ? c.whatsappGreetingZh : c.whatsappGreetingEn;
    return "https://wa.me/" + c.whatsappNumber + "?text=" + encodeURIComponent(text);
  }

  function mailHref() {
    var subject = isZh() ? c.emailSubjectZh : c.emailSubjectEn;
    return "mailto:" + c.email + "?subject=" + encodeURIComponent(subject);
  }

  function paint() {
    document.querySelectorAll("[data-contact='whatsapp']").forEach(function (el) {
      el.href = waHref();
    });
    document.querySelectorAll("[data-contact='whatsapp-number']").forEach(function (el) {
      el.textContent = c.whatsappDisplay;
    });
    document.querySelectorAll("[data-contact='email']").forEach(function (el) {
      el.href = mailHref();
    });
    document.querySelectorAll("[data-contact='email-text']").forEach(function (el) {
      el.textContent = c.email;
    });
  }

  paint();
  document.addEventListener("ree-lang", paint);
})();
