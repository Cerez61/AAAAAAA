import { MAT4 } from "../../utils/matrix.js";

export class EntityBox {
  constructor(entityInfo, targetJSON) {
    this.entityInfo = entityInfo;
    this.entityID = this.entityInfo.id;
    this.type = this.entityInfo.type;
    this.subType = this.entityInfo.subType;

    this.assetName = this.entityInfo.name;
    this.textureName = targetJSON.meta.image;
    this.textureJSON = targetJSON;
    this.textureWidth = targetJSON.meta.size.w;
    this.textureHeight = targetJSON.meta.size.h;
    this.textureDepth = targetJSON.meta.size.d;

    this.frame = targetJSON.frames[this.assetName].frame;

    this.u = this.frame.x;
    this.v = this.frame.y;
    this.w = this.frame.w;
    this.h = this.frame.h;

    this.uvRect = [this.u, this.v, this.w, this.h];

    this.x = this.entityInfo.position[0];
    this.y = this.entityInfo.position[1];
    this.z = this.entityInfo.position[2];

    this.mat4 = new MAT4();

    this.modelMatrix = this.mat4.identity();

    this.mat4.scale(this.modelMatrix, [this.w, this.h, 1]);

    this.outlineColor = 0;
  }
}
