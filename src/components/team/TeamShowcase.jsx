import React, { useState } from 'react';
import TeamCard from './TeamCard';
import BeveledBox from '../hud/BeveledBox';
import ChamferButton from '../hud/ChamferButton';
import HudBadge from '../hud/HudBadge';
import CornerBrackets from '../hud/CornerBrackets';
import { TEAM_MEMBERS, getTeamStats } from '../../data/teamData';
import { Users, Layers, Cpu, Globe, ArrowLeft, GitFork, ShieldCheck } from 'lucide-react';
import './team.css';

/**
 * TeamShowcase: Primary stage view for AceDevs co-founders
 * featuring telemetry filtering, dual profile cards, and
 * the central Collective Synergy Nexus bridge.
 */
export default function TeamShowcase({
  focusedMemberId = null,
  onBackToHero = null,
  className = ''
}) {
  const [filter, setFilter] = useState('all'); // 'all' | 'arbaz' | 'devesh'
  const stats = getTeamStats();

  const filteredMembers = TEAM_MEMBERS.filter((m) => {
    if (filter === 'all') return true;
    return m.id === filter;
  });

  return (
    <div className={`team-showcase-stage ${className}`}>
      {/* 1. SECTION TELEMETRY HEADER */}
      <div className="team-showcase-header">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.75rem',
          marginBottom: '1rem',
          flexWrap: 'wrap'
        }}>
          {onBackToHero && (
            <ChamferButton
              id="btn-return-hero"
              size="sm"
              variant="faint"
              icon={<ArrowLeft size={13} />}
              onClick={onBackToHero}
            >
              RETURN TO HERO [01]
            </ChamferButton>
          )}

          <span className="hud-telemetry">SECTION: 03 // CO-FOUNDERS</span>
          <span style={{ color: 'var(--color-cyan-hairline)' }}>|</span>
          <span className="hud-telemetry">{stats.primaryLocation}</span>
          <span style={{ color: 'var(--color-cyan-hairline)' }}>|</span>
          <HudBadge label="SYNERGY: 100%" showDot active />
        </div>

        <h1 className="team-showcase-title">
          COLLECTIVE LEADERSHIP
        </h1>

        <p className="team-showcase-desc">
          Meet the engineers behind AceDevs. Dual technical mastery combining distributed systems architecture,
          algorithmic cloud engines, and creative WebGL visual computing.
        </p>

        {/* Tactical Filter Selector */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.75rem',
          marginTop: '1.5rem',
          flexWrap: 'wrap'
        }}>
          <ChamferButton
            id="filter-all"
            size="sm"
            variant={filter === 'all' ? 'inverted' : 'faint'}
            icon={<Users size={13} />}
            onClick={() => setFilter('all')}
          >
            ALL FOUNDERS [02]
          </ChamferButton>

          <ChamferButton
            id="filter-arbaz"
            size="sm"
            variant={filter === 'arbaz' ? 'inverted' : 'faint'}
            icon={<Cpu size={13} />}
            onClick={() => setFilter('arbaz')}
          >
            ARBAZ ARSHAD [DEV-01]
          </ChamferButton>

          <ChamferButton
            id="filter-devesh"
            size="sm"
            variant={filter === 'devesh' ? 'inverted' : 'faint'}
            icon={<Globe size={13} />}
            onClick={() => setFilter('devesh')}
          >
            DEVESH DAS [DEV-02]
          </ChamferButton>
        </div>
      </div>

      {/* 2. DUAL FOUNDER PROFILE CARDS */}
      <div className="team-grid">
        {filteredMembers.map((member) => (
          <TeamCard
            key={member.id}
            member={member}
            isFocused={focusedMemberId === member.id}
          />
        ))}
      </div>

      {/* 3. COLLECTIVE SYNERGY NEXUS CARD */}
      <BeveledBox
        variant="faint"
        cornerSize={18}
        glow
        className="synergy-bridge-card"
        style={{ position: 'relative' }}
      >
        <CornerBrackets />

        <div className="synergy-bridge-grid">
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '0.75rem'
            }}>
              <ShieldCheck size={16} style={{ color: 'var(--color-cyan-bright)' }} />
              <span className="hud-telemetry" style={{ color: 'var(--color-cyan-bright)' }}>
                COOPERATIVE ENGINE // SHARED PRINCIPLES
              </span>
            </div>

            <h3 style={{
              fontSize: '1.4rem',
              fontWeight: 800,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: '#ffffff',
              marginBottom: '0.85rem'
            }}>
              The AceDevs Architectural Synergy
            </h3>

            <p style={{
              fontSize: '0.92rem',
              color: 'var(--color-cyan-muted)',
              lineHeight: '1.7',
              margin: 0
            }}>
              AceDevs unites two distinct engineering paradigms into a cohesive collective. While Arbaz crafts
              fault-tolerant backends, distributed data pipelines, and Trie-based search indices, Devesh builds
              real-time 3D shaders, procedural animations, and responsive tactical user interfaces. Together,
              we build robust digital infrastructure that looks as extraordinary as it performs.
            </p>
          </div>

          {/* Collective Telemetry Stats */}
          <div className="synergy-metrics-cluster">
            <div className="synergy-metric-box">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
                <GitFork size={13} style={{ color: 'var(--color-cyan-bright)' }} />
                <span className="hud-telemetry" style={{ fontSize: '0.65rem' }}>REPOSITORIES</span>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>
                {stats.combinedRepos}
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--color-cyan-muted)' }}>
                COMBINED PUBLIC REPOS
              </span>
            </div>

            <div className="synergy-metric-box">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
                <Layers size={13} style={{ color: 'var(--color-cyan-bright)' }} />
                <span className="hud-telemetry" style={{ fontSize: '0.65rem' }}>CONTRIBUTIONS</span>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>
                {stats.totalContributions}
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--color-cyan-muted)' }}>
                ANNUAL COMMITS
              </span>
            </div>
          </div>
        </div>
      </BeveledBox>
    </div>
  );
}
