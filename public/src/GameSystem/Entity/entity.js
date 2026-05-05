import { Player } from "./Player/player.js";
import { Asset } from "./Asset/asset.js";
import { Enemy } from "./Enemy/enemy.js";
import { Camera } from "./Camera/camera.js";
import { TextureManager } from "../Texture/textureManager.js";
import { Stat } from "./Stat/stat.js";

const ENTITY_TYPE = {};

export class Entity {
  constructor(gameData) {
    this.globalData = gameData[0];
    this.sceneData = gameData[1];
    this.instanceData = gameData[2];
    this.entityData = gameData[3];
    this.assetData = gameData[4];

    this.textureManager = new TextureManager(this.assetData);
    this.statManager = new Stat();

    this.player;
    this.asset = new Asset();
    this.enemy = new Enemy(this.entityData);
    this.camera = new Camera([this.globalData, this.instanceData, this.entityData]);

    this.entitiesClass = [];

    this.entities = [];
  }
  loadEntity(entities) {
    for (const entityInfo of this.entityData.entitySceneData) {
      const targetJSON = this.textureManager.findEntityFile(entityInfo.name);
      const targetStat = this.statManager.findEntityStat(entityInfo.subType);
      /*  const entityStat = */
      if (entityInfo.type == "PLAYER") {
        this.player = new Player([this.globalData, this.instanceData, this.entityData], entityInfo, targetJSON, targetStat);
      } else if (entityInfo.type == "TEXTURE") {
        this.asset.loadAsset(entityInfo, targetJSON);
      } else if (entityInfo.type == "ENEMY") {
        this.enemy.loadEnemy(entityInfo, targetJSON, targetStat);
      }
    }

    this.updateEntityData();

    this.initEntity();

    this.sceneData.roomChange = false;
  }
  updateEntityData() {
    this.entitiesClass = [this.camera, this.player, this.enemy];
    this.entities = [this.player, ...this.asset.assets, ...this.enemy.enemies];
    this.entityData.entities = [this.player, ...this.asset.assets, ...this.enemy.enemies];
  }
  initEntity() {
    for (const entity of this.entities) {
      entity.init();
    }
  }
  async init() {
    await this.statManager.init();
  }
  update(entities) {
    this.textureManager.update();
    if (this.sceneData.roomChange) this.loadEntity(entities);

    for (const entity of this.entitiesClass) {
      entity.update();
    }
  }
}
