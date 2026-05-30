import { MAT4 } from "../../../../utils/matrix.js";
import { AssetObject } from "../../EntityObject/assetObject.js";
export class Surface extends AssetObject {
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
