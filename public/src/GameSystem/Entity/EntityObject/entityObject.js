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
      w: this.targetData.s.w || this.frame.w,
      h: this.targetData.s.h || this.frame.h,
    };
    this.s2 = {
      w: this.s.w,
      h: this.s.h,
    };
    this.uvRect = [this.u, this.v, this.s.w, this.s.h];

    this.mat4 = new MAT4();
  }
}
