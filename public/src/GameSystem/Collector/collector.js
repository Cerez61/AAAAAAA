export class Collector {
  constructor(gameData) {
    this.instanceData = gameData[0];
    this.entityData = gameData[1];

    this.entities = [];

    this.currentCount = 0;
    this.qtNodeCount = 0;
    this.uvRectOffSet;
    this.matrixDataOffSet;

    this.totalEntity;
    this.totalQtNode;
  }
  async init() {
    this.uvRectOffSet = this.instanceData.uvRectOffSet;
    this.matrixDataOffSet = this.instanceData.matrixDataOffSet;
  }
  updateInstanceData() {
    for (const entity of this.entityData.entities) {
      this.instanceData.uvRectData.set(entity.uvRect, this.currentCount * this.uvRectOffSet);
      this.instanceData.matrixData.set(entity.modelMatrix, this.currentCount * this.matrixDataOffSet);
      this.instanceData.spriteAtlasDepthData.set([entity.textureDepth], this.currentCount);
      this.instanceData.outlineColorData.set([entity.outlineColor], this.currentCount);
      this.currentCount++;
    }

    this.totalEntity = this.currentCount;
    this.instanceData.totalEntity = this.totalEntity;
    this.instanceData.totalQtNode = this.totalQtNode;
  }
  updateQuadTreeData(quadTree) {
    const boundaryOfQuadTrees = quadTree.giveMatrixData([]);

    for (const boundary of boundaryOfQuadTrees) {
      this.instanceData.qtMatrixData.set(boundary, this.qtNodeCount * this.matrixDataOffSet);
      this.qtNodeCount++;
    }

    this.totalQtNode = this.qtNodeCount;
  }
  takeEntityData() {
    this.entities = this.entityData.entities;
  }

  update(quadTree) {
    this.takeEntityData();

    this.updateInstanceData();
    this.updateQuadTreeData(quadTree);
  }
  clear() {
    this.qtNodeCount = 0;
    this.currentCount = 0;
  }
}
