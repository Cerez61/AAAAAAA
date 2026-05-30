export class Point {
  constructor(x, y, entity, pointID, rectID) {
    this.pointID = pointID;
    this.rectID = rectID;
    this.entity = entity || null;
    this.x = x;
    this.y = y;

    this.othersEntity = [];
  }
  contains(boundary) {
    return boundary.x <= this.x && boundary.x + boundary.w >= this.x && boundary.y >= this.y && boundary.y - boundary.h <= this.y;
  }
}
