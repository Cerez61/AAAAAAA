import { Player } from "./Player/player.js";
import { Asset } from "./Asset/asset.js";
import { Enemy } from "./Enemy/enemy.js";
import { Camera } from "./Camera/camera.js";
import { Ability } from "./Ability/ability.js";
import { TextureManager } from "../TextureManagement/textureManager.js";
import { DataManager } from "../DataManagement/dataManager.js";
import { Stat } from "./Stat/stat.js";

const ENTITY_TYPE = {};

export class Entity {
  constructor(gameData) {
    this.globalData = gameData[0];
    this.sceneData = gameData[1];
    this.instanceData = gameData[2];
    this.entityData = gameData[3];
    this.assetData = gameData[4];
    this.infoData = gameData[5];

    this.dataManager = new DataManager(this.infoData);
    this.textureManager = new TextureManager(this.assetData);
    this.statManager = new Stat();

    this.ability = new Ability(this.entityData, this.dataManager, this.textureManager);

    this.player;
    this.asset = new Asset();
    this.enemy = new Enemy(this.entityData);
    this.camera = new Camera([this.globalData, this.instanceData, this.entityData]);
    this.entitiesClass = [];

    this.entities = [];
  }
  loadEntity() {
    for (const targetData of this.entityData.entitySceneData) {
      const targetJSON = this.textureManager.findEntityJSON(targetData.name);
      const targetStat = this.statManager.findEntityStat(targetData.subType);

      /*  const entityStat = */
      if (targetData.type == "PLAYER") {
        this.player = new Player([this.globalData, this.instanceData, this.entityData], targetData, targetJSON, targetStat);
      } else if (targetData.type == "TEXTURE") {
        this.asset.loadAsset(targetData, targetJSON);
      } else if (targetData.type == "ENEMY") {
        this.enemy.loadEnemy(targetData, targetJSON, targetStat);
      }
    }

    this.updateEntityData();

    this.initEntity();

    this.sceneData.roomChange = false;
  }
  updateEntityData() {
    this.entitiesClass = [this.player, this.camera, this.enemy, this.ability];
    this.entities = [this.player, ...this.asset.assets, ...this.enemy.enemies, ...this.ability.abilities];
    this.entityData.entities = [this.player, ...this.asset.assets, ...this.enemy.enemies, ...this.ability.abilities];
  }
  initEntity() {
    for (const entity of this.entities) {
      entity.init();
    }
  }
  async init() {
    await this.statManager.init();
    this.dataManager.init();
    this.textureManager.init();
  }
  update() {
    this.updateEntityData();

    if (this.sceneData.roomChange) this.loadEntity();

    for (const entity of this.entitiesClass) {
      entity.update();
    }
  }
}
