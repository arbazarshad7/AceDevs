/**
 * SoundService: Procedural Web Audio API soundscape synthesizer.
 * Generates Hubtown / Tactical Sci-Fi audio cues entirely in code with zero external audio assets.
 */
class SoundService {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.droneGain = null;
    this.droneNodes = [];
    this.isDronePlaying = false;
    this.masterVolume = 0.18; // Subtle background level
  }

  /**
   * Initializes or resumes AudioContext on user gesture.
   */
  initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) {
        console.warn('[SoundService] Web Audio API is not supported in this environment.');
        return null;
      }
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.masterVolume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }

    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch((err) => {
        console.warn('[SoundService] AudioContext resume failed:', err);
      });
    }

    return this.ctx;
  }

  /**
   * Starts procedural sub-bass cybernetic ambient drone.
   * Dual detuned oscillators (55Hz and 110Hz) through a 24dB low-pass filter modulated by slow LFO.
   */
  startAmbientDrone() {
    const ctx = this.initContext();
    if (!ctx || this.isDronePlaying) return;

    try {
      const now = ctx.currentTime;

      // Drone master gain with fade in
      this.droneGain = ctx.createGain();
      this.droneGain.gain.setValueAtTime(0.0001, now);
      this.droneGain.gain.exponentialRampToValueAtTime(0.12, now + 1.2);
      this.droneGain.connect(this.masterGain);

      // 24dB Lowpass Filter (cascaded biquad filters for deep tactical warmth)
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(160, now);
      filter.Q.setValueAtTime(2.5, now);
      filter.connect(this.droneGain);

      // Slow LFO for subtle breathing movement
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(0.12, now); // 0.12 Hz cycle
      lfoGain.gain.setValueAtTime(45, now);    // Modulate cutoff by ±45Hz
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      lfo.start(now);

      // Oscillator 1: Sub-bass 55Hz (A1)
      const osc1 = ctx.createOscillator();
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(55, now);
      osc1.detune.setValueAtTime(-4, now);
      osc1.connect(filter);
      osc1.start(now);

      // Oscillator 2: First Harmonic 110Hz (A2)
      const osc2 = ctx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(110, now);
      osc2.detune.setValueAtTime(6, now);
      osc2.connect(filter);
      osc2.start(now);

      this.droneNodes = [osc1, osc2, lfo, lfoGain, filter];
      this.isDronePlaying = true;
    } catch (err) {
      console.warn('[SoundService] Failed to start ambient drone:', err);
    }
  }

  /**
   * Stops ambient drone with smooth fade-out.
   */
  stopAmbientDrone() {
    if (!this.ctx || !this.isDronePlaying || !this.droneGain) return;

    try {
      const now = this.ctx.currentTime;
      this.droneGain.gain.setValueAtTime(this.droneGain.gain.value, now);
      this.droneGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

      setTimeout(() => {
        this.droneNodes.forEach((node) => {
          try {
            if (node.stop) node.stop();
            node.disconnect();
          } catch {
            // Ignore already stopped
          }
        });
        if (this.droneGain) {
          this.droneGain.disconnect();
          this.droneGain = null;
        }
        this.droneNodes = [];
        this.isDronePlaying = false;
      }, 650);
    } catch (err) {
      console.warn('[SoundService] Failed to stop ambient drone:', err);
      this.isDronePlaying = false;
    }
  }

  /**
   * Tactical Crisp Click / Engage Trigger
   * 1200Hz -> 600Hz exponential ramp with fast 40ms decay.
   */
  playClick() {
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(550, now + 0.04);

      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch {
      // Audio errors non-blocking
    }
  }

  /**
   * Ultra-soft Micro-blip Hover Sound
   * 880Hz sine tone, 20ms duration, very soft gain.
   */
  playHover() {
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(920, now);

      gain.gain.setValueAtTime(0.045, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.022);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.025);
    } catch {
      // Non-blocking
    }
  }

  /**
   * Mechanical Keystroke Click / Search Typing
   * 1800Hz damped pulse with highpass filter.
   */
  playKeypress() {
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1850, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.015);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.018);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.02);
    } catch {
      // Non-blocking
    }
  }

  /**
   * Ascending HUD Frequency Sweep on Modal Open / Navigation Shift
   * 400Hz -> 1600Hz frequency sweep, 100ms duration.
   */
  playModalOpen() {
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(380, now);
      osc.frequency.exponentialRampToValueAtTime(1650, now + 0.09);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1100, now);
      filter.Q.setValueAtTime(3.0, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.2, now + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.11);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.12);
    } catch {
      // Non-blocking
    }
  }

  /**
   * Tactical Access Denied / Error Warning Pulse
   * Two staggered 180Hz square waves.
   */
  playAccessDenied() {
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;

      [0, 0.08].forEach((offset) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(180, now + offset);

        gain.gain.setValueAtTime(0.16, now + offset);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + offset + 0.06);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now + offset);
        osc.stop(now + offset + 0.07);
      });
    } catch {
      // Non-blocking
    }
  }
}

export const soundService = new SoundService();
export default soundService;
