/**
 * @type {WebGL2RenderingContext}
 */

const gl = gameCanvas.getContext("webgl2");

checkWebGL.innerHTML = !gl ? "Your browser doesn't support webgl2" : "Your browser supports webgl2";
