import { EntityObject } from "./entityObject.js";

export class PlayerObject extends EntityObject {
  constructor(gameData, targetData, targetJSON, targetStat) {
    super(targetData, targetJSON);

    this.globalData = gameData[0];
    this.instanceData = gameData[1];
    this.entityData = gameData[2];
    this.gl = this.globalData.gl;
    this.keys = this.entityData.keys;
    this.lastPressKeys = this.entityData.lastPressKeys;

    this.abilityCooldown = 0;
    this.skilTime = 1000;
    this.skilUsed = false;

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
    this.isMoving = false;
    this.isDynamic = true;

    this.direction;

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
  }
}
