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
  }
  enter() {
    checkStatement.innerHTML = "IdleLeft";
  }
  updateState() {
    if (this.keys.includes("a")) this.player.setState(this.player, stateNum.RUNNING_LEFT);
    else if (this.keys.includes("d")) this.player.setState(this.player, stateNum.RUNNING_RIGHT);
  }
}

export class IdleRight extends playerStates {
  constructor(player) {
    super();
    this.player = player;
    this.keys = this.player.keys;
  }
  enter() {
    checkStatement.innerHTML = "IdleRight";
  }
  updateState() {
    if (this.keys.includes("a")) this.player.setState(this.player, stateNum.RUNNING_LEFT);
    else if (this.keys.includes("d")) this.player.setState(this.player, stateNum.RUNNING_RIGHT);
  }
}
export class RunningLeft extends playerStates {
  constructor(player) {
    super();
    this.player = player;
    this.keys = this.player.keys;
  }
  enter() {
    checkStatement.innerHTML = "RunningLeft";
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
  }
  enter() {
    checkStatement.innerHTML = "RunningRight";
  }
  updateState() {
    if (this.keys.includes("a") && !this.keys.includes("d")) this.player.setState(this.player, stateNum.RUNNING_LEFT);
    else if (this.keys.includes("a") && this.keys.includes("d")) this.player.setState(this.player, stateNum.IDLE_RIGHT);
    else if (!this.keys.includes("d")) this.player.setState(this.player, stateNum.IDLE_RIGHT);
  }
}
