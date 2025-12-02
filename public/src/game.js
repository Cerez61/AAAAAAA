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
    this.inputHandler = new InputHandler(this.keys);
    this.player = new Player(this.program, this.gl, this.mat4, this.keys, 0, 0, 1);
  }
  update() {
    this.player.update();
  }
  draw() {
    this.player.draw();
  }
}
