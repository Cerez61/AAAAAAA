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
  updateModelData() {
    this.mat4.translate(this.modelMatrix, [this.p.x, this.p.y, this.p.z]);
  }
  updatePosition() {
    if (this.direction === "right") this.p.x = this.caster.p.x + this.caster.s.w;
    else this.p.x = this.caster.p.x - this.caster.s.w;
    this.p.y = this.caster.p.y;
    this.updateModelData();
  }
  getCasterDirection() {
    if (this.caster.direction === "Right") this.direction = "right";
    else this.direction = "left";
  }
  init() {
    this.getCasterDirection();
  }
  update() {
    this.currentState.updateState();
    this.updatePosition();
  }
}
