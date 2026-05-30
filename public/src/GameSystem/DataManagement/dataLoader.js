export class DataLoader {
  constructor(gameData) {
    this.infoData = gameData;

    this.entityInfo = [];
    this.abilityInfo = [];
  }

  findEntityData() {}
  findAbilityData() {}
  async loadEntityData(jsonNames) {
    const responses = await Promise.all(jsonNames.map((jsonName) => fetch("./data/EntityData/" + jsonName)));

    const data = await Promise.all(responses.map((res) => res.json()));

    this.entityInfo.push(...data);
  }
  async loadAbilityData(jsonNames) {
    const responses = await Promise.all(jsonNames.map((jsonName) => fetch("./data/AbilityData/" + jsonName)));

    const data = await Promise.all(responses.map((res) => res.json()));

    this.abilityInfo.push(...data);
  }
  async loadData() {
    await this.loadEntityData(this.infoData.entityInfoJSONNames);
    await this.loadAbilityData(this.infoData.abilityInfoJSONNames);
  }
  async init() {
    await this.loadData();
    this.updateInfoData();
  }
  updateInfoData() {
    this.infoData.entityInfoData = this.entityInfo;
    this.infoData.abilityInfoData = this.abilityInfo;
  }
}
