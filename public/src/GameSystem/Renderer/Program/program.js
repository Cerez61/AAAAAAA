export class Program {
  constructor(gl) {
    this.gl = gl;
    this.gameProgram = this.gl.createProgram();
    this.collisionProgram = this.gl.createProgram();
    this.qtProgram = this.gl.createProgram();
  }
  initGameProgram() {
    return this.gameProgram;
  }
  initCollisionProgram() {
    return this.collisionProgram;
  }
  initQtProgram() {
    return this.qtProgram;
  }
}
