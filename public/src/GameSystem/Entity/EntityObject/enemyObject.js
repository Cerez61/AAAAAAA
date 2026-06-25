import { EntityObject } from "./entityObject.js";
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
} from "../Enemy/enemyStateManager.js";

export class EnemyObject extends EntityObject {
  constructor(targetData, targetJSON, targetStat) {
    super(targetData, targetJSON);

    this.isDynamic = true;
    this.isMoving = false;
    this.isDead = false;

    this.verticalStates = {
      vy: 1,
      weight: 3,
      ySpeed: 0,
      jumpCount: 2,
      jumpHeight: 10,
    };

    //Positions
    this.p = {
      x: this.targetData.p.x,
      y: this.targetData.p.y,
      z: this.targetData.p.z,
    };
    this.p2 = {
      x: this.p.x,
      y: this.p.y,
      z: this.p.z,
    };

    //Matrixes
    this.modelMatrix = this.mat4.identity();
    this.nextModelMatrix = this.mat4.identity();
    this.mat4.scale(this.modelMatrix, [this.s.w, this.s.h, 1]);
    this.mat4.scale(this.nextModelMatrix, [this.s2.w, this.s2.h, 1]);
    this.mat4.translate(this.modelMatrix, [this.p.x, this.p.y, this.p.z]);
    this.mat4.translate(this.nextModelMatrix, [this.p2.x, this.p2.y, this.p2.z]);

    //Stats
    this.stats = targetStat;

    //childClasses
    this.abilities = [];

    this.usedSkill = false;

    //enemyStates
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
    this.currentState = this.states[0];
    this.currentState.enter(0);
  }
  setState(state, currentFrame) {
    this.currentState = this.states[state];
    this.currentState.enter(currentFrame);
  }
}
