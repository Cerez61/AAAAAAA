import {gameVSS, gameFSS} from "./shaders.js";
/**
 * @type {WebGL2RenderingContext}
 */

const gl = gameCanvas.getContext("webgl2");

// check gl if it support your browser or not
checkWebGL.innerHTML = !gl ? "Your browser doesn't support webgl2" : "Your browser supports webgl2";

const CANVAS_WIDTH = (gameCanvas.width = window.innerWidth);
const CANVAS_HEIGHT = (gameCanvas.height = window.innerHeight);

//this line adjust your clipspace pixels to your screen size
gl.viewport(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

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

//draw vertexs
gl.drawArrays(gl.POINTS, 0, 1);
