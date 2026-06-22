export class Program {
  constructor(gl) {
    this.gl = gl;
    this.gameProgram = this.gl.createProgram();
    this.collisionProgram = this.gl.createProgram();
    this.qtProgram = this.gl.createProgram();
    this.programs = [];
    this.programId = 0;
  }
  createProgram() {
    const program = this.gl.createProgram();
    const id = this.programId;
    this.programs.push([program, this.programId]);
    this.programId++;

    return { program, id };
  }
}
