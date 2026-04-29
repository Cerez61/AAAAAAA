import { Surface } from "../Entity/Asset/AssetTypes/surface.js";
import { None } from "../Entity/Asset/AssetTypes/none.js";
import { Layer } from "./Layer.js";
import { Asset } from "../Entity/Asset/asset.js";
import { MAT4 } from "../../utils/matrix.js";

const TEXTURE_TYPE = {
  Surface: Surface,
};
export class Texture {
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

  findAssetsFile(assetName) {
    const targetJSON = this.spriteAtlasesJSON.find((jsonFile) => {
      return jsonFile.frames && jsonFile.frames[assetName];
    });
    return targetJSON;
  }
  addAssets(asset) {
    const depth = asset.position[2];
    const targetJSON = this.findAssetsFile(asset.name);
    if (!targetJSON) {
      console.log(asset);
      return;
    }

    this.addLayers(depth);

    const assetBox = new Asset(targetJSON, asset, this.assetCount);

    const assetClass = TEXTURE_TYPE[asset.subType];

    this.layers.forEach((layer) => {
      if (layer.z === depth) {
        layer.assets.push(assetClass ? new assetClass(assetBox) : new None(assetBox));
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

  instanceDataGive() {
    this.instanceData.assetCount = this.assetCount;
  }
  initAssetsArray() {
    for (const layer of this.layers) {
      for (const asset of layer.assets) {
        this.initAsset(asset.assetInfo);
      }
    }
  }
  initAsset(asset) {
    this.mat4.scale(asset.modelMatrix, [asset.w, asset.h, 1]);
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
  loadAsset(asset) {
    this.addAssets(asset);
  }
  updateAssetData() {
    this.spriteAtlases = this.assetData.spriteAtlases;
    this.spriteAtlasesJSON = this.assetData.spriteAtlasesJSON;
  }

  async init() {
    this.update();
    this.initAssetsArray();
    this.instanceDataGive();
  }
  update() {
    this.updateAssetData();
  }
}
