import { gameVSS, gameFSS } from "../../shaders.js";

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
    this.program = this.gl.createProgram();

    this.rendererVAO = this.gl.createVertexArray();
    this.positionBuffer = this.gl.createBuffer();
    this.uvBuffer = this.gl.createBuffer();
    this.uvRectBuffer = this.gl.createBuffer();
    this.matrixBuffer = this.gl.createBuffer();
    this.textureBuffer = this.gl.createTexture();
    this.spriteAtlasDepthBuffer = this.gl.createBuffer();
    this.spriteAtlasSizeBuffer = this.gl.createBuffer();

    this.indexBuffer = this.gl.createBuffer();

    this.init();

    this.viewMatrixLoc = this.gl.getUniformLocation(this.program, "uViewMatrix");
    this.orthoMatrixLoc = this.gl.getUniformLocation(this.program, "uOrthoMatrix");

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
  init() {
    this.gl.viewport(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);

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
  initBuffer() {
    this.gl.bindVertexArray(this.rendererVAO);

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, this.instanceData.positionData, this.gl.DYNAMIC_DRAW);
    this.gl.vertexAttribPointer(0, 3, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(0);

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.uvBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, this.instanceData.uvData, this.gl.DYNAMIC_DRAW);
    this.gl.vertexAttribPointer(1, 2, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(1);

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

    this.gl.bindTexture(this.gl.TEXTURE_2D_ARRAY, this.textureBuffer);
    this.gl.texStorage3D(this.gl.TEXTURE_2D_ARRAY, 1, this.gl.RGBA8, 256, 256, this.assetData.spriteAtlases.length);
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
  update() {}
  draw() {
    this.gl.bindVertexArray(this.rendererVAO);

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, this.instanceData.positionData, this.gl.DYNAMIC_DRAW);

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.uvBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, this.instanceData.uvData, this.gl.DYNAMIC_DRAW);

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.spriteAtlasDepthBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, this.instanceData.spriteAtlasDepthData, this.gl.DYNAMIC_DRAW);

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.matrixBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, this.instanceData.matrixData, this.gl.DYNAMIC_DRAW);

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.uvRectBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, this.instanceData.uvRectData, this.gl.DYNAMIC_DRAW);

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.indexBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, this.instanceData.indexData, this.gl.STATIC_DRAW);

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.spriteAtlasSizeBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, this.instanceData.spriteAtlasSizeData, this.gl.DYNAMIC_DRAW);

    this.gl.bindTexture(this.gl.TEXTURE_2D_ARRAY, this.textureBuffer);

    this.gl.uniformMatrix4fv(this.viewMatrixLoc, false, this.instanceData.viewMatrix);
    this.gl.uniformMatrix4fv(this.orthoMatrixLoc, false, this.instanceData.orthoMatrix);

    this.gl.drawArraysInstanced(this.gl.TRIANGLES, 0, 6, this.instanceData.totalEntity);

    this.gl.bindVertexArray(null);
  }
}
