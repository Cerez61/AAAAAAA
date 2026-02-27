export class Asset {
  constructor(textureName, textureJSON, frame, worldPosition) {
    this.textureName = textureName;
    this.textureJSON = textureJSON;
    this.textureWidth = 512;
    this.textureHeight = 256;
    this.width = frame.w;
    this.height = frame.h;
    this.x = frame.x;
    this.y = frame.y;
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
      this.x / this.textureWidth,
      (this.y + this.height) / this.textureHeight,
      //v2
      this.x / this.textureWidth,
      this.y / this.textureHeight,
      //v3
      (this.x + this.width) / this.textureWidth,
      (this.y + this.height) / this.textureHeight,
      //v3
      (this.x + this.width) / this.textureWidth,
      (this.y + this.height) / this.textureHeight,
      //v2
      this.x / this.textureWidth,
      this.y / this.textureHeight,
      //v4
      (this.x + this.width) / this.textureWidth,
      this.y / this.textureHeight,
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
