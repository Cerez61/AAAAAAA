import { EntityObject } from "./entityObject.js";

export class AbilityObject extends EntityObject {
  constructor(targetData, targetJSON, caster) {
    super(targetData, targetJSON);

    this.caster = caster;
  }

  init() {
    // Initialize ability if needed
  }
}
