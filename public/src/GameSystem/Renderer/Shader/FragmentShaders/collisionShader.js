export const collisionFSS = `#version 300 es
precision mediump float;

in vec4 vOutlineColor;

out vec4 FragColor;
void main() {
FragColor = vOutlineColor;
}
`;
