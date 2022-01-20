
uniform vec2 uFrequency;
uniform float uTime;

attribute float aRandom;
varying vec2 vUv;
varying float vElevation;
// varying float vRandom;

void main() {
    vec4 modelPostion = modelMatrix * vec4(position, 1.0);
    // modelPostion.z += aRandom *0.1; 
    float elevation = sin(modelPostion.x  * uFrequency.x - uTime ) * 0.1;
    elevation += sin(modelPostion.y * uFrequency.y - uTime ) * 0.05;
    modelPostion.z +=  elevation;
    vec4 viewPostion = viewMatrix * modelPostion;
    vec4 projectedPostion = projectionMatrix * viewPostion;

    gl_Position = projectedPostion;

    // vRandom= aRandom;
    vUv = uv;
    vElevation = elevation;
}