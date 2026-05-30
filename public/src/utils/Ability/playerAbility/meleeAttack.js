import { AbilityObject } from "../../../GameSystem/Entity/EntityObject/abilityObject.js";
export class MeleeAttack extends AbilityObject {
  constructor(id) {
    super();
    this.id = id;
    this.abilityCount = 0;
    this.isDead = false;

    this.abilityCooldown = 1000;
  }
  update() {
    this.abilityCount++;
    if (this.abilityCount > 100) this.isDead = true;
  }
}
