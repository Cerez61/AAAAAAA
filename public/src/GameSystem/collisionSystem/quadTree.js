import { Rectangle } from "../../utils/rectangle.js";

export class QuadTree {
  constructor(boundary, capacity) {
    this.boundary = boundary;
    this.capacity = capacity;

    this.rects = [];

    this.divided = false;
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

    for (const rect of this.rects) {
      if (!found.includes(rect)) {
        found.push(rect);
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
  insert(aabb) {
    if (!this.boundary.intersect(aabb)) {
      return;
    }

    if (this.divided) {
      this.tlQuadTree.insert(aabb);
      this.trQuadTree.insert(aabb);
      this.blQuadTree.insert(aabb);
      this.brQuadTree.insert(aabb);
      return;
    }

    if (this.rects.length < this.capacity) {
      this.rects.push(aabb);
    } else {
      this.subDivideTree();
      this.giveAllPointsNodes();
      this.insert(aabb);
    }
  }
}
