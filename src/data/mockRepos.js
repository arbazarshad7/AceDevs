/**
 * AceDevs Curated Fallback Repositories Dataset
 * High-fidelity project records for offline and rate-limited states.
 */

export const LANGUAGE_COLORS = {
  'Go': '#00ADD8',
  'TypeScript': '#3178C6',
  'JavaScript': '#F7DF1E',
  'GLSL': '#56B6C2',
  'Python': '#3572A5',
  'Rust': '#DEA584',
  'CSS': '#563D7C',
  'HTML': '#E34C26'
};

export const MOCK_REPOSITORIES = [
  // 1. Arbaz Arshad (DEV-01) Projects
  {
    id: 101,
    name: 'pulsar-mq',
    fullName: 'arbazarshad/pulsar-mq',
    description: 'High-throughput distributed message broker written in Go with Raft consensus, zero-copy serialization, and persistent disk commit logs.',
    htmlUrl: 'https://github.com/arbazarshad/pulsar-mq',
    homepage: 'https://pulsar-mq.dev',
    stars: 342,
    forks: 48,
    language: 'Go',
    topics: ['distributed-systems', 'raft', 'message-queue', 'go', 'high-throughput'],
    updatedAt: '2026-10-12T14:22:00Z',
    archived: false,
    owner: {
      id: 'arbaz',
      code: 'DEV-01',
      name: 'Arbaz Arshad',
      sector: 'BACKEND & CLOUD'
    }
  },
  {
    id: 102,
    name: 'trie-search-engine',
    fullName: 'arbazarshad/trie-search-engine',
    description: 'Sub-millisecond in-memory Trie data structure and Inverted Index query engine with boolean tag filtering and zero external dependencies.',
    htmlUrl: 'https://github.com/arbazarshad/trie-search-engine',
    homepage: null,
    stars: 185,
    forks: 29,
    language: 'TypeScript',
    topics: ['algorithms', 'trie', 'inverted-index', 'search-engine', 'data-structures'],
    updatedAt: '2026-10-10T09:15:00Z',
    archived: false,
    owner: {
      id: 'arbaz',
      code: 'DEV-01',
      name: 'Arbaz Arshad',
      sector: 'BACKEND & CLOUD'
    }
  },
  {
    id: 103,
    name: 'supabase-rls-guard',
    fullName: 'arbazarshad/supabase-rls-guard',
    description: 'CLI toolkit and automated test harness for PostgreSQL Row-Level Security (RLS) policies on Supabase applications.',
    htmlUrl: 'https://github.com/arbazarshad/supabase-rls-guard',
    homepage: null,
    stars: 128,
    forks: 16,
    language: 'TypeScript',
    topics: ['supabase', 'postgresql', 'row-level-security', 'database', 'auth'],
    updatedAt: '2026-10-06T18:40:00Z',
    archived: false,
    owner: {
      id: 'arbaz',
      code: 'DEV-01',
      name: 'Arbaz Arshad',
      sector: 'BACKEND & CLOUD'
    }
  },
  {
    id: 104,
    name: 'quantum-api-gateway',
    fullName: 'arbazarshad/quantum-api-gateway',
    description: 'Ultra-low latency asynchronous API gateway with token-bucket rate limiting, Redis cache replication, and JWT verification.',
    htmlUrl: 'https://github.com/arbazarshad/quantum-api-gateway',
    homepage: null,
    stars: 94,
    forks: 12,
    language: 'Go',
    topics: ['api-gateway', 'reverse-proxy', 'redis', 'rate-limiting', 'microservices'],
    updatedAt: '2026-09-28T11:05:00Z',
    archived: false,
    owner: {
      id: 'arbaz',
      code: 'DEV-01',
      name: 'Arbaz Arshad',
      sector: 'BACKEND & CLOUD'
    }
  },
  {
    id: 105,
    name: 'distributed-task-mesh',
    fullName: 'arbazarshad/distributed-task-mesh',
    description: 'Fault-tolerant background job orchestrator with leader election, heartbeat telemetry monitoring, and exponential backoff.',
    htmlUrl: 'https://github.com/arbazarshad/distributed-task-mesh',
    homepage: null,
    stars: 76,
    forks: 8,
    language: 'Go',
    topics: ['job-orchestration', 'workers', 'distributed-systems', 'concurrency'],
    updatedAt: '2026-09-15T16:50:00Z',
    archived: false,
    owner: {
      id: 'arbaz',
      code: 'DEV-01',
      name: 'Arbaz Arshad',
      sector: 'BACKEND & CLOUD'
    }
  },

  // 2. Devesh Das (DEV-02) Projects
  {
    id: 201,
    name: 'cybernetic-digital-twin',
    fullName: 'deveshdas/cybernetic-digital-twin',
    description: 'Procedural 3D WebGL metropolitan digital twin with Three.js custom shaders, real-time light beacons, and interactive camera waypoints.',
    htmlUrl: 'https://github.com/deveshdas/cybernetic-digital-twin',
    homepage: 'https://deveshdas.dev/digital-twin',
    stars: 412,
    forks: 62,
    language: 'JavaScript',
    topics: ['threejs', 'webgl', 'glsl', 'digital-twin', 'creative-coding'],
    updatedAt: '2026-10-13T20:10:00Z',
    archived: false,
    owner: {
      id: 'devesh',
      code: 'DEV-02',
      name: 'Devesh Das',
      sector: 'GRAPHICS & INTERACTION'
    }
  },
  {
    id: 202,
    name: 'glsl-pulse-shaders',
    fullName: 'deveshdas/glsl-pulse-shaders',
    description: 'Curated collection of high-performance GLSL fragment and vertex shaders for sci-fi HUDs, energy pulse splines, and particle holograms.',
    htmlUrl: 'https://github.com/deveshdas/glsl-pulse-shaders',
    homepage: null,
    stars: 289,
    forks: 41,
    language: 'GLSL',
    topics: ['glsl', 'shaders', 'webgl', 'threejs', 'visual-effects'],
    updatedAt: '2026-10-11T16:30:00Z',
    archived: false,
    owner: {
      id: 'devesh',
      code: 'DEV-02',
      name: 'Devesh Das',
      sector: 'GRAPHICS & INTERACTION'
    }
  },
  {
    id: 203,
    name: 'tactical-hud-primitives',
    fullName: 'deveshdas/tactical-hud-primitives',
    description: 'Modern React component library for tactical digital twin interfaces featuring 45° chamfered geometry, hairline SVG borders, and scanline shaders.',
    htmlUrl: 'https://github.com/deveshdas/tactical-hud-primitives',
    homepage: null,
    stars: 164,
    forks: 23,
    language: 'TypeScript',
    topics: ['design-system', 'react', 'hud', 'glassmorphism', 'chamfer'],
    updatedAt: '2026-10-08T12:00:00Z',
    archived: false,
    owner: {
      id: 'devesh',
      code: 'DEV-02',
      name: 'Devesh Das',
      sector: 'GRAPHICS & INTERACTION'
    }
  },
  {
    id: 204,
    name: 'audio-spectral-visualizer',
    fullName: 'deveshdas/audio-spectral-visualizer',
    description: 'Web Audio API real-time FFT frequency spectrum visualizer rendering multi-channel oscilloscopes on WebGL canvas at 60 FPS.',
    htmlUrl: 'https://github.com/deveshdas/audio-spectral-visualizer',
    homepage: 'https://deveshdas.dev/audio',
    stars: 118,
    forks: 19,
    language: 'JavaScript',
    topics: ['web-audio-api', 'fft', 'audio-visualizer', 'canvas', 'dsp'],
    updatedAt: '2026-09-30T15:20:00Z',
    archived: false,
    owner: {
      id: 'devesh',
      code: 'DEV-02',
      name: 'Devesh Das',
      sector: 'GRAPHICS & INTERACTION'
    }
  },
  {
    id: 205,
    name: 'spatial-orbit-controls',
    fullName: 'deveshdas/spatial-orbit-controls',
    description: 'Smooth inertia camera navigation controller for Three.js with azimuthal degree telemetry tracking and touch gesture normalization.',
    htmlUrl: 'https://github.com/deveshdas/spatial-orbit-controls',
    homepage: null,
    stars: 87,
    forks: 11,
    language: 'TypeScript',
    topics: ['threejs', 'camera-controls', 'orbit', 'telemetry', 'math'],
    updatedAt: '2026-09-22T19:40:00Z',
    archived: false,
    owner: {
      id: 'devesh',
      code: 'DEV-02',
      name: 'Devesh Das',
      sector: 'GRAPHICS & INTERACTION'
    }
  },

  // 3. Collaborative AceDevs Showcase Projects
  {
    id: 301,
    name: 'acedevs-collective-portfolio',
    fullName: 'acedevs/acedevs-collective-portfolio',
    description: 'Team developer showcase combining Three.js WebGL hero digital twin, automated GitHub repository aggregation, Trie search, and authenticated Markdown blog.',
    htmlUrl: 'https://github.com/acedevs/acedevs-collective-portfolio',
    homepage: 'https://acedevs.dev',
    stars: 520,
    forks: 74,
    language: 'TypeScript',
    topics: ['team-portfolio', 'vite', 'react', 'threejs', 'supabase', 'trie'],
    updatedAt: '2026-10-14T00:00:00Z',
    archived: false,
    owner: {
      id: 'collective',
      code: 'ACEDEVS',
      name: 'AceDevs Collective',
      sector: 'FULL-STACK & GRAPHICS'
    }
  }
];
