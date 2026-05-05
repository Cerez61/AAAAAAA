import { MAT4 } from "../../utils/matrix.js";
const mat4 = new MAT4();
export class CollisionSAT {
  intersectPolygons(verticesA, verticesB) {
    let minOverlap;
    let collisionDirection = [];

    const axises = [];

    const resultA = this.calculate(verticesA, verticesB);
    if (!resultA) return false;

    const resultB = this.calculate(verticesB, verticesA);
    if (!resultB) return false;

    axises[0] = resultA.minAxis;
    axises[1] = resultB.minAxis;


    collisionDirection[0] = this.findDirection(axises[0], resultA.collisionDirection);
    collisionDirection[1] = this.findDirection(axises[1], resultB.collisionDirection);

    minOverlap = resultA.minOverlap;

    const mtv = [];
    mtv[0] = this.mtv(axises[0], minOverlap);
    mtv[1] = this.mtv(axises[1], minOverlap);

    return { mtv, collisionDirection };
  }
  calculate(verticesA, verticesB) {
    let minOverlap = Infinity;
    let minEdgeLength = Infinity;
    let collisionDirection;
    let minAxis;
    let edgeNumber;

    for (let i = 0; i < verticesA.length; i += 3) {
      const va = [verticesA[i], verticesA[i + 1]];
      const vb = [verticesA[(i + 3) % verticesA.length], verticesA[(i + 4) % verticesA.length]];

      const edge = this.getEdge(va, vb);
      const axis = this.getAxis(edge);

      const a = this.projectVertices(verticesA, axis);
      const b = this.projectVertices(verticesB, axis);

      const overlap = Math.min(a.max, b.max) - Math.max(a.min, b.min);

      if (overlap < 0) {
        return false;
      }

      if (overlap <= minOverlap) {
        minOverlap = overlap;
        minAxis = axis;
        if (i % 2 === 0) collisionDirection = "horizontal";
        else collisionDirection = "vertical";
      }

      if (a.max < b.max) {
        minAxis = this.dot(axis, -1);
      }
    }

    return { minAxis, minOverlap, collisionDirection };
  }
  projectVertices(vertices, axis) {
    let min = this.dotProduct(axis, [vertices[0], vertices[1]]);
    let max = min;
    for (let i = 0; i < vertices.length; i += 3) {
      const vertex = [vertices[i], vertices[i + 1]];
      const proj = this.dotProduct(vertex, axis);

      if (proj < min) min = proj;
      if (proj > max) max = proj;
    }
    return { min, max };
  }
  findDirection(axis, collisionDirection) {
    let direction;
    if (collisionDirection === "horizontal") {
      if (axis[0] > 0) direction = "LEFT";
      else direction = "RIGHT";
    } else {
      if (axis[1] > 0) direction = "BOTTOM";
      else direction = "TOP";
    }

    return direction;
  }
  getEdge(va, vb) {
    return [vb[0] - va[0], vb[1] - va[1]];
  }
  getAxis(edge) {
    const x = -edge[1];
    const y = edge[0];

    const length = Math.sqrt(x * x + y * y);

    return [x / length, y / length];
  }
  dotProduct(vertex, axis) {
    return axis[0] * vertex[0] + axis[1] * vertex[1];
  }
  mtv(axis, overlap) {
    return [axis[0] * overlap, axis[1] * overlap];
  }
  dot(axis, number) {
    return [axis[0] * number, axis[1] * number];
  }
}
