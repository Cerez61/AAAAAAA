export class VertexAttrib {
  constructor(gl) {
    this.gl = gl;
  }
  bindVertex(index, size, type, normalized, stride, offset, divisor) {
    this.vertexAttribPointer(index, size, type, normalized, stride, offset);
    this.vertexAttribDivisor(index, divisor);
    this.enableVertexAttribArray(index);
  }
  bindMatrixVertex(index, size, type, normalized, stride, offset, divisor) {
    for (let i = 0; i < 4; i++) {
      const newIndex = index + i;
      const newOffset = offset * i;
      this.vertexAttribPointer(newIndex, size, type, normalized, stride, newOffset);
      this.vertexAttribDivisor(newIndex, divisor);
      this.enableVertexAttribArray(newIndex);
    }
  }
  vertexAttribPointer(index, size, type, normalized, stride, offset) {
    this.gl.vertexAttribPointer(index, size, type, normalized, stride, offset);
  }
  vertexAttribDivisor(index, divisor) {
    this.gl.vertexAttribDivisor(index, divisor);
  }
  enableVertexAttribArray(index) {
    this.gl.enableVertexAttribArray(index);
  }
}
