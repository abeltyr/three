#define PI 3.141592653589793238462643383279502884197

varying vec2 vUv;
vec2 fade(vec2 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}

vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}

float cnoise(vec2 P){
  vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
  vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
  Pi = mod(Pi, 289.0); // To avoid truncation effects in permutation
  vec4 ix = Pi.xzxz;
  vec4 iy = Pi.yyww;
  vec4 fx = Pf.xzxz;
  vec4 fy = Pf.yyww;
  vec4 i = permute(permute(ix) + iy);
  vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; // 1/41 = 0.024...
  vec4 gy = abs(gx) - 0.5;
  vec4 tx = floor(gx + 0.5);
  gx = gx - tx;
  vec2 g00 = vec2(gx.x,gy.x);
  vec2 g10 = vec2(gx.y,gy.y);
  vec2 g01 = vec2(gx.z,gy.z);
  vec2 g11 = vec2(gx.w,gy.w);
  vec4 norm = 1.79284291400159 - 0.85373472095314 * 
    vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
  g00 *= norm.x;
  g01 *= norm.y;
  g10 *= norm.z;
  g11 *= norm.w;
  float n00 = dot(g00, vec2(fx.x, fy.x));
  float n10 = dot(g10, vec2(fx.y, fy.y));
  float n01 = dot(g01, vec2(fx.z, fy.z));
  float n11 = dot(g11, vec2(fx.w, fy.w));
  vec2 fade_xy = fade(Pf.xy);
  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
  float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
  return 2.3 * n_xy;
}

float random (vec2 st) {
    return fract(
        sin(
            dot(
                st.xy,
                vec2(12.9898,78.233)
            )
        )* 43758.5453123);
}
vec2 rotate (vec2 uv, float rotation, vec2 mid){
    return vec2(
        cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x,
        cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y
    );
}


uniform float uAnimation;
void main()
{
    // // pattern1
    // gl_FragColor = vec4( vUv, 1.0, 1.0);

    // // pattern2
    // gl_FragColor = vec4( vUv, 0.0, 1.0);
    
    // // pattern3
    // float value= vUv.x;

    // // pattern4
    // float value= vUv.y ;

    // // pattern5
    // float value= 1.0 - vUv.y ;

    // // pattern6
    // float value= vUv.y *10.0 ;

    // // pattern7
    // // float value = abs(sin(vUv.y * 34.0 )) ;
    // float value = mod(vUv.y * 10.0, 1.0) ;

    // // pattern8
    // // float value = abs(sin(vUv.y * 34.0 )) ;
    // float value = mod(vUv.y * 10.0, 1.0) ;
    // // value = value > 0.5 ? 0.0: 1.0;
    // value = step(0.5, value);

    // // pattern9
    // float value = mod(vUv.y * 10.0, 1.0) ;
    // value = step(0.8, value);

    // // pattern10
    // float value = mod(vUv.x * 10.0, 1.0) ;
    // value = step(0.8, value);


    // // pattern11
    // float value = mod(vUv.x * 10.0, 1.0) ;
    // float value1 = mod(vUv.y * 10.0, 1.0) ;
    // value = step(0.8, value);
    // value1 = step(0.8, value1);
    // value = value1 == 1.0? 1.0: value;

    // float value = step(0.8, mod(vUv.x * 10.0, 1.0));
    // value += step(0.8, mod(vUv.y * 10.0, 1.0));


    // // pattern12
    // float value = step(0.8, mod(vUv.x * 10.0, 1.0));
    // // value -= step(0.2, mod(vUv.y * 10.0, 1.0));
    // value *= step(0.8, mod(vUv.y * 10.0, 1.0));

    // // pattern13
    // float value = step(0.4, mod(vUv.x * 10.0, 1.0));
    // value *= step(0.8, mod(vUv.y * 10.0, 1.0));


    // // // pattern14
    // // // Solution 1 mine
    // // float xData = mod(vUv.x * 10.0, 1.0);
    // // float yData = mod(vUv.y * 10.0, 1.0);
    // // float value = step(0.8, xData);
    // // value += step(0.8, yData);
    // // value *= step(0.4, yData);
    // // value *= step(0.4, xData);

    // // //Solution 2 tutorial
    // float barX = step(0.4, mod(vUv.x * 10.0, 1.0));
    // barX *= step(0.8, mod(vUv.y * 10.0, 1.0));
    // float barY = step(0.4, mod(vUv.y * 10.0, 1.0));
    // barY *= step(0.8, mod(vUv.x * 10.0, 1.0));
    
    // float value = barX + barY;



    // // pattern15
    // Solution 1 mine
    // float barX =  step(0.5, mod(vUv.y * 10.0, 1.0));
    // barX *= 1.0 - step(0.85, mod(vUv.x * 10.0, 1.0));
    // barX *= step(0.65, mod(vUv.x * 10.0, 1.0));

    // float barY = step(0.5, mod(vUv.x * 10.0, 1.0));
    // barY *= step(0.65, mod(vUv.y * 10.0, 1.0));
    // barY *= 1.0 - step(0.85, mod(vUv.y * 10.0, 1.0));
    
    // float value = barX + barY;

    //  //Solution 2 tutorial
    // float barX = step(0.4, mod(vUv.x * 10.0 - 0.2, 1.0)) * step(0.8, mod(vUv.y * 10.0, 1.0));

    // float barY = step(0.4, mod(vUv.y * 10.0 - 0.2, 1.0)) *  step(0.8, mod(vUv.x * 10.0, 1.0));
    
    // float value = barX + barY;


    // // pattern16
    // //Solution mine
    // float value = abs(vUv.x -0.5) - 0.1;
    // value = value*value;

    // //  Solution 2 tutorial
    // float value = abs(vUv.x -0.5);


    // // pattern17
    // float value = min(abs(vUv.x - 0.5 ), abs(vUv.y - 0.5 ));

    // // pattern18
    // float value = max(abs(vUv.x - 0.5 ), abs(vUv.y - 0.5 ));

    // pattern19
    // //Solution mine
    // float value = step(0.0, vUv.y);
    // value *= 1.0 - step(0.3, vUv.y);
    // value += step(0.7, vUv.y);
    // value += 1.0 - step(0.3, vUv.x);
    // value += step(0.7, vUv.x);

    // // //  Solution 2 tutorial
    // float value = step(0.2, max(abs(vUv.x - 0.5 ), abs(vUv.y - 0.5 )));


    // pattern20
    // //Solution mine
    // float value = 1.0 - step(0.2, max(abs(vUv.x - 0.5 ), abs(vUv.y - 0.5 )));
    // value *= step(0.16, max(abs(vUv.x - 0.5 ), abs(vUv.y - 0.5 )));
   
    //  Solution 2 tutorial    
    // float value = step(0.2, max(abs(vUv.x - 0.5 ), abs(vUv.y - 0.5 )));
    // value *=  1.0 - step(0.25, max(abs(vUv.x - 0.5 ), abs(vUv.y - 0.5 )));


    // // pattern21
    // float value =  floor(vUv.x * 10.0) /10.0;

    // // pattern22
    // float value =  floor(vUv.x * 10.0) /10.0;
    //  value *=  floor(vUv.y * 10.0) /10.0;

    // // pattern23
    // float value = random(vUv);

    // // pattern24
    // vec2 gridUv = vec2(
    //     floor(vUv.x * 10.0)/10.0, 
    //     floor(vUv.y * 10.0)/10.0
    // );
    // float value = random(gridUv);


    // // pattern25
    // vec2 gridUv = vec2(
    //     floor(vUv.x * 10.0)/10.0, 
    //     floor((vUv.y+vUv.x *0.5) * 10.0 )/10.0
    // );
    // float value = random(gridUv);


    // // pattern26
    // float value = length(vUv.x);


    // pattern27
    // Solution mine
    // float value = abs(length(vUv - 0.5) *0.5);

    // //  Solution 2 tutorial 
    // // float value = distance(vUv ,vec2(0.5));


    // // pattern28
    // float value = 1.0 - distance(vUv ,vec2(0.5));

    // // pattern29
    // float value = 0.015 / distance(vUv ,vec2(0.5));


    // pattern30
    // float value = 0.015 / distance(vec2(vUv.x *0.2 + 0.4 ,vUv.y  *0.5 + 0.25 ),vec2(0.5));


    // // pattern31
    // vec2 lightUvX = vec2(vUv.x * 0.2 + 0.4 ,vUv.y);
    // vec2 lightUvY = vec2(vUv.y * 0.2 + 0.4 ,vUv.x);
    // float lightX = 0.015 / distance(lightUvX,vec2(0.5));
    // float lightY = 0.015 / distance(lightUvY,vec2(0.5));
    // float value = lightX * lightY;


    // // pattern32
    // vec2 rotatedUv = rotate(vUv, PI * 0.25,  vec2(0.5));
    // vec2 lightUvX = vec2(rotatedUv.x * 0.1 + 0.45 ,rotatedUv.y);
    // vec2 lightUvY = vec2(rotatedUv.y * 0.1 + 0.45 ,rotatedUv.x);
    // float lightX = 0.015 / distance(lightUvX,vec2(0.5));
    // float lightY = 0.015 / distance(lightUvY,vec2(0.5));
    // float value = lightX * lightY;


    // // pattern33
    // float value = step(0.25,distance(vUv, vec2(0.5))) ;


    // // pattern34
    // float value = abs(distance(vUv, vec2(0.5)) - 0.25) ;


    // // pattern35
    // //mine
    // float value = step(0.25, distance(vUv, vec2(0.5))) ;
    // value += 1.0 - step(0.23, distance(vUv, vec2(0.5))) ;

    // // tutorial
    // float value = step(0.01, abs(distance(vUv, vec2(0.5)) - 0.25)) ;



    // // pattern36
    // //mine
    // float value = step(0.25, distance(vUv, vec2(0.5))) ;
    // value += 1.0 - step(0.23, distance(vUv, vec2(0.5))) ;
    // value = 1.0 - value;

    // tutorial
    // float value = 1.0 - step(0.01, abs(distance(vUv, vec2(0.5)) - 0.25)) ;

    // // pattern37
    // vec2 wavedUv = vec2(
    //     vUv.x,
    //     vUv.y + sin(vUv.x * 30.0)* 0.1
    // );

    // float value = 1.0 - step(0.01, abs(distance(wavedUv, vec2(0.5)) - 0.25)) ;
    

    // // pattern38
    // vec2 wavedUv = vec2(
    //     vUv.x  + sin(vUv.y * 30.0)* 0.1,
    //     vUv.y + sin(vUv.x * 30.0)* 0.1
    // );

    // float value = 1.0 - step(0.01, abs(distance(wavedUv, vec2(0.5)) - 0.25)) ;
    
    // // pattern39
    // vec2 wavedUv = vec2(
    //     vUv.x  + sin(vUv.y * 100.0)* 0.1,
    //     vUv.y + sin(vUv.x * 100.0)* 0.1
    // );

    // float value = 1.0 - step(0.01, abs(distance(wavedUv, vec2(0.5)) - 0.25)) ;


    // // pattern40
    // // float value = vUv.x/vUv.y;

    // float angle = atan(vUv.x, vUv.y);
    // float value = angle;


    // // pattern41
    // float angle = atan(vUv.x - 0.5, vUv.y - 0.5);
    // float value = angle;


    // // pattern42
    // float angle = atan(vUv.x - 0.5, vUv.y - 0.5);
    // angle /= 2.0 * PI;
    // angle += 0.5;
    // float value = angle;


    // // pattern43
    // float angle = atan(vUv.x - 0.5, vUv.y - 0.5);
    // angle /= 2.0 * PI;
    // angle += 0.5;
    // angle *= (20.0);
    // angle = mod(angle, 1.0);
    // float value = angle;

    // // pattern44
    // float angle = atan(vUv.x - 0.5, vUv.y - 0.5);
    // angle /= 2.0 * PI;
    // angle += 0.5;
    // angle = sin(100.0 * angle);
    // float value = angle;


    // // pattern45
    // float angle = atan(vUv.x - 0.5, vUv.y - 0.5);
    // angle /= 2.0 * PI;
    // angle += 0.5;
    // float sinusoid = sin(100.0 * angle);
    // float radius = 0.25 + sinusoid *0.02;
    // float value = 1.0 - step(0.01, abs(distance(vUv, vec2(0.5)) - radius)) ;
    

    // // pattern46
    // float value = cnoise(vUv * 10.0);

    // // pattern47
    // float value =step(0.0, cnoise(vUv * tan(uAnimation) * 100.0));


    // // pattern48
    // float value = 1.0 - abs(cnoise(vUv * uAnimation));


    // // pattern49
    // float value = sin(cnoise(vUv * 10.0) * uAnimation);

    // pattern50
    // float value = step(0.9, sin(cnoise(vUv * 10.0) * uAnimation));

    vec3 blackColor = vec3(0.0);
    vec3 uvColor = vec3(vUv,1.0);
    vec3 mixedColor = mix(blackColor,uvColor, value);
    gl_FragColor = vec4(mixedColor, 1.0);
    // gl_FragColor = vec4(vec3(value), 1.0);
}