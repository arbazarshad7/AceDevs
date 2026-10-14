import * as THREE from 'three';

/**
 * PulseLineShader: GLSL Shader for animated data pulses flowing along vector connections.
 * Simulates high-tech telemetry packet transfers between cybernetic nodes.
 */
export const PulseLineShader = {
  uniforms: {
    uTime: { value: 0 },
    uColor1: { value: new THREE.Color(0xd5e0ff) }, // Ice cyan
    uColor2: { value: new THREE.Color(0x2155cd) }, // Deep sapphire blue
    uPulseSpeed: { value: 1.2 },
    uPulseFrequency: { value: 2.0 },
    uOpacity: { value: 0.85 }
  },
  vertexShader: `
    attribute float aProgress;
    attribute float aOffset;
    varying float vProgress;
    varying float vOffset;

    void main() {
      vProgress = aProgress;
      vOffset = aOffset;
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform float uPulseSpeed;
    uniform float uPulseFrequency;
    uniform float uOpacity;
    varying float vProgress;
    varying float vOffset;

    void main() {
      // Flowing energy packet pulse calculation with safe periodic phase wrapping
      float rawPhase = vProgress * uPulseFrequency - uTime * uPulseSpeed + vOffset;
      float phase = fract(rawPhase);
      if (phase < 0.0) phase += 1.0;
      
      // Intense, high-energy pulse head with exponential trailing falloff
      float pulse = pow(smoothstep(0.0, 1.0, phase), 6.0);
      
      // Baseline carrier line luminescence
      float carrier = 0.18 + 0.08 * sin(vProgress * 3.14159);
      
      // Color interpolation: blue carrier lines with glowing white-cyan packets
      vec3 color = mix(uColor2, uColor1, clamp(pulse * 1.5, 0.0, 1.0));
      
      // Additional bloom intensity on pulses
      float totalIntensity = carrier + pulse * 2.2;
      float alpha = clamp(carrier * 0.5 + pulse * 0.95, 0.0, 1.0) * uOpacity;
      
      gl_FragColor = vec4(color * totalIntensity, alpha);
    }
  `
};

/**
 * ParticleShader: Point cloud shader with soft Gaussian radial edge and glowing hot core.
 */
export const ParticleShader = {
  uniforms: {
    uTime: { value: 0 },
    uColor1: { value: new THREE.Color(0xd5e0ff) }, // Cyan glow
    uColor2: { value: new THREE.Color(0x3877ff) }, // Blue
    uPixelRatio: { value: 2.0 }
  },
  vertexShader: `
    attribute float aScale;
    attribute float aPhase;
    uniform float uTime;
    uniform float uPixelRatio;
    varying float vPhase;

    void main() {
      vPhase = aPhase;
      
      // Harmonic 3D drift
      vec3 pos = position;
      pos.y += sin(uTime * 0.6 + aPhase * 6.28318) * 0.4;
      pos.x += cos(uTime * 0.4 + aPhase * 6.28318) * 0.3;
      pos.z += sin(uTime * 0.5 + aPhase * 3.14159) * 0.3;

      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      gl_Position = projectionMatrix * mvPosition;
      
      // Safely clamped attenuated point size preventing division by zero or negative radii
      float pZ = max(-mvPosition.z, 0.1);
      gl_PointSize = clamp((aScale * 38.0 * uPixelRatio) / pZ, 1.0, 72.0);
    }
  `,
  fragmentShader: `
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform float uTime;
    varying float vPhase;

    void main() {
      // Circular Gaussian point distribution
      vec2 coord = gl_PointCoord - vec2(0.5);
      float dist = length(coord);
      if (dist > 0.5) discard;
      
      // Soft antialiased outer halo
      float halo = smoothstep(0.5, 0.05, dist);
      // Bright inner core
      float core = smoothstep(0.18, 0.0, dist);
      
      // Color gradient pulsing over time bounded to [0.0, 1.0]
      float mixFactor = clamp(0.4 + 0.6 * sin(uTime * 1.2 + vPhase * 6.28), 0.0, 1.0);
      vec3 color = mix(uColor2, uColor1, mixFactor);
      color += vec3(core * 0.85); // Core brilliance
      
      gl_FragColor = vec4(color, halo * 0.88);
    }
  `
};

/**
 * Factory to create a compiled Three.js ShaderMaterial for pulse lines
 */
export function createPulseLineMaterial(options = {}) {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColor1: { value: new THREE.Color(options.color1 || 0xd5e0ff) },
      uColor2: { value: new THREE.Color(options.color2 || 0x2155cd) },
      uPulseSpeed: { value: options.pulseSpeed || 1.3 },
      uPulseFrequency: { value: options.pulseFrequency || 2.0 },
      uOpacity: { value: options.opacity || 0.85 }
    },
    vertexShader: PulseLineShader.vertexShader,
    fragmentShader: PulseLineShader.fragmentShader,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
}

/**
 * Factory to create a compiled Three.js ShaderMaterial for reactive particles
 */
export function createParticleMaterial(options = {}) {
  const pixelRatio = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1;
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColor1: { value: new THREE.Color(options.color1 || 0xd5e0ff) },
      uColor2: { value: new THREE.Color(options.color2 || 0x3877ff) },
      uPixelRatio: { value: pixelRatio }
    },
    vertexShader: ParticleShader.vertexShader,
    fragmentShader: ParticleShader.fragmentShader,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
}
