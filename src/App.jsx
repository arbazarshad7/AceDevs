import React, { useState } from 'react';
import ViewportHud from './components/hud/ViewportHud';
import BeveledBox from './components/hud/BeveledBox';
import ChamferButton from './components/hud/ChamferButton';
import HudBadge from './components/hud/HudBadge';
import CornerBrackets from './components/hud/CornerBrackets';
import { ArrowRight, Code, Database, Globe, Cpu, Github } from 'lucide-react';

export default function App() {
  const [section, setSection] = useState('hero');

  return (
    <ViewportHud
      activeSection={section}
      onSectionSelect={setSection}
      filterCount={0}
      onOpenListClick={() => setSection('repos')}
    >
      {/* Central Interactive HUD Stage */}
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '75vh',
        textAlign: 'center',
        position: 'relative'
      }}>
        {/* Monospace System Telemetry Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginBottom: '1.25rem'
        }}>
          <span className="hud-telemetry">SYS: ONLINE // SECTOR: GLOBAL</span>
          <span style={{ color: 'var(--color-cyan-hairline)' }}>|</span>
          <span className="hud-telemetry">COORDINATES: 19.0760° N, 72.8777° E</span>
          <span style={{ color: 'var(--color-cyan-hairline)' }}>|</span>
          <HudBadge label="v1.0" showDot active />
        </div>

        {/* Hero Beveled Presentation Card */}
        <BeveledBox
          variant="glass"
          cornerSize={18}
          glow
          style={{
            width: '100%',
            padding: '3rem 2.5rem',
            position: 'relative',
            marginBottom: '2rem'
          }}
        >
          <CornerBrackets />

          <div style={{ marginBottom: '1rem' }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              letterSpacing: '0.25em',
              color: 'var(--color-cyan-bright)',
              textTransform: 'uppercase'
            }}>
              COLLECTIVE DEVELOPER PORTFOLIO
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2rem, 4.5vw, 3.4rem)',
            fontWeight: 800,
            letterSpacing: '0.08em',
            lineHeight: 1.15,
            textTransform: 'uppercase',
            color: 'var(--color-cyan-glow)',
            marginBottom: '1.5rem',
            textShadow: '0 0 30px rgba(213, 224, 255, 0.25)'
          }}>
            WE ENGINEER DIGITAL
            <br />
            INFRASTRUCTURE
          </h1>

          <p style={{
            maxWidth: '680px',
            margin: '0 auto 2.25rem auto',
            fontSize: '1.05rem',
            lineHeight: '1.7',
            color: 'var(--color-cyan-muted)',
            fontFamily: 'var(--font-heading)'
          }}>
            Unified technological showcase of <strong style={{ color: '#ffffff' }}>Arbaz Arshad</strong> and{' '}
            <strong style={{ color: '#ffffff' }}>Devesh Das</strong>. Powered by procedural 3D graphics,
            automated GitHub aggregation, an algorithmic Trie search engine, and an authenticated engineering blog.
          </p>

          {/* Action CTAs */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '1.25rem'
          }}>
            <ChamferButton
              variant="inverted"
              size="lg"
              icon={<ArrowRight size={16} />}
              onClick={() => setSection('showcase')}
            >
              EXPLORE SHOWCASE
            </ChamferButton>

            <ChamferButton
              variant="primary"
              size="lg"
              icon={<Github size={16} />}
              onClick={() => setSection('repos')}
            >
              COLLECTIVE REPOS [00]
            </ChamferButton>
          </div>
        </BeveledBox>

        {/* Phase 1 Verification Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.25rem',
          width: '100%'
        }}>
          {/* Card 1: Team Synergy */}
          <BeveledBox variant="faint" cornerSize={12} style={{ padding: '1.5rem', textAlign: 'left' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Cpu size={16} style={{ color: 'var(--color-cyan-bright)' }} />
                <span className="hud-telemetry">CORE 01</span>
              </div>
              <HudBadge label="ARBAZ & DEVESH" active />
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--color-cyan-glow)' }}>
              Dual Developer Synergy
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-cyan-muted)', lineHeight: '1.6' }}>
              Full-stack architecture, distributed systems, and creative WebGL development connected to individual portfolios.
            </p>
          </BeveledBox>

          {/* Card 2: 3D WebGL Matrix */}
          <BeveledBox variant="faint" cornerSize={12} style={{ padding: '1.5rem', textAlign: 'left' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Globe size={16} style={{ color: 'var(--color-cyan-bright)' }} />
                <span className="hud-telemetry">CORE 02</span>
              </div>
              <HudBadge label="NEXT: PHASE 2" />
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--color-cyan-glow)' }}>
              Cybernetic WebGL Node Mesh
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-cyan-muted)', lineHeight: '1.6' }}>
              Procedural Three.js particle canvas with reactive vector splines inspired directly by the Hubtown topographical digital twin.
            </p>
          </BeveledBox>

          {/* Card 3: Algorithmic Search */}
          <BeveledBox variant="faint" cornerSize={12} style={{ padding: '1.5rem', textAlign: 'left' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Database size={16} style={{ color: 'var(--color-cyan-bright)' }} />
                <span className="hud-telemetry">CORE 03</span>
              </div>
              <HudBadge label="IN-MEMORY TRIE" />
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--color-cyan-glow)' }}>
              Inverted Index Engine
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-cyan-muted)', lineHeight: '1.6' }}>
              Sub-millisecond prefix matching and multi-tag filtering across projects, repositories, and technical articles.
            </p>
          </BeveledBox>
        </div>
      </div>
    </ViewportHud>
  );
}
