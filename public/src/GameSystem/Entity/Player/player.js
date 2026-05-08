import {
  IdleLeft,
  IdleRight,
  RunningLeft,
  RunningRight,
  JumpIdleLeft,
  JumpIdleRight,
  JumpRunningLeft,
  JumpRunningRight,
  FallIdleLeft,
  FallIdleRight,
  FallRunningLeft,
  FallRunningRight,
} from "./playerStateManagement.js";
import { MAT4 } from "../../../utils/matrix.js";
import { EntityBox } from "../entityBox.js";
import { Movement } from "../../../utils/movement.js";

export class Player extends EntityBox {
  constructor(gameData, entityInfo, targetJSON, targetStat) {
    super(entityInfo, targetJSON, targetStat);
    //intelisense webgl content
    /**
     * @type {WebGL2RenderingContext}
     */
    this.globalData = gameData[0];
    this.instanceData = gameData[1];
    this.entityData = gameData[2];
    this.gl = this.globalData.gl;
    this.keys = this.entityData.keys;
    this.lastPressKeys = this.entityData.lastPressKeys;

    this.xSpeed = 0;
    this.ySpeed = -3;
    this.speed = 1.5;
    this.maxSpeed = 10;
    this.vx = 0;
    this.xSpeedMultiplier = 1;

    this.vy = 1;
    this.jumpCount = 2;
    this.jumpHeight = 10;
    this.weight = 0;

    this.collideDirections = [];

    this.verticalStates = {
      vy: 1,
      weight: 0,
      ySpeed: -3,
      jumpCount: 2,
      jumpHeight: 10,
    };
    this.states = [
      new IdleLeft(this),
      new IdleRight(this),
      new RunningLeft(this),
      new RunningRight(this),
      new JumpIdleLeft(this),
      new JumpIdleRight(this),
      new JumpRunningLeft(this),
      new JumpRunningRight(this),
      new FallIdleLeft(this),
      new FallIdleRight(this),
      new FallRunningLeft(this),
      new FallRunningRight(this),
    ];
    this.currentState = this.states[1];
    this.currentState.enter();
  }
  setState(player, state) {
    player.currentState = player.states[state];
    player.currentState.enter();
  }
  collide(mtv, collisionDirection) {
    this.p.x += mtv[0];
    this.p.y += mtv[1];
    this.outlineColor = 1;

    if (!this.collideDirections.includes(collisionDirection)) this.collideDirections.push(collisionDirection);

    this.mat4.translate(this.modelMatrix, [this.p.x, this.p.y, 0]);
    this.entityDataUpdateGive();
  }
  collision() {
    if (!this.collideDirections[0]) return;

    if (this.collideDirections.includes("BOTTOM")) {
      if (this.verticalStates.weight >= 0) {
        this.verticalStates.weight = 0;
        this.verticalStates.jumpHeight = 10;
        this.verticalStates.jumpCount = 2;
      }
    }
    if (this.collideDirections.includes("TOP")) {
    }
    if (this.collideDirections.includes("LEFT")) {
      if (this.vx <= 0) this.vx = 0;
    }
    if (this.collideDirections.includes("RIGHT")) {
      if (this.vx >= 0) this.vx = 0;
    }
  }
  horizontalMovement() {
    if (this.keys.includes("d") && !this.keys.includes("a") && this.xSpeed < this.maxSpeed) this.xSpeed += this.xSpeedMultiplier;
    else if (this.keys.includes("a") && !this.keys.includes("d") && this.xSpeed > -this.maxSpeed) this.xSpeed -= this.xSpeedMultiplier;
    else if (!this.keys.includes("d") && this.xSpeed > 0) this.xSpeed -= this.xSpeedMultiplier;
    else if (!this.keys.includes("a") && this.xSpeed < 0) this.xSpeed += this.xSpeedMultiplier;
    else if (!this.keys.includes("d") && !this.keys.includes("a")) this.xSpeed = 0;
    this.vx = this.xSpeed * this.speed;
    this.p.x += this.vx;
  }

  entityDataUpdateGive() {
    this.entityData.playerPosition = [this.p.x, this.p.y];
  }
  async init() {}
  update() {
    this.currentState.updateState();
    this.collision();

    this.horizontalMovement();
    Movement.playerVerticalMovement(this.p, this.verticalStates, this.keys, this.lastPressKeys);
    Movement.getNextPosition(this.p, this.p2, this.s, this.s2, this.vx, this.vy, this.nextModelMatrix);

    this.mat4.translate(this.modelMatrix, [this.p.x, this.p.y, 0]);

    this.entityDataUpdateGive();
    this.clear();
  }
  clear() {
    this.lastPressKeys[0] = null;
    this.collideDirections = [];
  }
}
