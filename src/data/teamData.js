/**
 * AceDevs Collective Team Data Layer
 * Authoritative profiles and cross-portfolio routing for Co-Founders
 */

export const TEAM_MEMBERS = [
  {
    id: 'arbaz',
    code: 'DEV-01',
    name: 'Arbaz Arshad',
    designation: 'Co-Founder // Game Developer & Creative Technologist',
    shortDesignation: 'Game Developer & Creative Technologist',
    role: 'Game Design, Multiplayer Systems & AI / XR',
    sector: 'GAME SYSTEMS & AI',
    tagline: 'CODE · CREATE · CONQUER',
    coordinates: '20.2961° N, 85.8245° E',
    avatar: 'https://github.com/arbazarshad7.png',
    status: 'ONLINE // ACTIVE',
    bio: 'Game developer and creative systems engineer building multiplayer games, autonomous AI agents, XR experiences, and computer-vision robotics with Unity, Unreal, C#, and Python. Cares deeply about game mechanics, UX, clean architecture, and state machines where interactive software truly lives.',
    specialties: [
      { name: 'Unity & Unreal Engine', level: 'CORE' },
      { name: 'C# & Game Design', level: 'EXPERT' },
      { name: 'AI & Computer Vision', level: 'EXPERT' },
      { name: 'Multiplayer & Networking', level: 'ADVANCED' },
      { name: 'WebGL & Full-Stack', level: 'CORE' },
      { name: 'XR & Spatial Computing', level: 'ADVANCED' }
    ],
    links: {
      portfolio: 'https://arbazarshad.vercel.app/',
      github: 'https://github.com/arbazarshad7',
      linkedin: 'https://www.linkedin.com/in/arbaz-arshad-x7',
      email: 'mailto:arbazarshad7@gmail.com'
    },
    metrics: {
      repositories: '11+',
      contributions: 'Game Dev & AI',
      uptime: '60 FPS / REALTIME',
      architecture: 'GAME ENGINE & FSM'
    }
  },
  {
    id: 'devesh',
    code: 'DEV-02',
    name: 'Devesh Das',
    designation: 'Co-Founder // Game Developer & Computer Science Engineer',
    shortDesignation: 'Game Developer & CS Engineer',
    role: 'Game Mechanics, Physics Engines & Interactive Systems',
    sector: 'GAME SYSTEMS & PHYSICS',
    tagline: 'Architecting Immersive Game Worlds & Interactive Systems',
    coordinates: '20.2961° N, 85.8245° E',
    avatar: 'https://github.com/ninja27dev.png',
    status: 'ONLINE // ACTIVE',
    bio: 'Computer Science & Engineering developer at Centurion University, Bhubaneswar specializing in Unity 3D, Blender asset creation, vehicle physics, and responsive game mechanics. Creator of White Ninja (3D action/stealth) and Pasha Palli (native Indian board game PWA), with strong foundations in C++, C#, Python, and React.',
    specialties: [
      { name: 'Unity 3D & C# Scripting', level: 'CORE' },
      { name: 'Blender 3D & Modeling', level: 'EXPERT' },
      { name: 'Physics & Wheel Colliders', level: 'CORE' },
      { name: 'C++, Python & Java', level: 'EXPERT' },
      { name: 'Game AI & State Machines', level: 'ADVANCED' },
      { name: 'React 18 & Frontend', level: 'SKILLFUL' }
    ],
    links: {
      portfolio: 'https://mrdeveshdas.vercel.app/',
      github: 'https://github.com/ninja27dev',
      linkedin: 'https://www.linkedin.com/in/devesh-das-9100ab266',
      email: 'mailto:deveshkumardas08@gmail.com'
    },
    metrics: {
      repositories: '6+',
      contributions: '3D Action & PWAs',
      uptime: '60 FPS / RIGIDBODY',
      architecture: 'PHYSICS & FSM'
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
    combinedRepos: '17+',
    totalContributions: 'Games & Systems',
    primaryLocation: 'Bhubaneswar, IN // Global Remote',
    synergyScore: '100% UNIFIED'
  };
}
