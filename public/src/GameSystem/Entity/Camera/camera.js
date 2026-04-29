import { MAT4 } from "../../../utils/matrix.js";
export class Camera {
  constructor(gameData) {
    this.globalData = gameData[0];
    this.instanceData = gameData[1];
    this.entityData = gameData[2];

    this.gl = this.globalData.gl;

    //Camera Matrixs
    this.mat4 = new MAT4();
    this.viewMatrix = this.mat4.identity();
    this.orthoMatrix = this.mat4.ortho(0, this.gl.canvas.width, 0, this.gl.canvas.height, -100, 100);

    //Camera and Player Position
    this.x = 0;
    this.y = 0;
    this.playerPosition = [];

    //Camera Boundary and Lerp Values
    this.leftCameraAngle = 0.49;
    this.rightCameraAngle = 1 - this.leftCameraAngle;
    this.targetOffsetX = this.gl.canvas.width * this.leftCameraAngle;
    this.offsetX = this.targetOffsetX;
    this.offsetY = this.gl.canvas.height * 0.5;
    this.lerpSpeed = 0.08;

    //Camera Func Parameters
    this.eye = [0, 0, 10];
    this.at = [0, 0, 0];
    this.up = [0, 1, 0];

    //Inputs
    this.keys = [];
    this.lastPressKey = [];

    this.entityDataInitialize();
  }
  entityDataInitialize() {
    this.instanceData.orthoMatrix = this.orthoMatrix;
  }
  entityDataTake() {
    this.keys = this.entityData.keys;
    this.lastPressKey = this.entityData.lastPressKey;
    this.playerPosition = this.entityData.playerPosition;
  }
  entityDataGive() {
    this.instanceData.viewMatrix = this.mat4.lookAt(this.viewMatrix, this.eye, this.at, this.up);
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
  pixelSnapping() {
    this.eye = [Math.floor(this.eye[0]), Math.floor(this.eye[1]), Math.floor(this.eye[2])];
  }
  async init() {}
  update() {
    this.entityDataTake();

    this.horizontalMovement();
    this.verticalMovement();

    // this.pixelSnapping();

    this.entityDataGive();
  }
}
