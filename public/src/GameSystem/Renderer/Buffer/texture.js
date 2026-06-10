export class Texture {
  constructor(gl) {
    this.gl = gl;

    this.buffers = [];
    this.bufferId = 0;
  }
  createTexture() {
    const texture = this.gl.createTexture();
    const id = this.bufferId;
    this.buffers.push([texture, this.bufferId]);
    this.bufferId++;

    return { texture, id };
  }
  bindTexture(texture, spriteAtlases) {
    this.gl.bindTexture(this.gl.TEXTURE_2D_ARRAY, texture);
    this.gl.texStorage3D(this.gl.TEXTURE_2D_ARRAY, 1, this.gl.RGBA8, 512, 512, spriteAtlases.length);
    spriteAtlases.forEach((spriteAtlas, index) => {
      this.gl.texSubImage3D(
        this.gl.TEXTURE_2D_ARRAY,
        0,
        0,
        0,
        index,
        spriteAtlas.width,
        spriteAtlas.height,
        1,
        this.gl.RGBA,
        this.gl.UNSIGNED_BYTE,
        spriteAtlas,
      );
    });

    this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, true);
    this.gl.texParameteri(this.gl.TEXTURE_2D_ARRAY, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
    this.gl.texParameteri(this.gl.TEXTURE_2D_ARRAY, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
  }
}
