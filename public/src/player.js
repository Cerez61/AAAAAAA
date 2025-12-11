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
import { MAT4 } from "./utils/matrix.js";

export class Player {
  constructor(game) {
    //intelisense webgl content
    /**
     * @type {WebGL2RenderingContext}
     */

    this.gl = game.gl;
    this.game = game;
    this.program = this.game.program;
    this.keys = this.game.keys;
    this.inputHandler = this.game.inputHandler;
    this.lastPressKeys = this.game.lastPressKeys;
    this.camera = this.game.camera;
    this.mat4 = new MAT4();
    this.width = 20;
    this.height = 40;
    this.depth = 0;
    this.x = 0 + this.width;
    this.y = 0 + this.height;
    this.z = 1 + this.depth;
    this.weight = 0;
    this.jumpHeight = 10;
    this.speed = 1.5;
    this.vx = 0;
    this.xSpeedMultiplier = 1;
    this.vy = 0;
    this.jumpCount = 2;

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
    this.viewMatrix = this.camera.cameraMatrix;
    this.mvMatrix = this.mat4.identity();
    this.orthoMatrix = this.mat4.ortho(0, this.gl.canvas.width, 0, this.gl.canvas.height, -100, 100);
    this.mvoMatrix = this.mat4.identity();

    this.vertexData = this.createVertexData();
    this.uvData = this.createuvData();

    this.playerVAO = this.gl.createVertexArray();

    this.texture = this.gl.createTexture();

    this.vertexBuffer = this.gl.createBuffer();
    this.setupPlayer();

    this.matrixLoc = this.gl.getUniformLocation(this.program, "uMatrix");
  }
  setupPlayer() {
    this.gl.bindVertexArray(this.playerVAO);

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.vertexData), this.gl.STATIC_DRAW);
    this.gl.vertexAttribPointer(0, 3, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(0);

    const pixels = new Uint8Array([
      255, 255, 0, 255, 0, 255, 255, 0, 255, 255, 255, 0, 255, 0, 0, 255, 255, 0, 255, 0, 0, 255, 0, 0, 255, 0, 0, 255, 0, 0, 255, 0, 0, 255, 0, 0,
      255, 0, 0, 255, 0, 0, 255, 0, 0, 255, 0, 0,
    ]);
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGB, 4, 4, 0, this.gl.RGB, this.gl.UNSIGNED_BYTE, pixels);

    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);

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
  createuvData() {
    /* prettier-ignore */
    return [
      0,0,
      1,0,
      0,1,
      0,1,
      1,0,
      0,0
    ]
  }
  setState(player, state) {
    player.currentState = player.states[state];
    player.currentState.enter();
  }
  onGround() {
    return this.y <= this.height;
  }
  verticalMovement() {
    if (this.keys.includes("d") && !this.keys.includes("a") && this.vx < 10) this.vx += this.xSpeedMultiplier;
    else if (this.keys.includes("a") && !this.keys.includes("d") && this.vx > -10) this.vx -= this.xSpeedMultiplier;
    else if (!this.keys.includes("d") && this.vx > 0) this.vx -= this.xSpeedMultiplier;
    else if (!this.keys.includes("a") && this.vx < 0) this.vx += this.xSpeedMultiplier;
    else if (!this.keys.includes("d") && !this.keys.includes("a")) this.vx = 0;
  }
  horizontalMovement() {
    if (this.y + this.weight <= this.height) this.y = this.height;

    if (this.onGround()) {
      this.vy = 0;
      this.weight = 0;
      this.jumpHeight = 10;
      this.jumpCount = 2;
    }

    if (this.lastPressKeys[0] === "w" && this.jumpCount > 0) {
      this.jumpCount--;
      this.vy = 1;
      this.jumpHeight = 10;
      this.weight = 0;
      this.lastPressKeys[0] = null;
    }
    if (this.keys.includes("w") && this.jumpHeight > 0) {
      this.jumpHeight--;
      this.weight += 3;
    } else this.weight -= 3;
  }
  update() {
    this.currentState.updateState();

    this.verticalMovement();
    this.horizontalMovement();

    this.x += this.vx * this.speed;
    this.y += this.vy * this.weight;

    this.mat4.translate(this.viewMatrix, [this.x, this.y, 0]);
    this.mat4.multiply(this.mvMatrix, this.viewMatrix, this.modelMatrix);
    this.mat4.multiply(this.mvoMatrix, this.orthoMatrix, this.mvMatrix);

    this.lastPressKeys[0] = null;

    //it didn't happen like I wanted
    //ı want when ı move player camera follow the player but it didn't
    if (this.vx > 0) this.camera.x += 0.00001;
    else if (this.vx < 0) this.camera.x -= 0.00001;
    this.viewMatrix = this.camera.cameraMatrix;
  }
  draw() {
    this.gl.useProgram(this.program);

    this.gl.bindVertexArray(this.playerVAO);
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
    this.gl.uniformMatrix4fv(this.matrixLoc, false, this.mvoMatrix);
    this.gl.drawArrays(this.gl.TRIANGLES, 0, this.vertexData.length / 3);
    this.gl.bindVertexArray(null);
  }
}
