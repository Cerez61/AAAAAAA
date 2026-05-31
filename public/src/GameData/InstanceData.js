export class InstanceData {
  constructor() {
    //Proxy Data
    this.maxProxy = 2000;
    this.uvRectOffSet = 4;
    this.matrixDataOffSet = 16;

    this.collisionData = new Float32Array([-1, -1, 1, -1, 1, 1, 1, 1, 1, 1, -1, 1]);
    this.positionData = new Float32Array([-1, -1, 1, -1, 1, 1, 1, -1, 1, 1, -1, 1, -1, 1, 1, 1, 1, 1]);
    this.uvRectData = new Float32Array(this.maxProxy * this.uvRectOffSet);
    this.matrixData = new Float32Array(this.maxProxy * this.matrixDataOffSet);
    this.qtMatrixData = new Float32Array(this.maxProxy * this.matrixDataOffSet);
    this.spriteAtlasDepthData = new Float32Array(this.maxProxy);
    this.outlineColorData = new Float32Array(this.maxProxy);

    this.spriteAtlasSizeData = new Float32Array([512, 512]);
    this.indexData = new Float32Array([1, 2, 3, 3, 2, 4]);

    //Count Data
    this.playerCount = 0;
    this.assetCount = 0;
    this.totalEntity = 0;
    this.totalQtNode = 0;
    //Camera Data
    this.viewMatrix = [];
    this.orthoMatrix = [];
  }
}
