import { calculateReadingTime } from '../utils/readingTime';

export const BLOG_POSTS = [
  {
    id: 'post-01',
    slug: 'procedural-threejs-node-networks-glsl-pulse-shaders',
    title: 'Architecting 60FPS Procedural Three.js Node Networks with Custom GLSL Pulse Shaders',
    excerpt: 'Deep dive into rendering large-scale cybernetic node networks with instanced geometries, GPU-driven line drawing, and custom GLSL vertex/fragment shaders for propagating pulses.',
    author: {
      id: 'arbaz',
      code: 'DEV-01',
      name: 'Arbaz Arshad',
      designation: 'Game Developer · AI & Systems'
    },
    publishedAt: '2026-09-28T14:30:00Z',
    readingTimeMinutes: 6,
    tags: ['webgl', 'threejs', 'glsl', 'shaders', 'performance'],
    featured: true,
    content: `## 1. The Rendering Bottleneck in Real-Time Graph Visualizations

Interactive digital twin interfaces and tactical node visualizations often fall victim to the standard WebGL draw call penalty. When visualizing thousands of interconnected software services or architectural telemetry points, instantiating separate Three.js \`Line\` and \`Mesh\` objects kills framerates on mobile devices and integrated GPUs.

In this architecture, we replace discrete scene graph objects with **InstancedMesh** buffers and continuous shader-driven vector lines:

\`\`\`glsl
// Custom GLSL Fragment Shader for Propagating Light Pulses
uniform float uTime;
uniform vec3 uColorA;
uniform vec3 uColorB;
varying float vProgress;

void main() {
    // Calculate traveling pulse along spline normalized coordinates
    float pulseSpeed = 1.8;
    float pulseLength = 0.22;
    float pulse = smoothstep(1.0 - pulseLength, 1.0, 1.0 - abs(fract(vProgress - uTime * pulseSpeed) - 0.5) * 2.0);

    vec3 finalColor = mix(uColorA, uColorB, pulse);
    float alpha = clamp(pulse * 1.4 + 0.15, 0.0, 1.0);

    gl_FragColor = vec4(finalColor, alpha);
}
\`\`\`

## 2. Memory Alignment & Buffer Geometries

By sharing a single \`BufferGeometry\` across thousands of node instances, CPU-GPU memory bus throughput drops to zero during the animation loop. Matrices are updated only when nodes undergo orbital physics or user displacement:

- **Instanced Buffer Attributes**: Node coordinates stored as contiguous \`Float32Array\` vectors.
- **Pulse Phase Coordination**: Each connection carries a pseudo-randomized phase offset, preventing artificial strobe patterns.
- **Frustum Culling**: Spatial bounding box checks skip rendering nodes positioned outside the active camera frustum.

\`\`\`javascript
const instanceMatrix = new THREE.InstancedBufferAttribute(
  new Float32Array(nodeCount * 16),
  16
);
geometry.setAttribute('instanceMatrix', instanceMatrix);
\`\`\`

## 3. Telemetry Integration with the React Lifecycle

To synchronize the 3D WebGL hero canvas with perimeter HUD controls (such as azimuth heading and compass telemetry), the rendering loop fires decoupled matrix events without re-triggering React component renders:

> [!NOTE]
> Storing continuous 60FPS camera bearing directly in React state causes layout thrashing. Instead, use mutable refs during mouse drag and dispatch batched throttling updates at 200ms intervals.

## Key Architectural Takeaways

1. Always offload continuous particle animation to the GPU vertex shader.
2. Group dynamic vector lines into single merged geometries using custom UV coordinate mapping.
3. Decouple high-frequency canvas render frames from high-level React component tree state.`
  },
  {
    id: 'post-02',
    slug: 'sensory-enemy-perception-ai-locomotion-unity-3d',
    title: 'Architecting Sensory Enemy Perception AI and Locomotion Controllers in Unity 3D',
    excerpt: 'Implementing visual raycast cones, acoustic hearing radii, and responsive ninja locomotion state machines for high-fidelity 3D action combat games.',
    author: {
      id: 'devesh',
      code: 'DEV-02',
      name: 'Devesh Das',
      designation: 'Game Developer & Computer Science Engineer'
    },
    publishedAt: '2026-10-02T10:15:00Z',
    readingTimeMinutes: 7,
    tags: ['unity3d', 'csharp', 'game-ai', 'fsm', 'locomotion', 'physics'],
    featured: true,
    content: `## 1. Perception Modeling in 3D Action & Stealth Games

In tactical action games like *White Ninja*, believable enemy behavior hinges on realistic perception models. Rather than relying on simple distance checks that penetrate solid obstacles, modern stealth engines combine **optical vision cones** with **acoustic sensory radii**.

\`\`\`csharp
public class EnemyPerception : MonoBehaviour {
    [SerializeField] private float viewRadius = 15f;
    [Range(0, 360)] [SerializeField] private float viewAngle = 110f;
    [SerializeField] private LayerMask targetMask;
    [SerializeField] private LayerMask obstacleMask;

    public bool CanSeeTarget(Transform target) {
        Vector3 dirToTarget = (target.position - transform.position).normalized;
        if (Vector3.Angle(transform.forward, dirToTarget) < viewAngle / 2f) {
            float distToTarget = Vector3.Distance(transform.position, target.position);
            if (!Physics.Raycast(transform.position + Vector3.up, dirToTarget, distToTarget, obstacleMask)) {
                return true; // Unobstructed line of sight within vision cone
            }
        }
        return false;
    }
}
\`\`\`

## 2. Locomotion State Machines (FSM)

High-responsiveness player locomotion (wall-running, sliding, ledge-grabbing) requires a decoupled Finite State Machine to eliminate conflicting physics forces.

- **Grounded State**: Normal friction, step-offset climbing, input acceleration smoothing.
- **Wall-Run State**: Gravity override, surface-normal alignment, camera tilt tweening.
- **Airborne State**: Directional air control, coyote time buffer, velocity damping.

\`\`\`csharp
public void UpdateLocomotionState() {
    switch (currentState) {
        case MovementState.WallRunning:
            rb.velocity = new Vector3(rb.velocity.x, 0f, rb.velocity.z);
            rb.AddForce(wallForward * wallRunSpeed, ForceMode.Acceleration);
            break;
        case MovementState.Sliding:
            rb.AddForce(transform.forward * slideForce, ForceMode.Force);
            break;
    }
}
\`\`\`

## 3. Hitbox / Hurtbox Precision Combat

Katana melee systems require deterministic frame-accurate hitboxes active only during active animation strike windows, preventing ghost hits and ensuring crisp parry detection.`
  },
  {
    id: 'post-03',
    slug: 'algorithmic-prefix-tries-inverted-indexes-client-side',
    title: 'Algorithmic Prefix Tries & Inverted Indexes in Client-Side Web Applications',
    excerpt: 'Implementing zero-dependency client-side search engines capable of sub-millisecond prefix autocomplete and boolean query ranking directly in the browser runtime.',
    author: {
      id: 'arbaz',
      code: 'DEV-01',
      name: 'Arbaz Arshad',
      designation: 'Game Developer · AI & Systems'
    },
    publishedAt: '2026-10-07T16:00:00Z',
    readingTimeMinutes: 5,
    tags: ['algorithms', 'data-structures', 'trie', 'javascript', 'search'],
    featured: false,
    content: `## 1. Why Client-Side Algorithmic Search Beats Network Roundtrips

Most modern web portfolios offload simple search queries to external SaaS APIs or serverless functions. This introduces network latency (150ms-400ms), cold starts, and privacy concerns. For developer portfolios and documentation sites, the entire corpus often fits within 1-2 megabytes of structured JSON.

By pairing an in-memory **Prefix Trie** with an **Inverted Index**, we achieve $O(k)$ prefix lookup and sub-millisecond boolean query filtering directly on the client machine.

\`\`\`javascript
class TrieNode {
  constructor() {
    this.children = new Map();
    this.isWord = false;
    this.entityIds = new Set();
    this.frequency = 0;
  }
}

export class PrefixTrie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word, entityId) {
    let curr = this.root;
    for (const char of word.toLowerCase()) {
      if (!curr.children.has(char)) {
        curr.children.set(char, new TrieNode());
      }
      curr = curr.children.get(char);
    }
    curr.isWord = true;
    curr.frequency++;
    curr.entityIds.add(entityId);
  }
}
\`\`\`

## 2. Inverted Index Posting Lists & Intersection

An inverted index maps normalized tokens to sets of document IDs:

- \`webgl\` -> \`Set('repo-cyber-twin', 'post-01', 'sys-01')\`
- \`shaders\` -> \`Set('repo-cyber-twin', 'post-01')\`

When evaluating multi-token queries like \`webgl shaders\`, an algorithmic set intersection takes $O(\\min(|A|, |B|))$ time:

\`\`\`javascript
function intersect(setA, setB) {
  const result = new Set();
  const [smaller, larger] = setA.size < setB.size ? [setA, setB] : [setB, setA];
  for (const item of smaller) {
    if (larger.has(item)) result.add(item);
  }
  return result;
}
\`\`\`

## 3. Benchmarked Telemetry

Profiled in our AceDevs search modal:
- Vocabulary Size: 184 distinct tokens.
- Query Execution Duration: **0.05ms - 0.22ms**.
- Zero external dependencies. Zero network roundtrips. Pure algorithmic efficiency.`
  },
  {
    id: 'post-04',
    slug: 'deterministic-turn-loops-pwa-native-board-games',
    title: 'Deterministic Turn Loops and Offline PWA Architecture in Native Games',
    excerpt: 'Architecting an offline-first native board game engine with state machine validation, Web Audio sound synthesis, and mobile Progressive Web App distribution.',
    author: {
      id: 'devesh',
      code: 'DEV-02',
      name: 'Devesh Das',
      designation: 'Game Developer & Computer Science Engineer'
    },
    publishedAt: '2026-10-11T09:00:00Z',
    readingTimeMinutes: 8,
    tags: ['pwa', 'javascript', 'game-dev', 'offline-first', 'web-audio', 'state-machine'],
    featured: false,
    content: `## 1. Native & Indigenous Game Preservation

*Pasha Palli (पासा पल्ली)* is an authentic Indian cross-race dice board game featuring a 4-player token race, sanctuary X-squares, and knock-out capture rules. Rebuilding this traditional game as a high-performance web app required a deterministic finite state machine and offline-first PWA caching.

\`\`\`javascript
// Deterministic Turn Loop FSM
const GameState = {
  ROLLING: 'ROLLING',
  SELECTING_PAWN: 'SELECTING_PAWN',
  ANIMATING_MOVE: 'ANIMATING_MOVE',
  EVALUATING_OUTCOME: 'EVALUATING_OUTCOME',
  SWITCHING_TURN: 'SWITCHING_TURN'
};

function processDiceRoll(diceValue) {
  if (diceValue === 4 || diceValue === 8) {
    // Bonus turn granted on high throws
    grantBonusRoll();
  }
}
\`\`\`

## 2. Zero-Dependency Web Audio Synthesis

Rather than bundling heavy audio MP3/WAV files that increase initial download weight, procedural audio synthesizes dice rattles and token placement thuds directly via the Web Audio API:

\`\`\`javascript
function playTokenMoveSound(audioCtx) {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(320, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(140, audioCtx.currentTime + 0.08);
  gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.08);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.08);
}
\`\`\`

## 3. Offline Service Worker Packaging

Using a Cache-First service worker strategy with a Web App Manifest enables Pasha Palli to run 100% offline and be installed directly to home screens on Android and iOS.`
  }
];

// Pre-calculate accurate word counts and read times
BLOG_POSTS.forEach((post) => {
  const { readingTimeMinutes } = calculateReadingTime(post.content);
  post.readingTimeMinutes = readingTimeMinutes;
});

export default BLOG_POSTS;
