/*
  Fictional shop line for Murni Atelier. Not Ree's personal number.
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

  function formatDate(iso) {
    var parts = iso.split("-");
    if (parts.length !== 3) return iso;
    var date = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    return new Intl.DateTimeFormat(isZh() ? "zh-Hans" : "en-MY", {
      day: "numeric",
      month: "short",
      year: "numeric"
    }).format(date);
  }

  function messageFrom(draft) {
    if (isZh()) {
      return [
        "你好，沐日工作室，我想预约。",
        "姓名：" + draft.name,
        "服务：" + draft.service,
        "日期：" + formatDate(draft.date),
        "时间：" + draft.time
      ].join("\n");
    }
    return [
      "Hi Murni Atelier, I would like to book a slot.",
      "Name: " + draft.name,
      "Service: " + draft.service,
      "Date: " + formatDate(draft.date),
      "Time: " + draft.time
    ].join("\n");
  }

  function renderStatus() {
    var box = document.getElementById("form-status");
    if (!box || !draft) return;
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

  var dateInput = document.getElementById("book-date");
  if (dateInput) {
    var today = new Date();
    dateInput.min = today.getFullYear() + "-" + String(today.getMonth() + 1).padStart(2, "0") + "-" + String(today.getDate()).padStart(2, "0");
  }

  var form = document.getElementById("book-form");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var nameInput = document.getElementById("book-name");
      if (!nameInput.value.trim()) {
        nameInput.setCustomValidity(isZh() ? "请填写名字。" : "Please enter your name.");
      } else {
        nameInput.setCustomValidity("");
      }
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      var service = document.getElementById("book-service");
      var time = document.getElementById("book-time");
      draft = {
        name: nameInput.value.trim(),
        service: service.options[service.selectedIndex].textContent.trim(),
        date: document.getElementById("book-date").value,
        time: time.options[time.selectedIndex].textContent.trim()
      };
      var message = renderStatus();
      window.open(hrefFor(message), "_blank", "noopener,noreferrer");
    });
  }

  paint();
  document.addEventListener("ree-lang", function () {
    if (!draft) {
      paint();
      return;
    }
    var service = document.getElementById("book-service");
    var time = document.getElementById("book-time");
    draft.service = service.options[service.selectedIndex].textContent.trim();
    draft.time = time.options[time.selectedIndex].textContent.trim();
    paint();
  });
})();
