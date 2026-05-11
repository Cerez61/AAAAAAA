import { MAT4 } from "../../utils/matrix.js";
const mat4 = new MAT4();
export class AABB {
  static aabb(entityA, entityB, vertexData) {
    const entityANextMatrix = mat4.copy(entityA.nextModelMatrix);
    const entityBNextMatrix = mat4.copy(entityB.nextModelMatrix);
    const verticesA = mat4.multiplyVerticesMatrix(new Float32Array(12), vertexData, entityANextMatrix);
    const verticesB = mat4.multiplyVerticesMatrix(new Float32Array(12), vertexData, entityBNextMatrix);

    const a = this.getMinMax(verticesA);
    const b = this.getMinMax(verticesB);

    return this.checkCollision(a, b);
  }
  static getMinMax(vertices) {
    let minX = vertices[0];
    let minY = vertices[1];
    let maxX = minX;
    let maxY = minY;
    for (let i = 0; i < vertices.length; i += 3) {
      const x = vertices[i];
      const y = vertices[i + 1];
      if (x > maxX) maxX = x;
      if (x < minX) minX = x;

      if (y > maxY) maxY = y;
      if (y < minY) minY = y;
    }
    return { minX, maxX, minY, maxY };
  }
  static checkCollision(rectA, rectB) {
    if (
      ((rectA.maxX >= rectB.minX && rectA.minX <= rectB.maxX) || (rectB.maxX >= rectA.minX && rectB.minX <= rectA.maxX)) &&
      ((rectA.maxY >= rectB.minY && rectA.minY <= rectB.maxY) || (rectB.maxY >= rectA.minY && rectB.minY <= rectA.maxY))
    ) {
      return true;
    }

    return false;
  }
}
