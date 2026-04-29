import { MAT4 } from "../../../../utils/matrix.js";

export class Surface {
  constructor(assetInfo) {
    this.assetInfo = assetInfo;

    this.outlineColor = 0;

    this.mat4 = new MAT4();
    this.modelMatrix = this.mat4.identity();
  }
}
