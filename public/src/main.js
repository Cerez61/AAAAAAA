import { gameVSS, gameFSS } from "./shaders.js";
import { MAT4 } from "./utils/matrix.js";
import { Game } from "./game.js";

/**
 * @type {WebGL2RenderingContext}
 */

const gl = gameCanvas.getContext("webgl2");

// check gl if it support your browser or not
checkWebGL.innerHTML = !gl ? "Your browser doesn't support webgl2" : "Your browser supports webgl2";

//this line set canvas width and height according to your screen size and save as variable
const CANVAS_WIDTH = (gameCanvas.width = window.innerWidth);
const CANVAS_HEIGHT = (gameCanvas.height = window.innerHeight);

//this line adjust your clipspace pixels to your screen size
gl.viewport(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

// INITIALIZE SHADERS AND PROGRAM //

// create vertex shader
//
//VS stands for Vertex Shader
const gameVS = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(gameVS, gameVSS);
gl.compileShader(gameVS);

//do the same things as above for fragment shader
const gameFS = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(gameFS, gameFSS);
gl.compileShader(gameFS);

//create program
const program = gl.createProgram();

//attach vertex and fragment shader to program
gl.attachShader(program, gameVS);
gl.attachShader(program, gameFS);

//I don't know what this code do
gl.linkProgram(program);

//select and start currently usable program // maybe I don't know either
gl.useProgram(program);

//this line compare the z coord of the vertexs with each other and determines which vertex will visible upper to other one
gl.enable(gl.DEPTH_TEST);

//add matrix class
const mat4 = new MAT4();

const game = new Game(program, gl, mat4);

function animate(timeStamp) {
  game.update();
  game.draw();

  requestAnimationFrame(animate);
}
animate(0);
