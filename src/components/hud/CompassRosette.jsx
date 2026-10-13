import React, { useState, useRef, useEffect } from 'react';
import './viewport.css';

/**
 * CompassRosette: High-precision interactive 360-degree heading rosette
 * inspired directly by Hubtown's interactive camera navigation rosette.
 */
export default function CompassRosette({
  bearing: controlledBearing,
  initialBearing = 0,
  onChange = null,
  interactive = true,
  className = '',
  style = {}
}) {
  const [internalBearing, setInternalBearing] = useState(
    controlledBearing !== undefined ? controlledBearing : initialBearing
  );
  const isDragging = useRef(false);
  const lastAngle = useRef(0);
  const rosetteRef = useRef(null);

  const activeBearing = controlledBearing !== undefined ? controlledBearing : internalBearing;

  const calculateAngle = (clientX, clientY) => {
    if (!rosetteRef.current) return 0;
    const rect = rosetteRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rad = Math.atan2(clientY - centerY, clientX - centerX);
    let deg = (rad * 180) / Math.PI + 90; // normalize 0deg to top (North)
    if (deg < 0) deg += 360;
    return Math.round(deg);
  };

  const handlePointerDown = (e) => {
    if (!interactive) return;
    isDragging.current = true;
    const newAngle = calculateAngle(e.clientX, e.clientY);
    lastAngle.current = newAngle;
    setInternalBearing(newAngle);
    if (onChange) onChange(newAngle);
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current || !interactive) return;
    const newAngle = calculateAngle(e.clientX, e.clientY);
    setInternalBearing(newAngle);
    if (onChange) onChange(newAngle);
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, []);

  const handleReset = () => {
    setInternalBearing(0);
    if (onChange) onChange(0);
  };

  const formattedBearing = `${String(activeBearing).padStart(3, '0')}°`;

  return (
    <div
      ref={rosetteRef}
      className={`compass-rosette ${className}`}
      onPointerDown={handlePointerDown}
      onDoubleClick={handleReset}
      title="Click and drag to adjust orientation // Double-click to reset North"
      style={style}
    >
      {/* SVG Compass Dial */}
      <svg
        className="compass-svg"
        viewBox="0 0 100 100"
        style={{ transform: `rotate(${-activeBearing}deg)` }}
      >
        {/* Outer Circular Rings */}
        <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(213, 224, 255, 0.15)" strokeWidth="1" />
        <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(213, 224, 255, 0.08)" strokeWidth="1" strokeDasharray="2 3" />
        <circle cx="50" cy="50" r="32" fill="none" stroke="rgba(213, 224, 255, 0.2)" strokeWidth="1" />

        {/* Crosshair Hairlines */}
        <line x1="50" y1="4" x2="50" y2="12" stroke="#d5e0ff" strokeWidth="1.5" />
        <line x1="50" y1="88" x2="50" y2="96" stroke="rgba(213, 224, 255, 0.3)" strokeWidth="1" />
        <line x1="4" y1="50" x2="12" y2="50" stroke="rgba(213, 224, 255, 0.3)" strokeWidth="1" />
        <line x1="88" y1="50" x2="96" y2="50" stroke="rgba(213, 224, 255, 0.3)" strokeWidth="1" />

        {/* Degree Hash Ticks (Every 30 degrees) */}
        {[30, 60, 120, 150, 210, 240, 300, 330].map((deg) => (
          <line
            key={deg}
            x1="50"
            y1="6"
            x2="50"
            y2="10"
            stroke="rgba(213, 224, 255, 0.25)"
            strokeWidth="0.8"
            transform={`rotate(${deg} 50 50)`}
          />
        ))}

        {/* Cardinal North Pointer Triangle */}
        <polygon points="50,15 47,24 53,24" fill="#d5e0ff" />
        
        {/* Cardinal Markers on Rim */}
        <text x="50" y="27" textAnchor="middle" fill="#d5e0ff" fontSize="6.5" fontFamily="var(--font-mono)" fontWeight="700">N</text>
        <text x="79" y="52.5" textAnchor="middle" fill="rgba(213, 224, 255, 0.5)" fontSize="5.5" fontFamily="var(--font-mono)">E</text>
        <text x="50" y="78" textAnchor="middle" fill="rgba(213, 224, 255, 0.5)" fontSize="5.5" fontFamily="var(--font-mono)">S</text>
        <text x="21" y="52.5" textAnchor="middle" fill="rgba(213, 224, 255, 0.5)" fontSize="5.5" fontFamily="var(--font-mono)">W</text>
      </svg>

      {/* Static Center Readout */}
      <div className="compass-center-readout">
        <span className="compass-cardinal-n">N</span>
        <span className="compass-bearing-value">{formattedBearing}</span>
      </div>
    </div>
  );
}
