import { EntityObject } from "./entityObject.js";

export class AbilityObject extends EntityObject {
  constructor(targetData, targetJSON, caster) {
    super(targetData, targetJSON);

    this.caster = caster;

    this.direction;

    //Positions
    this.p = {
      x: this.caster.p.x,
      y: this.caster.p.y,
      z: this.caster.p.z,
    };
    this.p2 = {
      x: this.p.x,
      y: this.p.y,
      z: this.p.z,
    };

    //Matrixes
    this.modelMatrix = this.mat4.identity();
    this.nextModelMatrix = this.mat4.identity();
    this.mat4.scale(this.modelMatrix, [this.s.w, this.s.h, 1]);
    this.mat4.scale(this.nextModelMatrix, [this.s2.w, this.s2.h, 1]);
    this.mat4.translate(this.modelMatrix, [this.p.x, this.p.y, this.p.z]);
    this.mat4.translate(this.nextModelMatrix, [this.p2.x, this.p2.y, this.p2.z]);
  }
}
