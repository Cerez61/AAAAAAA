const stateNum = {
  IDLE_LEFT: 0,
  IDLE_RIGHT: 1,
  RUNNING_LEFT: 2,
  RUNNING_RIGHT: 3,
  JUMP_IDLE_LEFT: 4,
  JUMP_IDLE_RIGHT: 5,
  JUMP_RUNNING_LEFT: 6,
  JUMP_RUNNING_RIGHT: 7,
  FALL_IDLE_LEFT: 8,
  FALL_IDLE_RIGHT: 9,
  FALL_RUNNING_LEFT: 10,
  FALL_RUNNING_RIGHT: 11,
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
  }
  updateState() {
    if (this.keys.includes("d") && !this.keys.includes("a")) this.player.setState(this.player, stateNum.RUNNING_RIGHT);
    if (this.keys.includes("a") && !this.keys.includes("d")) this.player.setState(this.player, stateNum.RUNNING_LEFT);
    if (this.lastPressKeys[0] === "w" && this.player.onGround()) this.player.setState(this.player, stateNum.JUMP_IDLE_LEFT);
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
  }
  updateState() {
    if (this.keys.includes("d") && !this.keys.includes("a")) this.player.setState(this.player, stateNum.RUNNING_RIGHT);
    if (this.keys.includes("a") && !this.keys.includes("d")) this.player.setState(this.player, stateNum.RUNNING_LEFT);
    if (this.lastPressKeys[0] === "w" && this.player.onGround()) this.player.setState(this.player, stateNum.JUMP_IDLE_RIGHT);
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
    this.player.ySpeed = 0;
    this.player.weight = 20;
  }
  updateState() {
    if (!this.keys.includes("a") && !this.keys.includes("d")) this.player.setState(this.player, stateNum.IDLE_LEFT);
    if (!this.keys.includes("a") && this.keys.includes("d")) this.player.setState(this.player, stateNum.RUNNING_RIGHT);
    if (this.lastPressKeys[0] === "w" && this.player.onGround()) this.player.setState(this.player, stateNum.JUMP_RUNNING_LEFT);
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
  }
  updateState() {
    if (!this.keys.includes("d") && !this.keys.includes("a")) this.player.setState(this.player, stateNum.IDLE_RIGHT);
    if (!this.keys.includes("d") && this.keys.includes("a")) this.player.setState(this.player, stateNum.RUNNING_LEFT);
    if (this.lastPressKeys[0] === "w" && this.player.onGround()) this.player.setState(this.player, stateNum.JUMP_RUNNING_RIGHT);
  }
}

export class JumpIdleLeft extends playerStates {
  constructor(player) {
    super();
    this.player = player;
    this.keys = this.player.keys;
    this.jumpCount = this.player.jumpCount;
    this.lastPressKeys = this.player.lastPressKeys;
    this.lastReleaseKeys = this.player.lastReleaseKeys;
  }
  enter() {
    checkStatement.innerHTML = "JumpIdleLeft";
  }
  updateState() {
    if (!this.keys.includes("a") && this.keys.includes("d")) this.player.setState(this.player, stateNum.FALL_RUNNING_RIGHT);
    if (this.keys.includes("a") && !this.player.onGround()) this.player.setState(this.player, stateNum.JUMP_RUNNING_LEFT);
    if (this.player.weight < 0) this.player.setState(this.player, stateNum.FALL_IDLE_LEFT);
  }
}

export class JumpIdleRight extends playerStates {
  constructor(player) {
    super();
    this.player = player;
    this.keys = this.player.keys;
    this.jumpCount = this.player.jumpCount;
    this.lastPressKeys = this.player.lastPressKeys;
    this.lastReleaseKeys = this.player.lastReleaseKeys;
  }
  enter() {
    checkStatement.innerHTML = "JumpIdleRight";
  }
  updateState() {
    if (this.keys.includes("d")) this.player.setState(this.player, stateNum.JUMP_RUNNING_RIGHT);
    if (!this.keys.includes("d") && this.keys.includes("a")) this.player.setState(this.player, stateNum.JUMP_RUNNING_LEFT);
    if (this.player.weight < 0) this.player.setState(this.player, stateNum.FALL_IDLE_RIGHT);
  }
}

export class JumpRunningLeft extends playerStates {
  constructor(player) {
    super();
    this.player = player;
    this.keys = this.player.keys;
    this.jumpCount = this.player.jumpCount;
    this.lastPressKeys = this.player.lastPressKeys;
    this.lastReleaseKeys = this.player.lastReleaseKeys;
  }
  enter() {
    checkStatement.innerHTML = "JumpRunningLeft";
  }
  updateState() {
    if (!this.keys.includes("a") && !this.keys.includes("d")) this.player.setState(this.player, stateNum.JUMP_IDLE_LEFT);
    if (!this.keys.includes("a") && this.keys.includes("d")) this.player.setState(this.player, stateNum.JUMP_RUNNING_RIGHT);
    if (this.player.weight < 0) this.player.setState(this.player, stateNum.FALL_RUNNING_LEFT);
  }
}

export class JumpRunningRight extends playerStates {
  constructor(player) {
    super();
    this.player = player;
    this.keys = this.player.keys;
    this.jumpCount = this.player.jumpCount;
    this.lastPressKeys = this.player.lastPressKeys;
    this.lastReleaseKeys = this.player.lastReleaseKeys;
  }
  enter() {
    checkStatement.innerHTML = "JumpRunningRight";
  }
  updateState() {
    if (!this.keys.includes("d") && !this.keys.includes("a")) this.player.setState(this.player, stateNum.JUMP_IDLE_RIGHT);
    if (!this.keys.includes("d") && this.keys.includes("a")) this.player.setState(this.player, stateNum.JUMP_RUNNING_LEFT);
    if (this.player.weight < 0) this.player.setState(this.player, stateNum.FALL_RUNNING_RIGHT);
  }
}
export class FallIdleLeft extends playerStates {
  constructor(player) {
    super();
    this.player = player;
    this.keys = this.player.keys;
    this.jumpCount = this.player.jumpCount;
    this.lastPressKeys = this.player.lastPressKeys;
    this.lastReleaseKeys = this.player.lastReleaseKeys;
  }
  enter() {
    checkStatement.innerHTML = "FallIdleLeft";
  }
  updateState() {
    if (this.keys.includes("a") && !this.keys.includes("d")) this.player.setState(this.player, stateNum.FALL_RUNNING_LEFT);
    if (!this.keys.includes("a") && this.keys.includes("d")) this.player.setState(this.player, stateNum.FALL_RUNNING_RIGHT);
    if (this.lastPressKeys[0] === "w" && this.jumpCount > 0) this.player.setState(this.player, stateNum.JUMP_IDLE_LEFT);
    if (this.player.onGround()) this.player.setState(this.player, stateNum.IDLE_LEFT);
  }
}

export class FallIdleRight extends playerStates {
  constructor(player) {
    super();
    this.player = player;
    this.keys = this.player.keys;
    this.jumpCount = this.player.jumpCount;
    this.lastPressKeys = this.player.lastPressKeys;
    this.lastReleaseKeys = this.player.lastReleaseKeys;
  }
  enter() {
    checkStatement.innerHTML = "FallIdleRight";
  }
  updateState() {
    if (this.keys.includes("d") && !this.keys.includes("a")) this.player.setState(this.player, stateNum.FALL_RUNNING_RIGHT);
    if (!this.keys.includes("d") && this.keys.includes("a")) this.player.setState(this.player, stateNum.FALL_RUNNING_LEFT);
    if (this.lastPressKeys[0] === "w" && this.jumpCount > 0) this.player.setState(this.player, stateNum.JUMP_IDLE_RIGHT);
    if (this.player.onGround()) this.player.setState(this.player, stateNum.IDLE_RIGHT);
  }
}
export class FallRunningLeft extends playerStates {
  constructor(player) {
    super();
    this.player = player;
    this.keys = this.player.keys;
    this.jumpCount = this.player.jumpCount;
    this.lastPressKeys = this.player.lastPressKeys;
    this.lastReleaseKeys = this.player.lastReleaseKeys;
  }
  enter() {
    checkStatement.innerHTML = "FallRunningLeft";
  }
  updateState() {
    if (!this.keys.includes("a") && !this.keys.includes("d")) this.player.setState(this.player, stateNum.FALL_IDLE_LEFT);
    if (!this.keys.includes("a") && this.keys.includes("d")) this.player.setState(this.player, stateNum.FALL_RUNNING_RIGHT);
    if (this.lastPressKeys[0] === "w" && this.jumpCount > 0) this.player.setState(this.player, stateNum.JUMP_RUNNING_LEFT);
    if (this.player.onGround()) this.player.setState(this.player, stateNum.RUNNING_LEFT);
  }
}
export class FallRunningRight extends playerStates {
  constructor(player) {
    super();
    this.player = player;
    this.keys = this.player.keys;
    this.jumpCount = this.player.jumpCount;
    this.lastPressKeys = this.player.lastPressKeys;
    this.lastReleaseKeys = this.player.lastReleaseKeys;
  }
  enter() {
    checkStatement.innerHTML = "FallRunningRight";
  }
  updateState() {
    if (!this.keys.includes("d") && !this.keys.includes("a")) this.player.setState(this.player, stateNum.FALL_IDLE_RIGHT);
    if (!this.keys.includes("d") && this.keys.includes("a")) this.player.setState(this.player, stateNum.FALL_RUNNING_LEFT);
    if (this.lastPressKeys[0] === "w" && this.jumpCount > 0) this.player.setState(this.player, stateNum.JUMP_RUNNING_RIGHT);
    if (this.player.onGround()) this.player.setState(this.player, stateNum.RUNNING_RIGHT);
  }
}
