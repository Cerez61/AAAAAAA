export class CollisionSAT {
  intersectPolygons(verticesA, verticesB) {
    for (let i = 0; i < verticesA.length; i += 3) {
      const va = [verticesA[i], verticesA[i + 1]];
      const vb = [verticesA[(i + 3) % verticesA.length], verticesA[(i + 4) % verticesA.length]];

      const edge = this.getEdge(va, vb);
      const axis = this.getAxis(edge);

      let minA = Number.MAX_VALUE;
      let minB = Number.MAX_VALUE;
      let maxA = Number.MIN_VALUE;
      let maxB = Number.MIN_VALUE;

      const a = this.projectVertices(verticesA, axis, minA, maxA);
      const b = this.projectVertices(verticesB, axis, minB, maxB);

      if (a.min >= b.max || b.min >= a.max) {
        return false;
      }
    }
    /*   for (let i = 0; i < verticesB.length; i += 3) {
      const va = [verticesB[i], verticesB[i + 1]];
      const vb = [verticesB[(i + 3) % verticesB.length], verticesB[(i + 4) % verticesB.length]];

      const edge = this.getEdge(va, vb);
      const axis = this.getAxis(edge);

      let minA = Number.MAX_VALUE;
      let minB = Number.MAX_VALUE;
      let maxA = Number.MIN_VALUE;
      let maxB = Number.MIN_VALUE;

      const a = this.projectVertices(verticesA, axis, minA, maxA);
      const b = this.projectVertices(verticesB, axis, minB, maxB);

      if (a.min >= b.max || b.min >= a.max) {
        return false;
      }
    } */
    return true;
  }
  projectVertices(vertices, axis, min, max) {
    for (let i = 0; i < vertices.length; i += 3) {
      const vertex = [vertices[i], vertices[i + 1]];
      const proj = this.dotProduct(vertex, axis);

      if (proj < min) min = proj;
      if (proj > max) max = proj;
    }
    return { min, max };
  }
  getEdge(va, vb) {
    return [vb[0] - va[0], vb[1] - va[1]];
  }
  getAxis(edge) {
    return [-edge[1], edge[0]];
  }
  dotProduct(vertex, axis) {
    return axis[0] * vertex[0] + axis[1] * vertex[1];
  }
}
