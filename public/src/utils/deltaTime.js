export class DeltaTime {
  static deltaTime = 0;
  static lastTime = 0;

  static update(timeStamp) {
    this.deltaTime = timeStamp - this.lastTime;
    this.lastTime = timeStamp;
  }
  static get() {
    return this.deltaTime;
  }
}
