/*
  Fictional centre line for Akar Learning. Not Ree's personal number.
  Change WA_NUMBER (digits only) and WA_DISPLAY, then refresh.
*/
(function () {
  var WA_NUMBER = "60000000000";
  var WA_DISPLAY = "+60 00-000 0000";
  var draft = null;

  function isZh() {
    return document.documentElement.dataset.lang === "zh";
  }

  function hrefFor(text) {
    return "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(text);
  }

  function labelOf(id) {
    var el = document.getElementById(id);
    return el.options[el.selectedIndex].textContent.trim();
  }

  function messageFrom(data) {
    if (isZh()) {
      var zh = [
        "你好，根学教育，我想询问课程。",
        "姓名：" + data.name,
        "程度：" + data.level,
        "科目：" + data.subject,
        "方便的日子：" + data.day
      ];
      if (data.note) zh.push("备注：" + data.note);
      return zh.join("\n");
    }
    var en = [
      "Hi Akar Learning, I would like to enquire about a class.",
      "Name: " + data.name,
      "Level: " + data.level,
      "Subject: " + data.subject,
      "Preferred day: " + data.day
    ];
    if (data.note) en.push("Note: " + data.note);
    return en.join("\n");
  }

  function renderStatus() {
    var box = document.getElementById("form-status");
    if (!box || !draft) return "";
    var message = messageFrom(draft);
    box.hidden = false;
    box.replaceChildren();
    var title = document.createElement("p");
    title.className = "status-title";
    title.textContent = isZh() ? "WhatsApp 里会是这段话。" : "This is the WhatsApp message.";
    var pre = document.createElement("pre");
    pre.textContent = message;
    var help = document.createElement("p");
    help.className = "status-help";
    help.textContent = isZh()
      ? "如果 WhatsApp 没有打开，可能是浏览器拦截了新标签页。你可以复制上面的文字，自己发送。"
      : "If WhatsApp did not open, the browser may have blocked the new tab. Copy the text above and send it yourself.";
    box.append(title, pre, help);
    return message;
  }

  function paint() {
    document.querySelectorAll("[data-wa-display]").forEach(function (el) {
      el.textContent = WA_DISPLAY;
    });
    document.querySelectorAll("a[data-wa-en]").forEach(function (el) {
      var text = isZh() ? el.getAttribute("data-wa-zh") : el.getAttribute("data-wa-en");
      el.href = hrefFor(text);
    });
    renderStatus();
  }

  document.querySelectorAll(".faq-item button").forEach(function (button) {
    button.addEventListener("click", function () {
      var open = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", open ? "false" : "true");
      var panel = document.getElementById(button.getAttribute("aria-controls"));
      if (panel) panel.hidden = open;
    });
  });

  var form = document.getElementById("ask-form");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var nameInput = document.getElementById("ask-name");
      if (!nameInput.value.trim()) {
        nameInput.setCustomValidity(isZh() ? "请填写名字。" : "Please enter your name.");
      } else {
        nameInput.setCustomValidity("");
      }
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      draft = {
        name: nameInput.value.trim(),
        level: labelOf("ask-level"),
        subject: labelOf("ask-subject"),
        day: labelOf("ask-day"),
        note: document.getElementById("ask-note").value.trim()
      };
      var message = renderStatus();
      window.open(hrefFor(message), "_blank", "noopener,noreferrer");
    });
  }

  paint();
  document.addEventListener("ree-lang", function () {
    if (draft) {
      draft.level = labelOf("ask-level");
      draft.subject = labelOf("ask-subject");
      draft.day = labelOf("ask-day");
    }
    paint();
  });
})();
