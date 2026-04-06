import { MAT4 } from "../../utils/matrix.js";
export class CollisionSAT {
  constructor(gameData) {
    this.instanceData = gameData;
    this.vertexData = this.instanceData.collisionData;

    this.assetID = [];

    this.mat4 = new MAT4();

    this.viewMatrix = this.mat4.identity();
    this.orthoMatrix = this.mat4.identity();
    this.mvMatrix = this.mat4.identity();
    this.mvoMatrix = this.mat4.identity();
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
  checkCollision(entities) {
    //entities[0] = player, entities[1] = textures
    const player = entities[0];
    const textures = entities[1];

    for (let i = 0; i < 1; i++) {
      const playerVertices = this.mat4.multiplyVerticesMatrix(new Float32Array(12), this.vertexData, player.modelMatrix);
      for (const asset of textures.assets) {
        const assetVertices = this.mat4.multiplyVerticesMatrix(new Float32Array(12), this.vertexData, asset.modelMatrix);

        if (this.intersectPolygons(playerVertices, assetVertices)) {
          //çarpışma var
          this.assetID.push(asset.assetID);
          continue;
        }
      }
    }
  }
  instanceDataTake() {
    this.viewMatrix = this.instanceData.viewMatrix;
    this.orthoMatrix = this.instanceData.orthoMatrix;
  }
  update(entities) {
    this.instanceDataTake();
    //entities[0] = player, entities[1] = textures
    const player = entities[0];
    const textures = entities[1];

    if (this.assetID.length > 0) {
      for (const id of this.assetID) {
        textures.assets[id].outlineColor = 0;
      }
      this.assetID = [];
    }

    this.checkCollision([player, textures]);

    if (this.assetID.length > 0) {
      player.outlineColor = 1;

      for (const id of this.assetID) {
        textures.assets[id].outlineColor = 1;
      }
    } else {
      player.outlineColor = 0;
    }
  }
}
