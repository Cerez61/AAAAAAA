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
    this.offSetX = this.gl.canvas.width * 0.25;
    this.offSetY = this.gl.canvas.height * 0.5;

    this.eye = [0, 0, 10];
    this.at = [0, 0, 0];
    this.up = [0, 1, 0];
  }
  horizontalMovement(player) {
    if (player.x > this.offSetX && player.x < 1500 - this.offSetX) {
      this.eye[0] = player.x - this.offSetX;
      this.at[0] = player.x - this.offSetX;
    }
  }
  verticalMovement(player) {
    if (player.y > this.offSetY) {
      this.eye[1] = player.y - this.offSetY;
      this.at[1] = player.y - this.offSetY;
    } else {
    }
  }
  update(player) {
    this.horizontalMovement(player);
    this.verticalMovement(player);

    this.mat4.lookAt(this.viewMatrix, this.eye, this.at, this.up);
  }

  draw() {}
}
