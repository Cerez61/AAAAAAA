import { gameVSS, gameFSS } from "../../shaders.js";
export class Renderer {
  constructor(gameData) {
    //intelisense webgl content
    /** @type {HTMLCanvasElement} */
    this.gameCanvas = gameCanvas;
    this.gl = this.gameCanvas.getContext("webgl2");
    this.gameVS = this.gl.createShader(this.gl.VERTEX_SHADER);
    this.gameFS = this.gl.createShader(this.gl.FRAGMENT_SHADER);
    this.program = this.gl.createProgram();
    this.initialize();

    this.CANVAS_WIDTH = gameCanvas.width = window.innerWidth;
    this.CANVAS_HEIGHT = gameCanvas.height = window.innerHeight;
    this.gl.viewport(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);

    this.globalData = gameData;

    this.gameDataGive();

    /*
  console.log(gl.getShaderInfoLog(gameVS));
  console.log(gl.getShaderInfoLog(gameFS));
*/
  }
  initialize() {
    //Vertex Shader
    this.gl.shaderSource(this.gameVS, gameVSS);
    this.gl.compileShader(this.gameVS);

    //Fragment Shader
    this.gl.shaderSource(this.gameFS, gameFSS);
    this.gl.compileShader(this.gameFS);

    //Attach Shader to Program
    this.gl.attachShader(this.program, this.gameVS);
    this.gl.attachShader(this.program, this.gameFS);

    //Run Program
    this.gl.linkProgram(this.program);
    this.gl.useProgram(this.program);

    //Adjust Depth
    this.gl.enable(this.gl.DEPTH_TEST);

    this.gl.depthFunc(this.gl.LEQUAL);
    this.gl.enable(this.gl.BLEND);
    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
  }
  gameDataGive() {
    this.globalData.gl = this.gl;
    this.globalData.program = this.program;
  }
}
