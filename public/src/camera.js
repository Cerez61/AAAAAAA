import { MAT4 } from "./utils/matrix.js";
export class Camera {
  constructor() {
    this.mat4 = new MAT4();
    this.cameraMatrix = this.mat4.identity();
    this.x = 0;
    this.y = 0;
    this.mat4.lookAt(this.cameraMatrix, [this.x, this.y, 0.5], [0, 0, 0], [0, 1, 0]);
  }
  update() {
    this.mat4.lookAt(this.cameraMatrix, [this.x, this.y, 0.5], [0, 0, 0], [0, 1, 0]);
  }
  draw() {}
}
