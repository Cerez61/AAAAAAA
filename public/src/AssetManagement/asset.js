export class Asset {
  constructor(textureName, textureJSON, spriteAtlasSize, frame, worldPosition) {
    this.textureName = textureName;
    this.textureJSON = textureJSON;
    this.textureWidth = spriteAtlasSize.w;
    this.textureHeight = spriteAtlasSize.h;
    this.textureDepth = spriteAtlasSize.d;
    this.width = frame.w;
    this.height = frame.h;
    this.textureX = frame.x;
    this.textureY = frame.y;
    this.worldX = worldPosition[0];
    this.worldY = worldPosition[1];
    this.worldZ = worldPosition[2];
    this.x1 = this.worldX;
    this.x2 = this.worldX + this.width;
    this.y1 = this.worldY;
    this.y2 = this.worldY + this.height;
    this.z = this.worldZ;
    this.uvCoord = [
      //v1
      this.textureX / this.textureWidth,
      (this.textureY + this.height) / this.textureHeight,
      //v2
      this.textureX / this.textureWidth,
      this.textureY / this.textureHeight,
      //v3
      (this.textureX + this.width) / this.textureWidth,
      (this.textureY + this.height) / this.textureHeight,
      //v3
      (this.textureX + this.width) / this.textureWidth,
      (this.textureY + this.height) / this.textureHeight,
      //v2
      this.textureX / this.textureWidth,
      this.textureY / this.textureHeight,
      //v4
      (this.textureX + this.width) / this.textureWidth,
      this.textureY / this.textureHeight,
    ];
    this.position = [
      this.x1,
      this.y1,
      this.worldZ,
      // v2
      this.x1,
      this.y2,
      this.worldZ,
      // v3
      this.x2,
      this.y1,
      this.worldZ,
      // v3
      this.x2,
      this.y1,
      this.worldZ,
      // v2
      this.x1,
      this.y2,
      this.worldZ,
      // v4
      this.x2,
      this.y2,
      this.worldZ,
    ];
  }
}
