export class InputHandler {
  constructor(keys) {
    this.keys = keys;
    this.lastKey = "";
    window.addEventListener("keydown", (e) => {
      if ((e.key === "a" || e.key === "d" || e.key === "w" || e.key === "s") && this.keys.indexOf(e.key) === -1) {
        this.keys.push(e.key);
        this.lastKey = e.key;
      }
    });

    window.addEventListener("keyup", (e) => {
      const index = this.keys.indexOf(e.key);

      if (e.key === "a" || e.key === "d" || e.key === "w" || e.key === "s") this.keys.splice(index, 1);
    });
  }
}
