import React, { useRef, useState, useEffect } from 'react';
import './hud.css';

/**
 * BeveledBox: Tactical container with 45-degree chamfered cut corners
 * and optional SVG hairline perimeter border.
 */
export default function BeveledBox({
  children,
  className = '',
  variant = 'glass', // 'glass' | 'solid-dark' | 'solid-light' | 'faint'
  cornerSize = 12,
  border = true,
  glow = false,
  style = {},
  ...props
}) {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const c = cornerSize;
  const w = dimensions.width;
  const h = dimensions.height;

  // 45-degree chamfered polygon clip-path (Top-Left, Top-Right, Bottom-Right, Bottom-Left)
  const clipPathStyle = `polygon(
    0 ${c}px,
    ${c}px 0,
    100% 0,
    100% calc(100% - ${c}px),
    calc(100% - ${c}px) 100%,
    0 100%
  )`;

  // SVG perimeter path matching the cut corners
  const pathD = w && h
    ? `M 0 ${c} L ${c} 0 L ${w} 0 L ${w} ${h - c} L ${w - c} ${h} L 0 ${h} Z`
    : '';

  return (
    <div
      ref={containerRef}
      className={`beveled-box variant-${variant} ${glow ? 'glow' : ''} ${className}`}
      style={{
        clipPath: clipPathStyle,
        ...style,
      }}
      {...props}
    >
      <div className="beveled-box-content">
        {children}
      </div>

      {border && w > 0 && h > 0 && (
        <svg
          className="beveled-border-svg"
          viewBox={`0 0 ${w} ${h}`}
          preserveAspectRatio="none"
        >
          <path
            d={pathD}
            className="beveled-border-path"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      )}
    </div>
  );
}
