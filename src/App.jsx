import React, { useState } from 'react';
import CyberCanvas from './components/canvas/CyberCanvas';
import CyberNodeNetwork from './components/canvas/CyberNodeNetwork';
import ViewportHud from './components/hud/ViewportHud';
import BeveledBox from './components/hud/BeveledBox';
import ChamferButton from './components/hud/ChamferButton';
import HudBadge from './components/hud/HudBadge';
import CornerBrackets from './components/hud/CornerBrackets';
import { ArrowRight, Code, Database, Globe, Cpu, Github, X, Compass, Activity } from 'lucide-react';

export default function App() {
  const [section, setSection] = useState('hero');
  const [bearing, setBearing] = useState(0);
  const [focusedNode, setFocusedNode] = useState(null);

  const formattedBearing = `${String(bearing).padStart(3, '0')}°`;

  return (
    <div className="acedevs-app-root">
      {/* 1. 3D WebGL Cybernetic Node Network Hero Canvas */}
      <CyberCanvas>
        <CyberNodeNetwork
          bearing={bearing}
          onBearingChange={setBearing}
          onNodeSelect={(node) => setFocusedNode(node)}
          interactive
        />
      </CyberCanvas>

      {/* 2. Tactical Sci-Fi Viewport HUD Cockpit Frame */}
      <ViewportHud
        activeSection={section}
        onSectionSelect={setSection}
        bearing={bearing}
        onBearingChange={setBearing}
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
            marginBottom: '1.25rem',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            <span className="hud-telemetry">SYS: ONLINE // SECTOR: GLOBAL</span>
            <span style={{ color: 'var(--color-cyan-hairline)' }}>|</span>
            <span className="hud-telemetry">COORDINATES: 19.0760° N, 72.8777° E</span>
            <span style={{ color: 'var(--color-cyan-hairline)' }}>|</span>
            <span className="hud-telemetry" style={{ color: 'var(--color-cyan-bright)' }}>
              AZIMUTH: {formattedBearing}
            </span>
            <span style={{ color: 'var(--color-cyan-hairline)' }}>|</span>
            <HudBadge label="v1.0" showDot active />
          </div>

          {/* Focused 3D Node Inspection Alert (when user clicks any node in 3D scene) */}
          {focusedNode && (
            <div style={{
              width: '100%',
              marginBottom: '1.25rem',
              animation: 'hudTooltipFadeIn 0.25s ease-out'
            }}>
              <BeveledBox
                variant="primary"
                cornerSize={10}
                style={{
                  padding: '0.75rem 1.25rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'rgba(2, 10, 25, 0.95)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textAlign: 'left' }}>
                  <Activity size={16} style={{ color: 'var(--color-cyan-bright)' }} />
                  <div>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      color: 'var(--color-cyan-bright)',
                      marginRight: '0.5rem'
                    }}>
                      [{focusedNode.code}] TARGET LOCKED:
                    </span>
                    <strong style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '0.85rem',
                      letterSpacing: '0.05em',
                      color: '#ffffff'
                    }}>
                      {focusedNode.label}
                    </strong>
                    <span style={{
                      fontSize: '0.72rem',
                      color: 'var(--color-cyan-muted)',
                      marginLeft: '0.5rem',
                      fontFamily: 'var(--font-mono)'
                    }}>
                      // {focusedNode.subtitle}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <ChamferButton
                    size="sm"
                    variant="faint"
                    onClick={() => {
                      if (focusedNode.id === 'arbaz' || focusedNode.id === 'devesh') {
                        setSection('team');
                      } else if (focusedNode.id === 'repos') {
                        setSection('repos');
                      } else if (focusedNode.id === 'blog') {
                        setSection('blog');
                      } else {
                        setSection('showcase');
                      }
                    }}
                  >
                    INSPECT SYSTEM
                  </ChamferButton>
                  <button
                    type="button"
                    onClick={() => setFocusedNode(null)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--color-cyan-muted)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0.25rem'
                    }}
                    title="Dismiss telemetry focus"
                  >
                    <X size={16} />
                  </button>
                </div>
              </BeveledBox>
            </div>
          )}

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
                COLLECTIVE DEVELOPER PORTFOLIO // DIGITAL TWIN
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

          {/* System Telemetry Core Capabilities Grid */}
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
                <HudBadge label="THREE.JS // LIVE" active />
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--color-cyan-glow)' }}>
                Cybernetic WebGL Node Mesh
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-cyan-muted)', lineHeight: '1.6' }}>
                Interactive 3D particle canvas with GLSL pulse shaders and real-time bidirectional HUD compass tracking.
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
    </div>
  );
}
