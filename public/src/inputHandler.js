export class InputHandler {
  constructor(game) {
    this.game = game;
    this.keys = this.game.keys;

    window.addEventListener("keydown", (e) => {
      if ((e.key === "a" || e.key === "d" || e.key === "w" || e.key === "s") && this.keys.indexOf(e.key) === -1) {
        this.keys.push(e.key);
        this.game.lastPressKeys = e.key;
        checkLastPress.innerHTML = this.game.lastPressKeys;
      }
    });

    window.addEventListener("keyup", (e) => {
      const index = this.keys.indexOf(e.key);

      if (e.key === "a" || e.key === "d" || e.key === "w" || e.key === "s") {
        this.keys.splice(index, 1);
        this.game.lastReleaseKeys = e.key;

        checkLastRelease.innerHTML = this.game.lastReleaseKeys;
      }
    });
  }
}
