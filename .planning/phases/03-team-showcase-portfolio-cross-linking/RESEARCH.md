# Phase 03: Team Showcase & Portfolio Cross-Linking — Technical Research

## Objective
Deliver tactical HUD profile modules for **Arbaz Arshad** and **Devesh Das** displaying designation, technical specialties, biography, holographic avatar styling, and bidirectional external links to individual portfolio websites and GitHub profiles.

---

## 1. Aesthetic Benchmark & HUD Profile Topology (Hubtown Inspired)
In the Hubtown tactical interface, profile and entity cards exhibit distinct architectural traits:
1. **Monospace Telemetry Header**: Each card is indexed with a military/cybernetic designation code (`[DEV-01]`, `[DEV-02]`), live status beacon (`■ ACTIVE // ONLINE`), and localized sector tags.
2. **Beveled Cybernetic Portrait Frame**:
   - 45-degree chamfered geometry on avatar frames with subtle cyan hairline borders (`rgba(213, 224, 255, 0.4)`).
   - Peripheral alignment crosshairs (`+`) and corner tick brackets framing the photograph.
   - Dual-tone holographic photo treatment with subtle scanline overlay, transitioning to full vivid color on hover.
3. **Dual Developer Synergy Counter**:
   - Visual telemetry bridge highlighting collective synergy, shared core initiatives, and individual specialized domains.
4. **Interactive Tactical CTAs**:
   - `VIEW PORTFOLIO [->]` (inverted ChamferButton with external arrow).
   - `GITHUB PROFILE [00]` (tactical secondary ChamferButton).
   - Social / Network quick-connect buttons (LinkedIn, Email).

---

## 2. Data Architecture (`teamData.js`)
Centralized team data repository providing typed, extensible developer profiles:

```javascript
export const TEAM_MEMBERS = [
  {
    id: 'arbaz',
    code: 'DEV-01',
    name: 'Arbaz Arshad',
    designation: 'Co-Founder // Full-Stack Architect & Distributed Systems',
    role: 'Full-Stack Architecture',
    coordinates: '19.0760° N, 72.8777° E',
    avatar: '/avatars/arbaz.png', // with procedural SVG fallback
    bio: 'Specializing in high-throughput distributed backends, algorithmic optimization, microservice orchestration, and resilient cloud infrastructure. Spearheads AceDevs core architectural engineering and database engines.',
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
      uptime: '99.98%'
    }
  },
  {
    id: 'devesh',
    code: 'DEV-02',
    name: 'Devesh Das',
    designation: 'Co-Founder // Creative Technologist & Systems Architect',
    role: 'Creative Tech & Systems',
    coordinates: '19.0760° N, 72.8777° E',
    avatar: '/avatars/devesh.png', // with procedural SVG fallback
    bio: 'Passionate about creative WebGL development, interactive digital twins, shader programming, and modern reactive client architectures. Champions AceDevs visual computing and 3D sensory aesthetics.',
    specialties: [
      { name: 'Three.js & WebGL', level: 'CORE' },
      { name: 'React & TypeScript', level: 'EXPERT' },
      { name: 'Creative Coding & GLSL', level: 'CORE' },
      { name: 'Next.js & Vite', level: 'ADVANCED' },
      { name: 'UI/UX Design Systems', level: 'ARCHITECT' },
      { name: 'Performance Optimization', level: 'EXPERT' }
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
      framerate: '60 FPS'
    }
  }
];
```

---

## 3. Component Hierarchy
- `src/components/team/`:
  - `TeamShowcase.jsx`: Main section container with telemetry header, dual-column grid, synergy nexus banner, and filter toggles.
  - `TeamCard.jsx`: Tactical profile card featuring beveled frame, holographic avatar widget, specialty pills, metrics bar, and external link buttons.
  - `HolographicAvatar.jsx`: Beveled avatar frame with cybernetic crosshair ticks, status dot, and fallback SVG procedural avatar.
  - `team.css`: Scoped CSS styles matching the design tokens (`--color-abyss`, `--color-cyan-glow`, `--color-cyan-hairline`).

---

## 4. Integration with Viewport HUD & 3D Hero Scene
- Section switching: Clicking `TEAM [03]` in the top bar or left rail smoothly transitions the stage to the Team Showcase.
- Bidirectional 3D linkage: When a user clicks on the `DEV-01` or `DEV-02` 3D node in the WebGL scene, the app highlights or auto-navigates to that developer's profile card!
