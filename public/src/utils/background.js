import { MAT4 } from "./matrix.js";
export class BackGround {
  constructor(program, gl, src) {
    //intelisense webgl content
    /**
     * @type {WebGL2RenderingContext}
     */
    this.gl = gl;
    this.program = program;

    this.image = new Image();
    this.src = src;
    this.image.src = this.src;
    //this.loadImage();

    this.width = this.image.width;
    this.height = this.image.height;
    this.x = this.width / 2;
    this.y = this.height / 2;
    this.z = -1;
    this.mat4 = new MAT4();

    this.modelMatrix = this.mat4.identity();
    this.viewMatrix = this.mat4.identity();
    this.mvMatrix = this.mat4.identity();
    this.orthoMatrix = this.mat4.ortho(0, this.gl.canvas.width, 0, this.gl.canvas.height, -100, 100);
    this.mvoMatrix = this.mat4.identity();

    this.bgPosition = this.createPosition();
    this.uvData = this.createUVCoord();
    this.bgVAO = this.gl.createVertexArray();

    this.setupBackground();

    this.mat4.scale(this.modelMatrix, [this.width / 2, this.height / 2, 0]);
    this.mat4.translate(this.viewMatrix, [this.x, this.y, this.z]);

    this.matrixLoc = this.gl.getUniformLocation(this.program, "uMatrix");
  }
  setupBackground() {
    this.gl.bindVertexArray(this.bgVAO);

    const positionBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.bgPosition), this.gl.STATIC_DRAW);

    this.gl.vertexAttribPointer(0, 2, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(0);

    const texCoordBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, texCoordBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.uvData), this.gl.STATIC_DRAW);

    this.gl.vertexAttribPointer(1, 2, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(1);

    const texture = this.gl.createTexture();
    this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGB, this.width, this.height, 0, this.gl.RGB, this.gl.UNSIGNED_BYTE, this.image);

    this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, true);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);

    this.gl.bindVertexArray(null);

    this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGB, this.gl.RGB, this.gl.UNSIGNED_BYTE, this.image);
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
        -1,-1,
        -1,1,
        1,-1,
        1,-1,
        -1,1,
        1,1,
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
  update() {
    this.mat4.translate(this.viewMatrix, [this.x, this.y, this.z]);

    this.mat4.multiply(this.mvMatrix, this.viewMatrix, this.modelMatrix);
    this.mat4.multiply(this.mvoMatrix, this.orthoMatrix, this.mvMatrix);
  }
  draw() {
    this.gl.bindVertexArray(this.bgVAO);

    this.gl.uniformMatrix4fv(this.matrixLoc, false, this.mvoMatrix);
    this.gl.drawArrays(this.gl.TRIANGLES, 0, this.bgPosition.length / 2);

    this.gl.bindVertexArray(null);
  }
}
