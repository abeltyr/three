
uniform vec3 uDepthColor;
uniform vec3 uSurfaceColor;
uniform float uColorMultiplier;
uniform float uColorOffset;



varying float vElevation;


void main() {
    float mixerElevation  = (vElevation  + uColorOffset) * uColorMultiplier;
    vec3 mixedColor = mix(uDepthColor,uSurfaceColor, mixerElevation);

    gl_FragColor = vec4(mixedColor, 1.0);
}