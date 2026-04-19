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
export const qtFSS = `#version 300 es
precision mediump float;


out vec4 FragColor;
void main() {
FragColor = vec4(0.0,0.0,0.0,1.0);
}
`;
