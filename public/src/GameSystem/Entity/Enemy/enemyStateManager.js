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
const leftFramesEnum = {
  IDLE_LEFT: true,
  RUNNING_LEFT: true,
  JUMP_IDLE_LEFT: true,
  JUMP_RUNNING_LEFT: true,
  FALL_IDLE_LEFT: true,
  FALL_RUNNING_LEFT: true,
  IDLE_RIGHT: false,
  RUNNING_RIGHT: false,
  JUMP_IDLE_RIGHT: false,
  JUMP_RUNNING_RIGHT: false,
  FALL_IDLE_RIGHT: false,
  FALL_RUNNING_RIGHT: false,
};
class EnemyStates {
  constructor(enemy) {
    this.enemy = enemy;
    this.posDiff;

    this.frame = 0;
  }
  updatePosDiff() {
    this.posDiff = Math.sign(this.enemy.p2.x - this.enemy.p.x);
  }
}

export class IdleLeft extends EnemyStates {
  constructor(enemy) {
    super(enemy);
  }
  enter(currentFrame) {}
  updateState() {
    this.updatePosDiff();
    if (this.posDiff > 0) this.enemy.setState(stateNum.RUNNING_RIGHT, this.frame);
    else if (this.posDiff < 0) this.enemy.setState(stateNum.RUNNING_LEFT, this.frame);
  }
}

export class IdleRight extends EnemyStates {
  constructor(enemy) {
    super(enemy);
  }
  enter(currentFrame) {}
  updateState() {
    this.updatePosDiff();
    if (this.posDiff > 0) this.enemy.setState(stateNum.RUNNING_RIGHT, this.frame);
    else if (this.posDiff < 0) this.enemy.setState(stateNum.RUNNING_LEFT, this.frame);
  }
}

export class RunningLeft extends EnemyStates {
  constructor(enemy) {
    super(enemy);
  }
  enter(currentFrame) {}
  updateState() {
    this.updatePosDiff();
    if (this.posDiff == 0) this.enemy.setState(stateNum.IDLE_LEFT, this.frame);
    else if (this.posDiff > 0) this.enemy.setState(stateNum.RUNNING_RIGHT, this.frame);
  }
}

export class RunningRight extends EnemyStates {
  constructor(enemy) {
    super(enemy);
  }
  enter(currentFrame) {}
  updateState() {
    this.updatePosDiff();
    if (this.posDiff == 0) this.enemy.setState(stateNum.IDLE_RIGHT, this.frame);
    else if (this.posDiff < 0) this.enemy.setState(stateNum.RUNNING_LEFT, this.frame);
  }
}

export class JumpIdleLeft extends EnemyStates {
  constructor(enemy) {
    super(enemy);
  }
  enter(currentFrame) {}
  updateState() {
    this.updatePosDiff();
  }
}

export class JumpIdleRight extends EnemyStates {
  constructor(enemy) {
    super(enemy);
  }
  enter(currentFrame) {}
  updateState() {
    this.updatePosDiff();
  }
}

export class JumpRunningLeft extends EnemyStates {
  constructor(enemy) {
    super(enemy);
  }
  enter(currentFrame) {}
  updateState() {
    this.updatePosDiff();
  }
}

export class JumpRunningRight extends EnemyStates {
  constructor(enemy) {
    super(enemy);
  }
  enter(currentFrame) {}
  updateState() {
    this.updatePosDiff();
  }
}

export class FallIdleLeft extends EnemyStates {
  constructor(enemy) {
    super(enemy);
  }
  enter(currentFrame) {}
  updateState() {
    this.updatePosDiff();
  }
}

export class FallIdleRight extends EnemyStates {
  constructor(enemy) {
    super(enemy);
  }
  enter(currentFrame) {}
  updateState() {
    this.updatePosDiff();
  }
}

export class FallRunningLeft extends EnemyStates {
  constructor(enemy) {
    super(enemy);
  }
  enter(currentFrame) {}
  updateState() {
    this.updatePosDiff();
  }
}

export class FallRunningRight extends EnemyStates {
  constructor(enemy) {
    super(enemy);
  }
  enter(currentFrame) {}
  updateState() {
    this.updatePosDiff();
  }
}
