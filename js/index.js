const playBtn = document.getElementById("playBtn");
const modal = document.getElementById("introModal");
const startBtn = document.getElementById("startBtn");

// فتح المودال عند الضغط على "Play Now!"
playBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});

// الانتقال لصفحة جديدة عند الضغط على "Get started"
startBtn.addEventListener("click", () => {
  // أولاً اقفلي المودال
  modal.style.display = "none";

  // بعد كده انتقلي للصفحة الجديدة
  window.location.href = "game.html"; // غيّري "game.html" باسم صفحتك
});

// غلق المودال عند الضغط خارج المربع
// window.addEventListener("click", (e) => {
//   if (e.target === modal) {
//     modal.style.display = "none";
//   }
// });
