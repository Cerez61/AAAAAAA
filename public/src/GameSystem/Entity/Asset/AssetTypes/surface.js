import { MAT4 } from "../../../../utils/matrix.js";
import { EntityBox } from "../../entityBox.js";

export class Surface extends EntityBox {
  constructor(assetInfo, targetJSON) {
    super(assetInfo, targetJSON);
  }
  collide() {
    this.outlineColor = 1;
  }
  init() {
    this.mat4.translate(this.modelMatrix, [this.x, this.y, this.z]);
  }
  update() {}
}
