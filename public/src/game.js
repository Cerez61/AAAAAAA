import { Player } from "./player.js";
import { Camera } from "./camera.js";
import { BackGround } from "./utils/background.js";
import { InputHandler } from "./inputHandler.js";
import { MAT4 } from "./utils/matrix.js";

export class Game {
  constructor(program, gl) {
    //intelisense webgl content
    /**
     * @type {WebGL2RenderingContext}
     */
    this.program = program;
    this.gl = gl;
    this.mat4 = new MAT4();
    this.keys = [];
    this.lastPressKeys = [];
    this.lastReleaseKeys = [];
    this.inputHandler = new InputHandler(this);
    this.camera = new Camera();
    this.player = new Player(this);
    this.backgrounds = [new BackGround(this.program, this.gl, "../assets/background_1.png")];
    this.gameFrame = 1000;
    this.gameInterval = 1000 / this.gameFrame;
    this.lastFrame = 0;
  }
  update(deltaTime) {
    this.player.update();
    this.camera.update();
    this.backgrounds.forEach((background) => background.draw());
  }
  draw(deltaTime) {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    this.player.draw();
    this.backgrounds.forEach((background) => background.draw());
  }
}
