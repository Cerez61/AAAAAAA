import { gameVSS } from "./VertexShaders/gameShader.js";
import { gameFSS } from "./FragmentShaders/gameShader.js";
import { collisionVSS } from "./VertexShaders/collisionShader.js";
import { collisionFSS } from "./FragmentShaders/collisionShader.js";
import { qtVSS } from "./VertexShaders/qtShader.js";
import { qtFSS } from "./FragmentShaders/qtShader.js";
export class Shader {
  constructor(gl) {
    this.gl = gl;

    this.gameVSS = gameVSS;
    this.gameFSS = gameFSS;
    this.collisionVSS = collisionVSS;
    this.collisionFSS = collisionFSS;
    this.qtVSS = qtVSS;
    this.qtFSS = qtFSS;

    this.gameVS = this.gl.createShader(this.gl.VERTEX_SHADER);
    this.collisionVS = this.gl.createShader(this.gl.VERTEX_SHADER);
    this.qtVS = this.gl.createShader(this.gl.VERTEX_SHADER);

    this.gameFS = this.gl.createShader(this.gl.FRAGMENT_SHADER);
    this.collisionFS = this.gl.createShader(this.gl.FRAGMENT_SHADER);
    this.qtFS = this.gl.createShader(this.gl.FRAGMENT_SHADER);
  }

  initGameShader() {
    const vs = this.gameVS;
    const fs = this.gameFS;
    const vss = this.gameVSS;
    const fss = this.gameFSS;
    return { vs, fs, vss, fss };
  }
  initCollisionShader() {
    const vs = this.collisionVS;
    const fs = this.collisionFS;
    const vss = this.collisionVSS;
    const fss = this.collisionFSS;
    return { vs, fs, vss, fss };
  }
  initQtShader() {
    const vs = this.qtVS;
    const fs = this.qtFS;
    const vss = this.qtVSS;
    const fss = this.qtFSS;
    return { vs, fs, vss, fss };
  }
}
