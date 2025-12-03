import { IdleLeft, IdleRight, RunningLeft, RunningRight } from "./playerStateManagement.js";
import { horizontalSpeed, verticalSpeed } from "./utils/speed.js";
export class Player {
  constructor(program, gl, mat4, keys, x, y, z) {
    //intelisense webgl content
    /**
     * @type {WebGL2RenderingContext}
     */

    this.gl = gl;
    this.program = program;
    this.mat4 = mat4;
    this.keys = keys;
    this.width = 20;
    this.height = 40;
    this.depth = 0;
    this.x = x + this.width;
    this.y = y + this.height;
    this.z = z + this.depth;
    this.speed = 10;
    this.xSpeed = 0;
    this.ySpeed = 0;

    this.states = [
      new IdleLeft(this),
      new IdleRight(this),
      new RunningLeft(this),
      new RunningRight(this),
    ];
    this.currentState = this.states[1];
    this.currentState.enter();

    this.vertexData = this.createVertexData();

    this.playerVAO = this.gl.createVertexArray();
    this.gl.bindVertexArray(this.playerVAO);

    this.vertexBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array(this.vertexData),
      this.gl.STATIC_DRAW
    );
    this.gl.vertexAttribPointer(0, 3, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(0);
    this.gl.bindVertexArray(null);

    this.modelMatrix = this.mat4.identity();
    this.viewMatrix = this.mat4.identity();
    this.mvMatrix = this.mat4.identity();
    this.orthoMatrix = this.mat4.ortho(
      0,
      this.gl.canvas.width,
      0,
      this.gl.canvas.height,
      -100,
      100
    );
    this.finalMatrix = this.mat4.identity();

    this.matrixLoc = this.gl.getUniformLocation(this.program, "uMatrix");

    this.mat4.scale(this.modelMatrix, [this.width, this.height, 0]);
    this.mat4.translate(this.viewMatrix, [this.x, this.y, this.z]);
  }
  createVertexData() {
    /* prettier-ignore */
    return [
        // v stands for vertex
        // v1
        -1,-1,1,
        // v2
        -1,1,1,
        // v3
        1,-1,1,
        // v3
        1,-1,1,
        // v2
        -1,1,1,
        // v4
        1,1,1
    ];
  }
  setState(player, state) {
    player.currentState = player.states[state];
    player.currentState.enter();
  }
  update() {
    this.currentState.updateState();
    //I will multiply view and model matrix and save as mvMatrix
    //after that ı'll multiply mvMatrix and orthoMatrix.this'll give me finalMatrix
    //and send this finalMatrix to the uniform data

    if (this.keys.includes("d")) this.xSpeed = 5;
    else if (this.keys.includes("a")) this.xSpeed = -5;
    else this.xSpeed = 0;

    this.x += this.xSpeed * 1;

    this.mat4.translate(this.viewMatrix, [this.x, this.y, 0]);
    this.mat4.multiply(this.mvMatrix, this.viewMatrix, this.modelMatrix);
    this.mat4.multiply(this.finalMatrix, this.orthoMatrix, this.mvMatrix);
  }
  draw() {
    this.gl.useProgram(this.program);

    this.gl.bindVertexArray(this.playerVAO);
    this.gl.uniformMatrix4fv(this.matrixLoc, false, this.finalMatrix);
    this.gl.drawArrays(this.gl.TRIANGLES, 0, this.vertexData.length / 3);
    this.gl.bindVertexArray(null);
  }
}
