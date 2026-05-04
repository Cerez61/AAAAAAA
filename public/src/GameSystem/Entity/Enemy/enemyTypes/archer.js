import { MAT4 } from "../../../../utils/matrix.js";
import { EntityBox } from "../../entityBox.js";
export class Archer extends EntityBox {
  constructor(enemyInfo, targetJSON) {
    super(enemyInfo, targetJSON);

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

    this.x += mtv[0];
    this.y += mtv[1];

    console.log(mtv, minEdge);
    if (!mtv[0]) this.horizontalCollide = true;
    if (!mtv[1]) this.verticalCollide = true;
  }
  horizontalMovement() {
    if (this.horizontalCollide) this.horizontalCollide = false;
    const playerX = this.globalState.playerPosition[0];
    if (this.x - playerX > 0) this.x -= 5;
    else this.x += 5;
  }
  verticalMovement() {
    if (this.verticalCollide) this.verticalCollide = false;
    else this.y -= 10;
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
    if (Math.abs(this.x - playerX) > 100) this.worldState.playerNear = false;
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
    this.mat4.translate(this.modelMatrix, [this.x, this.y]);
  }
}
