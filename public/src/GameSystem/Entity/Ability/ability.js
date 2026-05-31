import { MeleeAttack } from "./globalAbility/meleeAttack.js";
const abilityEnum = {
  MeleeAttack: MeleeAttack,
};
export class Ability {
  constructor(gameData, dataManager, textureManager) {
    this.entityData = gameData;
    this.dataManager = dataManager;
    this.textureManager = textureManager;

    this.abilities = [];
    this.abilityRequest = [];
    this.abilityCount = 0;
  }

  castAbilities(targetData, targetJSON, abilityCaster) {
    const ability = abilityEnum[targetData.name];

    this.abilities.push(new ability(targetData, targetJSON, abilityCaster, this.abilityCount));
    this.abilityCount++;
  }

  takeAbilityRequest() {
    for (const ability of this.abilityRequest) {
      const abilityName = ability[0];
      const abilityCaster = ability[1];

      const targetData = this.dataManager.findEntityData(abilityName);
      const targetJSON = this.textureManager.findEntityJSON(abilityName);

      console.log(targetJSON);

      this.castAbilities(targetData, targetJSON, abilityCaster);
    }
  }

  updateAbilities() {
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
  takeEntityData() {
    this.abilityRequest = this.entityData.abilityRequest;
  }
  update() {
    this.takeEntityData();
    this.takeAbilityRequest();
    this.updateAbilities();
    this.destroyAbilities();

    this.clear();
  }
  clear() {
    this.entityData.abilityRequest = [];
  }
}
