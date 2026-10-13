import React from 'react';

export default function App() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2rem',
      position: 'relative'
    }}>
      <div style={{
        position: 'absolute',
        top: '1.5rem',
        left: '2rem',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.75rem',
        letterSpacing: '0.15em',
        color: 'var(--color-cyan-muted)'
      }}>
        [SYS: INITIALIZED // ACEDEVS HUD v1.0]
      </div>

      <div style={{
        maxWidth: '800px',
        width: '100%',
        padding: '2.5rem',
        background: 'var(--color-cyan-glass)',
        backdropFilter: 'var(--glass-blur)',
        WebkitBackdropFilter: 'var(--glass-blur)',
        border: '1px solid var(--color-cyan-hairline)',
        position: 'relative'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem',
          borderBottom: '1px solid var(--color-cyan-hairline)',
          paddingBottom: '1rem'
        }}>
          <h1 style={{
            fontSize: '1.75rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--color-cyan-glow)'
          }}>
            ACEDEVS // COLLECTIVE
          </h1>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            background: 'var(--color-cyan-faint)',
            padding: '0.25rem 0.6rem',
            color: 'var(--color-cyan-glow)',
            letterSpacing: '0.1em'
          }}>
            DS-01 VERIFIED
          </span>
        </div>

        <p style={{
          fontSize: '1rem',
          lineHeight: '1.6',
          color: 'var(--color-cyan-muted)',
          marginBottom: '2rem'
        }}>
          Foundation initialized with Hubtown-inspired Tactical HUD design system.
          Deep space navy canvas (#020a19), ice cyan luminescence (#d5e0ff), Space Grotesk headings, and Space Mono telemetry.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1rem'
        }}>
          <div style={{
            padding: '1rem',
            background: 'var(--color-abyss-surface)',
            border: '1px solid var(--color-cyan-faint)'
          }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--color-cyan-muted)' }}>PRIMARY CANVAS</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--color-cyan-glow)', marginTop: '0.25rem' }}>#020a19</div>
          </div>
          <div style={{
            padding: '1rem',
            background: 'var(--color-cyan-glow)',
            color: 'var(--color-ink)'
          }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 700 }}>ICE CYAN GLOW</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', fontWeight: 700, marginTop: '0.25rem' }}>#d5e0ff</div>
          </div>
          <div style={{
            padding: '1rem',
            background: 'var(--color-abyss-surface)',
            border: '1px solid var(--color-cyan-faint)'
          }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--color-cyan-muted)' }}>DEVELOPERS</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--color-cyan-glow)', marginTop: '0.25rem' }}>ARBAZ & DEVESH</div>
          </div>
        </div>
      </div>
    </div>
  );
}
