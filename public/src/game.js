import { Renderer } from "./GameSystem/rendererSystem/renderer.js";
import { Player } from "./player.js";
import { Camera } from "./camera.js";
import { BackGround } from "./TextureManager/Background.js";
import { InputHandler } from "./inputHandler.js";
import { Collector } from "./Collector.js";
import { GlobalData } from "./GameData/globalData.js";
import { InstanceData } from "./GameData/InstanceData.js";
import { EntityData } from "./GameData/entityData.js";
import { AssetData } from "./GameData/assetData.js";

export class Game {
  constructor() {
    this.globalData = new GlobalData();
    this.instanceData = new InstanceData();
    this.entityData = new EntityData();
    this.assetData = new AssetData();
    this.renderer = new Renderer([this.globalData, this.instanceData, this.assetData]);
    this.collector = new Collector(this.instanceData);
    this.inputHandler = new InputHandler(this.entityData);
    this.camera = new Camera([this.globalData, this.instanceData, this.entityData]);
    this.player = new Player([this.globalData, this.instanceData, this.entityData]);
    this.background = new BackGround([this.globalData, this.instanceData, this.assetData]);
  }
  async init() {
    //await this.renderer.init();
    await this.collector.init();
    await this.background.init();
  }
  update() {
    this.renderer.update();
    this.player.update();
    this.camera.update();
    this.collector.update([this.player, this.background]);
  }
  draw() {
    this.renderer.draw();
  }
  clear() {
    this.collector.clear();
  }
}
