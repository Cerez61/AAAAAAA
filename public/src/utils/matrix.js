// matrixes wrote row-major format. opengl works rows instead of columns
// I got error when I use row-major format. I don't know which one is correct
// I'll do every func in mat4 method with using column-major format
export class MAT4 {
  identity() {
    /* prettier-ignore */

    return [
      // first row(x row)
      1, 0, 0, 0,
      // second row(y row)
      0, 1, 0, 0,
      // third row(z row)
      0, 0, 1, 0,
      //fourth row(w row)
      0, 0, 0, 1];
  }
  ortho(left, right, bottom, top, near, far) {
    return [
      // first row(x row)
      2 / (right - left),
      0,
      0,
      0,
      // second row(y row)
      0,
      2 / (top - bottom),
      0,
      0,
      // third row(z row)
      0,
      0,
      -2 / (far - near),
      0,
      //fourth row(w row)
      (right + left) / (left - right),
      -(top + bottom) / (top - bottom),
      (far + near) / (near - far),
      1,
    ];
  }
  multiply(out, a, b) {
    out[0] = b[0] * a[0] + b[1] * a[4] + b[2] * a[8] + b[3] * a[12];
    out[1] = b[0] * a[1] + b[1] * a[5] + b[2] * a[9] + b[3] * a[13];
    out[2] = b[0] * a[2] + b[1] * a[6] + b[2] * a[10] + b[3] * a[14];
    out[3] = b[0] * a[3] + b[1] * a[7] + b[2] * a[11] + b[3] * a[15];

    out[4] = b[4] * a[0] + b[5] * a[4] + b[6] * a[8] + b[7] * a[12];
    out[5] = b[4] * a[1] + b[5] * a[5] + b[6] * a[9] + b[7] * a[13];
    out[6] = b[4] * a[2] + b[5] * a[6] + b[6] * a[10] + b[7] * a[14];
    out[7] = b[4] * a[3] + b[5] * a[7] + b[6] * a[11] + b[7] * a[15];

    out[8] = b[8] * a[0] + b[9] * a[4] + b[10] * a[8] + b[11] * a[12];
    out[9] = b[8] * a[1] + b[9] * a[5] + b[10] * a[9] + b[11] * a[13];
    out[10] = b[8] * a[2] + b[9] * a[6] + b[10] * a[10] + b[11] * a[14];
    out[11] = b[8] * a[3] + b[9] * a[7] + b[10] * a[11] + b[11] * a[15];

    out[12] = b[12] * a[0] + b[13] * a[4] + b[14] * a[8] + b[15] * a[12];
    out[13] = b[12] * a[1] + b[13] * a[5] + b[14] * a[9] + b[15] * a[13];
    out[14] = b[12] * a[2] + b[13] * a[6] + b[14] * a[10] + b[15] * a[14];
    out[15] = b[12] * a[3] + b[13] * a[7] + b[14] * a[11] + b[15] * a[15];

    return out;
  }
  scale(out, n) {
    const x = n[0] || 1;
    const y = n[1] || 1;
    const z = n[2] || 1;

    out[0] *= x;
    out[5] *= y;
    out[10] *= z;
  }
  translate(out, n) {
    const x = n[0] || 0;
    const y = n[1] || 0;
    const z = n[2] || 0;

    out[12] = out[0] * x + out[4] * y + out[8] * z;
    out[13] = out[1] * x + out[5] * y + out[9] * z;
    out[14] = out[2] * x + out[6] * y + out[10] * z;
  }
  lookAt(out, eye, center, up) {
    let x0, x1, x2, y0, y1, y2, z0, z1, z2, len;
    let eyex = eye[0];
    let eyey = eye[1];
    let eyez = eye[2];
    let upx = up[0];
    let upy = up[1];
    let upz = up[2];
    let centerx = center[0];
    let centery = center[1];
    let centerz = center[2];
    if (Math.abs(eyex - centerx) < glMatrix.EPSILON && Math.abs(eyey - centery) < glMatrix.EPSILON && Math.abs(eyez - centerz) < glMatrix.EPSILON) {
      return identity(out);
    }
    z0 = eyex - centerx;
    z1 = eyey - centery;
    z2 = eyez - centerz;
    len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
    z0 *= len;
    z1 *= len;
    z2 *= len;
    x0 = upy * z2 - upz * z1;
    x1 = upz * z0 - upx * z2;
    x2 = upx * z1 - upy * z0;
    len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
    if (!len) {
      x0 = 0;
      x1 = 0;
      x2 = 0;
    } else {
      len = 1 / len;
      x0 *= len;
      x1 *= len;
      x2 *= len;
    }
    y0 = z1 * x2 - z2 * x1;
    y1 = z2 * x0 - z0 * x2;
    y2 = z0 * x1 - z1 * x0;
    len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
    if (!len) {
      y0 = 0;
      y1 = 0;
      y2 = 0;
    } else {
      len = 1 / len;
      y0 *= len;
      y1 *= len;
      y2 *= len;
    }
    out[0] = x0;
    out[1] = y0;
    out[2] = z0;
    out[3] = 0;
    out[4] = x1;
    out[5] = y1;
    out[6] = z1;
    out[7] = 0;
    out[8] = x2;
    out[9] = y2;
    out[10] = z2;
    out[11] = 0;
    out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
    out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
    out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
    out[15] = 1;
    return out;
  }
}
