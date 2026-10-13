import React from 'react';
import './hud.css';

/**
 * CornerBrackets: Decorative reticle tick marks on all 4 corners
 * of a container, evoking high-tech avionics HUD interfaces.
 */
export default function CornerBrackets({ className = '', style = {} }) {
  return (
    <div className={`corner-brackets-container ${className}`} style={style}>
      <span className="corner-bracket corner-bracket-tl" />
      <span className="corner-bracket corner-bracket-tr" />
      <span className="corner-bracket corner-bracket-bl" />
      <span className="corner-bracket corner-bracket-br" />
    </div>
  );
}
