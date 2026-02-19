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

    this.playerPosition = [];

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

    this.gameStateUpdateInitialize();
  }
  gameStateUpdateInitialize() {
    this.gameState.orthoMatrix = this.orthoMatrix;
  }
  gameStateUpdateTake() {
    this.keys = this.gameState.keys;
    this.lastPressKey = this.gameState.lastPressKey;
    this.playerPosition = this.gameState.playerPosition;
  }
  gameStateUpdateGive() {
    this.gameState.viewMatrix = this.mat4.lookAt(this.viewMatrix, this.eye, this.at, this.up);
  }
  horizontalMovement() {
    if (this.keys.includes("d")) this.targetOffsetX = this.gl.canvas.width * this.leftCameraAngle;
    else if (this.keys.includes("a")) this.targetOffsetX = this.gl.canvas.width * this.rightCameraAngle;

    this.offsetX += (this.targetOffsetX - this.offsetX) * this.lerpSpeed;

    if (this.playerPosition[0] > this.offsetX) {
      this.eye[0] = this.playerPosition[0] - this.offsetX;
      this.at[0] = this.playerPosition[0] - this.offsetX;
    }
  }
  verticalMovement() {
    if (this.playerPosition[1] > this.offsetY) {
      this.eye[1] = this.playerPosition[1] - this.offsetY;
      this.at[1] = this.playerPosition[1] - this.offsetY;
    } else {
      this.eye[1] = 0;
      this.at[1] = 0;
    }
  }
  update(player) {
    this.gameStateUpdateTake();

    this.horizontalMovement();
    this.verticalMovement();

    this.gameStateUpdateGive();
  }
}
