export class Collector {
  constructor(gameData) {
    this.instanceData = gameData;

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
  updateInstanceData(entities) {
    for (const entity of entities) {
      this.instanceData.uvRectData.set(entity.uvRect, this.currentCount * this.uvRectOffSet);
      this.instanceData.matrixData.set(entity.modelMatrix, this.currentCount * this.matrixDataOffSet);
      this.instanceData.spriteAtlasDepthData.set([entity.textureDepth], this.currentCount);
      this.instanceData.outlineColorData.set([entity.outlineColor], this.currentCount);
      this.currentCount++;
    }

    this.totalEntity = this.currentCount;
  }
  updateQuadTreeData(quadTree) {
    const boundaryOfQuadTrees = quadTree.giveMatrixData([]);

    for (const boundary of boundaryOfQuadTrees) {
      this.instanceData.qtMatrixData.set(boundary, this.qtNodeCount * this.matrixDataOffSet);
      this.qtNodeCount++;
    }

    this.totalQtNode = this.qtNodeCount;
  }
  giveInstanceData() {
    this.instanceData.totalEntity = this.totalEntity;
    this.instanceData.totalQtNode = this.totalQtNode;
  }
  clear() {
    this.qtNodeCount = 0;
    this.currentCount = 0;
  }
  update(entities, quadTree) {
    this.updateInstanceData(entities);
    this.updateQuadTreeData(quadTree);
    this.giveInstanceData();
  }
  draw() {}
}
