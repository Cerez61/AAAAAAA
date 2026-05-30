import { MeleeAttack } from "./playerAbility/meleeAttack.js";
const abilityEnum = {
  MeleeAttack: MeleeAttack,
};
export class Ability {
  static abilities = [];
  static abilityCount = 0;

  static castAbilities(abilityName, caster) {
    const ability = abilityEnum[abilityName];
    const abilityCaster = caster;
    this.abilities.push(new ability(this.abilityCount));
    this.abilityCount++;
  }

  static updateAbilities() {
    for (const ability of this.abilities) {
      if (!ability.isDead) ability.update();
    }
  }

  static destroyAbilities() {
    for (let i = this.abilities.length - 1; i >= 0; i--) {
      if (this.abilities[i].isDead) {
        this.abilities.splice(i, 1);
      }
    }
  }

  static update() {
    this.updateAbilities();
    this.destroyAbilities();
  }
}
