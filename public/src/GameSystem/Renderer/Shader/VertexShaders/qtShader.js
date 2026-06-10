export const qtVSS = `#version 300 es
precision mediump float;
layout(location = 0) in vec4 aPosition;
layout(location = 1) in mat4 aModelMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uOrthoMatrix;

void main() {


gl_Position = uOrthoMatrix * uViewMatrix * aModelMatrix * aPosition;
}
`;
