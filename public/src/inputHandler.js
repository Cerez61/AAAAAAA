export class InputHandler {
  constructor(game, gameState) {
    //these two lines gonna be deleted
    this.game = game;
    this.keys = this.game.keys;

    this.gameState = gameState;

    window.addEventListener("keydown", (e) => {
      if ((e.key === "a" || e.key === "d" || e.key === "w" || e.key === "s") && this.keys.indexOf(e.key) === -1) {
        //also this one
        this.keys.push(e.key);
        //and this one
        this.game.lastPressKeys[0] = e.key;

        this.gameState.keys.push(e.key);
        this.gameState.lastPressKeys[0] = e.key;

        checkLastPress.innerHTML = this.game.lastPressKeys[0];
      }
    });

    window.addEventListener("keyup", (e) => {
      const index = this.keys.indexOf(e.key);

      if (e.key === "a" || e.key === "d" || e.key === "w" || e.key === "s") {
        //and one
        this.keys.splice(index, 1);
        //and this
        this.game.lastReleaseKeys[0] = e.key;

        this.gameState.keys.splice(index, 1);
        this.gameState.lastReleaseKeys[0] = e.key;
        checkLastRelease.innerHTML = this.game.lastReleaseKeys[0];
      }
    });
  }
}
