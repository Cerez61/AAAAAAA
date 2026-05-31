import { EntityObject } from "./entityObject.js";

export class PlayerObject extends EntityObject {
  constructor(targetData, targetJSON, targetStat) {
    super(targetData, targetJSON);

    //Stats
    this.stats = targetStat;

    //childClasses
    this.abilities = [];

    this.usedSkill = false;
  }

  init() {
    // Initialize player object if needed
  }
}
