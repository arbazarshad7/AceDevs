import React from 'react';
import { useSound } from '../../context/SoundContext';
import './hud.css';

/**
 * ChamferButton: Interactive tactical HUD button with cut corners,
 * high-contrast hover glow, icon support, and procedural sound feedback.
 */
export default function ChamferButton({
  children,
  onClick,
  onMouseEnter,
  variant = 'primary', // 'primary' | 'inverted' | 'ghost'
  size = 'md',        // 'sm' | 'md' | 'lg'
  icon = null,
  disabled = false,
  active = false,
  className = '',
  type = 'button',
  style = {},
  ...props
}) {
  const { playClick, playHover } = useSound();

  const handleClick = (e) => {
    if (!disabled) {
      playClick();
      if (onClick) onClick(e);
    }
  };

  const handleMouseEnter = (e) => {
    if (!disabled) {
      playHover();
      if (onMouseEnter) onMouseEnter(e);
    }
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      disabled={disabled}
      className={`chamfer-btn chamfer-btn-${variant} chamfer-btn-${size} ${active ? 'active' : ''} ${className}`}
      style={style}
      {...props}
    >
      {icon && <span style={{ display: 'inline-flex', alignItems: 'center' }}>{icon}</span>}
      <span>{children}</span>
    </button>
  );
}
