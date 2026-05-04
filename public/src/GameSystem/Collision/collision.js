import { QuadTree } from "./quadTree.js";
import { CollisionSAT } from "./collisionSAT.js";
import { Rectangle } from "../../utils/rectangle.js";
import { Point } from "../../utils/point.js";
import { MAT4 } from "../../utils/matrix.js";

export class Collision {
  constructor(gameData) {
    this.instanceData = gameData[0];
    this.sceneData = gameData[1];
    this.entityData = gameData[2];

    this.vertexData = this.instanceData.collisionData;

    this.w;
    this.h;

    this.points = [];
    this.rects = [];

    this.collideCount = 0;
    this.collisionSAT = new CollisionSAT();
    this.mat4 = new MAT4();
  }
  checkCollision(entityA, entityB) {
    const entityAVertices = this.mat4.multiplyVerticesMatrix(new Float32Array(12), this.vertexData, entityA.modelMatrix);
    const entityBVertices = this.mat4.multiplyVerticesMatrix(new Float32Array(12), this.vertexData, entityB.modelMatrix);
    this.collideCount++;

    const result = this.collisionSAT.intersectPolygons(entityAVertices, entityBVertices);
    const mtv = result.mtv;
    const collisionDirection = result.collisionDirection;
    if (mtv) {
      entityA.collide(mtv[0], collisionDirection[0]);
      entityB.collide(mtv[1], collisionDirection[1]);
      return;
    }
  }
  insertEntity(entities) {
    let rectID = 0;
    let pointID = 0;

    for (const entity of entities) {
      const entityVertices = this.mat4.multiplyVerticesMatrix(new Float32Array(12), this.vertexData, entity.modelMatrix);
      const x = entity.x;
      const y = entity.y;
      const w = entity.w;
      const h = entity.h;

      const entityPoints = [];

      for (let i = 0; i < entityVertices.length; i += 3) {
        const vertex = [entityVertices[i], entityVertices[i + 1], entityVertices[i + 2]];
        const point = new Point(vertex[0], vertex[1], entity, pointID, rectID);
        entityPoints.push(point);

        this.quadTree.insert(point);
        this.points.push(point);
        pointID++;
      }

      const rect = new Rectangle(x, y, w, h, entity, rectID, entityPoints);
      this.rects.push(rect);
      rectID++;
    }
  }
  queryEntity() {
    for (const rect of this.rects) {
      const entityA = rect.entity;
      let founds = [];
      this.quadTree.query(rect, founds);

      for (const found of founds) {
        const entityB = found.entity;

        if (entityA === entityB || entityA.entityID > entityB.entityID) continue;

        this.checkCollision(entityA, entityB);
      }
    }
  }
  resetOutlineColors(entities) {
    for (const entity of entities) {
      entity.outlineColor = 0;
    }
  }
  clear() {
    this.points = [];
    this.rects = [];
    this.collideCount = 0;
  }
  check() {
    const entities = this.entityData.entities;
    this.resetOutlineColors(entities);
    this.insertEntity(entities);
    this.queryEntity();
  }
  updateSceneBoundary() {
    this.w = this.sceneData.width;
    this.h = this.sceneData.height;
  }
  update() {
    this.updateSceneBoundary();
    this.quadTree = new QuadTree(new Rectangle(0, this.h, this.w, this.h), 4);

    this.check();
    /* 
    console.log(this.collideCount); */
  }
  giveQuadTree() {
    return this.quadTree;
  }
}
