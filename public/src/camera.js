import { MAT4 } from "./utils/matrix.js";
export class Camera {
  constructor(gameState) {
    //these are gonna be deleted

    this.gameState = gameState;

    this.gl = this.gameState.gl;

    this.mat4 = new MAT4();

    this.viewMatrix = this.mat4.identity();
    this.orthoMatrix = this.mat4.ortho(0, this.gl.canvas.width, 0, this.gl.canvas.height, -100, 100);

    this.x = 0;
    this.y = 0;

    this.leftCameraAngle = 0.49;
    this.rightCameraAngle = 1 - this.leftCameraAngle;
    this.targetOffsetX = this.gl.canvas.width * this.leftCameraAngle;
    this.offsetX = this.targetOffsetX;
    this.offsetY = this.gl.canvas.height * 0.5;
    this.lerpSpeed = 0.08;

    this.eye = [0, 0, 10];
    this.at = [0, 0, 0];
    this.up = [0, 1, 0];

    this.keys = [];
    this.lastPressKey = [];
  }
  horizontalMovement(player) {
    if (this.keys.includes("d")) this.targetOffsetX = this.gl.canvas.width * this.leftCameraAngle;
    else if (this.keys.includes("a")) this.targetOffsetX = this.gl.canvas.width * this.rightCameraAngle;

    this.offsetX += (this.targetOffsetX - this.offsetX) * this.lerpSpeed;

    if (player.x > this.offsetX) {
      this.eye[0] = player.x - this.offsetX;
      this.at[0] = player.x - this.offsetX;
    }
  }
  verticalMovement(player) {
    if (player.y > this.offsetY) {
      this.eye[1] = player.y - this.offsetY;
      this.at[1] = player.y - this.offsetY;
    } else {
      this.eye[1] = 0;
      this.at[1] = 0;
    }
  }
  update(player) {
    this.keys = this.gameState.keys;
    this.lastPressKey = this.gameState.lastPressKey;

    this.horizontalMovement(player);
    this.verticalMovement(player);
    this.mat4.lookAt(this.viewMatrix, this.eye, this.at, this.up);
  }

  draw() {}
}
