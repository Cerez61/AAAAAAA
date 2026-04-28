import { Player } from "../../player.js";
import { Texture } from "../Texture/Texture.js";
import { Enemy } from "../Enemy/enemy.js";
import { Camera } from "../../camera.js";

const ENTITY_TYPE = {};
export class Entity {
  constructor(gameData) {
    this.globalData = gameData[0];
    this.sceneData = gameData[1];
    this.instanceData = gameData[2];
    this.entityData = gameData[3];
    this.assetData = gameData[4];

    this.player = new Player([this.globalData, this.instanceData, this.entityData]);
    this.texture = new Texture([this.instanceData, this.assetData]);
    this.enemy = new Enemy(this.entityData);
    this.camera = new Camera([this.globalData, this.instanceData, this.entityData]);

    this.entitiesClass = [this.player, this.texture, this.enemy, this.camera];

    this.entities = [];
  }
  loadEntity(entities) {
    for (const entity of this.entityData.entitySceneData) {
      if (entity.type == "PLAYER") {
        this.player.x = entity.position[0];
        this.player.y = entity.position[1];
        this.player.z = entity.position[2];
      } else if (entity.type == "TEXTURE") {
        this.texture.loadAsset(entity);
      } else if (entity.type == "ENEMY") {
        this.enemy.loadEnemy(entity);
      }
    }

    this.enemy.initEnemy();
    this.texture.initAssetsArray();

    this.sceneData.roomChange = false;
  }
  async init() {
    for (const entity of this.entitiesClass) {
      await entity.init();
    }
  }
  updateEntityData() {
    this.entities = [this.player, this.texture.assets, this.enemy.enemies];
    this.entityData.entities = [this.player, ...this.texture.assets, ...this.enemy.enemies];
  }
  update(entities) {
    if (this.sceneData.roomChange) this.loadEntity(entities);

    for (const entity of this.entitiesClass) {
      entity.update();
    }

    this.updateEntityData();
  }
}
