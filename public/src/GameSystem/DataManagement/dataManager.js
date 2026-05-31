export class DataManager {
  constructor(gameData) {
    this.infoData = gameData;
    this.entityInfoData = [];
    this.abilityInfoData = [];
  }
  takeInfoData() {
    this.entityInfoData = this.infoData.entityInfoData;
    this.abilityInfoData = this.infoData.abilityInfoData;
  }
  findEntityData(abilityName) {
    const targetJSON = this.abilityInfoData.find((jsonFile) => {
      return jsonFile[abilityName];
    });

    return targetJSON[abilityName];
  }
  init() {
    this.takeInfoData();
  }
}
