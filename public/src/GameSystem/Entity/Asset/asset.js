import { Surface } from "./AssetTypes/surface.js";
import { None } from "./AssetTypes/none.js";
import { Layer } from "./Layer.js";

const TEXTURE_TYPE = {
  Surface: Surface,
};
export class Asset {
  constructor() {
    this.layers = [];
    this.assets = [];
  }

  addLayers(depth) {
    const targetLayer = this.layers.find((layer) => layer.z === depth);

    if (!targetLayer) {
      this.layers.push(new Layer(depth));
      this.layers.sort((a, b) => a.z - b.z);
    }
  }
  loadAsset(entityInfo, targetJSON, targetStat) {
    const depth = entityInfo.p.z;

    this.addLayers(depth);

    const assetClass = TEXTURE_TYPE[entityInfo.subType];

    const asset = assetClass ? new assetClass(entityInfo, targetJSON, targetStat) : new None(entityInfo, targetJSON, targetStat);

    this.assets.push(asset);

    this.layers.forEach((layer) => {
      if (layer.z === depth) {
        layer.assets.push(asset);
        return;
      }
    });
  }
}
