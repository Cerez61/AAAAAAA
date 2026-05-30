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
  init() {
    this.takeInfoData();
  }
}
