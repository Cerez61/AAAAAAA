import { Rectangle } from "../../utils/rectangle.js";
import { MAT4 } from "../../utils/matrix.js";

export class QuadTree {
  constructor(boundary, capacity) {
    this.boundary = boundary;
    this.capacity = capacity;

    this.points = [];

    this.divided = false;

    this.mat4 = new MAT4();

    this.modelMatrix = this.mat4.identity();

    this.mat4.scale(this.modelMatrix, [this.boundary.w, this.boundary.h]);
    this.mat4.translate(this.modelMatrix, [this.boundary.x, this.boundary.y]);
  }
  subDivideTree() {
    const x = this.boundary.x;
    const y = this.boundary.y;
    const w = this.boundary.w / 2;
    const h = this.boundary.h / 2;

    const tl = new Rectangle(x, y, w, h);
    const tr = new Rectangle(x + w, y, w, h);
    const bl = new Rectangle(x, y - h, w, h);
    const br = new Rectangle(x + w, y - h, w, h);

    this.tlQuadTree = new QuadTree(tl, this.capacity);
    this.trQuadTree = new QuadTree(tr, this.capacity);
    this.blQuadTree = new QuadTree(bl, this.capacity);
    this.brQuadTree = new QuadTree(br, this.capacity);

    this.divided = true;
  }
  giveAllPointsNodes() {
    for (const rect of this.rects) {
      this.tlQuadTree.insert(rect);
      this.trQuadTree.insert(rect);
      this.blQuadTree.insert(rect);
      this.brQuadTree.insert(rect);
    }
    this.rects = [];
  }
  query(range, found) {
    if (!found) found = [];

    if (!this.boundary.intersect(range)) {
      return;
    }

    for (const point of this.points) {
      if (!range.othersID.includes(point.rectID)) {
        found.push(point);
        range.othersID.push(point.rectID);
      }
    }

    if (this.divided) {
      this.tlQuadTree.query(range, found);
      this.trQuadTree.query(range, found);
      this.blQuadTree.query(range, found);
      this.brQuadTree.query(range, found);
    }
    return found;
  }
  insert(point) {
    if (!point.contains(this.boundary)) {
      return;
    }

    /*    if (this.divided) {
      this.tlQuadTree.insert(aabb);
      this.trQuadTree.insert(aabb);
      this.blQuadTree.insert(aabb);
      this.brQuadTree.insert(aabb);
      return;
    } */

    if (this.points.length < this.capacity) {
      this.points.push(point);
    } else {
      if (!this.divided) {
        this.subDivideTree();
      }
      this.tlQuadTree.insert(point);
      this.trQuadTree.insert(point);
      this.blQuadTree.insert(point);
      this.brQuadTree.insert(point);
      /* 
      this.giveAllPointsNodes(); 
      this.insert(point);*/
    }
  }
  giveMatrixData(arr) {
    arr.push(this.modelMatrix);

    if (this.divided) {
      this.tlQuadTree.giveMatrixData(arr);
      this.trQuadTree.giveMatrixData(arr);
      this.blQuadTree.giveMatrixData(arr);
      this.brQuadTree.giveMatrixData(arr);
    }

    return arr;
  }
}
