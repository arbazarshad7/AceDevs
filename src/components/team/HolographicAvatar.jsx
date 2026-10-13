import React, { useState } from 'react';
import './team.css';

/**
 * HolographicAvatar: Tactical 45-degree chamfered portrait frame with
 * corner alignment reticles, scanline overlay, live status beacon,
 * and procedural cybernetic SVG fallback.
 */
export default function HolographicAvatar({
  src,
  name,
  code = 'DEV',
  status = 'ONLINE',
  size = 180,
  className = ''
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Generate initials for avatar fallback
  const initials = name
    ? name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
    : 'DEV';

  return (
    <div
      className={`holographic-avatar-container ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      {/* 45-degree Chamfered Frame */}
      <div className="holographic-avatar-frame">
        {/* SVG Hairline Border & Corner Reticles */}
        <svg
          className="holographic-avatar-svg-border"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {/* Outer Chamfer Outline */}
          <polygon
            points="10,0 90,0 100,10 100,90 90,100 10,100 0,90 0,10"
            fill="none"
            stroke="rgba(213, 224, 255, 0.4)"
            strokeWidth="1.2"
          />
          {/* Inner Corner Tick Accents */}
          <line x1="10" y1="3" x2="18" y2="3" stroke="#d5e0ff" strokeWidth="1.5" />
          <line x1="82" y1="3" x2="90" y2="3" stroke="#d5e0ff" strokeWidth="1.5" />
          <line x1="3" y1="10" x2="3" y2="18" stroke="#d5e0ff" strokeWidth="1.5" />
          <line x1="97" y1="10" x2="97" y2="18" stroke="#d5e0ff" strokeWidth="1.5" />
        </svg>

        {/* Real Image or Procedural Cybernetic Fallback */}
        {!imageError && src ? (
          <img
            src={src}
            alt={name}
            className={`holographic-avatar-img ${imageLoaded ? 'loaded' : ''}`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        ) : null}

        {(!imageLoaded || imageError || !src) && (
          <div className="holographic-avatar-procedural">
            <svg
              viewBox="0 0 100 100"
              className="holographic-procedural-svg"
            >
              {/* Background Geometric Grid */}
              <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(213, 224, 255, 0.08)" strokeWidth="0.8" />
              <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(213, 224, 255, 0.12)" strokeWidth="0.8" strokeDasharray="3 3" />
              <line x1="15" y1="50" x2="85" y2="50" stroke="rgba(213, 224, 255, 0.15)" strokeWidth="0.5" />
              <line x1="50" y1="15" x2="50" y2="85" stroke="rgba(213, 224, 255, 0.15)" strokeWidth="0.5" />

              {/* Cybernetic Geometric Headform Silhouette */}
              <polygon
                points="50,22 68,36 68,64 50,78 32,64 32,36"
                fill="rgba(33, 85, 205, 0.25)"
                stroke="#d5e0ff"
                strokeWidth="1.2"
              />
              <polygon
                points="50,28 62,38 62,60 50,70 38,60 38,38"
                fill="none"
                stroke="rgba(213, 224, 255, 0.4)"
                strokeWidth="0.8"
              />

              {/* Digital Twin Initials */}
              <text
                x="50"
                y="54"
                textAnchor="middle"
                dominantBaseline="central"
                fill="#ffffff"
                fontSize="14"
                fontFamily="var(--font-mono)"
                fontWeight="800"
                letterSpacing="0.1em"
              >
                {initials}
              </text>

              {/* Code Identifier */}
              <text
                x="50"
                y="86"
                textAnchor="middle"
                fill="var(--color-cyan-glow)"
                fontSize="5.5"
                fontFamily="var(--font-mono)"
                letterSpacing="0.15em"
              >
                {code}
              </text>
            </svg>
          </div>
        )}

        {/* Scanline & Holographic Flicker Overlay */}
        <div className="holographic-avatar-scanlines" />
        <div className="holographic-avatar-vignette" />
      </div>

      {/* Live Status Beacon Pill */}
      <div className="holographic-status-badge">
        <span className="holographic-status-dot" />
        <span className="holographic-status-text">{status}</span>
      </div>

      {/* Tactical Corner Crosshair Reticles */}
      <span className="avatar-reticle reticle-tl">+</span>
      <span className="avatar-reticle reticle-tr">+</span>
      <span className="avatar-reticle reticle-bl">+</span>
      <span className="avatar-reticle reticle-br">+</span>
    </div>
  );
}
