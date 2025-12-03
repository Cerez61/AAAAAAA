const stateNum = {
  IDLE_LEFT: 0,
  IDLE_RIGHT: 1,
  RUNNING_LEFT: 2,
  RUNNING_RIGHT: 3,
};

class playerStates {
  constructor(keys) {}
}
export class IdleLeft extends playerStates {
  constructor(player) {
    super();
    this.player = player;
    this.keys = this.player.keys;
    this.lastPressKeys = this.player.lastPressKeys;
    this.lastReleaseKeys = this.player.lastReleaseKeys;
  }
  enter() {
    checkStatement.innerHTML = "IdleLeft";

    this.player.xSpeed = 0;
  }
  updateState() {
    if (this.lastPressKeys[0] === "a" && this.keys.includes("a")) this.player.setState(this.player, stateNum.RUNNING_LEFT);
    else if (this.lastPressKeys[0] === "d" && this.keys.includes("d")) this.player.setState(this.player, stateNum.RUNNING_RIGHT);
  }
}

export class IdleRight extends playerStates {
  constructor(player) {
    super();
    this.player = player;
    this.keys = this.player.keys;
    this.lastPressKeys = this.player.lastPressKeys;
    this.lastReleaseKeys = this.player.lastReleaseKeys;
  }
  enter() {
    checkStatement.innerHTML = "IdleRight";

    this.player.xSpeed = 0;
  }
  updateState() {
    if (this.lastPressKeys[0] === "a" && !this.keys.includes("d")) this.player.setState(this.player, stateNum.RUNNING_LEFT);
    else if (this.lastPressKeys[0] === "d" && this.keys.includes("d")) this.player.setState(this.player, stateNum.RUNNING_RIGHT);
  }
}
export class RunningLeft extends playerStates {
  constructor(player) {
    super();
    this.player = player;
    this.keys = this.player.keys;
    this.lastPressKeys = this.player.lastPressKeys;
    this.lastReleaseKeys = this.player.lastReleaseKeys;
  }
  enter() {
    checkStatement.innerHTML = "RunningLeft";
    this.player.xSpeed = -1;
  }
  updateState() {
    if (this.keys.includes("d")) this.player.setState(this.player, stateNum.RUNNING_RIGHT);
    else if (!this.keys.includes("a")) this.player.setState(this.player, stateNum.IDLE_LEFT);
  }
}

export class RunningRight extends playerStates {
  constructor(player) {
    super();
    this.player = player;
    this.keys = this.player.keys;
    this.lastPressKeys = this.player.lastPressKeys;
    this.lastReleaseKeys = this.player.lastReleaseKeys;
  }
  enter() {
    checkStatement.innerHTML = "RunningRight";
    this.player.xSpeed = 1;
  }
  updateState() {
    if (this.keys.includes("a") && !this.keys.includes("d")) this.player.setState(this.player, stateNum.RUNNING_LEFT);
    else if (this.keys.includes("a") && this.keys.includes("d")) this.player.setState(this.player, stateNum.IDLE_RIGHT);
    else if (!this.keys.includes("d")) this.player.setState(this.player, stateNum.IDLE_RIGHT);
  }
}
