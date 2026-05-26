export class MeleeAttack {
  constructor(id) {
    this.id = id;
    this.abilityCount = 0;
    this.isDead = false;
  }
  update() {
    this.abilityCount++;
    if (this.abilityCount > 100) this.isDead = true;
  }
}
