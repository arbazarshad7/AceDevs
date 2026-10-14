# 🚀 Getting Started & Developer Guide // AceDevs

Welcome to the **AceDevs** developer guide. This document explains how to set up your local development environment, understand project workflows, customize content and 3D scenes, and deploy to production.

---

## 1. Prerequisites

Before getting started, ensure you have the following installed on your machine:
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher (or `pnpm` / `yarn`)
- **Git**: Modern version of Git
- **Browser**: Modern Chromium-based browser (Chrome, Edge, Brave) or Firefox with WebGL 2.0 and Web Audio support.

---

## 2. Local Setup & Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/arbazarshad7/AceDevs.git
cd AceDevs
```

### Step 2: Install Node Dependencies

```bash
npm install
```

### Step 3: Configure Environment Variables

```bash
cp .env.example .env
```

Edit `.env` to supply your Supabase project credentials (or leave defaults for local mock mode):

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key-here
VITE_DEV_EMAILS=arbazarshad7@gmail.com,deveshkumardas08@gmail.com
VITE_GITHUB_USER_ARBAZ=arbazarshad7
VITE_GITHUB_USER_DEVESH=ninja27dev
```

### Step 4: Launch Development Server

```bash
npm run dev
```

The Vite development server will boot instantly and display:
```
  VITE v5.4.10  ready in 184 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

---

## 3. Development Scripts Reference

| Command | Action | Output / Description |
| :--- | :--- | :--- |
| `npm run dev` | Starts Vite HMR dev server | Runs locally on port 3000 with hot module replacement. |
| `npm run build` | Compiles for production | Generates bundled, tree-shaken assets in `/dist`. |
| `npm run preview` | Local production preview | Serves `/dist` locally to verify production build behavior. |

---

## 4. Customizing Content & Profiles

### 4.1 Updating Founder Profiles & Links

All founder spec sheets, skills, designations, coordinates, and social links are centralized in [`src/data/teamData.js`](file:///d:/Work/AceDevs/src/data/teamData.js):

```javascript
export const TEAM_MEMBERS = [
  {
    id: 'arbaz',
    code: 'DEV-01',
    name: 'Arbaz Arshad',
    designation: 'Co-Founder // Game Developer · AI Systems · Tech Wizard',
    coordinates: '20.2961° N, 85.8245° E', // Centurion University, Bhubaneswar
    links: {
      portfolio: 'https://www.arbazarshad.com/',
      github: 'https://github.com/arbazarshad7',
      linkedin: 'https://www.linkedin.com/in/arbaz-arshad-x7',
      email: 'mailto:arbazarshad7@gmail.com'
    },
    // ...
  },
  // ...
];
```

### 4.2 Managing Fallback Repositories

If the GitHub API is offline or rate-limited, the system seamlessly displays repositories from [`src/data/mockRepos.js`](file:///d:/Work/AceDevs/src/data/mockRepos.js). You can add or modify projects here to ensure rich offline demonstration.

### 4.3 Writing Engineering Blog Articles

There are two ways to publish articles:
1. **Via Authenticated Admin Dashboard (`/admin`)**:
   - Log in using an authorized email in `VITE_DEV_EMAILS`.
   - Click **[COCKPIT // ADMIN]** in the top navigation.
   - Click **[+ NEW TECHNICAL ARTICLE]** to open the markdown editor.
   - Enter your title, slug, excerpt, tags, and markdown body, then click **[SAVE ARTICLE]**.
2. **Via Static Seed Data**:
   - Edit [`src/data/blogPosts.js`](file:///d:/Work/AceDevs/src/data/blogPosts.js) to append articles that appear on first launch.

---

## 5. Customizing the 3D WebGL Constellation

The 3D cybernetic node network is configured in [`src/components/canvas/CyberNodeNetwork.jsx`](file:///d:/Work/AceDevs/src/components/canvas/CyberNodeNetwork.jsx):

### Adding a New 3D System Node

To add a node to the 3D scene:

```javascript
const NODE_DEFINITIONS = [
  // ... existing nodes
  {
    id: 'my-system',
    label: 'QUANTUM COMPUTE',
    subtitle: 'DISTRIBUTED CONSENSUS NODE',
    code: 'SYS-07',
    position: [0.0, -5.0, 1.5], // [X, Y, Z] 3D coordinates
    size: 1.2,
    color: 0x00e5ff,
    primary: false
  }
];
```

### Customizing Shaders

Custom vertex and fragment shaders are maintained in [`src/components/canvas/shaders/cyberShaders.js`](file:///d:/Work/AceDevs/src/components/canvas/shaders/cyberShaders.js). You can adjust wave traversal speed, pulse width, and luminescence formulas directly.

---

## 6. Production Deployment

### 6.1 Deploying to Vercel (Recommended)

1. Push your code to a GitHub repository.
2. In the [Vercel Dashboard](https://vercel.com/), click **Add New** ➔ **Project** and import your repository.
3. In **Build and Output Settings**:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. In **Environment Variables**, add:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_DEV_EMAILS`
   - `VITE_GITHUB_USER_ARBAZ`
   - `VITE_GITHUB_USER_DEVESH`
5. Click **Deploy**.

#### SPA Routing Rewrite Configuration (`vercel.json`)

To ensure direct links (such as `/admin` or deep URLs) route to `index.html`:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### 6.2 Deploying to Netlify

For Netlify, create a `public/_redirects` file with the following content:

```
/*    /index.html   200
```

Add your environment variables in **Site Settings** ➔ **Build & Deploy** ➔ **Environment**.
