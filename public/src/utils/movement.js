import { MAT4 } from "./matrix.js";
const mat4 = new MAT4();

export class Movement {
  static playerHorizontalMovement() {}
  static playerVerticalMovement(p, v, keys, lastPressKeys) {
    if (lastPressKeys[0] === "w" && v.jumpCount > 0) {
      v.jumpCount--;
      v.jumpHeight = 10;
      v.weight = 0;
      lastPressKeys[0] = null;
    }
    if (keys.includes("w") && v.jumpHeight > 0) {
      v.jumpHeight--;
      v.weight--;
    } else v.weight++;

    v.vy = v.ySpeed * v.weight;
    p.y += v.vy;
  }
  static getNextPosition(p, p2, s, s2, vx, vy, modelMatrix) {
    const x = p.x;
    const y = p.y;
    const z = p.z;
    const w = s.w;
    const h = s.h;

    const x2 = x + vx;
    const y2 = y + vy;
    const w2 = Math.abs(x2 - x) + w;
    const h2 = Math.abs(y2 - y) + h;

    let newX;
    let newY;
    let newZ = z;
    if (vx <= 0) newX = x2;
    else newX = x;
    if (vy <= 0) newY = y;
    else newY = y2;

    p2.x = x2;
    p2.y = y2;
    s2.w = w2;
    s2.h = h2;

    mat4.translate(modelMatrix, [newX, newY, newZ]);
    mat4.scale(modelMatrix, [w2, h2, 1]);
  }
}
