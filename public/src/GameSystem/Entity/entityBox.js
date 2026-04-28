import { MAT4 } from "../../utils/matrix.js";

export class EntityBox {
  constructor() {
    this.textureWidth;
    this.textureHeight;
    this.textureDepth;

    this.frame;
    this.u = this.frame.x;
    this.v = this.frame.y;
    this.w = this.frame.w;
    this.h = this.frame.h;

    this.uvRect = [this.u, this.v, this.w, this.h];

    this.x;
    this.y;
    this.z;

    this.mat4 = new MAT4();

    this.modelMatrix = this.mat4.identity();
    this.outlineColor = 0;
  }
}
