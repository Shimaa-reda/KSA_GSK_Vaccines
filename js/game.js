// ===== عناصر السحب =====
const items = document.querySelectorAll(".drag-item");

// ===== مناطق الإسقاط =====
const dropZones = document.querySelectorAll(".drop-zone");

// ===== المؤقت =====
let timerValue = 24;
const timerElement = document.getElementById("timer");

// ===== المودال الأول =====
const modalHTML = `
  <div id="endModal" class="custom-modal">
    <div class="custom-modal-content">
      <h6><b>A common trap!</b></h6>
      <p>
        The symptoms mimic the flu, which is <br>
        why proactive vaccination is the crucial<br>
        line of defense.<sup>1,2</sup>
      </p>
      <div class="modal-buttons">
        <button id="tryAgainBtn" class="btn-try">Try again</button>
        <button id="exposeBtn" class="btn-expose">Expose Meningitis</button>
      </div>
    </div>
  </div>
`;
document.body.insertAdjacentHTML("beforeend", modalHTML);
const modal = document.getElementById("endModal");

// ===== مودال النجاح =====
const successModalHTML = `
  <div id="successModal" class="custom-modal">
    <div class="custom-modal-content">
      <h6><b>Impressive diagnosis!</b></h6>
      <p>
        Because it's so hard to spot the difference from flu,<br>
        Bexsero is a highly reliable way to protect against<br>
        Meningitis.
      </p>
      <div class="modal-buttons">
        <button id="okBtn" class="btn-ok">Okay</button>
      </div>
    </div>
  </div>
`;
document.body.insertAdjacentHTML("beforeend", successModalHTML);
const successModal = document.getElementById("successModal");

// ===== السحب =====
items.forEach(item => {
  item.addEventListener("dragstart", e => {
    // لو العنصر تم سحبه قبل كده → امنع السحب
    if (item.classList.contains("used")) {
      e.preventDefault();
      return;
    }

    e.dataTransfer.setData("type", item.dataset.type);
    e.dataTransfer.setData("text", item.textContent);

    // صورة مؤقتة أثناء السحب
    // const clone = item.cloneNode(true);
    // clone.style.opacity = "0.7";
    // clone.style.position = "absolute";
    // clone.style.top = "-9999px";
    // document.body.appendChild(clone);
    // e.dataTransfer.setDragImage(clone, 0, 0);
    // setTimeout(() => document.body.removeChild(clone), 0);
  });
});

// ===== الإفلات =====
dropZones.forEach(zone => {
  zone.addEventListener("dragover", e => e.preventDefault());

  zone.addEventListener("drop", e => {
    e.preventDefault();
    const type = e.dataTransfer.getData("type");
    const text = e.dataTransfer.getData("text");
    const draggedItem = [...items].find(i => i.textContent === text);

    // لو العنصر موجود واتسحب قبل كده، ما تعملش حاجة
    if (!draggedItem || draggedItem.classList.contains("used")) return;

    // إنشاء نسخة بدل النقل
    const clone = draggedItem.cloneNode(true);
    clone.draggable = false;
    clone.classList.add("dropped-item");
    clone.dataset.type = type;

    zone.appendChild(clone);

    // إخفاء النص المؤقت
    const placeholder = zone.querySelector(".placeholder-text");
    if (placeholder) placeholder.style.opacity = 0;

    // تحديد أن العنصر ده تم استخدامه
    draggedItem.classList.add("used");
    draggedItem.style.opacity = "0.5";
    draggedItem.style.cursor = "not-allowed";
  });
});

// ===== العداد =====
const timerInterval = setInterval(() => {
  timerValue--;
  timerElement.textContent = timerValue;

  if (timerValue <= 0) {
    clearInterval(timerInterval);
    checkAnswers();
    showModal();
  }
}, 1000);

// ===== فحص الإجابات =====
function checkAnswers() {
  const droppedItems = document.querySelectorAll(".dropped-item");
  droppedItems.forEach(item => {
    const parentZone = item.closest(".drop-zone");
    if (parentZone) {
      const correctType = item.dataset.type;
      const box = parentZone.closest(".box");

      if (box && box.dataset.type === correctType) {
        item.classList.add("correct");
      } else {
        item.classList.add("wrong");
      }
    }
  });
}

// ===== إظهار المودال الأول =====
function showModal() {
  modal.style.display = "flex";

  document.getElementById("tryAgainBtn").addEventListener("click", () => {
    location.reload();
  });

  document.getElementById("exposeBtn").addEventListener("click", () => {
    exposeCorrectAnswers();
  });
}

// ===== عرض الإجابات الصحيحة =====
function exposeCorrectAnswers() {
  const fluBox = document.querySelector("#fluDropZone");
  const meningitisBox = document.querySelector("#meningitisDropZone");

  // امسح كل المحتوى القديم
  fluBox.innerHTML = "";
  meningitisBox.innerHTML = "";

  // مرّ على كل العناصر الأصلية
  items.forEach(item => {
    const clone = item.cloneNode(true);
    clone.classList.add("correct");
    clone.draggable = false;

    // حذف التأثيرات القديمة (لو كانت باهتة)
    clone.classList.remove("used");
    clone.style.opacity = "1";
    clone.style.cursor = "default";

    if (item.dataset.type === "flu") {
      fluBox.appendChild(clone);
    } else if (item.dataset.type === "meningitis") {
      meningitisBox.appendChild(clone);
    }
  });

  // كمان نرجّع العناصر الأصلية لشكلها الطبيعي
  items.forEach(item => {
    item.classList.remove("used");
    item.style.opacity = "1";
    item.style.cursor = "grab";
  });

  // إخفاء المودال الأول بعد العرض
  modal.style.display = "none";

  // تأخير قصير لإظهار الإجابات بوضوح قبل الـ spotlight
  setTimeout(() => {
    // إنشاء overlay للصفحة كلها
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    overlay.style.zIndex = "1000";
    document.body.appendChild(overlay);

    // جعل بوكس Meningitis ظاهر وأمامي (زيادة z-index وإزالة أي تأثير باهت)
    const meningitisBoxElement = document.querySelector(".meningitis-box");
    if (meningitisBoxElement) {
      meningitisBoxElement.style.zIndex = "1001";
      meningitisBoxElement.style.opacity = "1";
      // إضافة تأثير إضاءة إذا أردت (اختياري)
      meningitisBoxElement.style.boxShadow = "0 0 20px rgba(255, 255, 255, 0.5)";
    }

    // إخفاء الـ overlay بعد 5 ثواني وإظهار مودال النجاح فوراً
    setTimeout(() => {
      if (overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
      }
      if (meningitisBoxElement) {
        meningitisBoxElement.style.zIndex = "";
        meningitisBoxElement.style.boxShadow = "";
      }
      showSuccessModal();
    }, 5000);

  }, 2000); // تأخير 2 ثانية لإظهار الإجابات أولاً
}

// ===== إظهار مودال النجاح =====
function showSuccessModal() {
  successModal.style.display = "flex";

  document.getElementById("okBtn").addEventListener("click", () => {
    successModal.style.display = "none";
    // الانتقال إلى صفحة end
    window.location.href = "end.html";
  });
}