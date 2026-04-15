import { MAT4 } from "../../../utils/matrix.js";
export class Archer {
  constructor(enemyID) {
    this.name = "Archer";

    this.enemyID = enemyID;

    this.w = 25;
    this.h = 50;
    this.depth = 2;

    this.x = 200;
    this.y = 50;
    this.z = 1;

    this.uvRect = [203, 75, 37, 76];

    this.outlineColor = 0;

    this.mat4 = new MAT4();
    this.modelMatrix = this.mat4.identity();
  }
  init() {
    this.mat4.scale(this.modelMatrix, [this.w, this.h]);
  }
  update(playerPosition) {
    const playerX = playerPosition[0];
    const playerY = playerPosition[1];
    this.x = this.x + (playerX - this.x) / 20;
    this.y = this.y + (playerY - this.y) / 25;
    this.mat4.translate(this.modelMatrix, [this.x, this.y]);
  }
}
