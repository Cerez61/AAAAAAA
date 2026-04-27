import { MAT4 } from "../../utils/matrix.js";
const mat4 = new MAT4();
export class Asset {
  constructor(targetJSON, asset, assetID) {
    this.assetID = assetID;
    this.type = asset.type;
    this.subType = asset.subType;
    this.assetName = asset.name;
    this.textureName = targetJSON.meta.image;
    /* this.textureJSON = textureJSON; */
    this.textureWidth = targetJSON.meta.size.w;
    this.textureHeight = targetJSON.meta.size.h;
    this.textureDepth = targetJSON.meta.size.d;

    this.frame = targetJSON.frames[this.assetName].frame;
    this.u = this.frame.x;
    this.v = this.frame.y;
    this.w = this.frame.w;
    this.h = this.frame.h;

    this.uvRect = [this.u, this.v, this.w, this.h];

    this.x = asset.position[0];
    this.y = asset.position[1];
    this.z = asset.position[2];

    this.modelMatrix = mat4.identity();

    this.outlineColor = 0;
  }
}
