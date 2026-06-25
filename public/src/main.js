import { Game } from "./game.js";
import { DeltaTime } from "./utils/deltaTime.js";

const game = new Game();

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
