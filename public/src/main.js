import { Game } from "./Game.js";
import { DeltaTime } from "./components/deltaTime.js";

const game = new Game();

let lastTime = 0;
function animate(timeStamp) {
  DeltaTime.update(timeStamp);

  //gl.clear(gl.COLOR_BUFFER_BIT);
  game.update();
  game.draw();
  game.clear();
  //just now later ı'll create seperate ui class and make this process in inside of ui class
  fps.innerHTML = Math.round(1000 / DeltaTime.get()) + " FPS";
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
