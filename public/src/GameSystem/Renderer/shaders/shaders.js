// VSS stands for Vertex Shader Source
export const gameVSS = `#version 300 es
precision mediump float;

layout(location = 0) in vec4 aPosition;
layout(location = 2) in float aDepth;
layout(location = 3) in mat4 aModelMatrix;
layout(location = 7) in vec4 aUVRect;
layout(location = 8) in float aIndex;
layout(location = 9) in vec2 aSpriteAtlasSize;

uniform mat4 uViewMatrix;
uniform mat4 uOrthoMatrix;

out float vDepth;
out vec2 vUVCoord;
out vec2 vUVRect;

void main() {
float u = 0.0;
float v = 0.0;
if (aIndex == 1.0) {
u = aUVRect[0] / aSpriteAtlasSize[0];
v = (aUVRect[1] + aUVRect[3]) / aSpriteAtlasSize[1];
}
else if(aIndex == 2.0){
u = aUVRect[0] / aSpriteAtlasSize[0];
v = aUVRect[1] / aSpriteAtlasSize[1];
}
else if(aIndex == 3.0){
u = (aUVRect[0] + aUVRect[2]) / aSpriteAtlasSize[0];
v = (aUVRect[1] + aUVRect[3]) / aSpriteAtlasSize[1];
}
else if(aIndex == 4.0){
u = (aUVRect[0] + aUVRect[2]) / aSpriteAtlasSize[0];
v = aUVRect[1] / aSpriteAtlasSize[1];
}
vUVCoord = vec2(u,v);
vDepth = aDepth;
gl_Position = uOrthoMatrix * uViewMatrix * aModelMatrix *  aPosition;
}
`;
// FSS stands for Fragment Shader Source
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
