import React, { useEffect, useRef } from 'react';

interface CosmicShaderProps {
  className?: string;
  opacity?: number;
}

export const CosmicShader: React.FC<CosmicShaderProps> = ({
  className = 'fixed inset-0 w-full h-full pointer-events-none',
  opacity = 0.85,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animFrameId: number;

    function syncSize() {
      if (!canvas) return;
      const w = canvas.clientWidth || window.innerWidth || 1280;
      const h = canvas.clientHeight || window.innerHeight || 720;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    }

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => syncSize());
      resizeObserver.observe(canvas);
    }
    syncSize();

    const gl =
      canvas.getContext('webgl') ||
      (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null);
    if (!gl) return;
    const glCtx = gl;

    const vs = `attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

    const fs = `precision highp float;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
varying vec2 v_texCoord;

// Simplex/hash noise utilities
float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(1.0, 0.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
    for (int i = 0; i < 5; ++i) {
        v += a * noise(p);
        p = rot * p * 2.0 + shift;
        a *= 0.5;
    }
    return v;
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);
    vec2 mouseNorm = (u_mouse / u_resolution) - 0.5;
    
    // Slow deep space rotation & drift
    float t = u_time * 0.08;
    vec2 p = uv * 1.8 + vec2(t * 0.2, t * 0.15) + mouseNorm * 0.15;
    
    // Cosmic dust nebula cloud
    float q = fbm(p + vec2(t * 0.1, -t * 0.05));
    float r = fbm(p + q * 1.5 + vec2(-t * 0.08, t * 0.1));
    float nebula = fbm(p + r * 2.0);
    
    // Deep cosmic space base
    vec3 spaceDark = vec3(0.02, 0.035, 0.07);
    vec3 nebulaCyan = vec3(0.0, 0.55, 0.85) * 0.65;
    vec3 nebulaViolet = vec3(0.25, 0.1, 0.5) * 0.5;
    vec3 nebulaIndigo = vec3(0.05, 0.15, 0.4);
    
    vec3 col = mix(spaceDark, nebulaIndigo, clamp(nebula * 1.2, 0.0, 1.0));
    col = mix(col, nebulaCyan, clamp(pow(r, 2.5) * 1.1, 0.0, 1.0));
    col = mix(col, nebulaViolet, clamp(pow(q, 3.0) * 0.9, 0.0, 1.0));
    
    // Distant twinkle stars
    vec2 starUv = uv * 45.0;
    vec2 starGrid = floor(starUv);
    vec2 starFract = fract(starUv) - 0.5;
    float starRand = hash(starGrid);
    if (starRand > 0.92) {
        float twinkle = sin(u_time * 3.0 + starRand * 40.0) * 0.5 + 0.5;
        float d = length(starFract);
        float star = smoothstep(0.08 * starRand, 0.01, d) * twinkle;
        col += vec3(0.85, 0.95, 1.0) * star * (0.8 + starRand * 1.5);
    }
    
    // Micro grid HUD telemetry scanline
    float grid = (sin(uv.x * 120.0) * 0.5 + 0.5) * (sin(uv.y * 120.0) * 0.5 + 0.5);
    col += vec3(0.0, 0.4, 0.8) * pow(grid, 12.0) * 0.04;
    
    // Subtle radial vignette
    float vignette = 1.0 - length(uv) * 0.65;
    col *= clamp(vignette, 0.2, 1.0);

    gl_FragColor = vec4(col, 1.0);
}`;

    function compileShader(type: number, src: string) {
      const s = glCtx.createShader(type);
      if (!s) return null;
      glCtx.shaderSource(s, src);
      glCtx.compileShader(s);
      if (!glCtx.getShaderParameter(s, glCtx.COMPILE_STATUS)) {
        console.error('Shader compile error:', glCtx.getShaderInfoLog(s));
        glCtx.deleteShader(s);
        return null;
      }
      return s;
    }

    const vertexShader = compileShader(gl.VERTEX_SHADER, vs);
    const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fs);
    if (!vertexShader || !fragmentShader) return;

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vertexShader);
    gl.attachShader(prog, fragmentShader);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(prog));
      return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    const pos = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uRes = gl.getUniformLocation(prog, 'u_resolution');
    const uMouse = gl.getUniformLocation(prog, 'u_mouse');

    let mouse = { x: canvas.width / 2, y: canvas.height / 2 };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width && rect.height) {
        const nx = (event.clientX - rect.left) / rect.width;
        const ny = 1.0 - (event.clientY - rect.top) / rect.height;
        mouse.x = nx * canvas.width;
        mouse.y = ny * canvas.height;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    function render(t: number) {
      if (!gl || !canvas) return;
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (uTime) gl.uniform1f(uTime, t * 0.001);
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
      if (uMouse) gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animFrameId = requestAnimationFrame(render);
    }

    animFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (resizeObserver) resizeObserver.disconnect();
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  return (
    <div
      className={className}
      style={{ opacity, display: 'block', zIndex: 0 }}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ display: 'block', width: '100%', height: '100%' }}
      />
    </div>
  );
};
