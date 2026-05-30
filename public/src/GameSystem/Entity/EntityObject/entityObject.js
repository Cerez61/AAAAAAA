import { MAT4 } from "../../../utils/matrix.js";

export class EntityObject {
  constructor(entityInfo, targetJSON) {
    //Entity Data
    this.entityInfo = entityInfo;
    this.entityID = this.entityInfo.id;
    this.type = this.entityInfo.type;
    this.subType = this.entityInfo.subType;

    //SpriteSheet Data
    this.assetName = this.entityInfo.name;
    this.targetJSON = targetJSON;
    this.textureName = this.targetJSON.meta.image;
    this.textureWidth = this.targetJSON.meta.size.w;
    this.textureHeight = this.targetJSON.meta.size.h;
    this.textureDepth = this.targetJSON.meta.size.d;

    //Texture Data
    this.entityFrames = this.targetJSON.meta.assets[this.assetName].frameTags;
    this.frame = this.targetJSON.frames[this.entityFrames[0].from].frame;
    this.u = this.frame.x;
    this.v = this.frame.y;

    //size
    this.s = {
      w: this.frame.w,
      h: this.frame.h,
    };
    this.s2 = {
      w: this.s.w,
      h: this.s.h,
    };
    this.uvRect = [this.u, this.v, this.s.w, this.s.h];

    //Positions
    this.p = {
      x: this.entityInfo.p.x,
      y: this.entityInfo.p.y,
      z: this.entityInfo.p.z,
    };
    this.p2 = {
      x: this.p.x,
      y: this.p.y,
      z: this.p.z,
    };

    //Matrixes
    this.mat4 = new MAT4();
    this.modelMatrix = this.mat4.identity();
    this.nextModelMatrix = this.mat4.identity();
    this.mat4.scale(this.modelMatrix, [this.s.w, this.s.h, 1]);
    this.mat4.scale(this.nextModelMatrix, [this.s2.w, this.s2.h, 1]);
    this.mat4.translate(this.modelMatrix, [this.p.x, this.p.y, this.p.z]);
    this.mat4.translate(this.nextModelMatrix, [this.p2.x, this.p2.y, this.p2.z]);
  }
}
