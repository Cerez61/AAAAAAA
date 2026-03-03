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

    this.spriteAtlases = [];
    this.spriteAtlasesJSON = [];

    this.mat4 = new MAT4();

    this.modelMatrix = this.mat4.identity();
    this.viewMatrix = this.gameState.viewMatrix;
    this.mvMatrix = this.mat4.identity();
    this.orthoMatrix = this.gameState.orthoMatrix;
    this.mvoMatrix = this.mat4.identity();

    this.bgPosition = [];
    this.uvPosition = [];
    this.spriteAtlasDepth = [];

    this.bgVAO = this.gl.createVertexArray();
    this.textureBuffer = this.gl.createTexture();

    this.texCoordBuffer = this.gl.createBuffer();
    this.positionBuffer = this.gl.createBuffer();
    this.spriteAtlasDepthBuffer = this.gl.createBuffer();

    this.matrixLoc = this.gl.getUniformLocation(this.program, "uMatrix");
  }

  setupBackground() {
    this.gl.bindVertexArray(this.bgVAO);

    //Texture World XYZ
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.bgPosition), this.gl.STATIC_DRAW);

    this.gl.vertexAttribPointer(0, 3, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(0);

    //Texture UV Coord
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.texCoordBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.uvPosition), this.gl.STATIC_DRAW);

    this.gl.vertexAttribPointer(1, 2, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(1);

    //Texture Depth Value
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.spriteAtlasDepthBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.spriteAtlasDepth), this.gl.STATIC_DRAW);

    this.gl.vertexAttribPointer(2, 1, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(2);

    //Texture
    this.gl.bindTexture(this.gl.TEXTURE_2D_ARRAY, this.textureBuffer);
    this.gl.texStorage3D(this.gl.TEXTURE_2D_ARRAY, 1, this.gl.RGBA8, 256, 256, this.spriteAtlases.length);
    this.addSpriteAtlas(this.spriteAtlases);

    this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, true);
    this.gl.texParameteri(this.gl.TEXTURE_2D_ARRAY, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
    this.gl.texParameteri(this.gl.TEXTURE_2D_ARRAY, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);

    this.gl.bindVertexArray(null);
  }
  createUVCoord() {
    /* prettier-ignore */
    this.layers.forEach(layer => {
      this.addUVCoord(layer.assets);
    });
  }
  createPosition() {
    /* prettier-ignore */
    this.layers.forEach(layer => {
      this.addPosition(layer.assets);
    });
  }
  createDepthValue() {
    this.layers.forEach((layer) => {
      this.addDepthValue(layer.assets);
    });
  }
  addSpriteAtlas(spriteAtlases) {
    spriteAtlases.forEach((spriteAtlas, index) => {
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
  }
  async addPosition(assets) {
    await assets.forEach((asset) => this.bgPosition.push(...asset.position));
  }
  async addUVCoord(assets) {
    await assets.forEach((asset) => this.uvPosition.push(...asset.uvCoord));
  }
  async addDepthValue(assets) {
    const r = (a) => {
      return [a, a, a, a, a, a];
    };
    await assets.forEach((asset) => {
      this.spriteAtlasDepth.push(...r(asset.textureDepth));
    });
  }

  changeMetaJSON() {
    this.spriteAtlasesJSON.forEach((jsonFile, index) => {
      jsonFile.meta.size.d = index;
    });
  }
  findAssetsFile(assetName) {
    const targetJSON = this.spriteAtlasesJSON.find((jsonFile) => {
      return jsonFile.frames && jsonFile.frames[assetName];
    });
    return targetJSON;
  }
  addAssets(assetName, worldPosition) {
    const targetJSON = this.findAssetsFile(assetName);
    if (!targetJSON) return;

    const z = worldPosition[2];
    const layer = this.layers.find((layer) => layer.z === z);

    if (!layer) {
      this.addLayers(z);
    }

    this.layers[0].addAsset(targetJSON.meta.image, "a.json", targetJSON.meta.size, targetJSON.frames[assetName].frame, worldPosition);
  }
  addLayers(depth) {
    this.layers.push(new Layer(depth));

    this.layers.sort((a, b) => a.z - b.z);
  }

  async fetchSpriteSheet(sprite) {
    const response = await fetch(sprite);

    const blop = await response.blob();

    this.spriteAtlases.push(await createImageBitmap(blop));
  }
  async fetchSpriteSheetJSON(json) {
    await fetch(json)
      .then((res) => res.json())
      .then((data) => {
        this.spriteAtlasesJSON.push(data);
      });
  }
  async init() {
    const date = Date.now();

    await this.fetchSpriteSheet("./src/assets/a.png");
    await this.fetchSpriteSheet("./src/assets/Cizgi.png");
    await this.fetchSpriteSheet("./src/assets/kucukKiz.png");

    await this.fetchSpriteSheetJSON("./src/assets/a.json");
    await this.fetchSpriteSheetJSON("./src/assets/Cizgi.json");
    await this.fetchSpriteSheetJSON("./src/assets/kucukKiz.json");

    this.changeMetaJSON();

    for (let i = 0; i < 1000; i++) {
      this.addAssets("kk", [i * 100, 0, 2]);
      this.addAssets("sea", [i * 200, 100, 2]);
      this.addAssets("greenBg", [i * 200, 200, 2]);
    }

    this.createPosition();
    this.createUVCoord();
    this.createDepthValue();
    this.setupBackground();
    console.log(Date.now() - date);
  }
  gameStateUpdateTake() {
    this.viewMatrix = this.gameState.viewMatrix;
  }
  update() {
    this.gameStateUpdateTake();
  }
  draw() {
    this.gl.bindVertexArray(this.bgVAO);

    this.mat4.multiply(this.mvMatrix, this.viewMatrix, this.modelMatrix);
    this.mat4.multiply(this.mvoMatrix, this.orthoMatrix, this.mvMatrix);

    this.gl.uniformMatrix4fv(this.matrixLoc, false, this.mvoMatrix);
    this.gl.drawArrays(this.gl.TRIANGLES, 0, this.bgPosition.length / 3);

    this.gl.bindVertexArray(null);
  }
}
