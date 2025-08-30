uniform vec2 u_resolution;
uniform float u_time;
uniform float u_color;

vec3 hsv2rgb(vec3 c) {
    vec3 rgb = clamp( abs(mod(c.x * 6.0 + vec3(0,4,2),
                               6.0) - 3.0) - 1.0,
                      0.0,
                      1.0 );
    return c.z * mix( vec3(1.0), rgb, c.y );
}

void main() {
    vec2 uv = gl_FragCoord.xy/u_resolution.xy;
    
    float normalized = (u_color - 10.) / (10. - 1000.);


    float star_mask = abs(sin(u_time+gl_FragCoord.x)) + abs(sin(u_time+gl_FragCoord.y));

    vec3 c = hsv2rgb(vec3(normalized, 1.0, 1.0))*star_mask;

    gl_FragColor = vec4(c *star_mask, 1.0);
}


