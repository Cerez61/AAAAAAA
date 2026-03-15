import { Asset } from "./Asset.js";

export class Layer {
  constructor(z) {
    this.z = z;
    this.assets = [];
  }
  addAsset(spriteAtlasName, spriteAtlasJSON, spriteAtlasSize, frame, worldPosition) {
    this.assets.push(new Asset(spriteAtlasName, spriteAtlasJSON, spriteAtlasSize, frame, worldPosition));
  }
}
