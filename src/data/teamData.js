/**
 * AceDevs Collective Team Data Layer
 * Authoritative profiles and cross-portfolio routing for Co-Founders
 */

export const TEAM_MEMBERS = [
  {
    id: 'arbaz',
    code: 'DEV-01',
    name: 'Arbaz Arshad',
    designation: 'Co-Founder // Full-Stack Architect & Distributed Systems',
    shortDesignation: 'Full-Stack Architect',
    role: 'Distributed Systems & Cloud Architecture',
    sector: 'BACKEND & CLOUD',
    coordinates: '19.0760° N, 72.8777° E',
    avatar: '/avatars/arbaz.png',
    status: 'ONLINE // ACTIVE',
    bio: 'Specializing in high-throughput distributed backends, algorithmic optimization, microservice orchestration, and resilient cloud infrastructure. Spearheads AceDevs core architectural engineering, algorithmic search pipelines, and Supabase database engines.',
    specialties: [
      { name: 'Distributed Systems', level: 'CORE' },
      { name: 'Node.js & Go', level: 'EXPERT' },
      { name: 'PostgreSQL & Supabase', level: 'CORE' },
      { name: 'System Design', level: 'ARCHITECT' },
      { name: 'Docker & Kubernetes', level: 'ADVANCED' },
      { name: 'REST & GraphQL APIs', level: 'EXPERT' }
    ],
    links: {
      portfolio: 'https://arbazarshad.dev',
      github: 'https://github.com/arbazarshad',
      linkedin: 'https://linkedin.com/in/arbazarshad',
      email: 'mailto:arbaz@acedevs.dev'
    },
    metrics: {
      repositories: '24+',
      contributions: '1,200+',
      uptime: '99.98%',
      architecture: 'DISTRIBUTED'
    }
  },
  {
    id: 'devesh',
    code: 'DEV-02',
    name: 'Devesh Das',
    designation: 'Co-Founder // Creative Technologist & Systems Architect',
    shortDesignation: 'Creative Technologist',
    role: 'Creative WebGL & Frontend Architecture',
    sector: 'GRAPHICS & INTERACTION',
    coordinates: '19.0760° N, 72.8777° E',
    avatar: '/avatars/devesh.png',
    status: 'ONLINE // ACTIVE',
    bio: 'Passionate about creative WebGL development, interactive digital twins, custom GLSL shader programming, and modern reactive client architectures. Champions AceDevs visual computing, procedural 3D aesthetics, and high-performance UI systems.',
    specialties: [
      { name: 'Three.js & WebGL', level: 'CORE' },
      { name: 'React & TypeScript', level: 'EXPERT' },
      { name: 'Creative Coding & GLSL', level: 'CORE' },
      { name: 'Next.js & Vite', level: 'ADVANCED' },
      { name: 'UI/UX Design Systems', level: 'ARCHITECT' },
      { name: 'Performance Tuning', level: 'EXPERT' }
    ],
    links: {
      portfolio: 'https://deveshdas.dev',
      github: 'https://github.com/deveshdas',
      linkedin: 'https://linkedin.com/in/deveshdas',
      email: 'mailto:devesh@acedevs.dev'
    },
    metrics: {
      repositories: '20+',
      contributions: '980+',
      uptime: '60 FPS',
      architecture: 'REACTIVE WEBGL'
    }
  }
];

export function getTeamMember(idOrCode) {
  if (!idOrCode) return null;
  const query = idOrCode.toLowerCase();
  return TEAM_MEMBERS.find(
    (m) => m.id.toLowerCase() === query || m.code.toLowerCase() === query
  ) || null;
}

export function getTeamStats() {
  return {
    totalFounders: TEAM_MEMBERS.length,
    combinedRepos: '44+',
    totalContributions: '2,180+',
    primaryLocation: 'Mumbai, IN // Global Remote',
    synergyScore: '100% UNIFIED'
  };
}
