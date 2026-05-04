import { EntityBox } from "../../entityBox.js";
export class None extends EntityBox {
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
