export class InputHandler {
  constructor(entityData) {
    this.entityData = entityData;
    this.keys = this.entityData.keys;

    window.addEventListener("keydown", (e) => {
      if ((e.key === "a" || e.key === "d" || e.key === "w" || e.key === "s") && this.keys.indexOf(e.key) === -1) {
        this.entityData.keys.push(e.key);
        this.entityData.lastPressKeys[0] = e.key;

        checkLastPress.innerHTML = this.entityData.lastPressKeys[0];
      }
    });

    window.addEventListener("keyup", (e) => {
      const index = this.keys.indexOf(e.key);

      if (e.key === "a" || e.key === "d" || e.key === "w" || e.key === "s") {
        this.entityData.keys.splice(index, 1);
        this.entityData.lastReleaseKeys[0] = e.key;

        checkLastRelease.innerHTML = this.entityData.lastReleaseKeys[0];
      }
    });
  }
}
