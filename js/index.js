// const playBtn = document.getElementById("playBtn");
// const modal = document.getElementById("introModal");
// const startBtn = document.getElementById("startBtn");


// playBtn.addEventListener("click", () => {
//   modal.style.display = "flex";
// });


// startBtn.addEventListener("click", () => {
//   // close the modal
//   modal.style.display = "none";

//   // redirect
//   window.location.href = "game.html"; 
// });


// ===== index.js =====

// لما المستخدم يضغط على زر Play Now
const playBtn = document.getElementById("playBtn");

playBtn.addEventListener("click", () => {
  // الانتقال مباشرة إلى صفحة اللعبة
  window.location.href = "game.html";
});
