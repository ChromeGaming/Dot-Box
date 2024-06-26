let rows = document.querySelector("#rows");
let columns = document.querySelector("#columns");
let players = document.querySelector("#players-count");
let startBtn = document.querySelector("#start-btn");

startBtn.addEventListener("click", function () {
  localStorage.setItem("rows", rows.value);
  localStorage.setItem("columns", columns.value);
  localStorage.setItem("players", players.value);
});

const menu = document.querySelector(".nav-links");
const hamburger = document.querySelector(".hamburger");

hamburger.addEventListener("click", () => {
  if (menu.style.display === "none" || menu.style.display === "") {
    menu.style.display = "flex";
  } else {
    menu.style.display = "none";
  }
});
