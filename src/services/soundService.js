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

    // Space ambient background music (leberch-space-ambient-509783.mp3)
    this.bgMusic = null;
    this.isMusicPlaying = false;
    this.bgMusicUrl = '/audio/space-ambient.mp3';
    this.targetMusicVolume = 0.40; // Optimal atmospheric background volume
    this.fadeInterval = null;
    this._hasUnlockedAudio = false;
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
   * Starts playing the space ambient background music (leberch-space-ambient-509783.mp3)
   * with smooth fade-in and automatic looping.
   */
  startBackgroundMusic() {
    if (typeof window === 'undefined') return;

    if (!this.bgMusic) {
      this.bgMusic = new Audio(this.bgMusicUrl);
      this.bgMusic.loop = true;
      this.bgMusic.preload = 'auto';
    }

    if (this.fadeInterval) {
      clearInterval(this.fadeInterval);
      this.fadeInterval = null;
    }

    this.bgMusic.volume = 0.001;
    const playPromise = this.bgMusic.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          this.isMusicPlaying = true;
          // Smooth fade in to target volume over 1.2s
          let currentVol = 0.001;
          const step = (this.targetMusicVolume - currentVol) / 24;
          this.fadeInterval = setInterval(() => {
            currentVol += step;
            if (currentVol >= this.targetMusicVolume) {
              currentVol = this.targetMusicVolume;
              clearInterval(this.fadeInterval);
              this.fadeInterval = null;
            }
            if (this.bgMusic) {
              this.bgMusic.volume = Math.min(Math.max(currentVol, 0), 1);
            }
          }, 50);
        })
        .catch((err) => {
          console.warn('[SoundService] Autoplay blocked, awaiting user gesture:', err.message);
          if (!this._hasUnlockedAudio) {
            const unlockHandler = () => {
              this._hasUnlockedAudio = true;
              window.removeEventListener('click', unlockHandler);
              window.removeEventListener('keydown', unlockHandler);
              if (this.bgMusic && !this.isMusicPlaying) {
                this.startBackgroundMusic();
              }
            };
            window.addEventListener('click', unlockHandler);
            window.addEventListener('keydown', unlockHandler);
          }
        });
    }
  }

  /**
   * Stops the space ambient background music with smooth fade-out.
   */
  stopBackgroundMusic() {
    if (!this.bgMusic || !this.isMusicPlaying) return;

    if (this.fadeInterval) {
      clearInterval(this.fadeInterval);
      this.fadeInterval = null;
    }

    let currentVol = this.bgMusic.volume;
    const step = currentVol / 15;

    this.fadeInterval = setInterval(() => {
      currentVol -= step;
      if (currentVol <= 0.01) {
        currentVol = 0.0;
        clearInterval(this.fadeInterval);
        this.fadeInterval = null;
        if (this.bgMusic) {
          this.bgMusic.volume = 0.0;
          this.bgMusic.pause();
          this.isMusicPlaying = false;
        }
      } else {
        if (this.bgMusic) {
          this.bgMusic.volume = Math.min(Math.max(currentVol, 0), 1);
        }
      }
    }, 35);
  }

  /**
   * Starts ambient soundscape: activates space ambient background music
   * alongside subtle procedural sub-bass cybernetic drone.
   */
  startAmbientDrone() {
    // 1. Start space ambient background music
    this.startBackgroundMusic();

    // 2. Start procedural sub-bass drone
    const ctx = this.initContext();
    if (!ctx || this.isDronePlaying) return;

    try {
      const now = ctx.currentTime;

      // Drone master gain with fade in
      this.droneGain = ctx.createGain();
      this.droneGain.gain.setValueAtTime(0.0001, now);
      this.droneGain.gain.exponentialRampToValueAtTime(0.08, now + 1.2);
      this.droneGain.connect(this.masterGain);

      // 24dB Lowpass Filter (deep tactical warmth)
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(140, now);
      filter.Q.setValueAtTime(2.0, now);
      filter.connect(this.droneGain);

      // Slow LFO for subtle breathing movement
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(0.1, now);
      lfoGain.gain.setValueAtTime(35, now);
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

      this.droneNodes = [osc1, lfo, lfoGain, filter];
      this.isDronePlaying = true;
    } catch (err) {
      console.warn('[SoundService] Failed to start procedural drone:', err);
    }
  }

  /**
   * Stops ambient soundscape: fades out both space music and drone.
   */
  stopAmbientDrone() {
    // 1. Stop background music
    this.stopBackgroundMusic();

    // 2. Stop procedural drone
    if (!this.ctx || !this.isDronePlaying || !this.droneGain) return;

    try {
      const now = this.ctx.currentTime;
      this.droneGain.gain.setValueAtTime(this.droneGain.gain.value, now);
      this.droneGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);

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
      }, 550);
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
