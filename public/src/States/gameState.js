export class GameState {
  constructor(program, gl) {
    //WebGL Data
    this.program = program;
    this.gl = gl;

    //Player Data
    this.playerPosition = [0, 0];

    //Camera Data
    this.viewMatrix = [];
    this.orthoMatrix = [];

    //Input Data
    this.keys = [];
    this.lastPressKeys = [];
    this.lastReleaseKeys = [];
  }
}
