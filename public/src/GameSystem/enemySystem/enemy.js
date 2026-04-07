import { MAT4 } from "../../utils/matrix.js";
import { Archer } from "./enemiesType/archer.js";

export class Enemy {
  constructor(gameData) {
    this.entityData = gameData;

    this.enemies = [];

    this.mat4 = new MAT4();

    this.enemies.push(new Archer(0));
  }
  init() {
    this.entityDataTake();

    for (const enemy of this.enemies) {
      enemy.init();
    }
  }
  entityDataTake() {
    this.playerPosition = this.entityData.playerPosition;
  }
  update() {
    this.entityDataTake();

    for (const enemy of this.enemies) {
      enemy.update(this.playerPosition);
    }
  }
}
