import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import './viewport.css';

/**
 * ScaleIndicator: Displays camera zoom scale, metric distance,
 * and audio soundscape toggle state in the bottom-left viewport margin.
 */
export default function ScaleIndicator({
  zoom = '1.0X',
  distance = '500M',
  initialMuted = true,
  onToggleSound = null,
  className = '',
  style = {}
}) {
  const [isMuted, setIsMuted] = useState(initialMuted);

  const handleToggle = () => {
    const nextState = !isMuted;
    setIsMuted(nextState);
    if (onToggleSound) onToggleSound(!nextState);
  };

  return (
    <div className={`hud-scale-widget ${className}`} style={style}>
      <div className="hud-scale-readout">
        <span>ZOOM {zoom}</span>
        <span>{distance}</span>
      </div>

      <div className="hud-scale-bracket" />

      <button
        type="button"
        className="hud-sound-toggle"
        onClick={handleToggle}
        title="Toggle audio soundscape"
      >
        {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} style={{ color: 'var(--color-cyan-glow)' }} />}
        <span>{isMuted ? 'SOUND OFF' : 'SOUND ON'}</span>
      </button>
    </div>
  );
}
