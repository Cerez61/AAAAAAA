import { Right } from "../abilityStateManager.js";
import { AbilityObject } from "../../EntityObject/abilityObject.js";
export class MeleeAttack extends AbilityObject {
  constructor(targetData, targetJSON, caster, id) {
    super(targetData, targetJSON, caster);
    this.id = id;
    this.abilityCount = 0;
    this.isDead = false;
    this.damage = 10;

    this.abilityCooldown = 1000;
    this.states = [new Right(this)];
    this.currentState = this.states[0];
    this.currentState.enter(0);

    this.damagedEntity = [];
  }
  collide(mtv, collisionDirection, targetEntity) {
    if (targetEntity.subType === targetEntity.subType) return;
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
    this.mat4.translate(this.nextModelMatrix, [this.p2.x, this.p2.y, this.p2.z]);
  }
  updatePosition() {
    if (this.direction === "right") this.p.x = this.caster.p.x + this.caster.s.w * 1.5;
    else this.p.x = this.caster.p.x - this.caster.s.w * 1.5;
    this.p.y = this.caster.p.y;

    // nextModelMatrix'i güncelle (SAT collision test için gerekli)
    this.p2.x = this.p.x;
    this.p2.y = this.p.y;
    this.p2.z = this.p.z;

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
