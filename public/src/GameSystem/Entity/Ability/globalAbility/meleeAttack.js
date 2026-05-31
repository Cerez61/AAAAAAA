import { Right } from "../abilityStateManager.js";
import { AbilityObject } from "../../EntityObject/abilityObject.js";
export class MeleeAttack extends AbilityObject {
  constructor(targetData, targetJSON, caster, id) {
    super(targetData, targetJSON, caster);
    this.id = id;
    this.abilityCount = 0;
    this.isDead = false;

    this.abilityCooldown = 1000;
    this.states = [new Right(this)];
    this.currentState = this.states[0];
    this.currentState.enter(0);

    console.log(this.s);
  }
  collide() {
    this.outlineColor = 1;
  }
  setState(state, currentFrame) {
    this.currentState = this.states[state];
    this.currentState.enter(currentFrame);
  }
  updateFrame(uvRect) {
    this.uvRect = [uvRect.x, uvRect.y, uvRect.w, uvRect.h];
  }
  update() {
    this.currentState.updateState();
  }
}
