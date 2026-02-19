import { Player } from "./player.js";
import { Camera } from "./camera.js";
import { BackGround } from "./background.js";
import { InputHandler } from "./inputHandler.js";
import { GameState } from "./gameStates.js";

export class Game {
  constructor(program, gl) {
    //intelisense webgl content
    /**
     * @type {WebGL2RenderingContext}
     */
    this.program = program;
    this.gl = gl;
    this.gameState = new GameState(this.program, this.gl);
    this.inputHandler = new InputHandler(this.gameState);
    this.camera = new Camera(this.gameState);
    this.player = new Player(this.gameState);
    this.backgrounds = [new BackGround(this.gameState, "../assets/background_1.png")];
  }
  update() {
    this.backgrounds.forEach((background) => background.update());
    this.player.update();
    this.camera.update();
  }
  draw() {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    this.player.draw();
    this.backgrounds.forEach((background) => background.draw());
  }
}
