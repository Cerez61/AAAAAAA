import { EntityObject } from "./entityObject.js";

export class PlayerObject extends EntityObject {
  constructor(entityInfo, targetJSON, targetStat) {
    super(entityInfo, targetJSON);

    //Stats
    this.stats = targetStat;

    //childClasses
    this.abilities = [];

    this.usedSkill = false;
  }
}
