import { Player } from "./player.js";

export class Game {
  constructor(gl, mat4) {
    //intelisense webgl content
    /**
     * @type {WebGL2RenderingContext}
     */
    this.gl = gl;
    this.mat4 = mat4;
    this.player = new Player(this.gl, this.mat4, 10, 10, 1);
  }
}
