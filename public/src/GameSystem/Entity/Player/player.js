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

    this.collideDirections = [];

    this.horizontalStates = {
      vx: 0,
      speed: 1.5,
      xSpeed: 0,
      maxSpeed: 10,
      xSpeedMultiplier: 1,
    };
    this.verticalStates = {
      vy: 1,
      weight: 3,
      ySpeed: 0,
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
  setState(state, currentFrame) {
    this.currentState = this.states[state];
    this.currentState.enter(currentFrame);
  }
  collide(mtv, collisionDirection) {
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
  updateFrame(uvRect) {
    this.uvRect = [uvRect.x, uvRect.y, uvRect.w, uvRect.h];
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

    this.updateEntityData();
    this.clear();
  }
  clear() {
    this.lastPressKeys[0] = null;
    this.collideDirections = [];
  }
}
