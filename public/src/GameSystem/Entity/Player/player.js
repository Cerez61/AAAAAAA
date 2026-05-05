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

    this.speed = 1.5;
    this.maxSpeed = 10;
    this.vx = 0;
    this.xSpeedMultiplier = 1;

    this.vy = 1;
    this.jumpCount = 2;
    this.jumpHeight = 10;
    this.weight = 0;

    this.collideDirections = [];

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
    this.x += mtv[0];
    this.y += mtv[1];
    this.outlineColor = 1;

    if (!this.collideDirections.includes(collisionDirection)) this.collideDirections.push(collisionDirection);

    this.mat4.translate(this.modelMatrix, [this.x, this.y, 0]);

    this.entityDataUpdateGive();
  }
  collision() {
    if (!this.collideDirections[0]) return;

    if (this.collideDirections.includes("BOTTOM")) {
      if (this.weight <= 0) {
        this.vy = 0;
        this.weight = 0;
        this.jumpHeight = 10;
        this.jumpCount = 2;
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
    if (this.keys.includes("d") && !this.keys.includes("a") && this.vx < this.maxSpeed) this.vx += this.xSpeedMultiplier;
    else if (this.keys.includes("a") && !this.keys.includes("d") && this.vx > -this.maxSpeed) this.vx -= this.xSpeedMultiplier;
    else if (!this.keys.includes("d") && this.vx > 0) this.vx -= this.xSpeedMultiplier;
    else if (!this.keys.includes("a") && this.vx < 0) this.vx += this.xSpeedMultiplier;
    else if (!this.keys.includes("d") && !this.keys.includes("a")) this.vx = 0;
    this.x += this.vx * this.speed;
  }
  verticalMovement() {
    if (!this.collideDirections[0]) this.vy = 1;
    if (this.lastPressKeys[0] === "w" && this.jumpCount > 0) {
      this.jumpCount--;
      this.vy = 1;
      this.jumpHeight = 10;
      this.weight = 0;
      this.lastPressKeys[0] = null;
    }
    if (this.keys.includes("w") && this.jumpHeight > 0) {
      this.jumpHeight--;
      this.weight += 3;
    } else this.weight -= 3;

    this.y += this.vy * this.weight;
  }
  entityDataUpdateGive() {
    this.entityData.playerPosition = [this.x, this.y];
  }
  async init() {}
  update() {
    this.currentState.updateState();
    this.collision();

    this.horizontalMovement();
    this.verticalMovement();

    this.mat4.translate(this.modelMatrix, [this.x, this.y, 0]);
    this.entityDataUpdateGive();
    this.clear();
  }
  clear() {
    this.lastPressKeys[0] = null;
    this.collideDirections = [];
  }
}
