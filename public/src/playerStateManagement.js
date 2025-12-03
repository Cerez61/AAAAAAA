const stateNum = {
  IDLE_LEFT: 0,
  IDLE_RIGHT: 1,
  RUNNING_LEFT: 2,
  RUNNING_RIGHT: 3,
  JUMP_IDLE_LEFT: 4,
  JUMP_IDLE_RIGHT: 5,
  JUMP_RUNNING_LEFT: 6,
  JUMP_RUNNING_RIGHT: 7,
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
    if (this.keys.includes("d")) this.player.setState(this.player, stateNum.RUNNING_RIGHT);
    if (this.keys.includes("a")) this.player.setState(this.player, stateNum.RUNNING_LEFT);
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
    if (this.keys.includes("d")) this.player.setState(this.player, stateNum.RUNNING_RIGHT);
    if (this.keys.includes("a")) this.player.setState(this.player, stateNum.RUNNING_LEFT);
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
    if (!this.keys.includes("a")) this.player.setState(this.player, stateNum.IDLE_LEFT);
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
    if (!this.keys.includes("d")) this.player.setState(this.player, stateNum.IDLE_RIGHT);
  }
}

export class JumpIdleLeft extends playerStates {
  constructor(player) {
    super();
    this.player = player;
    this.keys = this.player.keys;
    this.lastPressKeys = this.player.lastPressKeys;
    this.lastReleaseKeys = this.player.lastReleaseKeys;
  }
  enter() {
    this.player.xSpeed = 0;
  }
  updateState() {}
}

export class JumpIdleRight extends playerStates {
  constructor(player) {
    super();
    this.player = player;
    this.keys = this.player.keys;
    this.lastPressKeys = this.player.lastPressKeys;
    this.lastReleaseKeys = this.player.lastReleaseKeys;
  }
  enter() {
    this.player.xSpeed = 0;
  }
  updateState() {}
}

export class JumpRunningLeft extends playerStates {
  constructor(player) {
    super();
    this.player = player;
    this.keys = this.player.keys;
    this.lastPressKeys = this.player.lastPressKeys;
    this.lastReleaseKeys = this.player.lastReleaseKeys;
  }
  enter() {
    this.player.xSpeed = -1;
  }
  updateState() {}
}

export class JumpRunningRight extends playerStates {
  constructor(player) {
    super();
    this.player = player;
    this.keys = this.player.keys;
    this.lastPressKeys = this.player.lastPressKeys;
    this.lastReleaseKeys = this.player.lastReleaseKeys;
  }
  enter() {
    this.player.xSpeed = 1;
  }
  updateState() {}
}
