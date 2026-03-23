// VSS stands for Vertex Shader Source
export const gameVSS = `#version 300 es
precision mediump float;

layout(location = 0) in vec4 aPosition;
layout(location = 1) in vec2 aUVCoord;
layout(location = 2) in float aDepth;
layout(location = 3) in mat4 aModelMatrix;

uniform mat4 uMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uOrthoMatrix;

out float vDepth;
out vec2 vUVCoord;

void main() {
vUVCoord = aUVCoord;
vDepth = aDepth;
gl_Position = uOrthoMatrix * uViewMatrix * mat4(1.0) * aPosition;
}
`;
// FSS stands for Fragment Shader Source
export const gameFSS = `#version 300 es
precision mediump float;
precision mediump sampler2DArray;

uniform sampler2DArray sSpriteSheet;

in vec2 vUVCoord;
in float vDepth;

out vec4 FragColor;

void main() {
FragColor = texture(sSpriteSheet,vec3(vUVCoord,vDepth));
}
`;
