import { AssetObject } from "../../EntityObject/assetObject.js";
export class None extends AssetObject {
  constructor(assetInfo, targetJSON) {
    super(assetInfo, targetJSON);
  }
  collide() {
    this.outlineColor = 1;
  }
  init() {
    this.mat4.translate(this.modelMatrix, [this.p.x, this.p.y, this.p.z]);
  }
  update() {}
}
