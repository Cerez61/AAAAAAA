import { QuadTree } from "./quadTree.js";
import { CollisionSAT } from "./collisionSAT.js";
import { Rectangle } from "../../utils/rectangle.js";
import { MAT4 } from "../../utils/matrix.js";

export class Collision {
  constructor(gameData) {
    this.instanceData = gameData;
    this.vertexData = this.instanceData.collisionData;
    this.w = 7000;
    this.h = 600;
    this.rects = [];

    this.collideCount = 0;
    this.collisionSAT = new CollisionSAT();
    this.mat4 = new MAT4();
  }
  checkCollision(entityA, entityB) {
    const entityAVertices = this.mat4.multiplyVerticesMatrix(new Float32Array(12), this.vertexData, entityA.modelMatrix);
    const entityBVertices = this.mat4.multiplyVerticesMatrix(new Float32Array(12), this.vertexData, entityB.modelMatrix);
    if (this.collisionSAT.intersectPolygons(entityAVertices, entityBVertices)) {
      entityA.outlineColor = 1;
      entityB.outlineColor = 1;
    }
    this.collideCount++;
  }
  insertEntity(entities) {
    let rectID = 0;
    for (const entity of entities) {
      const entityVertices = this.mat4.multiplyVerticesMatrix(new Float32Array(3), [-1, 1, 1], entity.modelMatrix);

      const aabb = new Rectangle(entityVertices[0], entityVertices[1], entity.w, entity.h, entity, rectID);

      this.quadTree.insert(aabb);
      this.rects.push(aabb);
      rectID++;
    }
  }
  queryEntity() {
    for (const rect of this.rects) {
      const entityA = rect.entity;
      let founds = [];
      this.quadTree.query(rect, founds);
      console.log(founds);
      for (const found of founds) {
        const entityB = found.entity;

        if (entityA == entityB || rect.id >= found.id) continue;

        if (!rect.collideID.includes(found.id) && !found.collideID.includes(found.id)) {
          rect.collideID.push(found.id);

          this.checkCollision(entityA, entityB);
        }
      }
    }
  }
  resetOutlineColors(entities) {
    for (const entity of entities) {
      entity.outlineColor = 0;
    }
  }
  check(entities) {
    this.resetOutlineColors(entities);
    this.insertEntity(entities);
    this.queryEntity();
  }
  update(entities) {
    this.quadTree = new QuadTree(new Rectangle(0, this.h, this.w, this.h), 4);

    this.check(entities);
    this.rects = [];
    console.log(this.collideCount);
    this.collideCount = 0;
  }
}
