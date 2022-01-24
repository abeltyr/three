varying vec3 vColor;


void main(){

    // float strength = distance(gl_PointCoord , vec2(0.5));
    // strength *= 1.0 - step(0.5,strength);


    // //diffuse pattern
    // float strength = distance(gl_PointCoord , vec2(0.5));
    // strength *= 2.0;
    // // strength = 1.0 - strength;

    //Light pattern
    float strength = distance(gl_PointCoord , vec2(0.5));
    strength = (1.0 - strength);
    strength = pow(strength, 5.0);

   vec3 mixedColor = mix(vec3(0.0), vColor, strength);

    gl_FragColor = vec4(mixedColor, 1.0);
}