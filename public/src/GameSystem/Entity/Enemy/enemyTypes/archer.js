import { MAT4 } from "../../../../utils/matrix.js";
import { EntityBox } from "../../entityBox.js";
export class Archer extends EntityBox {
  constructor(enemyID, position) {
    super();
    this.name = "Archer";

    this.enemyID = enemyID;

    this.w = 25;
    this.h = 50;
    this.depth = 2;
    this.textureDepth = 0;

    this.x = position[0];
    this.y = position[1];
    this.z = position[2];

    this.uvRect = [203, 75, 37, 76];

    this.outlineColor = 0;

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
    this.mat4 = new MAT4();
    this.modelMatrix = this.mat4.identity();
  }
  onGround() {
    return this.y - 10 <= this.h;
  }
  horizontalMovement() {
    const playerX = this.globalState.playerPosition[0];
    if (this.x - playerX > 0) this.x -= 5;
    else this.x += 5;
  }
  verticalMovement() {
    if (this.onGround()) {
      this.y = this.h;
    } else this.y -= 5;
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
  init() {
    this.mat4.scale(this.modelMatrix, [this.w, this.h]);
  }
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
