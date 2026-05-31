import { collisionVSS, collisionFSS } from "./shaders/collisionShader.js";
import { qtVSS, qtFSS } from "./shaders/qtShader.js";
import { gameVSS, gameFSS } from "./shaders/shaders.js";

export class Renderer {
  constructor(gameData) {
    //intelisense webgl content
    /** @type {HTMLCanvasElement} */
    this.gameCanvas = gameCanvas;
    this.gl = this.gameCanvas.getContext("webgl2");
    this.checkWebGL();

    this.CANVAS_WIDTH = gameCanvas.width = window.innerWidth;
    this.CANVAS_HEIGHT = gameCanvas.height = window.innerHeight;

    this.gameVS = this.gl.createShader(this.gl.VERTEX_SHADER);
    this.gameFS = this.gl.createShader(this.gl.FRAGMENT_SHADER);
    this.collisionVS = this.gl.createShader(this.gl.VERTEX_SHADER);
    this.collisionFS = this.gl.createShader(this.gl.FRAGMENT_SHADER);
    this.qtVS = this.gl.createShader(this.gl.VERTEX_SHADER);
    this.qtFS = this.gl.createShader(this.gl.FRAGMENT_SHADER);

    this.program = this.gl.createProgram();
    this.collisionProgram = this.gl.createProgram();
    this.qtProgram = this.gl.createProgram();

    this.rendererVAO = this.gl.createVertexArray();
    this.collisionVAO = this.gl.createVertexArray();
    this.qtVAO = this.gl.createVertexArray();

    this.collisionBuffer = this.gl.createBuffer();
    this.positionBuffer = this.gl.createBuffer();
    this.uvBuffer = this.gl.createBuffer();
    this.uvRectBuffer = this.gl.createBuffer();
    this.matrixBuffer = this.gl.createBuffer();
    this.qtMatrixBuffer = this.gl.createBuffer();
    this.textureBuffer = this.gl.createTexture();
    this.spriteAtlasDepthBuffer = this.gl.createBuffer();
    this.spriteAtlasSizeBuffer = this.gl.createBuffer();
    this.outlineColorBuffer = this.gl.createBuffer();

    this.indexBuffer = this.gl.createBuffer();

    this.setup();

    this.viewMatrixLoc = this.gl.getUniformLocation(this.program, "uViewMatrix");
    this.orthoMatrixLoc = this.gl.getUniformLocation(this.program, "uOrthoMatrix");

    this.collisionViewLoc = this.gl.getUniformLocation(this.collisionProgram, "uViewMatrix");
    this.collisionOrthoLoc = this.gl.getUniformLocation(this.collisionProgram, "uOrthoMatrix");

    this.qtViewLoc = this.gl.getUniformLocation(this.qtProgram, "uViewMatrix");
    this.qtOrthoLoc = this.gl.getUniformLocation(this.qtProgram, "uOrthoMatrix");

    this.globalData = gameData[0];
    this.instanceData = gameData[1];
    this.assetData = gameData[2];

    this.gameDataGive();
  }
  checkWebGL() {
    if (!this.gl) checkWebGL.innerHTML = "Your Browser Doesn't Support WeblGL2";
    else checkWebGL.innerHTML = "Your Browser Supports WeblGL2";
  }
  gameDataGive() {
    this.globalData.gl = this.gl;
    this.globalData.program = this.program;
  }
  setup() {
    this.initProgram(this.program, this.gameVS, this.gameFS, gameVSS, gameFSS);
    this.initProgram(this.collisionProgram, this.collisionVS, this.collisionFS, collisionVSS, collisionFSS);
    this.initProgram(this.qtProgram, this.qtVS, this.qtFS, qtVSS, qtFSS);
  }
  initProgram(program, vs, fs, vss, fss) {
    this.gl.viewport(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);

    //Vertex Shader
    this.gl.shaderSource(vs, vss);
    this.gl.compileShader(vs);
    if (!this.gl.getShaderParameter(vs, this.gl.COMPILE_STATUS)) {
      console.error("Vertex Shader Error:", this.gl.getShaderInfoLog(vs));
    }
    //Fragment Shader
    this.gl.shaderSource(fs, fss);
    this.gl.compileShader(fs);
    if (!this.gl.getShaderParameter(fs, this.gl.COMPILE_STATUS)) {
      console.error("Fragment Shader Error:", this.gl.getShaderInfoLog(fs));
    }
    //Attach Shader to Program
    this.gl.attachShader(program, vs);
    this.gl.attachShader(program, fs);

    //Run Program
    this.gl.linkProgram(program);
    this.gl.useProgram(program);
    if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
      console.error("Program Link Error:", this.gl.getProgramInfoLog(program));
    }
    //Adjust Depth
    this.gl.enable(this.gl.DEPTH_TEST);

    this.gl.depthFunc(this.gl.LEQUAL);
    this.gl.enable(this.gl.BLEND);
    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
  }
  async init() {
    this.initGameBuffer();
    this.initCollisionBuffer();
    this.initQtBuffer();
  }
  initGameBuffer() {
    this.gl.bindVertexArray(this.rendererVAO);

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, this.instanceData.positionData, this.gl.DYNAMIC_DRAW);
    this.gl.vertexAttribPointer(0, 3, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(0);

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.spriteAtlasDepthBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, this.instanceData.spriteAtlasDepthData, this.gl.DYNAMIC_DRAW);
    this.gl.vertexAttribPointer(2, 1, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(2);
    this.gl.vertexAttribDivisor(2, 1);

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.matrixBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, this.instanceData.matrixData, this.gl.DYNAMIC_DRAW);
    this.gl.vertexAttribPointer(3, 4, this.gl.FLOAT, false, 64, 0);
    this.gl.vertexAttribPointer(4, 4, this.gl.FLOAT, false, 64, 16);
    this.gl.vertexAttribPointer(5, 4, this.gl.FLOAT, false, 64, 32);
    this.gl.vertexAttribPointer(6, 4, this.gl.FLOAT, false, 64, 48);
    this.gl.enableVertexAttribArray(3);
    this.gl.enableVertexAttribArray(4);
    this.gl.enableVertexAttribArray(5);
    this.gl.enableVertexAttribArray(6);
    this.gl.vertexAttribDivisor(3, 1);
    this.gl.vertexAttribDivisor(4, 1);
    this.gl.vertexAttribDivisor(5, 1);
    this.gl.vertexAttribDivisor(6, 1);

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.uvRectBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, this.instanceData.uvRectData, this.gl.DYNAMIC_DRAW);
    this.gl.vertexAttribPointer(7, 4, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(7);
    this.gl.vertexAttribDivisor(7, 1);

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.indexBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, this.instanceData.indexData, this.gl.STATIC_DRAW);
    this.gl.vertexAttribPointer(8, 1, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(8);
    this.gl.vertexAttribDivisor(8, 0);

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.spriteAtlasSizeBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, this.instanceData.spriteAtlasSizeData, this.gl.DYNAMIC_DRAW);
    this.gl.vertexAttribPointer(9, 2, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(9);
    this.gl.vertexAttribDivisor(9, this.instanceData.totalEntity);

    console.log(this.assetData);
    this.gl.bindTexture(this.gl.TEXTURE_2D_ARRAY, this.textureBuffer);
    this.gl.texStorage3D(this.gl.TEXTURE_2D_ARRAY, 1, this.gl.RGBA8, 512, 512, this.assetData.spriteAtlases.length);
    this.assetData.spriteAtlases.forEach((spriteAtlas, index) => {
      this.gl.texSubImage3D(
        this.gl.TEXTURE_2D_ARRAY,
        0,
        0,
        0,
        index,
        spriteAtlas.width,
        spriteAtlas.height,
        1,
        this.gl.RGBA,
        this.gl.UNSIGNED_BYTE,
        spriteAtlas,
      );
    });

    this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, true);
    this.gl.texParameteri(this.gl.TEXTURE_2D_ARRAY, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
    this.gl.texParameteri(this.gl.TEXTURE_2D_ARRAY, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);

    this.gl.bindVertexArray(null);
  }
  initCollisionBuffer() {
    this.gl.bindVertexArray(this.collisionVAO);

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.collisionBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, this.instanceData.collisionData, this.gl.DYNAMIC_DRAW);
    this.gl.vertexAttribPointer(0, 3, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(0);

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.outlineColorBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, this.instanceData.outlineColorData, this.gl.DYNAMIC_DRAW);
    this.gl.vertexAttribPointer(1, 1, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(1);
    this.gl.vertexAttribDivisor(1, 1);

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.matrixBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, this.instanceData.matrixData, this.gl.DYNAMIC_DRAW);

    this.gl.vertexAttribPointer(3, 4, this.gl.FLOAT, false, 64, 0);
    this.gl.vertexAttribPointer(4, 4, this.gl.FLOAT, false, 64, 16);
    this.gl.vertexAttribPointer(5, 4, this.gl.FLOAT, false, 64, 32);
    this.gl.vertexAttribPointer(6, 4, this.gl.FLOAT, false, 64, 48);
    this.gl.enableVertexAttribArray(3);
    this.gl.enableVertexAttribArray(4);
    this.gl.enableVertexAttribArray(5);
    this.gl.enableVertexAttribArray(6);
    this.gl.vertexAttribDivisor(3, 1);
    this.gl.vertexAttribDivisor(4, 1);
    this.gl.vertexAttribDivisor(5, 1);
    this.gl.vertexAttribDivisor(6, 1);

    this.gl.bindVertexArray(null);
  }
  initQtBuffer() {
    this.gl.bindVertexArray(this.qtVAO);

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.collisionBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, this.instanceData.collisionData, this.gl.DYNAMIC_DRAW);
    this.gl.vertexAttribPointer(0, 3, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(0);

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.qtMatrixBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, this.instanceData.qtMatrixData, this.gl.DYNAMIC_DRAW);

    this.gl.vertexAttribPointer(1, 4, this.gl.FLOAT, false, 64, 0);
    this.gl.vertexAttribPointer(2, 4, this.gl.FLOAT, false, 64, 16);
    this.gl.vertexAttribPointer(3, 4, this.gl.FLOAT, false, 64, 32);
    this.gl.vertexAttribPointer(4, 4, this.gl.FLOAT, false, 64, 48);
    this.gl.enableVertexAttribArray(1);
    this.gl.enableVertexAttribArray(2);
    this.gl.enableVertexAttribArray(3);
    this.gl.enableVertexAttribArray(4);
    this.gl.vertexAttribDivisor(1, 1);
    this.gl.vertexAttribDivisor(2, 1);
    this.gl.vertexAttribDivisor(3, 1);
    this.gl.vertexAttribDivisor(4, 1);

    this.gl.bindVertexArray(null);
  }
  draw() {
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.matrixBuffer);
    this.gl.bufferSubData(this.gl.ARRAY_BUFFER, 0, this.instanceData.matrixData);

    this.gl.useProgram(this.program);

    this.gl.bindVertexArray(this.rendererVAO);

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.spriteAtlasSizeBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, this.instanceData.spriteAtlasSizeData, this.gl.DYNAMIC_DRAW);
    this.gl.vertexAttribPointer(9, 2, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(9);
    this.gl.vertexAttribDivisor(9, this.instanceData.totalEntity);

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.spriteAtlasDepthBuffer);
    this.gl.bufferSubData(this.gl.ARRAY_BUFFER, 0, this.instanceData.spriteAtlasDepthData);

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.uvRectBuffer);
    this.gl.bufferSubData(this.gl.ARRAY_BUFFER, 0, this.instanceData.uvRectData);

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.spriteAtlasSizeBuffer);
    this.gl.bufferSubData(this.gl.ARRAY_BUFFER, 0, this.instanceData.spriteAtlasSizeData);

    this.gl.uniformMatrix4fv(this.viewMatrixLoc, false, this.instanceData.viewMatrix);
    this.gl.uniformMatrix4fv(this.orthoMatrixLoc, false, this.instanceData.orthoMatrix);

    this.gl.drawArraysInstanced(this.gl.TRIANGLES, 0, 6, this.instanceData.totalEntity);

    this.gl.bindVertexArray(null);

    this.gl.useProgram(this.collisionProgram);

    this.gl.bindVertexArray(this.collisionVAO);

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.outlineColorBuffer);
    this.gl.bufferSubData(this.gl.ARRAY_BUFFER, 0, this.instanceData.outlineColorData);

    this.gl.uniformMatrix4fv(this.collisionViewLoc, false, this.instanceData.viewMatrix);
    this.gl.uniformMatrix4fv(this.collisionOrthoLoc, false, this.instanceData.orthoMatrix);

    this.gl.drawArraysInstanced(this.gl.LINE_LOOP, 0, 4, this.instanceData.totalEntity);

    this.gl.bindVertexArray(null);

    this.gl.useProgram(this.qtProgram);

    this.gl.bindVertexArray(this.qtVAO);

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.qtMatrixBuffer);
    this.gl.bufferSubData(this.gl.ARRAY_BUFFER, 0, this.instanceData.qtMatrixData);
    /* this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.qtMatrixBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, this.instanceData.qtMatrixData, this.gl.DYNAMIC_DRAW);
 */
    this.gl.uniformMatrix4fv(this.qtViewLoc, false, this.instanceData.viewMatrix);
    this.gl.uniformMatrix4fv(this.qtOrthoLoc, false, this.instanceData.orthoMatrix);

    this.gl.drawArraysInstanced(this.gl.LINE_LOOP, 0, 4, this.instanceData.totalQtNode);

    this.gl.bindVertexArray(null);
  }
}
