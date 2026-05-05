export class Stat {
  constructor() {
    this.statJSON = [];
  }
  findEntityStat(entityType) {
    const stat = this.statJSON[entityType];
    return this.statJSON[entityType] || null;
  }
  async init() {
    const response = await fetch("./src/GameSystem/Entity/Stat/stat.json");

    const data = await response.json();

    this.statJSON = data;
  }
}
