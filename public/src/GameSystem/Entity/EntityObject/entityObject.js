import { MAT4 } from "../../../utils/matrix.js";

export class EntityObject {
  constructor(targetData, targetJSON) {
    //Entity Data
    this.targetData = targetData;
    this.entityID = this.targetData.id;
    this.type = this.targetData.type;
    this.subType = this.targetData.subType;

    //SpriteSheet Data
    this.assetName = this.targetData.name;
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
      w: this.targetData.w || this.frame.w,
      h: this.targetData.h || this.frame.h,
    };
    this.s2 = {
      w: this.s.w,
      h: this.s.h,
    };
    this.uvRect = [this.u, this.v, this.s.w, this.s.h];

    //Positions
    this.p = {
      x: this.targetData.p.x,
      y: this.targetData.p.y,
      z: this.targetData.p.z,
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
