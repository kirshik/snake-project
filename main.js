import GameController from "./game-controller.js";

const canvas = document.getElementById('canvas');
const btnPlay = document.getElementById('btnPlay');
const btnPause = document.getElementById('btnPause');
const btnResume = document.getElementById('btnResume');
const scoreLabel = document.getElementById('score');

const controller = new GameController(canvas);
controller.startGame();
btnPlay.addEventListener("click", e => {
  e.preventDefault();
  controller.finishGame;
  scoreLabel.textContent = 0;
  controller.startGame();
})
btnPause.addEventListener("click", e => {
  e.preventDefault();
  controller.pauseGame();
  btnResume.hidden = !btnResume.hidden;
  btnPause.hidden = !btnPause.hidden;
})
btnResume.addEventListener("click", e => {
  e.preventDefault();
  controller.resumeGame();
  btnResume.hidden = !btnResume.hidden;
  btnPause.hidden = !btnPause.hidden;
})


