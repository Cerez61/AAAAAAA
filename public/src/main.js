import { Game } from "./Game.js";

const game = new Game();

let lastTime = 0;
function animate(timeStamp) {
  const deltaTime = timeStamp - lastTime || 1;
  lastTime = timeStamp;

  //gl.clear(gl.COLOR_BUFFER_BIT);
  game.update();
  game.draw();

  //just now later ı'll create seperate ui class and make this process in inside of ui class
  fps.innerHTML = Math.round(1000 / deltaTime) + " FPS";
  requestAnimationFrame(animate);
}
async function init() {
  await game.init();
}
async function gameStart() {
  await init();
  animate(0);
}

gameStart();
