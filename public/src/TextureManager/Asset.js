import { MAT4 } from "../utils/matrix.js";
const mat4 = new MAT4();
export class Asset {
  constructor(textureName, textureJSON, spriteAtlasSize, frame, assetID, worldPosition) {
    this.assetID = assetID;
    this.textureName = textureName;
    this.textureJSON = textureJSON;
    this.textureWidth = spriteAtlasSize.w;
    this.textureHeight = spriteAtlasSize.h;
    this.textureDepth = spriteAtlasSize.d;

    this.u = frame.x;
    this.v = frame.y;
    this.width = frame.w;
    this.height = frame.h;

    this.uvRect = [this.u, this.v, this.width, this.height];

    this.x = worldPosition[0];
    this.y = worldPosition[1];
    this.z = worldPosition[2];

    this.modelMatrix = mat4.identity();
  }
}
