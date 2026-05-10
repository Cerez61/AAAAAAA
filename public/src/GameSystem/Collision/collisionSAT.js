import { MAT4 } from "../../utils/matrix.js";

const mat4 = new MAT4();
export class CollisionSAT {
  intersectPolygons(entityA, entityB, vertexData) {
    const finalPosA = this.getPositionDiff(entityA.p, entityA.p2);
    const subStepA = this.getSubStep(finalPosA, entityA.s2);
    const result = this.calculate(entityA, entityB, vertexData, subStepA);
    if (!result) return false;

    const directionA = this.findDirection(result.minAxis);
    const directionB = this.getOppositeDirection(directionA);
    const directions = [directionA, directionB];
    const mtv = this.mtv(result.minAxis, result.minOverlap);

    return { mtv, directions };
  }
  calculate(entityA, entityB, vertexData, subStep) {
    const currentMatrixA = mat4.copy(entityA.modelMatrix);
    const verticesB = mat4.multiplyVerticesMatrix(new Float32Array(12), vertexData, entityB.modelMatrix);
    for (let c = 0; c < subStep.hipotenus; c++) {
      const subX = c * subStep.stepX;
      const subY = c * subStep.stepY;

      const x = entityA.p.x + subX;
      const y = entityA.p.y + subY;
      const z = entityA.p.z;

      mat4.translate(currentMatrixA, [x, y, z]);

      const verticesA = mat4.multiplyVerticesMatrix(new Float32Array(12), vertexData, currentMatrixA);

      const result = this.checkSat(verticesA, verticesB, entityA, entityB);
      if (result) return result;
    }

    return null;
  }
  checkSat(verticesA, verticesB, entityA, entityB) {
    let minOverlap = Infinity;
    let minAxis = null;

    const axes = [...this.getAxesFromVertices(verticesA), ...this.getAxesFromVertices(verticesB)];
    for (const axis of axes) {
      const a = this.projectVertices(verticesA, axis);
      const b = this.projectVertices(verticesB, axis);

      const overlap = Math.min(a.max, b.max) - Math.max(a.min, b.min);

      if (overlap < 0) {
        return false;
      }
      if (overlap <= minOverlap) {
        const centerA = { x: entityA.p.x + entityA.s.w / 2, y: entityA.p.y + entityA.s.h / 2 };
        const centerB = { x: entityB.p.x + entityB.s.w / 2, y: entityB.p.y + entityB.s.h / 2 };
        const vectorAB = [centerA.x - centerB.x, centerA.y - centerB.y];
        minOverlap = overlap;
        minAxis = axis;
        if (this.dotProduct(axis, vectorAB) < 0) {
          minAxis = this.dot(axis, -1);
        } else {
          minAxis = axis;
        }
      }
    }

    return { minAxis, minOverlap };
  }
  getPositionDiff(currentPos, nextPos) {
    const x = nextPos.x - currentPos.x;
    const y = nextPos.y - currentPos.y;
    return { x, y };
  }
  getSubStep(finalPos, s) {
    let hipotenus = Math.sqrt(Math.pow(finalPos.x, 2) + Math.pow(finalPos.y, 2));
    if (hipotenus >= 30) {
      if (Math.abs(finalPos.x) > Math.abs(finalPos.y)) hipotenus /= s.w;
      else hipotenus /= s.h / 8;
    } else hipotenus = 1;

    hipotenus = Math.ceil(hipotenus);
    const stepX = Math.floor(finalPos.x / hipotenus);
    const stepY = Math.floor(finalPos.y / hipotenus);
    return { hipotenus, stepX, stepY };
  }
  getAxesFromVertices(vertices) {
    const axes = [];
    for (let i = 0; i < vertices.length; i += 3) {
      const va = [vertices[i], vertices[i + 1]];
      const vb = [vertices[(i + 3) % vertices.length], vertices[(i + 4) % vertices.length]];

      const edge = this.getEdge(va, vb);
      const axis = this.getAxis(edge);
      axes.push(axis);
    }
    return axes;
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
  findDirection(axis) {
    if (Math.abs(axis[1]) > Math.abs(axis[0])) {
      return axis[1] > 0 ? "BOTTOM" : "TOP";
    } else {
      return axis[0] > 0 ? "RIGHT" : "LEFT";
    }
  }
  getOppositeDirection(direction) {
    const opposites = {
      TOP: "BOTTOM",
      BOTTOM: "TOP",
      LEFT: "RIGHT",
      RIGHT: "LEFT",
    };
    return opposites[direction];
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
