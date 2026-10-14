# 🎨 Tactical Sci-Fi HUD Design System // AceDevs

This document outlines the visual identity, design tokens, geometry algorithms, typography, and component specifications that comprise the **AceDevs Tactical Sci-Fi HUD / Digital Twin** aesthetic.

---

## 1. Visual Philosophy & Inspiration

The AceDevs visual system is inspired by the tactical digital twin aesthetic of [Hubtown](https://hubtown.co.in) and high-performance mission control telemetry interfaces. Rather than standard flat portfolio cards, the interface treats the browser window as an **optical viewfinder and telemetry HUD (Heads-Up Display)** framing a live 3D cybernetic node network.

### Key Visual Pillars

1. **Abyssal Contrast**: Deep space navy foundations (`#020a19`) with high-contrast ice cyan luminescence (`#d5e0ff`).
2. **Beveled & Chamfered Geometry**: 45° angle corner cuts on all interactive cards, containers, and buttons, referencing military avionics and tactical displays.
3. **Optoelectronic Glassmorphism**: Translucent card backings using heavy backdrop blurring (`blur(20px)` to `blur(32px)`) with hairline cyan borders (`rgba(213, 224, 255, 0.12)`).
4. **Perimeter Telemetry Framing**: Viewport edge brackets, coordinate readouts, monospace system indices (`[00]`, `[01]`), and an interactive 360° heading compass rosette.
5. **Dual Typography**: Technical proportional geometric sans (`Space Grotesk`) paired with a razor-sharp monospace telemetry typeface (`Space Mono`).

---

## 2. Design Tokens & Color Palette

All tokens are defined as CSS Custom Properties in [`src/styles/theme.css`](file:///d:/Work/AceDevs/src/styles/theme.css):

### 2.1 Canvas & Abyssal Layer Tokens

| Token | Hex / Value | Role |
| :--- | :--- | :--- |
| `--color-abyss` | `#020a19` | Master root canvas background |
| `--color-abyss-deep` | `#010610` | Deepest shadow contrast & inset panels |
| `--color-abyss-surface` | `#041029` | Elevated card surfaces and container backdrops |
| `--color-abyss-glass` | `rgba(2, 10, 25, 0.82)` | Semi-translucent glassmorphic overlay surface |
| `--color-panel-solid` | `#030e24` | Opaque fallback for modals and drawers |
| `--color-cyan-glass` | `rgba(213, 224, 255, 0.05)` | Faint luminescent hover tint |
| `--color-cyan-glass-hover` | `rgba(213, 224, 255, 0.09)` | Active button & card hover fill |

### 2.2 Cyan & Luminescence Tokens

| Token | Hex / Value | Role |
| :--- | :--- | :--- |
| `--color-cyan-glow` | `#d5e0ff` | Primary ice cyan luminescence & active accents |
| `--color-cyan-bright` | `#8fadff` | Secondary bright cobalt accent |
| `--color-cyan-muted` | `rgba(213, 224, 255, 0.62)` | Secondary metadata, subtitles, and telemetry |
| `--color-cyan-faint` | `rgba(213, 224, 255, 0.18)` | Subtle decorative dividers and grid lines |
| `--color-cyan-hairline`| `rgba(213, 224, 255, 0.12)` | Card boundary borders and glass separators |
| `--color-cyan-border`  | `rgba(213, 224, 255, 0.24)` | High-emphasis borders and active state outlines |

### 2.3 Glow & Shadow Effects

| Token | Value | Visual Description |
| :--- | :--- | :--- |
| `--glow-cyan-subtle` | `0 0 15px rgba(213, 224, 255, 0.15)` | Resting card edge luminescence |
| `--glow-cyan-medium` | `0 0 25px rgba(213, 224, 255, 0.28)` | Hover elevation and button activation glow |
| `--glow-cyan-intense`| `0 0 40px rgba(213, 224, 255, 0.50)` | Active node highlight & modal focal points |

---

## 3. Chamfered Geometry & 45° Bevels

In place of standard rounded corners (`border-radius`), AceDevs employs **45° chamfered geometry** generated via CSS `clip-path: polygon(...)` and SVG clipping paths.

### 3.1 Chamfer Tokens

```css
:root {
  --chamfer-sm: 8px;   /* Micro-badges, tag chips, small buttons */
  --chamfer-md: 12px;  /* Standard interactive buttons & action controls */
  --chamfer-lg: 18px;  /* Profile cards, repo containers & HUD modals */
}
```

### 3.2 Chamfer Polygon Formulas

For a container with top-right and bottom-left 45° cuts of size `$C`:

```css
/* Diagonal Cut (Top-Right & Bottom-Left) */
clip-path: polygon(
  0 0,
  calc(100% - var(--chamfer-md)) 0,
  100% var(--chamfer-md),
  100% 100%,
  var(--chamfer-md) 100%,
  0 calc(100% - var(--chamfer-md))
);
```

For a symmetrical quad-cut box (all four corners beveled):

```css
/* Quad-Chamfer (All 4 Corners Clipped) */
clip-path: polygon(
  var(--chamfer-lg) 0%,
  calc(100% - var(--chamfer-lg)) 0%,
  100% var(--chamfer-lg),
  100% calc(100% - var(--chamfer-lg)),
  calc(100% - var(--chamfer-lg)) 100%,
  var(--chamfer-lg) 100%,
  0% calc(100% - var(--chamfer-lg)),
  0% var(--chamfer-lg)
);
```

---

## 4. Typography System

The interface pairs two Google Fonts loaded directly via `index.html`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
```

### 4.1 Typography Scale & Role Distribution

| Family | Role | Weights | Example Elements |
| :--- | :--- | :--- | :--- |
| **Space Grotesk** | Display Headings & Navigation | 500, 600, 700 | Hero titles, profile names, section banners, modal titles |
| **Space Mono** | Viewport Telemetry & Metadata | 400, 700 | Coordinates (`20.2961° N`), azimuth bearings (`000°`), tags, status flags |

### 4.2 Utility Classes

```css
.font-mono {
  font-family: var(--font-mono);
}

.font-heading {
  font-family: var(--font-heading);
}

.hud-telemetry {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-cyan-muted);
}

.hud-telemetry-active {
  color: var(--color-cyan-glow);
  text-shadow: 0 0 10px rgba(213, 224, 255, 0.4);
}
```

---

## 5. Tactical HUD Component Catalog

The project provides modular HUD building blocks located in `src/components/hud/`:

### 5.1 `BeveledBox.jsx`

A versatile, glassmorphic container supporting configurable chamfer sizes (`sm`, `md`, `lg`), interactive hover lighting, and optional outer border framing.

```jsx
import BeveledBox from './components/hud/BeveledBox';

<BeveledBox
  chamfer="lg"
  variant="glass"
  className="my-custom-panel"
  hoverable={true}
>
  <h3>TACTICAL PAYLOAD</h3>
  <p>System operational.</p>
</BeveledBox>
```

### 5.2 `ChamferButton.jsx`

Primary interactive button with 45° corner clip, animated scanline shimmer, sound effect integration via `useSound()`, and tactile press feedback.

```jsx
import ChamferButton from './components/hud/ChamferButton';

<ChamferButton
  variant="primary" // 'primary' | 'secondary' | 'outline' | 'danger'
  size="md"        // 'sm' | 'md' | 'lg'
  icon={<ArrowRight size={16} />}
  onClick={() => executeMission()}
>
  INITIALIZE PROTOCOL
</ChamferButton>
```

### 5.3 `HudBadge.jsx`

Compact status indicator and taxonomy pill with optional animated pulsing beacon (`status="live"`).

```jsx
import HudBadge from './components/hud/HudBadge';

<HudBadge variant="cyan" pulse={true}>
  ONLINE // 60 FPS
</HudBadge>
```

### 5.4 `CornerBrackets.jsx`

Tactical L-shaped corner brackets rendering at the four corners of containers or viewports to emulate digital reticle crosshairs.

```jsx
import CornerBrackets from './components/hud/CornerBrackets';

<div className="relative-container">
  <CornerBrackets size={14} color="var(--color-cyan-glow)" />
  <div>Container Content</div>
</div>
```

### 5.5 `CompassRosette.jsx`

An interactive 360° compass rosette mounted on the right HUD telemetry rail. Displays live azimuth orientation (`000°` to `359°`), reacts to 3D canvas camera rotation, and allows users to click and drag to orbit the 3D scene manually.

---

## 6. Sound Design as a HUD Element

Sound is an active design token within the AceDevs design system. All audio micro-interactions are subtle, synthetic, and non-intrusive:

| Interaction Event | Frequency / Synthesis Profile | Audio Token |
| :--- | :--- | :--- |
| **Ambient Backdrop** | Dual 55Hz & 55.4Hz detuned sawtooth drone | `drone-ambient` |
| **Button Click** | 440Hz Sine burst (40ms) with exponential decay | `sfx-click` |
| **Card Hover** | 880Hz Sine blip (25ms, -24dB volume) | `sfx-hover` |
| **Search Keystroke** | 1200Hz micro-chirp (15ms) | `sfx-type` |
| **Modal Open** | Pitch-swept frequency rise (220Hz ➔ 660Hz) | `sfx-open` |
| **Access Denied** | Dissonant dual pulse (150Hz + 110Hz square waves) | `sfx-error` |

All sounds can be instantly muted via the global `SOUND [ON/OFF]` switch in the top HUD navigation rail.
