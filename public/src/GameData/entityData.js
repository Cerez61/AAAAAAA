export class EntityData {
  constructor() {
    //Scene Data
    this.entitySceneData = [];

    //Entity Data
    this.entities = [];
    this.entityInfoData = [];
    this.entityInfoJSONNames = ["assets.json", "enemies.json", "player.json"];

    //Player Data
    this.playerPosition = [0, 0];

    //Ability Data
    this.abilities = [];
    this.abilityRequest = [];
    this.abilityInfoData = [];
    this.abilityInfoJSONNames = ["abilities.json"];

    //Input Data
    this.keys = [];
    this.lastPressKeys = [];
    this.lastReleaseKeys = [];
  }
}
