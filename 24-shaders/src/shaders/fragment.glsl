uniform vec3 uColor;
uniform sampler2D uTexture;

varying vec2 vUv;
varying float vElevation;

// varying float vRandom;

void main() {

    // gl_FragColor = vec4( 0.65,vRandom, vRandom, 1.0);

    vec4 textureColor = texture2D(uTexture, vUv);

    textureColor.rgb *= vElevation * 2.0 + 0.45;

    gl_FragColor = textureColor;

}