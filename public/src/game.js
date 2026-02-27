import { Player } from "./player.js";
import { Camera } from "./camera.js";
import { BackGround } from "./AssetManagement/background.js";
import { InputHandler } from "./inputHandler.js";
import { GameState } from "./States/gameState.js";

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
    this.background = new BackGround(this.gameState);
  }
  async init() {
    await this.background.init();
  }
  update() {
    this.background.update();
    this.player.update();
    this.camera.update();
  }
  draw() {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    this.player.draw();
    this.background.draw();
  }
}
