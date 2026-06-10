export class Uniform {
  constructor(gl) {
    this.gl = gl;

    this.uniforms = [];
    this.uniformId = 0;
  }
  getUniformLocation(program, name) {
    const uniform = this.gl.getUniformLocation(program, name);
    const id = this.uniformId;
    this.uniforms.push([uniform, this.uniformId]);
    this.uniformId++;

    return { uniform, id };
  }
}
