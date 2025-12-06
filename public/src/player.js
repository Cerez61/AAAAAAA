import {
  IdleLeft,
  IdleRight,
  RunningLeft,
  RunningRight,
  JumpIdleLeft,
  JumpIdleRight,
  JumpRunningLeft,
  JumpRunningRight,
  FallIdleLeft,
  FallIdleRight,
  FallRunningLeft,
  FallRunningRight,
} from "./playerStateManagement.js";
import { horizontalSpeed, verticalSpeed } from "./utils/speed.js";
export class Player {
  constructor(game) {
    //intelisense webgl content
    /**
     * @type {WebGL2RenderingContext}
     */

    this.gl = game.gl;
    this.program = game.program;
    this.mat4 = game.mat4;
    this.keys = game.keys;
    this.lastPressKeys = game.lastPressKeys;
    this.width = 20;
    this.height = 40;
    this.depth = 0;
    this.x = 0 + this.width;
    this.y = 0 + this.height;
    this.z = 1 + this.depth;
    this.weight = 20;
    this.speed = 20;
    this.xSpeed = 0;
    this.ySpeed = 0;

    this.states = [
      new IdleLeft(this),
      new IdleRight(this),
      new RunningLeft(this),
      new RunningRight(this),
      new JumpIdleLeft(this),
      new JumpIdleRight(this),
      new JumpRunningLeft(this),
      new JumpRunningRight(this),
      new FallIdleLeft(this),
      new FallIdleRight(this),
      new FallRunningLeft(this),
      new FallRunningRight(this),
    ];
    this.currentState = this.states[1];
    this.currentState.enter();

    this.modelMatrix = this.mat4.identity();
    this.viewMatrix = this.mat4.identity();
    this.mvMatrix = this.mat4.identity();
    this.orthoMatrix = this.mat4.ortho(0, this.gl.canvas.width, 0, this.gl.canvas.height, -100, 100);
    this.finalMatrix = this.mat4.identity();

    this.vertexData = this.createVertexData();

    this.playerVAO = this.gl.createVertexArray();

    this.setupPlayer();

    this.matrixLoc = this.gl.getUniformLocation(this.program, "uMatrix");
  }
  setupPlayer() {
    this.gl.bindVertexArray(this.playerVAO);

    const vertexBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.vertexData), this.gl.STATIC_DRAW);
    this.gl.vertexAttribPointer(0, 3, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(0);
    this.gl.bindVertexArray(null);

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
  onGround() {
    if (this.y - this.height > 0) return false;
    else return true;
  }
  update() {
    this.currentState.updateState();

    this.x += this.xSpeed * this.speed;

    if (!this.onGround()) this.weight -= 1;

    this.y += this.ySpeed * this.weight;

    console.log(this.ySpeed);
    console.log(this.weight);
    this.mat4.translate(this.viewMatrix, [this.x, this.y, 0]);
    this.mat4.multiply(this.mvMatrix, this.viewMatrix, this.modelMatrix);
    this.mat4.multiply(this.finalMatrix, this.orthoMatrix, this.mvMatrix);
  }
  draw() {
    this.gl.useProgram(this.program);

    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    this.gl.bindVertexArray(this.playerVAO);
    this.gl.uniformMatrix4fv(this.matrixLoc, false, this.finalMatrix);
    this.gl.drawArrays(this.gl.TRIANGLES, 0, this.vertexData.length / 3);
    this.gl.bindVertexArray(null);
  }
}
