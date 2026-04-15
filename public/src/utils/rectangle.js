export class Rectangle {
  constructor(x, y, w, h, entity, id) {
    this.id = id;
    this.entity = entity || null;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.collideID = [];
  }
  intersect(aabb) {
    return this.x <= aabb.x + aabb.w && this.x + this.w >= aabb.x && this.y >= aabb.y - aabb.h && this.y - this.h <= aabb.y;
  }
}
