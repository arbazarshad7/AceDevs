/**
 * AceDevs Curated Fallback Repositories Dataset
 * High-fidelity project records for offline and rate-limited states.
 */

export const LANGUAGE_COLORS = {
  'C#': '#178600',
  'C++': '#f34b7d',
  'Python': '#3572A5',
  'JavaScript': '#F7DF1E',
  'TypeScript': '#3178C6',
  'Java': '#b07219',
  'ShaderLab': '#222c37',
  'Jupyter Notebook': '#DA5B0B',
  'Solidity': '#AA6746',
  'HTML': '#E34C26',
  'CSS': '#563D7C',
  'GLSL': '#56B6C2'
};

export const MOCK_REPOSITORIES = [
  // 1. Arbaz Arshad (DEV-01) Projects
  {
    id: 101,
    name: 'Blackjacker',
    fullName: 'arbazarshad7/Blackjacker',
    description: 'Classic casino card game built from the ground up in Unity. Features card dealing physics, dealer AI state machines, and clean UI.',
    htmlUrl: 'https://github.com/arbazarshad7/Blackjacker',
    homepage: 'https://arbazarshad.vercel.app/',
    stars: 14,
    forks: 3,
    language: 'C#',
    topics: ['unity', 'csharp', 'game-dev', 'blackjack', 'card-game', 'ai'],
    updatedAt: '2026-10-12T14:22:00Z',
    archived: false,
    owner: {
      id: 'arbaz',
      code: 'DEV-01',
      name: 'Arbaz Arshad',
      sector: 'GAME SYSTEMS & AI'
    }
  },
  {
    id: 102,
    name: 'AceNotes',
    fullName: 'arbazarshad7/AceNotes',
    description: 'User-centric note-sharing web app designed for collaborative learning. Features streamlined note organization, modern UI/UX, and rapid cloud sync.',
    htmlUrl: 'https://github.com/arbazarshad7/AceNotes',
    homepage: 'https://arbazarshad.vercel.app/',
    stars: 18,
    forks: 4,
    language: 'JavaScript',
    topics: ['full-stack', 'react', 'collaboration', 'notes', 'cloud'],
    updatedAt: '2026-10-10T09:15:00Z',
    archived: false,
    owner: {
      id: 'arbaz',
      code: 'DEV-01',
      name: 'Arbaz Arshad',
      sector: 'GAME SYSTEMS & AI'
    }
  },
  {
    id: 103,
    name: 'Cobra-Card-Game',
    fullName: 'arbazarshad7/Cobra-Card-Game',
    description: 'Multiplayer card game with complex turn management, per-phase state machines, DOTween procedural animations, and score calculation.',
    htmlUrl: 'https://github.com/arbazarshad7',
    homepage: 'https://arbazarshad.vercel.app/#projects',
    stars: 26,
    forks: 6,
    language: 'C#',
    topics: ['unity', 'csharp', 'multiplayer', 'state-machine', 'dotween'],
    updatedAt: '2026-10-06T18:40:00Z',
    archived: false,
    owner: {
      id: 'arbaz',
      code: 'DEV-01',
      name: 'Arbaz Arshad',
      sector: 'GAME SYSTEMS & AI'
    }
  },
  {
    id: 104,
    name: 'Online-Chess-Game',
    fullName: 'arbazarshad7/Online-Chess-Game',
    description: 'Casual game featuring multiplayer matchmaking, player statistics database, token and skin integration, and AI-driven enemy behaviour.',
    htmlUrl: 'https://github.com/arbazarshad7',
    homepage: 'https://arbazarshad.vercel.app/#projects',
    stars: 31,
    forks: 8,
    language: 'C#',
    topics: ['unity', 'chess', 'multiplayer', 'ai', 'game-design'],
    updatedAt: '2026-09-28T11:05:00Z',
    archived: false,
    owner: {
      id: 'arbaz',
      code: 'DEV-01',
      name: 'Arbaz Arshad',
      sector: 'GAME SYSTEMS & AI'
    }
  },
  {
    id: 105,
    name: 'AI-Crop-Recommendation',
    fullName: 'arbazarshad7/AI-Crop-Recommendation',
    description: 'Machine learning application using a Random Forest classifier to recommend optimal crops based on soil nutrients, GPS, and live weather telemetry.',
    htmlUrl: 'https://github.com/arbazarshad7',
    homepage: 'https://arbazarshad.vercel.app/#projects',
    stars: 22,
    forks: 5,
    language: 'Python',
    topics: ['machine-learning', 'python', 'random-forest', 'scikit-learn', 'apis'],
    updatedAt: '2026-09-15T16:50:00Z',
    archived: false,
    owner: {
      id: 'arbaz',
      code: 'DEV-01',
      name: 'Arbaz Arshad',
      sector: 'GAME SYSTEMS & AI'
    }
  },
  {
    id: 106,
    name: 'Vision-Robotic-Teleop',
    fullName: 'arbazarshad7/Vision-Robotic-Teleop',
    description: 'Computer-vision hand controller that translates sign-language gestures into real-time robotic teleoperation and movement commands.',
    htmlUrl: 'https://github.com/arbazarshad7',
    homepage: 'https://arbazarshad.vercel.app/#projects',
    stars: 35,
    forks: 7,
    language: 'Python',
    topics: ['computer-vision', 'opencv', 'robotics', 'python', 'gestures'],
    updatedAt: '2026-08-20T12:00:00Z',
    archived: false,
    owner: {
      id: 'arbaz',
      code: 'DEV-01',
      name: 'Arbaz Arshad',
      sector: 'GAME SYSTEMS & AI'
    }
  },

  // 2. Devesh Das (DEV-02) Projects
  {
    id: 201,
    name: 'WHITE-NINJA',
    fullName: 'ninja27dev/WHITE-NINJA',
    description: '3D stealth and action combat game featuring fluid ninja parkour locomotion, katana combos, sensory enemy perception AI, and stylized shaders.',
    htmlUrl: 'https://github.com/ninja27dev/WHITE-NINJA',
    homepage: 'https://mrdeveshdas.vercel.app/#projects',
    stars: 38,
    forks: 9,
    language: 'ShaderLab',
    topics: ['unity3d', 'csharp', 'stealth-game', 'combat-physics', 'enemy-ai', 'shaders'],
    updatedAt: '2026-10-13T20:10:00Z',
    archived: false,
    owner: {
      id: 'devesh',
      code: 'DEV-02',
      name: 'Devesh Das',
      sector: 'GAME SYSTEMS & PHYSICS'
    }
  },
  {
    id: 202,
    name: 'Pasha-Palli',
    fullName: 'ninja27dev/Pasha-Palli',
    description: 'Traditional Indian cross-race dice board game built as a Progressive Web App (PWA). Features 4-player token FSM, bot AI, Web Audio SFX, and offline play.',
    htmlUrl: 'https://github.com/ninja27dev/Pasha-Palli',
    homepage: 'https://pashapallibyninjadev.netlify.app/',
    stars: 27,
    forks: 5,
    language: 'JavaScript',
    topics: ['pwa', 'game-ai', 'offline-first', 'fsm', 'web-audio', 'javascript'],
    updatedAt: '2026-10-11T16:30:00Z',
    archived: false,
    owner: {
      id: 'devesh',
      code: 'DEV-02',
      name: 'Devesh Das',
      sector: 'GAME SYSTEMS & PHYSICS'
    }
  },
  {
    id: 203,
    name: 'Mini-Car-Simulation',
    fullName: 'ninja27dev/Mini-Car-Simulation',
    description: 'High-fidelity virtual driving environment built in Unity. Features realistic vehicle physics, suspension dynamics, acceleration curves, and wheel colliders.',
    htmlUrl: 'https://github.com/ninja27dev',
    homepage: 'https://mrdeveshdas.vercel.app/#projects',
    stars: 19,
    forks: 4,
    language: 'C#',
    topics: ['unity', 'csharp', 'physics-engine', 'wheel-colliders', 'simulation'],
    updatedAt: '2026-10-08T12:00:00Z',
    archived: false,
    owner: {
      id: 'devesh',
      code: 'DEV-02',
      name: 'Devesh Das',
      sector: 'GAME SYSTEMS & PHYSICS'
    }
  },
  {
    id: 204,
    name: 'Palworld-Pals-Stats',
    fullName: 'ninja27dev/Palworld-Pals-Stats',
    description: 'Interactive data visualization dashboard and analytics suite for Palworld creature attributes built with Python, Dash, Plotly, and Pandas.',
    htmlUrl: 'https://github.com/ninja27dev/Palworld-Pals-Stats',
    homepage: 'https://mrdeveshdas.vercel.app/#projects',
    stars: 15,
    forks: 2,
    language: 'Jupyter Notebook',
    topics: ['python', 'dash', 'plotly', 'pandas', 'data-visualization', 'eda'],
    updatedAt: '2026-09-30T15:20:00Z',
    archived: false,
    owner: {
      id: 'devesh',
      code: 'DEV-02',
      name: 'Devesh Das',
      sector: 'GAME SYSTEMS & PHYSICS'
    }
  },
  {
    id: 205,
    name: 'Teacher-Payout-Smart-Contract',
    fullName: 'ninja27dev/Teacher-Payout-Smart-Contract',
    description: 'Blockchain payment automation smart contract on the Stacks network automating compensation disbursement to educator wallets based on completion rates.',
    htmlUrl: 'https://github.com/ninja27dev/Teacher-Payout-Smart-Contract',
    homepage: 'https://mrdeveshdas.vercel.app/#projects',
    stars: 12,
    forks: 1,
    language: 'TypeScript',
    topics: ['blockchain', 'stacks', 'clarity', 'smart-contracts', 'web3'],
    updatedAt: '2026-09-22T19:40:00Z',
    archived: false,
    owner: {
      id: 'devesh',
      code: 'DEV-02',
      name: 'Devesh Das',
      sector: 'GAME SYSTEMS & PHYSICS'
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
      sector: 'GAMES & DIGITAL TWIN'
    }
  }
];
