import { Player } from "./player.js";
import { Camera } from "./camera.js";
import { BackGround } from "./AssetManagement/background.js";
import { InputHandler } from "./inputHandler.js";
import { GlobalData } from "./GameData/globalData.js";
import { EntityData } from "./GameData/entityData.js";
import { AssetData } from "./GameData/assetData.js";

export class Game {
  constructor(program, gl) {
    this.globalData = new GlobalData(program, gl);
    this.entityData = new EntityData();
    this.assetData = new AssetData();
    this.inputHandler = new InputHandler(this.entityData);
    this.camera = new Camera([this.globalData, this.entityData]);
    this.player = new Player([this.globalData, this.entityData]);
    this.background = new BackGround([this.globalData, this.entityData, this.assetData]);
  }
  async init() {
    await this.background.init();
  }
  update() {
    this.background.update();
    this.player.update();
    this.camera.update();
  }
  draw() {
    this.player.draw();
    this.background.draw();
  }
}
