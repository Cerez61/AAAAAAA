export class Player {
  constructor(gl, mat4, x, y, z) {
    //intelisense webgl content
    /**
     * @type {WebGL2RenderingContext}
     */

    this.gl = gl;
    this.mat4 = mat4;
    this.x = x;
    this.y = y;
    this.z = z;

    this.vertexData = this.createVertexData();

    this.playerVAO = this.gl.createVertexArray();
    this.gl.bindVertexArray(this.playerVAO);

    this.vertexBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.vertexData), this.gl.STATIC_DRAW);
    this.gl.vertexAttribPointer(0, 3, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(0);
    this.gl.bindVertexArray(null);

    this.viewMatrix = this.mat4.identity();
    this.mvMatrix = this.mat4.identity();
    this.orthoMatrix = this.mat4.ortho(0, this.gl.canvas.width, 0, this.gl.canvas.height, -100, 100);
    this.finalMatrix = this.mat4.identity();
  }
  createVertexData() {
    /* prettier-ignore */
    return [
        // v stands for vertex
        // v1
        -10,-10,1,
        // v2
        -10,10,1,
        // v3
        10,-10,1,
        // v3
        10,-10,1,
        // v2
        -10,10,1,
        // v4
        10,10,1
    ];
  }
  update() {
    //I will multiply view and model matrix and save as mvMatrix
    //after that ı'll multiply mvMatrix and orthoMatrix.this'll give me finalMatrix
    //and send this finalMatrix to the uniform data
  }
}
