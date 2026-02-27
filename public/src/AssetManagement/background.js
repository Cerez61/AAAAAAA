import { Layer } from "./layerManagement.js";
import { MAT4 } from "../utils/matrix.js";
export class BackGround {
  constructor(gameState) {
    //intelisense webgl content
    /**
     * @type {WebGL2RenderingContext}
     */
    this.gameState = gameState;
    this.gl = this.gameState.gl;
    this.program = this.gameState.program;

    this.layers = [];

    this.texture;
    this.textureJSON;

    this.mat4 = new MAT4();

    this.modelMatrix = this.mat4.identity();
    this.viewMatrix = this.gameState.viewMatrix;
    this.mvMatrix = this.mat4.identity();
    this.orthoMatrix = this.gameState.orthoMatrix;
    this.mvoMatrix = this.mat4.identity();

    this.bgPosition = [];
    this.uvPosition = [];

    this.bgVAO = this.gl.createVertexArray();
    this.textureBuffer = this.gl.createTexture();

    this.texCoordBuffer = this.gl.createBuffer();
    this.positionBuffer = this.gl.createBuffer();

    this.matrixLoc = this.gl.getUniformLocation(this.program, "uMatrix");
  }

  setupBackground() {
    this.gl.bindVertexArray(this.bgVAO);

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.bgPosition), this.gl.STATIC_DRAW);

    this.gl.vertexAttribPointer(0, 3, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(0);

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.texCoordBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.uvPosition), this.gl.STATIC_DRAW);

    this.gl.vertexAttribPointer(1, 2, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(1);

    this.gl.bindTexture(this.gl.TEXTURE_2D, this.textureBuffer);
    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, this.texture);

    this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, true);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);

    this.gl.bindVertexArray(null);
  }
  async createUVCoord() {
    /* prettier-ignore */
    await this.layers.forEach(layer => {
      this.addUVCoord(layer.assets);
    });
  }
  async createPosition() {
    /* prettier-ignore */
    await this.layers.forEach(layer => {
      this.addPosition(layer.assets);
    });
  }
  async addPosition(assets) {
    await assets.forEach((asset) => this.bgPosition.push(...asset.position));
  }
  async addUVCoord(assets) {
    await assets.forEach((asset) => this.uvPosition.push(...asset.uvCoord));
  }
  addAssets(spriteAtlasName, spriteAtlasJSON, frame, worldPosition) {
    const z = worldPosition[2];
    const layer = this.layers.find((layer) => layer.z === z);

    if (!layer) {
      this.addLayers(z);
    }

    this.layers[0].addAsset(spriteAtlasName, spriteAtlasJSON, frame, worldPosition);
  }
  addLayers(depth) {
    this.layers.push(new Layer(depth));

    this.layers.sort((a, b) => a.z - b.z);
  }

  gameStateUpdateTake() {
    this.viewMatrix = this.gameState.viewMatrix;
  }
  async fetchSpriteSheet(sprite) {
    const response = await fetch(sprite);

    const blop = await response.blob();

    this.texture = await createImageBitmap(blop);
  }
  async fetchSpriteSheetJSON(json) {
    await fetch(json)
      .then((res) => res.json())
      .then((data) => {
        this.textureJSON = data;
      });
  }
  async init() {
    await this.fetchSpriteSheet("./src/assets/texture.png");
    await this.fetchSpriteSheetJSON("./src/assets/texture.json");

    this.addAssets("texture.png", "texture.json", this.textureJSON.frames["lamp"].frame, [100, 450, 1]);
    this.addAssets("texture.png", "texture.json", this.textureJSON.frames["lamp"].frame, [500, 450, 1]);
    this.addAssets("texture.png", "texture.json", this.textureJSON.frames["lamp"].frame, [900, 450, 1]);
    this.addAssets("texture.png", "texture.json", this.textureJSON.frames["lamp"].frame, [1300, 450, 1]);
    this.addAssets("texture.png", "texture.json", this.textureJSON.frames["cloud"].frame, [500, 100, 1]);
    this.addAssets("texture.png", "texture.json", this.textureJSON.frames["cloud"].frame, [700, 200, 1]);
    this.addAssets("texture.png", "texture.json", this.textureJSON.frames["cloud"].frame, [900, 300, 1]);
    this.addAssets("texture.png", "texture.json", this.textureJSON.frames["cloud"].frame, [1100, 400, 1]);

    this.createPosition();
    this.createUVCoord();
    await this.setupBackground();
  }
  update() {
    this.gameStateUpdateTake();
  }
  draw() {
    this.gl.bindVertexArray(this.bgVAO);

    this.gl.bindTexture(this.gl.TEXTURE_2D, this.textureBuffer);

    this.mat4.multiply(this.mvMatrix, this.viewMatrix, this.modelMatrix);
    this.mat4.multiply(this.mvoMatrix, this.orthoMatrix, this.mvMatrix);

    this.gl.uniformMatrix4fv(this.matrixLoc, false, this.mvoMatrix);
    this.gl.drawArrays(this.gl.TRIANGLES, 0, this.bgPosition.length / 3);

    this.gl.bindVertexArray(null);
  }
}
