import { Renderer } from "./GameSystem/rendererSystem/renderer.js";
import { Player } from "./player.js";
import { Enemy } from "./GameSystem/enemySystem/enemy.js";
import { Camera } from "./camera.js";
import { BackGround } from "./GameSystem/TextureSystem/Background.js";
import { InputHandler } from "./inputHandler.js";
import { Collector } from "./Collector.js";
import { CollisionSAT } from "./GameSystem/collisionSystem/collisionSAT.js";
import { Collision } from "./GameSystem/collisionSystem/collision.js";
import { GlobalData } from "./GameData/globalData.js";
import { InstanceData } from "./GameData/InstanceData.js";
import { EntityData } from "./GameData/entityData.js";
import { AssetData } from "./GameData/assetData.js";
import { QuadTree } from "./GameSystem/collisionSystem/quadTree.js";

export class Game {
  constructor() {
    this.globalData = new GlobalData();
    this.instanceData = new InstanceData();
    this.entityData = new EntityData();
    this.assetData = new AssetData();

    this.renderer = new Renderer([this.globalData, this.instanceData, this.assetData]);
    this.collector = new Collector(this.instanceData);
    this.inputHandler = new InputHandler(this.entityData);
    this.collision = new Collision(this.instanceData);
    this.camera = new Camera([this.globalData, this.instanceData, this.entityData]);
    this.player = new Player([this.globalData, this.instanceData, this.entityData]);
    this.enemy = new Enemy(this.entityData);
    this.background = new BackGround([this.instanceData, this.assetData]);
  }
  async init() {
    await this.collector.init();
    await this.background.init();
    this.enemy.init();
    this.update();
    this.clear();
    this.renderer.initGameBuffer();
    this.renderer.initCollisionBuffer();
    this.renderer.initQtBuffer();
  }
  update() {
    this.background.update();
    this.player.update();
    this.enemy.update();
    this.camera.update();
    this.collision.update([this.player, ...this.background.assets /* , ...this.enemy.enemies */]);
    this.collector.update([this.player, ...this.background.assets /* , ...this.enemy.enemies */], this.collision.giveQuadTree());
  }
  draw() {
    this.renderer.draw();
  }
  clear() {
    this.collision.clear();
    this.collector.clear();
  }
}
