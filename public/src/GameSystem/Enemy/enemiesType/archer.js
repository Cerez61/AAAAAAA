import { MAT4 } from "../../../utils/matrix.js";
export class Archer {
  constructor(enemyID, position) {
    this.name = "Archer";

    this.enemyID = enemyID;

    this.w = 25;
    this.h = 50;
    this.depth = 2;

    this.x = position[0];
    this.y = position[1];
    this.z = position[2];

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
    this.x = this.x + (playerX - this.x) / 100;
    this.y = this.y + (playerY - this.y) / 100;
    this.mat4.translate(this.modelMatrix, [this.x, this.y]);
  }
}
