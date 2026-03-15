import { Layer } from "./Layer.js";
import { MAT4 } from "../utils/matrix.js";
export class BackGround {
  constructor(gameData) {
    //intelisense webgl content
    /**
     * @type {WebGL2RenderingContext}
     */
    this.globalData = gameData[0];
    this.entityData = gameData[1];
    this.assetData = gameData[2];
    this.gl = this.globalData.gl;
    this.program = this.globalData.program;

    this.layers = [];

    this.spriteAtlases = [];
    this.spriteAtlasesJSON = [];

    this.mat4 = new MAT4();

    this.modelMatrix = this.mat4.identity();
    this.viewMatrix = this.entityData.viewMatrix;
    this.mvMatrix = this.mat4.identity();
    this.orthoMatrix = this.entityData.orthoMatrix;
    this.mvoMatrix = this.mat4.identity();

    this.assetsPosition = [];
    this.assetsUVCoord = [];
    this.spriteAtlasDepth = [];

    this.assetCount = 0;
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
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.assetsPosition), this.gl.STATIC_DRAW);

    this.gl.vertexAttribPointer(0, 3, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(0);

    //Texture UV Coord
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.texCoordBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.assetsUVCoord), this.gl.STATIC_DRAW);

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
  createAssetsData() {
    this.layers.forEach((layer) => {
      this.addUVCoord(layer.assets);
      this.addPosition(layer.assets);
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
    await assets.forEach((asset) => this.assetsPosition.push(...asset.position));
  }
  async addUVCoord(assets) {
    await assets.forEach((asset) => this.assetsUVCoord.push(...asset.uvCoord));
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

    const depth = worldPosition[2];

    this.addLayers(depth);

    this.layers.forEach((layer) => {
      if (layer.z === depth) {
        layer.addAsset(targetJSON.meta.image, "a.json", targetJSON.meta.size, targetJSON.frames[assetName].frame, worldPosition);
        return;
      }
    });
  }
  addLayers(depth) {
    const targetLayer = this.layers.find((layer) => layer.z === depth);

    if (!targetLayer) {
      this.layers.push(new Layer(depth));
      this.layers.sort((a, b) => a.z - b.z);
    }
  }

  async fetchSpriteSheet(spriteNames) {
    const responses = await Promise.all(spriteNames.map((textureName) => fetch("./assets/textures/" + textureName)));

    const blobs = await Promise.all(
      responses.map((res) => {
        if (!res.ok) throw new Error("Yükleme hatası");
        return res.blob();
      }),
    );

    const bitmaps = await Promise.all(blobs.map((blob) => createImageBitmap(blob)));

    this.spriteAtlases.push(...bitmaps);
  }
  async fetchSpriteSheetJSON(jsonNames) {
    const responses = await Promise.all(jsonNames.map((jsonName) => fetch("./assets/data/" + jsonName)));

    const data = await Promise.all(responses.map((res) => res.json()));

    this.spriteAtlasesJSON.push(...data);
  }
  async init() {
    const date = Date.now();

    await this.fetchSpriteSheet(this.assetData.textureNames);
    await this.fetchSpriteSheetJSON(this.assetData.jsonNames);

    this.changeMetaJSON();

    for (let i = 0; i < 100; i++) {
      this.addAssets("kk", [i * 100, 0, 2]);
      this.addAssets("sea", [i * 200, 100, 2]);
      this.addAssets("greenBg", [i * 200, 200, 1]);
    }

    this.createAssetsData();
    this.setupBackground();

    console.log(Date.now() - date);
  }
  globalDataUpdateTake() {
    this.viewMatrix = this.entityData.viewMatrix;
  }
  entityDataGive() {
    this.entityData.assetsPosition = this.assetsPosition;
    this.entityData.assetsUVCoord = this.assetsUVCoord;
  }
  update() {
    this.globalDataUpdateTake();
    this.entityDataGive();
  }
  draw() {
    this.gl.bindVertexArray(this.bgVAO);

    this.mat4.multiply(this.mvMatrix, this.viewMatrix, this.modelMatrix);
    this.mat4.multiply(this.mvoMatrix, this.orthoMatrix, this.mvMatrix);

    this.gl.uniformMatrix4fv(this.matrixLoc, false, this.mvoMatrix);
    this.gl.drawArrays(this.gl.TRIANGLES, 0, this.assetsPosition.length / 3);

    this.gl.bindVertexArray(null);
  }
}
