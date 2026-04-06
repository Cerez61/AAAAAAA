export const collisionVSS = `#version 300 es
precision mediump float;
layout(location = 0) in vec4 aPosition;
layout(location = 1) in float aOutlineColor;
layout(location = 3) in mat4 aModelMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uOrthoMatrix;

out vec4 vOutlineColor;
void main() {
if(aOutlineColor == 0.0) {
vOutlineColor = vec4(1.0,0.0,0.0,1.0); 
}
else if(aOutlineColor == 1.0) {
vOutlineColor = vec4(0.0,1.0,0.0,1.0);
}
gl_Position = uOrthoMatrix * uViewMatrix * aModelMatrix * aPosition;
}
`;
export const collisionFSS = `#version 300 es
precision mediump float;

in vec4 vOutlineColor;

out vec4 FragColor;
void main() {
FragColor = vOutlineColor;
}
`;
