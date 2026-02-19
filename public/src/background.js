import { MAT4 } from "./utils/matrix.js";
export class BackGround {
  constructor(gameState, src) {
    //intelisense webgl content
    /**
     * @type {WebGL2RenderingContext}
     */
    this.gameState = gameState;
    this.gl = this.gameState.gl;
    this.program = this.gameState.program;

    this.image = new Image();
    this.src = src;
    this.image.src = this.src;
    //this.loadImage();

    this.width = this.image.width / 2;
    this.height = this.image.height / 2;
    this.x = this.width;
    this.y = this.height;
    this.z = -5;
    this.speed = 10;

    this.mat4 = new MAT4();

    this.modelMatrix = this.mat4.identity();
    this.viewMatrix = this.gameState.viewMatrix;
    this.mvMatrix = this.mat4.identity();
    this.orthoMatrix = this.gameState.orthoMatrix;
    this.mvoMatrix = this.mat4.identity();

    this.bgPosition = this.createPosition();
    this.uvData = this.createUVCoord();

    this.bgVAO = this.gl.createVertexArray();
    this.texture = this.gl.createTexture();

    this.texCoordBuffer = this.gl.createBuffer();
    this.positionBuffer = this.gl.createBuffer();

    this.setupBackground();

    this.mat4.scale(this.modelMatrix, [this.width, this.height, 0]);
    this.mat4.translate(this.viewMatrix, [this.x, this.y, this.z]);

    this.matrixLoc = this.gl.getUniformLocation(this.program, "uMatrix");
  }
  setupBackground() {
    this.gl.bindVertexArray(this.bgVAO);

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.bgPosition), this.gl.STATIC_DRAW);

    this.gl.vertexAttribPointer(0, 3, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(0);

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.texCoordBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.uvData), this.gl.STATIC_DRAW);

    this.gl.vertexAttribPointer(1, 2, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(1);

    this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGB, this.width, this.height, 0, this.gl.RGB, this.gl.UNSIGNED_BYTE, this.image);

    this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, true);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);

    this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGB, this.gl.RGB, this.gl.UNSIGNED_BYTE, this.image);

    this.gl.bindVertexArray(null);
  }
  createUVCoord() {
    /* prettier-ignore */
    return [
        0,0,
        0,1,
        1,0,
        1,0,
        0,1,
        1,1,
    ]
  }
  createPosition() {
    /* prettier-ignore */
    return [
        -1,-1,1,
        -1,1,1,
        1,-1,1,
        1,-1,1,
        -1,1,1,
        1,1,1
    ]
  }
  loadImage() {
    new Promise((resolve) => {
      this.image.addEventListener("load", () => {
        resolve(this.image);
      });
      this.image.src = this.src;
    });
  }
  gameStateUpdateTake() {
    this.viewMatrix = this.gameState.viewMatrix;
  }
  update() {
    this.gameStateUpdateTake();
    this.mat4.translate(this.modelMatrix, [this.x, this.y, this.z]);
  }
  draw() {
    this.gl.bindVertexArray(this.bgVAO);

    this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);

    this.mat4.multiply(this.mvMatrix, this.viewMatrix, this.modelMatrix);
    this.mat4.multiply(this.mvoMatrix, this.orthoMatrix, this.mvMatrix);

    this.gl.uniformMatrix4fv(this.matrixLoc, false, this.mvoMatrix);
    this.gl.drawArrays(this.gl.TRIANGLES, 0, this.bgPosition.length / 3);

    this.gl.bindVertexArray(null);
  }
}
