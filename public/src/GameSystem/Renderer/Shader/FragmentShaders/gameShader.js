export const gameFSS = `#version 300 es
precision mediump float;
precision mediump sampler2DArray;

uniform sampler2DArray sSpriteSheet;

in vec2 vUVCoord;
in vec2 vUVRect;
in float vDepth;

out vec4 FragColor;

void main() {
FragColor = texture(sSpriteSheet,vec3(vUVCoord,vDepth));
}
`;
