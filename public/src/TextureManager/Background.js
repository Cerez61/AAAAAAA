import { Layer } from "./Layer.js";
import { MAT4 } from "../utils/matrix.js";
export class BackGround {
  constructor(gameData) {
    //intelisense webgl content
    /**
     * @type {WebGL2RenderingContext}
     */
    this.globalData = gameData[0];
    this.instanceData = gameData[1];
    this.assetData = gameData[2];
    this.gl = this.globalData.gl;
    this.program = this.globalData.program;

    this.layers = [];
    this.assets = [];

    this.spriteAtlases = [];
    this.spriteAtlasesJSON = [];

    this.mat4 = new MAT4();

    this.modelMatrix = this.mat4.identity();

    this.assetsPosition = [];
    this.assetsUVCoord = [];
    this.spriteAtlasDepth = [];

    this.assetCount = 0;
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
    await assets.forEach((asset) => this.assetsUVCoord.push(...asset.uvData));
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
        layer.addAsset(targetJSON.meta.image, "a.json", targetJSON.meta.size, targetJSON.frames[assetName].frame, this.assetCount++, worldPosition);

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
      this.addAssets("greenBg", [i * 200, 200, 2]);
    }

    this.createAssetsData();

    this.initAssetsArray();

    this.update();

    console.log(Date.now() - date);
  }
  globalDataUpdateTake() {
    this.viewMatrix = this.instanceData.viewMatrix;
  }
  instanceDataGive() {
    this.assetData.assetsPosition = this.assetsPosition;
    this.assetData.assetsUVCoord = this.assetsUVCoord;
    this.instanceData.assetCount = this.assetCount;
    this.assetData.spriteAtlases = this.spriteAtlases;
  }
  initAssetsArray() {
    this.layers.forEach((layer) => {
      layer.assets.forEach((asset) => {
        this.assets.push(asset);
      });
    });
  }
  update() {
    this.globalDataUpdateTake();
    this.instanceDataGive();
  }
}
