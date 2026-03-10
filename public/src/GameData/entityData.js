export class EntityData {
  constructor() {
    //Player Data
    this.playerPosition = [0, 0];

    //Camera Data
    this.viewMatrix = [];
    this.orthoMatrix = [];

    //Input Data
    this.keys = [];
    this.lastPressKeys = [];
    this.lastReleaseKeys = [];
  }
}
