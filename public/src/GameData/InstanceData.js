export class InstanceData {
  constructor() {
    //Proxy Data
    this.maxProxy = 1000;
    this.positionDataOffSet = 18;
    this.uvDataOffSet = 12;
    this.uvRectOffSet = 4;
    this.matrixDataOffSet = 16;
    this.spriteAtlasDepthOffSet = 1;

    this.positionData = new Float32Array([-1, -1, 1, -1, 1, 1, 1, -1, 1, 1, -1, 1, -1, 1, 1, 1, 1, 1]);
    this.uvData = new Float32Array(this.maxProxy * this.uvDataOffSet);
    this.uvRectData = new Float32Array(this.maxProxy * this.uvRectOffSet);
    this.matrixData = new Float32Array(this.maxProxy * this.matrixDataOffSet);
    this.spriteAtlasDepthData = new Float32Array(this.maxProxy * this.spriteAtlasDepthOffSet);

    this.spriteAtlasSizeData = new Float32Array([256, 256]);
    this.indexData = new Float32Array([1, 2, 3, 3, 2, 4]);

    this.playerCount = 0;
    this.assetCount = 0;
    this.totalEntity = 0;
    //Camera Data
    this.viewMatrix = [];
    this.orthoMatrix = [];
  }
}
