// VSS stands for Vertex Shader Source
export const gameVSS = `#version 300 es
precision mediump float;

void main() {
gl_PointSize = 10.0;
gl_Position = vec4(0.0,0.0,0.0,1.0);
}
`;
// FSS stands for Fragment Shader Source
export const gameFSS = `#version 300 es
precision mediump float;


out vec4 FragColor;

void main() {
FragColor = vec4(0.0,0.0,1.0,1.0);
}
`;
