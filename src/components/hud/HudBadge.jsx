import React from 'react';
import './hud.css';

/**
 * HudBadge: Monospace telemetry badge with bracketed format
 * and optional pulsating status indicator.
 */
export default function HudBadge({
  label,
  count,
  active = false,
  showDot = false,
  className = '',
  style = {},
  ...props
}) {
  return (
    <span
      className={`hud-badge ${active ? 'hud-badge-active' : ''} ${className}`}
      style={style}
      {...props}
    >
      {showDot && <span className="hud-badge-dot" />}
      {label && <span>{label}</span>}
      {count !== undefined && count !== null && (
        <span style={{ opacity: 0.8 }}>[{String(count).padStart(2, '0')}]</span>
      )}
    </span>
  );
}
