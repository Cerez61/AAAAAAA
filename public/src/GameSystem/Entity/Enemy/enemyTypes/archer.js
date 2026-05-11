import { MAT4 } from "../../../../utils/matrix.js";
import { EntityBox } from "../../entityBox.js";
import { Movement } from "../../../../utils/movement.js";
export class Archer extends EntityBox {
  constructor(enemyInfo, targetJSON, targetStat) {
    super(enemyInfo, targetJSON, targetStat);

    this.horizontalCollide;
    this.verticalCollide;

    this.currentActionList;
    this.currentAction;
    this.currentGoal;

    this.globalState;
    this.worldState = {
      playerDead: false,
      playerNear: false,
    };
    this.actions = [
      {
        name: "chasePlayer",
        cost: 1,
        preconditions: { playerNear: false },
        effects: { playerNear: true },
      },
      {
        name: "meleeAttack",
        cost: 5,
        preconditions: { playerNear: true },
        effects: { playerDead: true },
      },
    ];
    this.goals = [
      {
        name: "KillPlayer",
        state: { playerDead: true },
      },
      {
        name: "Idle",
        state: { isPatrolling: true },
      },
    ];
  }
  collide(mtv, minEdge) {
    this.outlineColor = 1;

    this.p.x += mtv[0];
    this.p.y += mtv[1];

    this.mat4.translate(this.modelMatrix, [this.p.x, this.p.y]);
  }
  horizontalMovement() {
    const playerX = this.globalState.playerPosition[0];
    if (this.p.x - playerX > 0) this.p.x -= 5;
    else this.p.x += 5;
  }
  verticalMovement() {
    this.p.y -= 10;
  }
  chasePlayer() {
    this.horizontalMovement();
    this.verticalMovement();
    /*    console.log("chase player");
     */
  }
  meleeAttack() {
    /*   console.log("melee attack");
     */
  }
  init() {}
  updateGlobalState(globalState) {
    this.globalState = globalState;
  }
  updateWorldStates() {
    const playerX = this.globalState.playerPosition[0];
    if (Math.abs(this.p.x - playerX) > 100) this.worldState.playerNear = false;
    else this.worldState.playerNear = true;
  }
  update(globalState) {
    this.updateGlobalState(globalState);
    this.currentAction = this.currentActionList[0];

    switch (this.currentAction.name) {
      case "chasePlayer":
        this.chasePlayer();
        break;
      case "meleeAttack":
        this.meleeAttack();
        break;
    }

    this.updateWorldStates(globalState);
    this.mat4.translate(this.modelMatrix, [this.p.x, this.p.y]);
    Movement.getNextPosition(this.p, this.p2, this.s, this.s2, 1, 5, this.nextModelMatrix);
  }
}
