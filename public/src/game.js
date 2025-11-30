import { Player } from "./player.js";

export class Game {
  constructor(program, gl, mat4) {
    //intelisense webgl content
    /**
     * @type {WebGL2RenderingContext}
     */
    this.program = program;
    this.gl = gl;
    this.mat4 = mat4;
    this.player = new Player(this.gl, this.mat4, 10, 10, 1);

    this.matrixData = [...this.player.orthoMatrix];
    console.log(this.matrixData);

    this.matrixLoc = this.gl.getUniformLocation(this.program, "uMatrix");
  }
  update() {
    this.player.update();
  }
  draw() {
    this.gl.useProgram(this.program);

    this.gl.bindVertexArray(this.player.playerVAO);
    this.gl.uniformMatrix4fv(this.matrixLoc, false, this.matrixData);
    this.gl.drawArrays(this.gl.TRIANGLES, 0, this.player.vertexData.length / 3);
    this.gl.bindVertexArray(null);
  }
}
