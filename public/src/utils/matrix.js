/* prettier-ignore */
export class MAT4 {
  identity() {
    return [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1];
  }
  ortho(l, r, b, t, n, f) {
    return [
      // first row(x row)
      2 / (r + l),  0, 0, (r + l) / (r - l),
      // second row(y row)
      0,2 / (t + b),0,(t + b) / (t - b),
      // third row(z row)
      0,0,-2 / (f + n),(f + n) / (f - n),
      //fourth row(w row)
      0,0,0,1,
    ];
  }
}
