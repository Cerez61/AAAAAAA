import { DeltaTime } from "../../../utils/deltaTime.js";
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
class PlayerStates {
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
    this.frameDuration = 70;
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
  getEntityDirection(frameName) {
    console.log(leftFramesEnum[frameName]);
    if (leftFramesEnum[frameName]) this.player.direction = "Left";
    else this.player.direction = "Right";
  }
}
export class IdleLeft extends PlayerStates {
  constructor(player) {
    super(player);
    this.name = "IDLE_LEFT";
  }
  enter(currentFrame) {
    checkStatement.innerHTML = this.name;
    super.getEntityFrame("PLAYER_RUNNING_LEFT", currentFrame);
    super.getEntityDirection(this.name);
  }
  updateState() {
    super.updateFrame();

    if (this.keys.includes("d") && !this.keys.includes("a")) this.player.setState(stateNum.RUNNING_RIGHT, this.frame);
    if (this.keys.includes("a") && !this.keys.includes("d")) this.player.setState(stateNum.RUNNING_LEFT, this.frame);
    if (this.lastPressKeys[0] === "w" && this.player.collideDirections.includes("BOTTOM")) this.player.setState(stateNum.JUMP_IDLE_LEFT, this.frame);
    if (!this.player.collideDirections.includes("BOTTOM")) this.player.setState(stateNum.JUMP_IDLE_LEFT, this.frame);
  }
}

export class IdleRight extends PlayerStates {
  constructor(player) {
    super(player);
    this.name = "IDLE_RIGHT";
  }
  enter(currentFrame) {
    checkStatement.innerHTML = this.name;
    super.getEntityFrame("PLAYER_RUNNING_RIGHT", currentFrame);
    super.getEntityDirection(this.name);
  }
  updateState() {
    super.updateFrame();

    if (this.keys.includes("d") && !this.keys.includes("a")) this.player.setState(stateNum.RUNNING_RIGHT, this.frame);
    if (this.keys.includes("a") && !this.keys.includes("d")) this.player.setState(stateNum.RUNNING_LEFT, this.frame);
    if (this.lastPressKeys[0] === "w" && this.player.collideDirections.includes("BOTTOM")) this.player.setState(stateNum.JUMP_IDLE_RIGHT, this.frame);
    if (!this.player.collideDirections.includes("BOTTOM")) this.player.setState(stateNum.JUMP_IDLE_RIGHT, this.frame);
  }
}
export class RunningLeft extends PlayerStates {
  constructor(player) {
    super(player);
    this.name = "RUNNING_LEFT";
  }
  enter(currentFrame) {
    checkStatement.innerHTML = this.name;

    super.getEntityFrame("PLAYER_RUNNING_LEFT", currentFrame);
    super.getEntityDirection(this.name);
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

export class RunningRight extends PlayerStates {
  constructor(player) {
    super(player);
    this.name = "RUNNING_RIGHT";
  }
  enter(currentFrame) {
    checkStatement.innerHTML = this.name;

    super.getEntityFrame("PLAYER_RUNNING_RIGHT", currentFrame);
    super.getEntityDirection(this.name);
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

export class JumpIdleLeft extends PlayerStates {
  constructor(player) {
    super(player);
    this.name = "JUMP_IDLE_LEFT";
  }
  enter(currentFrame) {
    checkStatement.innerHTML = this.name;

    super.getEntityFrame("PLAYER_JUMPING", currentFrame);
    super.getEntityDirection(this.name);
  }
  updateState() {
    super.updateFrame();

    if (!this.keys.includes("a") && this.keys.includes("d")) this.player.setState(stateNum.FALL_RUNNING_RIGHT, this.frame);
    if (this.keys.includes("a") && !this.player.collideDirections.includes("BOTTOM")) this.player.setState(stateNum.JUMP_RUNNING_LEFT, this.frame);
    if (this.player.verticalStates.vy < 0) this.player.setState(stateNum.FALL_IDLE_LEFT, this.frame);
  }
}

export class JumpIdleRight extends PlayerStates {
  constructor(player) {
    super(player);
    this.name = "JUMP_IDLE_RIGHT";
  }
  enter(currentFrame) {
    checkStatement.innerHTML = this.name;
    super.getEntityFrame("PLAYER_JUMPING", currentFrame);
    super.getEntityDirection(this.name);
  }
  updateState() {
    super.updateFrame();

    if (this.keys.includes("d")) this.player.setState(stateNum.JUMP_RUNNING_RIGHT, this.frame);
    if (!this.keys.includes("d") && this.keys.includes("a")) this.player.setState(stateNum.JUMP_RUNNING_LEFT, this.frame);
    if (this.player.verticalStates.vy < 0) this.player.setState(stateNum.FALL_IDLE_RIGHT, this.frame);
  }
}

export class JumpRunningLeft extends PlayerStates {
  constructor(player) {
    super(player);
    this.name = "JUMP_RUNNING_LEFT";
  }
  enter(currentFrame) {
    checkStatement.innerHTML = this.name;
    super.getEntityFrame("PLAYER_JUMPING", currentFrame);
    super.getEntityDirection(this.name);
  }
  updateState() {
    super.updateFrame();

    if (!this.keys.includes("a") && !this.keys.includes("d")) this.player.setState(stateNum.JUMP_IDLE_LEFT, this.frame);
    if (!this.keys.includes("a") && this.keys.includes("d")) this.player.setState(stateNum.JUMP_RUNNING_RIGHT, this.frame);
    if (this.player.verticalStates.vy < 0) this.player.setState(stateNum.FALL_RUNNING_LEFT, this.frame);
  }
}

export class JumpRunningRight extends PlayerStates {
  constructor(player) {
    super(player);
    this.name = "JUMP_RUNNING_RIGHT";
  }
  enter(currentFrame) {
    checkStatement.innerHTML = this.name;
    super.getEntityFrame("PLAYER_JUMPING", currentFrame);
    super.getEntityDirection(this.name);
  }
  updateState() {
    super.updateFrame();

    if (!this.keys.includes("d") && !this.keys.includes("a")) this.player.setState(stateNum.JUMP_IDLE_RIGHT, this.frame);
    if (!this.keys.includes("d") && this.keys.includes("a")) this.player.setState(stateNum.JUMP_RUNNING_LEFT, this.frame);
    if (this.player.verticalStates.vy < 0) this.player.setState(stateNum.FALL_RUNNING_RIGHT, this.frame);
  }
}
export class FallIdleLeft extends PlayerStates {
  constructor(player) {
    super(player);
    this.name = "FALL_IDLE_LEFT";
  }
  enter(currentFrame) {
    checkStatement.innerHTML = this.name;

    super.getEntityFrame("PLAYER_FALLING", currentFrame);
    super.getEntityDirection(this.name);
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
export class FallIdleRight extends PlayerStates {
  constructor(player) {
    super(player);
    this.name = "FALL_IDLE_RIGHT";
  }
  enter(currentFrame) {
    checkStatement.innerHTML = this.name;
    super.getEntityFrame("PLAYER_FALLING", currentFrame);
    super.getEntityDirection(this.name);
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
export class FallRunningLeft extends PlayerStates {
  constructor(player) {
    super(player);
    this.name = "FALL_RUNNING_LEFT";
  }
  enter(currentFrame) {
    checkStatement.innerHTML = this.name;
    super.getEntityFrame("PLAYER_FALLING", currentFrame);
    super.getEntityDirection(this.name);
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
export class FallRunningRight extends PlayerStates {
  constructor(player) {
    super(player);
    this.name = "FALL_RUNNING_RIGHT";
  }
  enter(currentFrame) {
    checkStatement.innerHTML = this.name;
    super.getEntityFrame("PLAYER_FALLING", currentFrame);
    super.getEntityDirection(this.name);
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
