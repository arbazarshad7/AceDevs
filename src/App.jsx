import React, { useState } from 'react';
import BeveledBox from './components/hud/BeveledBox';
import ChamferButton from './components/hud/ChamferButton';
import HudBadge from './components/hud/HudBadge';
import CornerBrackets from './components/hud/CornerBrackets';
import { Terminal, Shield, Zap, Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');

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

      <BeveledBox
        variant="glass"
        cornerSize={16}
        glow
        style={{
          maxWidth: '850px',
          width: '100%',
          padding: '2.5rem',
        }}
      >
        <CornerBrackets />

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.75rem',
          borderBottom: '1px solid var(--color-cyan-hairline)',
          paddingBottom: '1.25rem'
        }}>
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '0.25rem'
            }}>
              <h1 style={{
                fontSize: '1.75rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--color-cyan-glow)'
              }}>
                ACEDEVS // COLLECTIVE
              </h1>
              <HudBadge label="LIVE" showDot active />
            </div>
            <div className="hud-telemetry">
              TEAM: ARBAZ ARSHAD & DEVESH DAS // HUD ENGINE v1.0
            </div>
          </div>

          <HudBadge label="DS-02 PRIMITIVES" count={2} active />
        </div>

        <p style={{
          fontSize: '0.95rem',
          lineHeight: '1.7',
          color: 'var(--color-cyan-muted)',
          marginBottom: '2rem'
        }}>
          Tactical HUD UI Primitives verified. Angled 45° chamfered geometry, responsive SVG hairline perimeter borders, high-contrast inverted action buttons, and aerospace reticle brackets.
        </p>

        {/* Buttons demonstration */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <ChamferButton
            variant="inverted"
            icon={<Zap size={15} />}
            onClick={() => setActiveTab('action')}
          >
            Launch System
          </ChamferButton>

          <ChamferButton
            variant="primary"
            icon={<Terminal size={15} />}
            onClick={() => setActiveTab('terminal')}
          >
            View Telemetry
          </ChamferButton>

          <ChamferButton
            variant="ghost"
            icon={<Shield size={15} />}
            onClick={() => setActiveTab('security')}
          >
            Security Mesh [00]
          </ChamferButton>
        </div>

        {/* Sub-grid of Beveled Boxes */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.25rem'
        }}>
          <BeveledBox variant="faint" cornerSize={10} style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span className="hud-telemetry">MODULE 01</span>
              <HudBadge count={1} />
            </div>
            <div style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.25rem' }}>
              Cut-Corner Geometry
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-cyan-muted)', lineHeight: '1.5' }}>
              SVG dynamic vector path with clip-path polygon integration.
            </p>
          </BeveledBox>

          <BeveledBox variant="faint" cornerSize={10} style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span className="hud-telemetry">MODULE 02</span>
              <HudBadge count={2} />
            </div>
            <div style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.25rem' }}>
              Inverted Buttons
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-cyan-muted)', lineHeight: '1.5' }}>
              High-contrast ice cyan (#d5e0ff) buttons with deep navy typography.
            </p>
          </BeveledBox>

          <BeveledBox variant="solid-dark" cornerSize={10} style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span className="hud-telemetry">STATUS</span>
              <HudBadge label="OK" active />
            </div>
            <div style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.25rem' }}>
              Dual Typography
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-cyan-muted)', lineHeight: '1.5' }}>
              Space Grotesk headers with Space Mono telemetry brackets.
            </p>
          </BeveledBox>
        </div>
      </BeveledBox>
    </div>
  );
}
