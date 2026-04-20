import { MAT4 } from "../../utils/matrix.js";
import { Archer } from "./enemiesType/archer.js";

export class Enemy {
  constructor(gameData) {
    this.entityData = gameData;

    this.enemies = [];

    this.mat4 = new MAT4();

    this.enemyCount = 0;
  }

  entityDataTake() {
    this.playerPosition = this.entityData.playerPosition;
  }
  loadEnemy(enemy) {
    if (enemy.subType == "Archer") this.enemies.push(new Archer(this.enemyCount, enemy.position));

    for (const enemy of this.enemies) {
      enemy.init();
    }

    this.enemyCount++;
  }
  update() {
    this.entityDataTake();

    for (const enemy of this.enemies) {
      enemy.update(this.playerPosition);
    }
  }
}
