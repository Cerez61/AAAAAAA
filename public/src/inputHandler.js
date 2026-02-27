export class InputHandler {
  constructor(gameState) {
    this.gameState = gameState;
    this.keys = this.gameState.keys;

    window.addEventListener("keydown", (e) => {
      if ((e.key === "a" || e.key === "d" || e.key === "w" || e.key === "s") && this.keys.indexOf(e.key) === -1) {
        this.gameState.keys.push(e.key);
        this.gameState.lastPressKeys[0] = e.key;

        checkLastPress.innerHTML = this.gameState.lastPressKeys[0];
      }
    });

    window.addEventListener("keyup", (e) => {
      const index = this.keys.indexOf(e.key);

      if (e.key === "a" || e.key === "d" || e.key === "w" || e.key === "s") {
        this.gameState.keys.splice(index, 1);
        this.gameState.lastReleaseKeys[0] = e.key;

        checkLastRelease.innerHTML = this.gameState.lastReleaseKeys[0];
      }
    });
  }
}
