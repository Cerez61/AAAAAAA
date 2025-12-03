import { Player } from "./player.js";
import { InputHandler } from "./inputHandler.js";
export class Game {
  constructor(program, gl, mat4) {
    //intelisense webgl content
    /**
     * @type {WebGL2RenderingContext}
     */
    this.program = program;
    this.gl = gl;
    this.mat4 = mat4;
    this.keys = [];
    this.lastPressKeys = [];
    this.lastReleaseKeys = [];
    this.inputHandler = new InputHandler(this);
    this.player = new Player(this);
    this.gameFrame = 100;
    this.gameInterval = 1000 / this.gameFrame;
    this.lastFrame = 0;
  }
  update(deltaTime) {
    this.player.update();
  }
  draw() {
    this.player.draw();
  }
}
