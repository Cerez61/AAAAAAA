export class Player {
  constructor(gl, mat4, x, y, z) {
    this.gl = gl;
    this.mat4 = mat4;
    this.x = x;
    this.y = y;
    this.z = z;

    this.orthoMatrix = this.mat4.ortho(0, this.gl.canvas.width, 0, this.gl.canvas.height, -100, 100);
  }
}
