import { gameVSS, gameFSS } from "../../shaders.js";
export class Renderer {
  constructor(gameData) {
    //intelisense webgl content
    /** @type {HTMLCanvasElement} */
    this.gameCanvas = gameCanvas;
    this.gl = this.gameCanvas.getContext("webgl2");
    this.checkWebGL();
    this.gameVS = this.gl.createShader(this.gl.VERTEX_SHADER);
    this.gameFS = this.gl.createShader(this.gl.FRAGMENT_SHADER);
    this.program = this.gl.createProgram();
    this.init();

    this.CANVAS_WIDTH = gameCanvas.width = window.innerWidth;
    this.CANVAS_HEIGHT = gameCanvas.height = window.innerHeight;
    this.gl.viewport(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);

    this.globalData = gameData[0];
    this.entityData = gameData[1];

    this.gameDataGive();

    /*
  console.log(gl.getShaderInfoLog(gameVS));
  console.log(gl.getShaderInfoLog(gameFS));
*/
  }
  checkWebGL() {
    if (!this.gl) checkWebGL.innerHTML = "Your Browser Doesn't Support WeblGL2";
    else checkWebGL.innerHTML = "Your Browser Supports WeblGL2";
  }
  gameDataGive() {
    this.globalData.gl = this.gl;
    this.globalData.program = this.program;
  }
  init() {
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
  draw() {
    //console.log(this.entityData.assetsPosition);
    console.log(this.entityData.assetsUVCoord);
  }
}
