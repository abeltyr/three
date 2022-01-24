
attribute float aScales;

attribute vec3 aRandomness;

uniform float uSize;

uniform float uTime;

varying vec3 vColor;


void main(){
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    float angle = atan(modelPosition.x, modelPosition.z);
    float distanceToCenter = length(modelPosition.xz);
    float angleOffset = (1.0/distanceToCenter) * uTime *0.2;
    angle += angleOffset;   
    modelPosition.x = sin(angle) * distanceToCenter;
    modelPosition.z = cos(angle)* distanceToCenter;

    //Randomness
    modelPosition.xyz += aRandomness.xyz;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;
    gl_Position = projectionPosition;


    // gl SIZE
    gl_PointSize = uSize * aScales;
    gl_PointSize *= ( 1.0 / - viewPosition.z );


    // Color
    vColor = color;
}