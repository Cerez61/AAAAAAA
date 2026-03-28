export class Collector {
  constructor(gameData) {
    this.instanceData = gameData;

    this.currentCount = 0;
    this.positionDataOffSet;
    this.uvDataOffSet;
    this.matrixDataOffSet;
    this.spriteAtlasDepthOffSet;

    this.totalEntity;
  }
  async init() {
    this.positionDataOffSet = this.instanceData.positionDataOffSet;
    this.uvDataOffSet = this.instanceData.uvDataOffSet;
    this.matrixDataOffSet = this.instanceData.matrixDataOffSet;
    this.spriteAtlasDepthOffSet = this.instanceData.spriteAtlasDepthOffSet;
  }
  updateInstanceData(player, textures) {
    this.instanceData.positionData.set(player.position, this.currentCount * this.positionDataOffSet);
    this.instanceData.uvData.set(player.uvData, this.currentCount * this.uvDataOffSet);
    this.instanceData.matrixData.set(player.modelMatrix, this.currentCount * this.matrixDataOffSet);
    this.instanceData.spriteAtlasDepthData.set(2, this.currentCount * this.spriteAtlasDepthOffSet);
    this.currentCount++;

    textures.assets.forEach((asset) => {
      this.instanceData.positionData.set(asset.position, this.currentCount * this.positionDataOffSet);
      this.instanceData.uvData.set(asset.uvData, this.currentCount * this.uvDataOffSet);
      this.instanceData.matrixData.set(textures.modelMatrix, this.currentCount * this.matrixDataOffSet);
      this.instanceData.spriteAtlasDepthData.set(asset.textureDepth, this.currentCount * this.spriteAtlasDepthOffSet);
      this.currentCount++;
    });

    this.totalEntity = this.currentCount;
    this.instanceData.totalEntity = this.totalEntity;
  }
  clear() {
    this.currentCount = 0;
  }
  update(entities) {
    //entities[0] = player, entities[1] = textures
    this.updateInstanceData(entities[0], entities[1]);
  }
  draw() {}
}
