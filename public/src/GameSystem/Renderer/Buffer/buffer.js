export class Buffer {
  constructor(gl) {
    this.gl = gl;

    this.buffers = [];
    this.bufferId = 0;
  }
  createBuffer() {
    const buffer = this.gl.createBuffer();
    const id = this.bufferId;
    this.buffers.push([buffer, this.bufferId]);
    this.bufferId++;

    return { buffer, id };
  }
  bindData(buffer, data, typeEnum) {
    this.bindBuffer(buffer);
    this.bufferData(typeEnum, data);
  }
  bindSubData(buffer, data) {
    this.bindBuffer(buffer);
    this.bufferSubData(data);
  }
  bindBuffer(buffer) {
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
  }
  bufferData(typeEnum, data) {
    if (typeEnum === 0) this.gl.bufferData(this.gl.ARRAY_BUFFER, data, this.gl.STATIC_DRAW);
    else this.gl.bufferData(this.gl.ARRAY_BUFFER, data, this.gl.DYNAMIC_DRAW);
  }
  bufferSubData(data) {
    this.gl.bufferSubData(this.gl.ARRAY_BUFFER, 0, data);
  }
}
