import { Layer } from "./Layer.js";
import { MAT4 } from "../../utils/matrix.js";
export class BackGround {
  constructor(gameData) {
    //intelisense webgl content
    /**
     * @type {WebGL2RenderingContext}
     */
    this.instanceData = gameData[0];
    this.assetData = gameData[1];
    this.layers = [];
    this.assets = [];

    this.spriteAtlases = [];
    this.spriteAtlasesJSON = [];

    this.mat4 = new MAT4();

    this.modelMatrix = this.mat4.identity();

    this.assetCount = 0;
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

    for (let i = 0; i < 20; i++) {
      for (let k = 0; k < 5; k++) {
        this.addAssets("...png", [i * 300 + 50, 700 - k * 150, 2]);
      }
    }

    this.initAssetsArray();
    /*  this.createAssetsData();
     */
    this.update();

    console.log(Date.now() - date);
  }
  instanceDataGive() {
    this.instanceData.assetCount = this.assetCount;
    this.assetData.spriteAtlases = this.spriteAtlases;
  }
  initAssetsArray() {
    this.layers.forEach((layer) => {
      layer.assets.forEach((asset) => {
        this.initAsset(asset);
      });
    });
  }
  initAsset(asset) {
    this.mat4.scale(asset.modelMatrix, [40, 80, 1]);
    this.mat4.translate(asset.modelMatrix, [asset.x, asset.y, asset.z]);

    this.assets.push(asset);
  }
  updateAssets() {
    this.layers.forEach((layer) => {
      layer.assets.forEach((asset) => {
        this.mat4.translate(asset.modelMatrix, [asset.x, asset.y, asset.z]);
      });
    });
  }
  update() {
    this.instanceDataGive();
  }
}
