export class InputHandler {
  constructor(keys) {
    this.keys = keys;
    window.addEventListener("keydown", (e) => {
      if (e.key === "a" && !this.keys.includes(e.key)) this.keys.push(e.key);
      if (e.key === "d" && !this.keys.includes(e.key)) this.keys.push(e.key);
      if (e.key === "w" && !this.keys.includes(e.key)) this.keys.push(e.key);
      if (e.key === "s" && !this.keys.includes(e.key)) this.keys.push(e.key);
    });

    window.addEventListener("keyup", (e) => {
      const index = this.keys.findIndex((element) => element === e.key);

      if (e.key === "a" && this.keys.includes(e.key)) this.keys.pop(index);
      if (e.key === "d" && this.keys.includes(e.key)) this.keys.pop(index);
      if (e.key === "w" && this.keys.includes(e.key)) this.keys.pop(index);
      if (e.key === "s" && this.keys.includes(e.key)) this.keys.pop(index);
    });
  }
}
