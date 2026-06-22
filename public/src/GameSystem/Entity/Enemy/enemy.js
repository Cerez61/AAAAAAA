import { GOAPPlanner } from "./GOAP/planner.js";
import { Archer } from "./enemyTypes/archer.js";

const ENEMY_TYPE = {
  Archer: Archer,
};
export class Enemy {
  constructor(gameData) {
    this.entityData = gameData;

    this.enemies = [];

    this.planner = new GOAPPlanner();

    this.globalState = {
      playerPosition: [],
    };
  }

  entityDataTake() {
    this.playerPosition = this.entityData.playerPosition;
  }
  loadEnemy(enemyInfo, targetJSON, targetStat) {
    const enemyClass = ENEMY_TYPE[enemyInfo.subType];
    this.enemies.push(new enemyClass(enemyInfo, targetJSON, targetStat));
  }
  updateEnemyStates() {
    for (const enemy of this.enemies) {
      const distance = Math.sign(enemy.p.x - enemy.p2.x);

      if (distance) enemy.isMoving = true;
      else enemy.isMoving = false;
    }
  }
  updateGlobalState() {
    this.globalState.playerPosition = this.playerPosition;
  }
  updateEnemies() {
    for (const enemy of this.enemies) {
      const enemyGoal = this.planner.goal(enemy.goals[0]);
      const finalPlan = this.planner.plan(enemy.worldState, enemy.goals[0], enemy.actions);
      finalPlan.sort((a, b) => a.cost - b.cost);

      /* console.log(finalPlan, enemy.enemyID);
       */
      enemy.currentActionList = finalPlan[0].actionList;
      enemy.update(this.globalState);
    }
  }
  destroyEnemies() {
    for (let i = this.enemies.length - 1; i >= 0; i--) {
      if (this.enemies[i].isDead) {
        this.enemies.splice(i, 1);
      }
    }
  }
  async init() {}
  update() {
    this.entityDataTake();
    this.updateGlobalState();

    this.updateEnemies();
    this.updateEnemyStates();

    this.destroyEnemies();
  }
}
