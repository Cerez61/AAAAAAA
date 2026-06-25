import { Shader } from "./Shader/shader.js";
import { Program } from "./Program/program.js";
import { Buffer } from "./Buffer/buffer.js";
import { VertexArray } from "./Buffer/vertexArray.js";
import { Texture } from "./Buffer/texture.js";
import { Uniform } from "./Buffer/uniform.js";
import { VertexAttrib } from "./VertexAttrib/vertexAttrib.js";

export class Renderer {
  constructor(gameData) {
    //intelisense webgl content
    /** @type {HTMLCanvasElement} */
    this.gameCanvas = gameCanvas;

    this.CANVAS_WIDTH = gameCanvas.width = window.innerWidth;
    this.CANVAS_HEIGHT = gameCanvas.height = window.innerHeight;

    this.gl = this.gameCanvas.getContext("webgl2");
    this.checkWebGL();

    this.globalData = gameData[0];
    this.instanceData = gameData[1];
    this.assetData = gameData[2];

    this.shader = new Shader(this.gl);
    this.program = new Program(this.gl);
    this.buffer = new Buffer(this.gl);
    this.vertexArray = new VertexArray(this.gl);
    this.texture = new Texture(this.gl);
    this.uniform = new Uniform(this.gl);
    this.vertexAttrib = new VertexAttrib(this.gl);

    this.gameShader = this.shader.initGameShader();
    this.collisionShader = this.shader.initCollisionShader();
    this.qtShader = this.shader.initQtShader();

    this.gameProgram = this.program.createProgram();
    this.collisionProgram = this.program.createProgram();
    this.qtProgram = this.program.createProgram();

    this.rendererVAO = this.vertexArray.createVertexArray();
    this.collisionVAO = this.vertexArray.createVertexArray();
    this.qtVAO = this.vertexArray.createVertexArray();

    this.collisionBuffer = this.buffer.createBuffer();
    this.positionBuffer = this.buffer.createBuffer();
    this.uvBuffer = this.buffer.createBuffer();
    this.uvRectBuffer = this.buffer.createBuffer();
    this.matrixBuffer = this.buffer.createBuffer();
    this.qtMatrixBuffer = this.buffer.createBuffer();
    this.spriteAtlasDepthBuffer = this.buffer.createBuffer();
    this.spriteAtlasSizeBuffer = this.buffer.createBuffer();
    this.outlineColorBuffer = this.buffer.createBuffer();

    this.indexBuffer = this.buffer.createBuffer();

    this.textureBuffer = this.texture.createTexture();

    this.setup();

    this.viewMatrixLoc = this.uniform.getUniformLocation(this.gameProgram.program, "uViewMatrix");
    this.orthoMatrixLoc = this.uniform.getUniformLocation(this.gameProgram.program, "uOrthoMatrix");

    this.collisionViewLoc = this.uniform.getUniformLocation(this.collisionProgram.program, "uViewMatrix");
    this.collisionOrthoLoc = this.uniform.getUniformLocation(this.collisionProgram.program, "uOrthoMatrix");

    this.qtViewLoc = this.uniform.getUniformLocation(this.qtProgram.program, "uViewMatrix");
    this.qtOrthoLoc = this.uniform.getUniformLocation(this.qtProgram.program, "uOrthoMatrix");

    this.gameDataGive();
  }
  checkWebGL() {
    if (!this.gl) checkWebGL.innerHTML = "Your Browser Doesn't Support WeblGL2";
    else checkWebGL.innerHTML = "Your Browser Supports WeblGL2";
  }
  gameDataGive() {
    this.globalData.gl = this.gl;
  }
  setup() {
    this.initProgram(this.gameProgram.program, this.gameShader);
    this.initProgram(this.collisionProgram.program, this.collisionShader);
    this.initProgram(this.qtProgram.program, this.qtShader);
  }
  initProgram(program, shader) {
    this.gl.viewport(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);

    //Vertex Shader
    this.gl.shaderSource(shader.vs, shader.vss);
    this.gl.compileShader(shader.vs);
    /* if (!this.gl.getShaderParameter(shader.vs, this.gl.COMPILE_STATUS)) {
      console.error("Vertex Shader Error:", this.gl.getShaderInfoLog(shader.vs));
    } */
    //Fragment Shader
    this.gl.shaderSource(shader.fs, shader.fss);
    this.gl.compileShader(shader.fs);
    /* if (!this.gl.getShaderParameter(shader.fs, this.gl.COMPILE_STATUS)) {
      console.error("Fragment Shader Error:", this.gl.getShaderInfoLog(shader.fs));
    } */
    //Attach Shader to Program
    this.gl.attachShader(program, shader.vs);
    this.gl.attachShader(program, shader.fs);

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
    this.gl.bindVertexArray(this.rendererVAO.vertexArray);

    this.buffer.bindData(this.positionBuffer.buffer, this.instanceData.positionData, 1);
    this.vertexAttrib.bindVertex(0, 3, this.gl.FLOAT, false, 0, 0, 0);

    this.buffer.bindData(this.spriteAtlasDepthBuffer.buffer, this.instanceData.spriteAtlasDepthData, 1);
    this.vertexAttrib.bindVertex(2, 1, this.gl.FLOAT, false, 0, 0, 1);

    this.buffer.bindData(this.matrixBuffer.buffer, this.instanceData.matrixData, 1);
    this.vertexAttrib.bindMatrixVertex(3, 4, this.gl.FLOAT, false, 64, 16, 1);

    this.buffer.bindData(this.uvRectBuffer.buffer, this.instanceData.uvRectData, 1);
    this.vertexAttrib.bindVertex(7, 4, this.gl.FLOAT, false, 0, 0, 1);

    this.buffer.bindData(this.indexBuffer.buffer, this.instanceData.indexData, 1);
    this.vertexAttrib.bindVertex(8, 1, this.gl.FLOAT, false, 0, 0, 0);

    this.buffer.bindData(this.spriteAtlasSizeBuffer.buffer, this.instanceData.spriteAtlasSizeData, 1);
    this.vertexAttrib.bindVertex(9, 2, this.gl.FLOAT, false, 0, 0, this.instanceData.totalEntity);

    this.texture.bindTexture(this.textureBuffer.texture, this.assetData.spriteAtlases);

    this.gl.bindVertexArray(null);
  }
  initCollisionBuffer() {
    this.gl.bindVertexArray(this.collisionVAO.vertexArray);

    this.buffer.bindData(this.collisionBuffer.buffer, this.instanceData.collisionData, 1);
    this.vertexAttrib.bindVertex(0, 3, this.gl.FLOAT, false, 0, 0, 0);

    this.buffer.bindData(this.outlineColorBuffer.buffer, this.instanceData.outlineColorData, 1);
    this.vertexAttrib.bindVertex(1, 1, this.gl.FLOAT, false, 0, 0, 1);

    this.buffer.bindData(this.matrixBuffer.buffer, this.instanceData.matrixData, 1);
    this.vertexAttrib.bindMatrixVertex(3, 4, this.gl.FLOAT, false, 64, 16, 1);

    this.gl.bindVertexArray(null);
  }
  initQtBuffer() {
    this.gl.bindVertexArray(this.qtVAO.vertexArray);

    this.buffer.bindData(this.collisionBuffer.buffer, this.instanceData.collisionData, 1);
    this.vertexAttrib.bindVertex(0, 3, this.gl.FLOAT, false, 0, 0, 0);

    this.buffer.bindData(this.qtMatrixBuffer.buffer, this.instanceData.qtMatrixData, 1);
    this.vertexAttrib.bindMatrixVertex(1, 4, this.gl.FLOAT, false, 64, 16, 1);

    this.gl.bindVertexArray(null);
  }
  draw() {
    this.buffer.bindSubData(this.matrixBuffer.buffer, this.instanceData.matrixData);

    this.gl.useProgram(this.gameProgram.program);

    this.gl.bindVertexArray(this.rendererVAO.vertexArray);

    this.buffer.bindData(this.spriteAtlasSizeBuffer.buffer, this.instanceData.spriteAtlasSizeData, 1);
    this.vertexAttrib.bindVertex(9, 2, this.gl.FLOAT, false, 0, 0, this.instanceData.totalEntity);

    this.buffer.bindSubData(this.spriteAtlasDepthBuffer.buffer, this.instanceData.spriteAtlasDepthData);
    this.buffer.bindSubData(this.uvRectBuffer.buffer, this.instanceData.uvRectData);
    this.buffer.bindSubData(this.spriteAtlasSizeBuffer.buffer, this.instanceData.spriteAtlasSizeData);

    this.uniform.uniformMatrix4fv(this.viewMatrixLoc.uniform, this.instanceData.viewMatrix);
    this.uniform.uniformMatrix4fv(this.orthoMatrixLoc.uniform, this.instanceData.orthoMatrix);

    this.gl.drawArraysInstanced(this.gl.TRIANGLES, 0, 6, this.instanceData.totalEntity);

    this.gl.bindVertexArray(null);

    this.gl.useProgram(this.collisionProgram.program);

    this.gl.bindVertexArray(this.collisionVAO.vertexArray);

    this.buffer.bindSubData(this.outlineColorBuffer.buffer, this.instanceData.outlineColorData);

    this.gl.uniformMatrix4fv(this.collisionViewLoc.uniform, false, this.instanceData.viewMatrix);
    this.gl.uniformMatrix4fv(this.collisionOrthoLoc.uniform, false, this.instanceData.orthoMatrix);

    this.gl.drawArraysInstanced(this.gl.LINE_LOOP, 0, 4, this.instanceData.totalEntity);

    this.gl.bindVertexArray(null);

    this.gl.useProgram(this.qtProgram.program);

    this.gl.bindVertexArray(this.qtVAO.vertexArray);

    this.buffer.bindSubData(this.qtMatrixBuffer.buffer, this.instanceData.qtMatrixData);

    this.gl.uniformMatrix4fv(this.qtViewLoc.uniform, false, this.instanceData.viewMatrix);
    this.gl.uniformMatrix4fv(this.qtOrthoLoc.uniform, false, this.instanceData.orthoMatrix);

    this.gl.drawArraysInstanced(this.gl.LINE_LOOP, 0, 4, this.instanceData.totalQtNode);

    this.gl.bindVertexArray(null);
  }
}
