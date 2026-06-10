export class VertexArray {
  constructor(gl) {
    this.gl = gl;

    this.buffers = [];
    this.bufferId = 0;
  }
  createVertexArray() {
    const vertexArray = this.gl.createVertexArray();
    const id = this.bufferId;
    this.buffers.push([vertexArray, this.bufferId]);
    this.bufferId++;

    return { vertexArray, id };
  }
}
