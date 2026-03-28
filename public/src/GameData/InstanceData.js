export class InstanceData {
  constructor() {
    //Proxy Data
    this.maxProxy = 1000;
    this.positionDataOffSet = 18;
    this.uvDataOffSet = 12;
    this.matrixDataOffSet = 16;
    this.spriteAtlasDepthOffSet = 1;

    this.positionData = new Float32Array(this.maxProxy * this.positionDataOffSet);
    this.uvData = new Float32Array(this.maxProxy * this.uvDataOffSet);
    this.matrixData = new Float32Array(this.maxProxy * this.matrixDataOffSet);
    this.spriteAtlasDepthData = new Float32Array(this.maxProxy * this.spriteAtlasDepthOffSet);

    this.playerCount = 0;
    this.assetCount = 0;
    this.totalEntity = 0;
    //Camera Data
    this.viewMatrix = [];
    this.orthoMatrix = [];
  }
}
