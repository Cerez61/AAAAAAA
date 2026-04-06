export class Collector {
  constructor(gameData) {
    this.instanceData = gameData;

    this.currentCount = 0;
    this.uvRectOffSet;
    this.matrixDataOffSet;

    this.totalEntity;
  }
  async init() {
    this.uvRectOffSet = this.instanceData.uvRectOffSet;
    this.matrixDataOffSet = this.instanceData.matrixDataOffSet;
  }
  updateInstanceData(player, textures) {
    this.instanceData.uvRectData.set(player.uvRect, this.currentCount * this.uvRectOffSet);
    this.instanceData.matrixData.set(player.modelMatrix, this.currentCount * this.matrixDataOffSet);
    this.instanceData.spriteAtlasDepthData.set([0], this.currentCount);
    this.instanceData.outlineColorData.set([player.outlineColor], this.currentCount);
    this.currentCount++;
    textures.assets.forEach((asset) => {
      this.instanceData.uvRectData.set(asset.uvRect, this.currentCount * this.uvRectOffSet);
      this.instanceData.matrixData.set(asset.modelMatrix, this.currentCount * this.matrixDataOffSet);
      this.instanceData.spriteAtlasDepthData.set([asset.textureDepth], this.currentCount);
      this.instanceData.outlineColorData.set([asset.outlineColor], this.currentCount);
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
