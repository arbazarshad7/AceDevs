import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useSound } from '../../context/SoundContext';
import './viewport.css';

/**
 * ScaleIndicator: Displays camera zoom scale, metric distance,
 * and audio soundscape toggle state in the bottom-left viewport margin.
 */
export default function ScaleIndicator({
  zoom = '1.0X',
  distance = '500M',
  onToggleSound = null,
  className = '',
  style = {}
}) {
  const { soundEnabled, toggleSound } = useSound();

  const handleToggle = () => {
    toggleSound();
    if (onToggleSound) onToggleSound(!soundEnabled);
  };

  return (
    <div className={`hud-scale-widget ${className}`} style={style}>
      <div className="hud-scale-readout">
        <span>ZOOM {zoom}</span>
        <span>{distance}</span>
      </div>

      <div className="hud-scale-bracket" />

      <button
        id="hud-sound-toggle"
        type="button"
        className="hud-sound-toggle"
        onClick={handleToggle}
        title="Toggle audio soundscape"
      >
        {!soundEnabled ? (
          <VolumeX size={13} />
        ) : (
          <Volume2 size={13} style={{ color: 'var(--color-cyan-glow)' }} />
        )}
        <span style={{ color: soundEnabled ? 'var(--color-cyan-glow)' : 'inherit' }}>
          {soundEnabled ? 'SOUND ON' : 'SOUND OFF'}
        </span>
      </button>
    </div>
  );
}
