import { Player } from "./player.js";
import { Camera } from "./camera.js";
import { InputHandler } from "./inputHandler.js";
import { Collector } from "./Collector.js";
import { Scene } from "./GameSystem/Scene/scene.js";
import { Renderer } from "./GameSystem/Renderer/renderer.js";
import { Entity } from "./GameSystem/Entity/entity.js";
import { Enemy } from "./GameSystem/Enemy/enemy.js";
import { Texture } from "./GameSystem/Texture/Texture.js";
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

    this.scene = new Scene([this.sceneData, this.entityData]);

    this.renderer = new Renderer([this.globalData, this.instanceData, this.assetData]);
    this.collector = new Collector([this.instanceData, this.entityData]);
    this.inputHandler = new InputHandler(this.entityData);
    this.collision = new Collision([this.instanceData, this.sceneData, this.entityData]);

    this.entity = new Entity([this.globalData, this.sceneData, this.instanceData, this.entityData, this.assetData]);
  }
  async init() {
    await this.scene.init();
    await this.entity.init();
    await this.collector.init();

    this.update();
    this.clear();

    await this.renderer.init();
  }
  update() {
    this.scene.update();

    this.entity.update();

    this.collision.update();
    this.collector.update(this.collision.giveQuadTree());
  }
  draw() {
    this.renderer.draw();
  }
  clear() {
    this.collision.clear();
    this.collector.clear();
  }
}
