varying vec2 vUv;
uniform vec3 color;
uniform float time;
uniform float speed;
uniform float brightness;
uniform float noise_amplitude;
uniform float noise_speed;
uniform float noise_scale;
uniform vec3 noise_color;

vec3 permute(vec3 x) {
    return mod(((x * 34.0) + 1.0) * x, 289.0);
}

vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {
    vec4 a = min(x, 1.0), b = min(y, 1.0);
    vec4 z = mix(2.0 * a * b, 1.0 - 2.0 * (1.0 - a) * (1.0 - b), step(0.5, y));
    return mix(x, z, opacity);
}

// Perlin noise. For more information, see: https://mrl.nyu.edu/~perlin/noise/
float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m;
    m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
}

void main() {
    float noiseScale = 1.0 * (noise_scale + 0.5 * sin(time * noise_speed));
    vec2 noisePos = vUv * noiseScale;
    float n = (snoise(noisePos + time * 0.1 * speed)) * noise_amplitude;
    csm_Emissive = mix(vec3(color), noise_color, n) * brightness;
}
