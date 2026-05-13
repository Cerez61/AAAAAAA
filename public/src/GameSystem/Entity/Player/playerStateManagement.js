import { DeltaTime } from "../../../components/deltaTime.js";
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
  constructor(player) {
    this.player = player;

    this.keys = this.player.keys;
    this.lastPressKeys = this.player.lastPressKeys;
    this.lastReleaseKeys = this.player.lastReleaseKeys;

    this.targetJSON = this.player.targetJSON;
    this.entityFrames = this.player.entityFrames;

    this.targetFrames;
    this.frame;

    this.lastTime = 0;
    this.frameDuration = 100;
  }
  getEntityFrame(frameName) {
    for (const value of this.entityFrames) {
      if (value.name === frameName) {
        this.targetFrames = value;
      }
    }
    this.frame = this.targetFrames.from;
  }
  updateFrame() {
    if (this.lastTime > this.frameDuration) {
      if (this.targetFrames.to > this.frame) this.frame++;

      this.player.updateFrame(this.targetJSON.frames[this.frame].frame);

      this.lastTime = 0;
    } else this.lastTime += DeltaTime.get();
  }
}
export class IdleLeft extends playerStates {
  constructor(player) {
    super(player);
  }
  enter() {
    checkStatement.innerHTML = "IdleLeft";
  }
  updateState() {
    if (this.keys.includes("d") && !this.keys.includes("a")) this.player.setState(this.player, stateNum.RUNNING_RIGHT);
    if (this.keys.includes("a") && !this.keys.includes("d")) this.player.setState(this.player, stateNum.RUNNING_LEFT);
    if (this.lastPressKeys[0] === "w" && this.player.collideDirections.includes("BOTTOM")) this.player.setState(this.player, stateNum.JUMP_IDLE_LEFT);
    if (!this.player.collideDirections.includes("BOTTOM")) this.player.setState(this.player, stateNum.JUMP_IDLE_LEFT);
  }
}

export class IdleRight extends playerStates {
  constructor(player) {
    super(player);
  }
  enter() {
    checkStatement.innerHTML = "IdleRight";
  }
  updateState() {
    if (this.keys.includes("d") && !this.keys.includes("a")) this.player.setState(this.player, stateNum.RUNNING_RIGHT);
    if (this.keys.includes("a") && !this.keys.includes("d")) this.player.setState(this.player, stateNum.RUNNING_LEFT);
    if (this.lastPressKeys[0] === "w" && this.player.collideDirections.includes("BOTTOM"))
      this.player.setState(this.player, stateNum.JUMP_IDLE_RIGHT);
    if (!this.player.collideDirections.includes("BOTTOM")) this.player.setState(this.player, stateNum.JUMP_IDLE_RIGHT);
  }
}
export class RunningLeft extends playerStates {
  constructor(player) {
    super(player);
  }
  enter() {
    checkStatement.innerHTML = "RunningLeft";
    this.player.ySpeed = 0;
    this.player.weight = 20;

    super.getEntityFrame("PLAYER_RUNNING_LEFT");
  }
  updateState() {
    super.updateFrame();

    if (!this.keys.includes("a") && !this.keys.includes("d")) this.player.setState(this.player, stateNum.IDLE_LEFT);
    if (!this.keys.includes("a") && this.keys.includes("d")) this.player.setState(this.player, stateNum.RUNNING_RIGHT);
    if (this.lastPressKeys[0] === "w" && this.player.collideDirections.includes("BOTTOM"))
      this.player.setState(this.player, stateNum.JUMP_RUNNING_LEFT);
    if (!this.player.collideDirections.includes("BOTTOM")) this.player.setState(this.player, stateNum.JUMP_RUNNING_LEFT);
  }
}

export class RunningRight extends playerStates {
  constructor(player) {
    super(player);
  }
  enter() {
    checkStatement.innerHTML = "RunningRight";

    super.getEntityFrame("PLAYER_RUNNING_RIGHT");
  }
  updateState() {
    super.updateFrame();

    if (!this.keys.includes("d") && !this.keys.includes("a")) this.player.setState(this.player, stateNum.IDLE_RIGHT);
    if (!this.keys.includes("d") && this.keys.includes("a")) this.player.setState(this.player, stateNum.RUNNING_LEFT);
    if (this.lastPressKeys[0] === "w" && this.player.collideDirections.includes("BOTTOM"))
      this.player.setState(this.player, stateNum.JUMP_RUNNING_RIGHT);
    if (!this.player.collideDirections.includes("BOTTOM")) this.player.setState(this.player, stateNum.JUMP_RUNNING_RIGHT);
  }
}

export class JumpIdleLeft extends playerStates {
  constructor(player) {
    super(player);
  }
  enter() {
    checkStatement.innerHTML = "JumpIdleLeft";

    super.getEntityFrame("PLAYER_JUMPING");
  }
  updateState() {
    super.updateFrame();

    if (!this.keys.includes("a") && this.keys.includes("d")) this.player.setState(this.player, stateNum.FALL_RUNNING_RIGHT);
    if (this.keys.includes("a") && !this.player.collideDirections.includes("BOTTOM")) this.player.setState(this.player, stateNum.JUMP_RUNNING_LEFT);
    if (this.player.verticalStates.vy < 0) this.player.setState(this.player, stateNum.FALL_IDLE_LEFT);
  }
}

export class JumpIdleRight extends playerStates {
  constructor(player) {
    super(player);
  }
  enter() {
    checkStatement.innerHTML = "JumpIdleRight";
  }
  updateState() {
    if (this.keys.includes("d")) this.player.setState(this.player, stateNum.JUMP_RUNNING_RIGHT);
    if (!this.keys.includes("d") && this.keys.includes("a")) this.player.setState(this.player, stateNum.JUMP_RUNNING_LEFT);
    if (this.player.verticalStates.vy < 0) this.player.setState(this.player, stateNum.FALL_IDLE_RIGHT);
  }
}

export class JumpRunningLeft extends playerStates {
  constructor(player) {
    super(player);
  }
  enter() {
    checkStatement.innerHTML = "JumpRunningLeft";
  }
  updateState() {
    if (!this.keys.includes("a") && !this.keys.includes("d")) this.player.setState(this.player, stateNum.JUMP_IDLE_LEFT);
    if (!this.keys.includes("a") && this.keys.includes("d")) this.player.setState(this.player, stateNum.JUMP_RUNNING_RIGHT);
    if (this.player.verticalStates.vy < 0) this.player.setState(this.player, stateNum.FALL_RUNNING_LEFT);
  }
}

export class JumpRunningRight extends playerStates {
  constructor(player) {
    super(player);
  }
  enter() {
    checkStatement.innerHTML = "JumpRunningRight";
  }
  updateState() {
    if (!this.keys.includes("d") && !this.keys.includes("a")) this.player.setState(this.player, stateNum.JUMP_IDLE_RIGHT);
    if (!this.keys.includes("d") && this.keys.includes("a")) this.player.setState(this.player, stateNum.JUMP_RUNNING_LEFT);
    if (this.player.verticalStates.vy < 0) this.player.setState(this.player, stateNum.FALL_RUNNING_RIGHT);
  }
}
export class FallIdleLeft extends playerStates {
  constructor(player) {
    super(player);
  }
  enter() {
    checkStatement.innerHTML = "FallIdleLeft";

    super.getEntityFrame("PLAYER_FALLING");
  }
  updateState() {
    super.updateFrame();

    if (this.keys.includes("a") && !this.keys.includes("d")) this.player.setState(this.player, stateNum.FALL_RUNNING_LEFT);
    if (!this.keys.includes("a") && this.keys.includes("d")) this.player.setState(this.player, stateNum.FALL_RUNNING_RIGHT);
    if (this.lastPressKeys[0] === "w" && this.player.verticalStates.jumpCount > 0 && !this.player.collideDirections.includes("BOTTOM"))
      this.player.setState(this.player, stateNum.JUMP_IDLE_LEFT);
    if (this.player.collideDirections.includes("BOTTOM")) this.player.setState(this.player, stateNum.IDLE_LEFT);
  }
}
export class FallIdleRight extends playerStates {
  constructor(player) {
    super(player);
  }
  enter() {
    checkStatement.innerHTML = "FallIdleRight";
  }
  updateState() {
    if (this.keys.includes("d") && !this.keys.includes("a")) this.player.setState(this.player, stateNum.FALL_RUNNING_RIGHT);
    if (!this.keys.includes("d") && this.keys.includes("a")) this.player.setState(this.player, stateNum.FALL_RUNNING_LEFT);
    if (this.lastPressKeys[0] === "w" && this.player.jumpCount > 0 && !this.player.collideDirections.includes("BOTTOM"))
      this.player.setState(this.player, stateNum.JUMP_IDLE_RIGHT);
    if (this.player.collideDirections.includes("BOTTOM")) this.player.setState(this.player, stateNum.IDLE_RIGHT);
  }
}
export class FallRunningLeft extends playerStates {
  constructor(player) {
    super(player);
  }
  enter() {
    checkStatement.innerHTML = "FallRunningLeft";
  }
  updateState() {
    if (!this.keys.includes("a") && !this.keys.includes("d")) this.player.setState(this.player, stateNum.FALL_IDLE_LEFT);
    if (!this.keys.includes("a") && this.keys.includes("d")) this.player.setState(this.player, stateNum.FALL_RUNNING_RIGHT);
    if (this.lastPressKeys[0] === "w" && this.player.jumpCount > 0 && !this.player.collideDirections.includes("BOTTOM"))
      this.player.setState(this.player, stateNum.JUMP_RUNNING_LEFT);
    if (this.player.collideDirections.includes("BOTTOM")) this.player.setState(this.player, stateNum.RUNNING_LEFT);
  }
}
export class FallRunningRight extends playerStates {
  constructor(player) {
    super(player);
  }
  enter() {
    checkStatement.innerHTML = "FallRunningRight";
  }
  updateState() {
    if (!this.keys.includes("d") && !this.keys.includes("a")) this.player.setState(this.player, stateNum.FALL_IDLE_RIGHT);
    if (!this.keys.includes("d") && this.keys.includes("a")) this.player.setState(this.player, stateNum.FALL_RUNNING_LEFT);
    if (this.lastPressKeys[0] === "w" && this.player.jumpCount > 0 && !this.player.collideDirections.includes("BOTTOM"))
      this.player.setState(this.player, stateNum.JUMP_RUNNING_RIGHT);
    if (this.player.collideDirections.includes("BOTTOM")) this.player.setState(this.player, stateNum.RUNNING_RIGHT);
  }
}
