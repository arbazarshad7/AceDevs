import React from 'react';
import './hud.css';

/**
 * ChamferButton: Interactive tactical HUD button with cut corners,
 * high-contrast hover glow, and icon support.
 */
export default function ChamferButton({
  children,
  onClick,
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
  return (
    <button
      type={type}
      onClick={onClick}
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
