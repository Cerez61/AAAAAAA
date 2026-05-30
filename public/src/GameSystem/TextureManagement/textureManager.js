export class TextureManager {
  constructor(gameData) {
    this.assetData = gameData;
    this.spriteAtlases = [];
    this.spriteAtlasesJSON = [];
  }
  findEntityJSON(entityName) {
    const targetJSON = this.spriteAtlasesJSON.find((jsonFile) => {
      return jsonFile.meta.assets && jsonFile.meta.assets[entityName];
    });
    return targetJSON;
  }
  takeAssetData() {
    this.spriteAtlases = this.assetData.spriteAtlases;
    this.spriteAtlasesJSON = this.assetData.spriteAtlasesJSON;
  }
  init() {
    this.takeAssetData();
  }
}
