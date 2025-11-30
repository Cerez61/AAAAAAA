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
      -(top + bottom) / (bottom - top),
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
}
