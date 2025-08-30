uniform vec2 u_resolution;
uniform float u_time;
uniform float u_color;

void main() {
    vec2 uv = gl_FragCoord.xy/u_resolution.xy;
    
    float wave1 = abs(sin(uv.x * 1. + u_time));
    float wave2 = abs(sin(uv.x * 1. + u_time + u_color));
    float wave3 = abs(sin(uv.x * 1. + u_time + pow(u_color, 2.)));

    vec3 c = vec3(wave1,wave2,wave3);

    gl_FragColor = vec4(c, 1.0);
}