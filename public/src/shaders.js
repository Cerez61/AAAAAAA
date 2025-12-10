// VSS stands for Vertex Shader Source
export const gameVSS = `#version 300 es
precision mediump float;

layout(location = 0) in vec4 aPosition;
layout(location = 1) in vec2 aTexCoord;

uniform mat4 uMatrix;
uniform mat4 bgMatrix;
out vec2 vTexCoord;

void main() {
vTexCoord = aTexCoord;
gl_Position = uMatrix * aPosition;
}
`;
// FSS stands for Fragment Shader Source
export const gameFSS = `#version 300 es
precision mediump float;

uniform sampler2D uBackground;
in vec2 vTexCoord;
out vec4 FragColor;

void main() {
FragColor = texture(uBackground,vTexCoord);
}
`;
