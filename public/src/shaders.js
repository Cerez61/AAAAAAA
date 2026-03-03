// VSS stands for Vertex Shader Source
export const gameVSS = `#version 300 es
precision mediump float;

layout(location = 0) in vec4 aPosition;
layout(location = 1) in vec2 aTexCoord;
layout(location = 2) in float aDepth;

uniform mat4 uMatrix;

out float vDepth;
out vec2 vTexCoord;

void main() {
vTexCoord = aTexCoord;
vDepth = aDepth;
gl_Position = uMatrix * aPosition;
}
`;
// FSS stands for Fragment Shader Source
export const gameFSS = `#version 300 es
precision mediump float;
precision mediump sampler2DArray;

uniform sampler2DArray sSpriteSheet;

in vec2 vTexCoord;
in float vDepth;

out vec4 FragColor;

void main() {
FragColor = texture(sSpriteSheet,vec3(vTexCoord,vDepth));
}
`;
