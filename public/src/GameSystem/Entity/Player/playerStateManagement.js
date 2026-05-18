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
    this.frameDuration = 50;
  }
  getEntityFrame(frameName, currentFrame) {
    for (const value of this.entityFrames) {
      if (value.name === frameName) {
        this.targetFrames = value;
      }
    }

    if (this.targetFrames.from <= currentFrame && this.targetFrames.to >= currentFrame) {
      this.frame = currentFrame;
      return;
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
  enter(currentFrame) {
    checkStatement.innerHTML = "IdleLeft";
    super.getEntityFrame("PLAYER_RUNNING_LEFT", currentFrame);
  }
  updateState() {
    super.updateFrame();

    if (this.keys.includes("d") && !this.keys.includes("a")) this.player.setState(stateNum.RUNNING_RIGHT, this.frame);
    if (this.keys.includes("a") && !this.keys.includes("d")) this.player.setState(stateNum.RUNNING_LEFT, this.frame);
    if (this.lastPressKeys[0] === "w" && this.player.collideDirections.includes("BOTTOM")) this.player.setState(stateNum.JUMP_IDLE_LEFT, this.frame);
    if (!this.player.collideDirections.includes("BOTTOM")) this.player.setState(stateNum.JUMP_IDLE_LEFT, this.frame);
  }
}

export class IdleRight extends playerStates {
  constructor(player) {
    super(player);
  }
  enter(currentFrame) {
    checkStatement.innerHTML = "IdleRight";
    super.getEntityFrame("PLAYER_RUNNING_RIGHT", currentFrame);
  }
  updateState() {
    super.updateFrame();

    if (this.keys.includes("d") && !this.keys.includes("a")) this.player.setState(stateNum.RUNNING_RIGHT, this.frame);
    if (this.keys.includes("a") && !this.keys.includes("d")) this.player.setState(stateNum.RUNNING_LEFT, this.frame);
    if (this.lastPressKeys[0] === "w" && this.player.collideDirections.includes("BOTTOM")) this.player.setState(stateNum.JUMP_IDLE_RIGHT, this.frame);
    if (!this.player.collideDirections.includes("BOTTOM")) this.player.setState(stateNum.JUMP_IDLE_RIGHT, this.frame);
  }
}
export class RunningLeft extends playerStates {
  constructor(player) {
    super(player);
  }
  enter(currentFrame) {
    checkStatement.innerHTML = "RunningLeft";

    super.getEntityFrame("PLAYER_RUNNING_LEFT", currentFrame);
  }
  updateState() {
    super.updateFrame();

    if (!this.keys.includes("a") && !this.keys.includes("d")) this.player.setState(stateNum.IDLE_LEFT, this.frame);
    if (!this.keys.includes("a") && this.keys.includes("d")) this.player.setState(stateNum.RUNNING_RIGHT, this.frame);
    if (this.lastPressKeys[0] === "w" && this.player.collideDirections.includes("BOTTOM"))
      this.player.setState(stateNum.JUMP_RUNNING_LEFT, this.frame);
    if (!this.player.collideDirections.includes("BOTTOM")) this.player.setState(stateNum.JUMP_RUNNING_LEFT, this.frame);
  }
}

export class RunningRight extends playerStates {
  constructor(player) {
    super(player);
  }
  enter(currentFrame) {
    checkStatement.innerHTML = "RunningRight";

    super.getEntityFrame("PLAYER_RUNNING_RIGHT", currentFrame);
  }
  updateState() {
    super.updateFrame();

    if (!this.keys.includes("d") && !this.keys.includes("a")) this.player.setState(stateNum.IDLE_RIGHT, this.frame);
    if (!this.keys.includes("d") && this.keys.includes("a")) this.player.setState(stateNum.RUNNING_LEFT, this.frame);
    if (this.lastPressKeys[0] === "w" && this.player.collideDirections.includes("BOTTOM"))
      this.player.setState(stateNum.JUMP_RUNNING_RIGHT, this.frame);
    if (!this.player.collideDirections.includes("BOTTOM")) this.player.setState(stateNum.JUMP_RUNNING_RIGHT, this.frame);
  }
}

export class JumpIdleLeft extends playerStates {
  constructor(player) {
    super(player);
  }
  enter(currentFrame) {
    checkStatement.innerHTML = "JumpIdleLeft";

    super.getEntityFrame("PLAYER_JUMPING", currentFrame);
  }
  updateState() {
    super.updateFrame();

    if (!this.keys.includes("a") && this.keys.includes("d")) this.player.setState(stateNum.FALL_RUNNING_RIGHT, this.frame);
    if (this.keys.includes("a") && !this.player.collideDirections.includes("BOTTOM")) this.player.setState(stateNum.JUMP_RUNNING_LEFT, this.frame);
    if (this.player.verticalStates.vy < 0) this.player.setState(stateNum.FALL_IDLE_LEFT, this.frame);
  }
}

export class JumpIdleRight extends playerStates {
  constructor(player) {
    super(player);
  }
  enter(currentFrame) {
    checkStatement.innerHTML = "JumpIdleRight";
    super.getEntityFrame("PLAYER_JUMPING", currentFrame);
  }
  updateState() {
    super.updateFrame();

    if (this.keys.includes("d")) this.player.setState(stateNum.JUMP_RUNNING_RIGHT, this.frame);
    if (!this.keys.includes("d") && this.keys.includes("a")) this.player.setState(stateNum.JUMP_RUNNING_LEFT, this.frame);
    if (this.player.verticalStates.vy < 0) this.player.setState(stateNum.FALL_IDLE_RIGHT, this.frame);
  }
}

export class JumpRunningLeft extends playerStates {
  constructor(player) {
    super(player);
  }
  enter(currentFrame) {
    checkStatement.innerHTML = "JumpRunningLeft";
    super.getEntityFrame("PLAYER_JUMPING", currentFrame);
  }
  updateState() {
    super.updateFrame();

    if (!this.keys.includes("a") && !this.keys.includes("d")) this.player.setState(stateNum.JUMP_IDLE_LEFT, this.frame);
    if (!this.keys.includes("a") && this.keys.includes("d")) this.player.setState(stateNum.JUMP_RUNNING_RIGHT, this.frame);
    if (this.player.verticalStates.vy < 0) this.player.setState(stateNum.FALL_RUNNING_LEFT, this.frame);
  }
}

export class JumpRunningRight extends playerStates {
  constructor(player) {
    super(player);
  }
  enter(currentFrame) {
    checkStatement.innerHTML = "JumpRunningRight";
    super.getEntityFrame("PLAYER_JUMPING", currentFrame);
  }
  updateState() {
    super.updateFrame();

    if (!this.keys.includes("d") && !this.keys.includes("a")) this.player.setState(stateNum.JUMP_IDLE_RIGHT, this.frame);
    if (!this.keys.includes("d") && this.keys.includes("a")) this.player.setState(stateNum.JUMP_RUNNING_LEFT, this.frame);
    if (this.player.verticalStates.vy < 0) this.player.setState(stateNum.FALL_RUNNING_RIGHT, this.frame);
  }
}
export class FallIdleLeft extends playerStates {
  constructor(player) {
    super(player);
  }
  enter(currentFrame) {
    checkStatement.innerHTML = "FallIdleLeft";

    super.getEntityFrame("PLAYER_FALLING", currentFrame);
  }
  updateState() {
    super.updateFrame();

    if (this.keys.includes("a") && !this.keys.includes("d")) this.player.setState(stateNum.FALL_RUNNING_LEFT, this.frame);
    if (!this.keys.includes("a") && this.keys.includes("d")) this.player.setState(stateNum.FALL_RUNNING_RIGHT, this.frame);
    if (this.lastPressKeys[0] === "w" && this.player.verticalStates.jumpCount > 0 && !this.player.collideDirections.includes("BOTTOM"))
      this.player.setState(stateNum.JUMP_IDLE_LEFT, this.frame);
    if (this.player.collideDirections.includes("BOTTOM")) this.player.setState(stateNum.IDLE_LEFT, this.frame);
  }
}
export class FallIdleRight extends playerStates {
  constructor(player) {
    super(player);
  }
  enter(currentFrame) {
    checkStatement.innerHTML = "FallIdleRight";
    super.getEntityFrame("PLAYER_FALLING", currentFrame);
  }
  updateState() {
    super.updateFrame();

    if (this.keys.includes("d") && !this.keys.includes("a")) this.player.setState(stateNum.FALL_RUNNING_RIGHT, this.frame);
    if (!this.keys.includes("d") && this.keys.includes("a")) this.player.setState(stateNum.FALL_RUNNING_LEFT, this.frame);
    if (this.lastPressKeys[0] === "w" && this.player.verticalStates.jumpCount > 0 && !this.player.collideDirections.includes("BOTTOM"))
      this.player.setState(stateNum.JUMP_IDLE_RIGHT, this.frame);
    if (this.player.collideDirections.includes("BOTTOM")) this.player.setState(stateNum.IDLE_RIGHT, this.frame);
  }
}
export class FallRunningLeft extends playerStates {
  constructor(player) {
    super(player);
  }
  enter(currentFrame) {
    checkStatement.innerHTML = "FallRunningLeft";
    super.getEntityFrame("PLAYER_FALLING", currentFrame);
  }
  updateState() {
    super.updateFrame();

    if (!this.keys.includes("a") && !this.keys.includes("d")) this.player.setState(stateNum.FALL_IDLE_LEFT, this.frame);
    if (!this.keys.includes("a") && this.keys.includes("d")) this.player.setState(stateNum.FALL_RUNNING_RIGHT, this.frame);
    if (this.lastPressKeys[0] === "w" && this.player.verticalStates.jumpCount > 0 && !this.player.collideDirections.includes("BOTTOM"))
      this.player.setState(stateNum.JUMP_RUNNING_LEFT, this.frame);
    if (this.player.collideDirections.includes("BOTTOM")) this.player.setState(stateNum.RUNNING_LEFT, this.frame);
  }
}
export class FallRunningRight extends playerStates {
  constructor(player) {
    super(player);
  }
  enter(currentFrame) {
    checkStatement.innerHTML = "FallRunningRight";
    super.getEntityFrame("PLAYER_FALLING", currentFrame);
  }
  updateState() {
    super.updateFrame();

    if (!this.keys.includes("d") && !this.keys.includes("a")) this.player.setState(stateNum.FALL_IDLE_RIGHT, this.frame);
    if (!this.keys.includes("d") && this.keys.includes("a")) this.player.setState(stateNum.FALL_RUNNING_LEFT, this.frame);
    if (this.lastPressKeys[0] === "w" && this.player.verticalStates.jumpCount > 0 && !this.player.collideDirections.includes("BOTTOM"))
      this.player.setState(stateNum.JUMP_RUNNING_RIGHT, this.frame);
    if (this.player.collideDirections.includes("BOTTOM")) this.player.setState(stateNum.RUNNING_RIGHT, this.frame);
  }
}
