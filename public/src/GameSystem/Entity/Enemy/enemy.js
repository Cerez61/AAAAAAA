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
  updateGlobalState() {
    this.globalState.playerPosition = this.playerPosition;
  }
  async init() {}
  update() {
    this.entityDataTake();
    this.updateGlobalState();

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
}
