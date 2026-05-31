import { DeltaTime } from "../../../utils/deltaTime.js";
export class AbilityStates {
  constructor(ability) {
    this.ability = ability;

    this.targetJSON = this.ability.targetJSON;
    this.entityFrames = this.ability.entityFrames;

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

      this.ability.updateFrame(this.targetJSON.frames[this.frame].frame);

      this.lastTime = 0;
    } else this.lastTime += DeltaTime.get();
  }
}

export class Right extends AbilityStates {
  constructor(ability) {
    super(ability);
  }
  enter(currentFrame) {
    super.getEntityFrame("Right", currentFrame);
  }
  updateState() {
    super.updateFrame();

    if (this.frame >= this.targetFrames.to) this.ability.isDead = true;
  }
}
