import { Asset } from "./asset.js";

export class Layer {
  constructor(z) {
    this.z = z;
    this.assets = [];
  }
  addAsset(spriteAtlasName, spriteAtlasJSON, frame, worldPosition) {
    this.assets.push(new Asset(spriteAtlasName, spriteAtlasJSON, frame, worldPosition));
  }
}
