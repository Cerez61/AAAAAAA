import { Player } from "./player.js";
import { Camera } from "./camera.js";
import { InputHandler } from "./inputHandler.js";
import { Collector } from "./Collector.js";
import { Scene } from "./GameSystem/Scene/scene.js";
import { Renderer } from "./GameSystem/Renderer/renderer.js";
import { Enemy } from "./GameSystem/Enemy/enemy.js";
import { BackGround } from "./GameSystem/Texture/Background.js";
import { CollisionSAT } from "./GameSystem/Collision/collisionSAT.js";
import { Collision } from "./GameSystem/Collision/collision.js";
import { QuadTree } from "./GameSystem/Collision/quadTree.js";
import { GlobalData } from "./GameData/globalData.js";
import { InstanceData } from "./GameData/InstanceData.js";
import { EntityData } from "./GameData/entityData.js";
import { AssetData } from "./GameData/assetData.js";
import { SceneData } from "./GameData/sceneData.js";

export class Game {
  constructor() {
    this.globalData = new GlobalData();
    this.sceneData = new SceneData();
    this.instanceData = new InstanceData();
    this.entityData = new EntityData();
    this.assetData = new AssetData();

    this.scene = new Scene(this.sceneData);

    this.renderer = new Renderer([this.globalData, this.instanceData, this.assetData]);
    this.collector = new Collector(this.instanceData);
    this.inputHandler = new InputHandler(this.entityData);
    this.collision = new Collision([this.instanceData, this.sceneData]);

    this.camera = new Camera([this.globalData, this.instanceData, this.entityData]);
    this.player = new Player([this.globalData, this.instanceData, this.entityData]);
    this.enemy = new Enemy(this.entityData);
    this.background = new BackGround([this.instanceData, this.assetData]);
  }
  async init() {
    await this.scene.init();
    await this.background.init();
    await this.collector.init();

    this.update();
    this.clear();
    this.renderer.initGameBuffer();
    this.renderer.initCollisionBuffer();
    this.renderer.initQtBuffer();
  }
  update() {
    this.scene.update([this.player, this.background, this.enemy]);

    this.player.update();
    this.background.update();
    this.enemy.update();
    this.camera.update();
    this.collision.update([this.player, ...this.background.assets, ...this.enemy.enemies]);
    this.collector.update([this.player, ...this.background.assets, ...this.enemy.enemies], this.collision.giveQuadTree());
  }
  draw() {
    this.renderer.draw();
  }
  clear() {
    this.collision.clear();
    this.collector.clear();
  }
}
