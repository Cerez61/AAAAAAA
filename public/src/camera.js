import { MAT4 } from "./utils/matrix.js";
export class Camera {
  constructor(game) {
    this.game = game;
    this.gl = this.game.gl;
    this.mat4 = new MAT4();
    this.viewMatrix = this.mat4.identity();
    this.orthoMatrix = this.mat4.ortho(0, this.gl.canvas.width, 0, this.gl.canvas.height, -100, 100);
    this.x = 0;
    this.y = 0;
    this.offSetX;
    this.offSetY;
  }
  update(player) {
    this.offSetX = this.gl.canvas.width / 4;
    this.offSetY = player.height;
    if (player.x > this.offSetX /* && player.x < room.x - this.offSetX*/ && player.x < 735 - this.offSetX)
      this.mat4.lookAt(
        this.viewMatrix,
        [player.x - this.offSetX, player.y - this.offSetY, 10],
        [player.x - this.offSetX, player.y - this.offSetY, 0],
        [0, 1, 0],
      );
  }

  draw() {}
}
