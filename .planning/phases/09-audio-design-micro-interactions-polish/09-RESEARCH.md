# Phase 09 Research: Audio Design, Micro-Interactions & Polish

**Phase:** 09-audio-design-micro-interactions-polish  
**Date:** 2026-10-14  
**Focus:** Web Audio API procedural soundscape, tactical UI sound FX, responsive mobile HUD styling, and 60 FPS performance tuning.

---

## 1. Domain & Technical Overview

### 1.1 Web Audio API Procedural Synthesis
Relying on external static audio files (MP3/WAV) introduces unnecessary network latency, MIME-type configuration overhead, potential 404s, and external asset dependencies.
Using the native **Web Audio API** (`window.AudioContext || window.webkitAudioContext`) enables 100% procedural sound synthesis directly on the client:
- **Zero latency**: Sounds are generated instantaneously without download delays.
- **Zero asset payload**: No bulky audio assets shipped in the bundle.
- **Infinite customization**: Frequencies, attack/decay envelopes, biquad filter sweeps, and volume gain can be shaped procedurally.

### 1.2 Browser Autoplay Policies
Modern browsers (Chrome, Edge, Safari, Firefox) restrict automatic sound playback until a user gesture (click, tap, keydown) occurs.
- An `AudioContext` initializes in `'suspended'` state.
- Upon the first user click (or when the user toggles the sound toggle to `SOUND ON`), `audioContext.resume()` transitions the context to `'running'`.
- Sound preference should persist in `localStorage` under `acedevs_sound_enabled` (defaulting to `false` for unobtrusive civilian browsing, easily enabled via the HUD bottom bar).

---

## 2. Audio Engine Architecture

### 2.1 SoundManager Engine (`src/services/soundService.js`)
A centralized audio singleton managing:
1. **AudioContext Lifecycle**: Lazy instantiation, resume on interaction, and master gain volume control.
2. **Master Gain & Limiter**: Controls overall volume (default `0.15` to `0.2` gain to ensure sound effects remain subtle and refined rather than harsh).
3. **Sound Generators**:
   - `playClick()`: Tactical crisp UI trigger (sine frequency sweep 1200Hz -> 600Hz with exponential decay in 40ms).
   - `playHover()`: Ultra-light blip (sine wave at 900Hz, 20ms duration, very soft gain).
   - `playKeypress()`: Mechanical keystroke tick (bandpass filtered noise or 1800Hz pulse, 12ms duration).
   - `playModalOpen()`: Sweeping HUD telemetry boot (dual tone ascending 440Hz -> 1760Hz with lowpass filter over 100ms).
   - `playAccessDenied()`: Tactical security warning chirp (two staggered square wave tones at 180Hz).
   - `startAmbientDrone()` & `stopAmbientDrone()`: Sub-bass atmospheric cybernetic hum using two detuned sine oscillators (55Hz and 110Hz) passed through a 24dB low-pass filter modulated by a slow 0.15Hz LFO.

### 2.2 Global Sound Context & Hook (`useSound.js`)
A React hook `useSound` providing:
- `soundEnabled`: boolean flag synced with `localStorage`.
- `toggleSound()`: toggles mute/unmute and starts/stops ambient drone.
- Trigger methods: `click()`, `hover()`, `type()`, `modal()`, `denied()`.

---

## 3. Mobile HUD & Responsive Viewport Polish

### 3.1 Layout Refinements (< 768px & < 480px)
- **Top Navigation Bar**:
  - On mobile screens, long horizontal nav links overflow or compress.
  - Implement a mobile HUD drawer toggle (`#hud-mobile-menu-btn`) that displays a slide-down tactical navigation matrix.
- **Left Rail**:
  - Hidden on viewports below 900px to maximize reading and viewing real estate.
- **Bottom HUD Bar**:
  - Simplify bottom bar for touch devices: compact scale indicator and compass rosette.
- **Tactical Modals**:
  - Ensure `SearchModal`, `AuthModal`, and `PostEditorModal` take 95vw width on mobile with smooth scrolling for editors and tables.

---

## 4. Performance Tuning & 60 FPS Profiling

### 4.1 3D WebGL Canvas Optimization
- **Pixel Ratio Clamping**: Restrict WebGL renderer `pixelRatio` to `Math.min(window.devicePixelRatio, 1.5)` to prevent excessive GPU fillrate strain on high-DPI retina screens.
- **Visibility Detection**: Use `document.addEventListener('visibilitychange')` to halt `requestAnimationFrame` render loops when the browser tab is minimized or inactive, dropping CPU/GPU usage to 0%.
- **Frustum & Polygon Culling**: Ensure particle count and spline line updates are optimized for smooth 60 FPS frame timing.

---

## 5. Validation Architecture

1. **Audio Synthesis Tests**:
   - Verify `AudioContext` initializes safely across modern browsers.
   - Test `startAmbientDrone()` starts and stops without audio artifacts or memory leaks.
   - Test interaction sound effects trigger on button hover and click.
   - Verify sound toggle `#hud-sound-toggle` in `ScaleIndicator.jsx` flips between `SOUND ON` and `SOUND OFF` with persistent state.
2. **Mobile Layout Checks**:
   - Test viewport at 375px (iPhone SE), 414px (iPhone Pro Max), and 768px (iPad/Tablet).
   - Verify mobile menu toggle and touch interactions.
3. **Performance Profiling**:
   - Verify 60 FPS rendering and zero CPU usage when tab is hidden.
   - Run `npm run build` with zero errors.
