// VSS stands for Vertex Shader Source
export const gameVSS = `#version 300 es
precision mediump float;

layout(location = 0) in vec4 aPosition;
uniform mat4 uMatrix;

void main() {
gl_Position = uMatrix * aPosition;
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
