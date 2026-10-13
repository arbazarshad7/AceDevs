import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { soundService } from '../services/soundService';

const SoundContext = createContext({
  soundEnabled: false,
  toggleSound: () => {},
  setSoundEnabled: () => {},
  playClick: () => {},
  playHover: () => {},
  playKeypress: () => {},
  playModalOpen: () => {},
  playAccessDenied: () => {}
});

export function useSound() {
  return useContext(SoundContext);
}

const STORAGE_KEY = 'acedevs_sound_enabled';

export function SoundProvider({ children }) {
  const [soundEnabled, setSoundEnabledState] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  // Start or stop drone on state changes
  useEffect(() => {
    if (soundEnabled) {
      soundService.startAmbientDrone();
    } else {
      soundService.stopAmbientDrone();
    }
  }, [soundEnabled]);

  const toggleSound = useCallback(() => {
    setSoundEnabledState((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(STORAGE_KEY, String(next));
      } catch {
        // LocalStorage fallback
      }
      if (next) {
        soundService.initContext();
        soundService.playClick();
      }
      return next;
    });
  }, []);

  const playClick = useCallback(() => {
    if (soundEnabled) soundService.playClick();
  }, [soundEnabled]);

  const playHover = useCallback(() => {
    if (soundEnabled) soundService.playHover();
  }, [soundEnabled]);

  const playKeypress = useCallback(() => {
    if (soundEnabled) soundService.playKeypress();
  }, [soundEnabled]);

  const playModalOpen = useCallback(() => {
    if (soundEnabled) soundService.playModalOpen();
  }, [soundEnabled]);

  const playAccessDenied = useCallback(() => {
    if (soundEnabled) soundService.playAccessDenied();
  }, [soundEnabled]);

  const value = {
    soundEnabled,
    toggleSound,
    setSoundEnabled: (val) => {
      try {
        localStorage.setItem(STORAGE_KEY, String(val));
      } catch {
        // Ignore
      }
      setSoundEnabledState(val);
    },
    playClick,
    playHover,
    playKeypress,
    playModalOpen,
    playAccessDenied
  };

  return (
    <SoundContext.Provider value={value}>
      {children}
    </SoundContext.Provider>
  );
}

export default SoundContext;
