import { MAT4 } from "../../utils/matrix.js";
export class CollisionSAT {
  constructor(gameData) {
    this.instanceData = gameData;
    this.vertexData = this.instanceData.positionData;
    this.assetID;
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
        return false;
      }
    }
    for (let i = 0; i < verticesB.length; i += 3) {
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
    }
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
  checkCollision(entities) {
    //entities[0] = player, entities[1] = textures
    const player = entities[0];
    const textures = entities[1];

    for (let i = 0; i < 1; i++) {
      const playerVertices = this.mat4.multiplyVerticesMatrix(new Float32Array(18), this.vertexData, player.modelMatrix);
      for (const asset of textures.assets) {
        const assetVertices = this.mat4.multiplyVerticesMatrix(new Float32Array(18), this.vertexData, asset.modelMatrix);

        if (this.intersectPolygons(playerVertices, assetVertices)) {
          //çarpışma var
          return asset;
        }
      }

      return null;
    }
  }
  update(entities) {
    //entities[0] = player, entities[1] = textures
    const player = entities[0];
    const textures = entities[1];

    const collidedAsset = this.checkCollision([player, textures]);

    if (this.assetID !== undefined) {
      textures.assets[this.assetID].outlineColor = 0;
    }

    if (collidedAsset) {
      player.outlineColor = 1;
      collidedAsset.outlineColor = 1;
      this.assetID = collidedAsset.assetID;
    } else {
      player.outlineColor = 0;
    }
  }
}
