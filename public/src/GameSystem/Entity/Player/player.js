import { PlayerObject } from "../EntityObject/playerObject.js";
import { Movement } from "../../../utils/movement.js";
import { Ability } from "../Ability/ability.js";
import { DeltaTime } from "../../../utils/deltaTime.js";

export class Player extends PlayerObject {
  constructor(gameData, targetData, targetJSON, targetStat) {
    super(gameData, targetData, targetJSON, targetStat);
  }

  collide(mtv, collisionDirection, targetEntity) {
    if (targetEntity.type === "Ability") return;
    this.p.x += mtv[0];
    this.p.y += mtv[1];
    this.outlineColor = 1;

    this.collideDirections.push(collisionDirection);
    this.collision(collisionDirection);

    this.updateModelData();
    this.updateEntityData();
  }
  collision(collideDirection) {
    if (!collideDirection) return;

    if (collideDirection === "BOTTOM") {
      if (this.verticalStates.ySpeed <= 0) {
        this.verticalStates.ySpeed = 0;
        this.verticalStates.jumpHeight = 10;
        this.verticalStates.jumpCount = 2;
      }
    }
    if (collideDirection === "TOP") {
    }
    if (collideDirection === "LEFT") {
      if (this.vx <= 0) this.vx = 0;
    }
    if (collideDirection === "RIGHT") {
      if (this.vx >= 0) this.vx = 0;
    }
  }
  movement() {
    Movement.playerHorizontalMovement(this.p, this.horizontalStates, this.keys);
    Movement.playerVerticalMovement(this.p, this.verticalStates, this.keys, this.lastPressKeys);
    Movement.getNextPosition(this.p, this.p2, this.s, this.s2, this.horizontalStates.vx, this.verticalStates.vy, this.nextModelMatrix);

    this.updateModelData();
  }
  ability() {
    if (this.skilUsed) {
      if (this.abilityCooldown > 500) {
        this.abilityCooldown = 0;
        this.skilUsed = false;
      } else {
        this.abilityCooldown += DeltaTime.get();
      }
      return;
    }

    if (this.keys.includes("x")) {
      this.entityData.abilityRequest.push(["MeleeAttack", this]);
      this.skilUsed = true;
    }
  }
  updateFrame(uvRect) {
    this.uvRect = [uvRect.x, uvRect.y, uvRect.w, uvRect.h];
  }
  updatePlayerStates() {
    const distance = Math.sign(this.p.x - this.p2.x);

    if (distance) this.isMoving = true;
    else this.isMoving = false;
  }
  updateModelData() {
    this.mat4.translate(this.modelMatrix, [this.p.x, this.p.y, 0]);
  }
  updateEntityData() {
    this.entityData.playerPosition = [this.p.x, this.p.y];
  }
  async init() {}
  update() {
    this.currentState.updateState();

    this.movement();
    this.ability();

    this.updatePlayerStates();
    this.updateEntityData();
    this.clear();
  }
  clear() {
    this.lastPressKeys[0] = null;
    this.collideDirections = [];
  }
}
