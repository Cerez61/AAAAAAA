import { MeleeAttack } from "./playerAbility/meleeAttack.js";
const abilityEnum = {
  MeleeAttack: MeleeAttack,
};
export class Ability {
  constructor(gameData) {
    this.entityData = gameData;
    this.abilities = this.entityData.abilities;
    this.abilitiesInfo = this.entityData.abilitiesInfo;
    this.abilityCount = 0;
  }
  takeEntityData() {
    this.abilities = this.entityData.abilities;
    this.abilitiesInfo = this.entityData.abilitiesInfo;
  }
  updateEntityData() {
    this.entityData.abilities = this.abilities;
    this.entityData.abilitiesInfo = [];
  }
  updateAbilities() {
    for (const abilityInfo of this.abilitiesInfo) {
      const ability = abilityEnum[abilityInfo[0]];
      const abilityParent = abilityInfo[1];
      this.abilities.push(new ability(this.abilityCount));
      this.abilityCount++;
    }

    for (const ability of this.abilities) {
      if (!ability.isDead) ability.update();
    }
  }
  destroyAbilities() {
    for (let i = this.abilities.length - 1; i >= 0; i--) {
      if (this.abilities[i].isDead) {
        this.abilities.splice(i, 1);
      }
    }
  }
  update() {
    this.takeEntityData();

    this.updateAbilities();
    this.destroyAbilities();

    console.log(this.abilities);

    this.updateEntityData();
  }
}
