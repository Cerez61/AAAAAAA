import { MAT4 } from "../../utils/matrix.js";
import { GOAPPlanner } from "../GOAP/planner.js";
import { Archer } from "./enemyTypes/archer.js";

const ENEMY_TYPE = {
  Archer: Archer,
};
export class Enemy {
  constructor(gameData) {
    this.entityData = gameData;

    this.enemies = [];

    this.mat4 = new MAT4();
    this.planner = new GOAPPlanner();

    this.globalState = {
      playerPosition: [],
    };

    this.enemyCount = 0;
  }

  entityDataTake() {
    this.playerPosition = this.entityData.playerPosition;
  }
  loadEnemy(enemy) {
    const enemyClass = ENEMY_TYPE[enemy.subType];
    this.enemies.push(new enemyClass(this.enemyCount, enemy.position));

    this.enemyCount++;
  }
  initEnemy() {
    for (const enemy of this.enemies) {
      enemy.init();
    }
  }
  updateGlobalState() {
    this.globalState.playerPosition = this.playerPosition;
  }
  async init() {}
  update() {
    this.entityDataTake();
    this.updateGlobalState();

    for (const enemy of this.enemies) {
      const finalPlan = this.planner.plan(enemy.worldState, enemy.goals[0], enemy.actions);
      finalPlan.sort((a, b) => a.cost - b.cost);

      /* console.log(finalPlan, enemy.enemyID);
       */ enemy.currentActionList = finalPlan[0].actionList;
      enemy.update(this.globalState);
    }
  }
}
