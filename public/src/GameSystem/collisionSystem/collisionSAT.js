import { MAT4 } from "../../utils/matrix.js";
export class CollisionSAT {
  constructor(gameData) {
    this.instanceData = gameData;
    this.vertexData = this.instanceData.positionData;
    this.mat4 = new MAT4();
  }
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
        console.log("çarpışmıyor");
      }
    }
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
  update(entities) {
    console.log();
    //entities[0] = player, entities[1] = textures
    const player = entities[0];
    const textures = entities[1];

    for (let i = 0; i < 1; i++) {
      const playerVertices = this.mat4.multiplyVerticesMatrix(new Float32Array(18), this.vertexData, player.modelMatrix);
      textures.assets.forEach((asset) => {
        const assetVertices = this.mat4.multiplyVerticesMatrix(new Float32Array(18), this.vertexData, asset.modelMatrix);
        this.intersectPolygons(playerVertices, assetVertices);
      });
    }
  }
}
