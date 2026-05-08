import { MAT4 } from "../../utils/matrix.js";

export class EntityBox {
  constructor(entityInfo, targetJSON, targetStat) {
    //Entity Data
    this.entityInfo = entityInfo;
    this.entityID = this.entityInfo.id;
    this.type = this.entityInfo.type;
    this.subType = this.entityInfo.subType;

    //SpriteSheet Data
    this.assetName = this.entityInfo.name;
    this.textureName = targetJSON.meta.image;
    this.textureJSON = targetJSON;
    this.textureWidth = targetJSON.meta.size.w;
    this.textureHeight = targetJSON.meta.size.h;
    this.textureDepth = targetJSON.meta.size.d;

    //Texture Data
    this.frame = targetJSON.frames[this.assetName].frame;
    this.u = this.frame.x;
    this.v = this.frame.y;
    this.s = {
      w: this.frame.w,
      h: this.frame.h,
    };
    this.uvRect = [this.u, this.v, this.s.w, this.s.h];

    //size
    this.s2 = {
      w: this.s.w,
      h: this.s.h,
    };

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

    //Matrixs
    this.mat4 = new MAT4();
    this.modelMatrix = this.mat4.identity();
    this.nextModelMatrix = this.mat4.identity();
    this.mat4.scale(this.modelMatrix, [this.s.w, this.s.h, 1]);
    this.mat4.scale(this.nextModelMatrix, [this.s2.w, this.s2.h, 1]);

    //Collision Color
    this.outlineColor = 0;

    //Stats
    this.stats = targetStat;
  }
}
