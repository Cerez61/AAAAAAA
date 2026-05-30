export class TextureLoader {
  constructor(gameData) {
    this.assetData = gameData;

    this.spriteAtlases = [];
    this.spriteAtlasesJSON = [];
  }

  changeMetaJSON() {
    this.spriteAtlasesJSON.forEach((jsonFile, index) => {
      jsonFile.meta.size.d = index;
    });
  }
  findAssetsFile(assetName) {
    const targetJSON = this.spriteAtlasesJSON.find((jsonFile) => {
      return jsonFile.frames && jsonFile.frames[assetName];
    });
    return targetJSON;
  }

  async fetchSpriteSheet(spriteNames) {
    const responses = await Promise.all(spriteNames.map((textureName) => fetch("./assets/textures/" + textureName)));

    const blobs = await Promise.all(
      responses.map((res) => {
        if (!res.ok) throw new Error("Yükleme hatası");
        return res.blob();
      }),
    );

    const bitmaps = await Promise.all(blobs.map((blob) => createImageBitmap(blob)));

    this.spriteAtlases.push(...bitmaps);
  }
  async fetchSpriteSheetJSON(jsonNames) {
    const responses = await Promise.all(jsonNames.map((jsonName) => fetch("./assets/data/" + jsonName)));

    const data = await Promise.all(responses.map((res) => res.json()));

    this.spriteAtlasesJSON.push(...data);
  }
  instanceDataGive() {
    this.assetData.spriteAtlases = this.spriteAtlases;
    this.assetData.spriteAtlasesJSON = this.spriteAtlasesJSON;
  }
  async init() {
    const date = Date.now();

    await this.fetchSpriteSheet(this.assetData.textureNames);
    await this.fetchSpriteSheetJSON(this.assetData.jsonNames);

    this.changeMetaJSON();

    this.instanceDataGive();

    console.log(Date.now() - date);
  }
}
