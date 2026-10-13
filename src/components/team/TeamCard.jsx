import React from 'react';
import BeveledBox from '../hud/BeveledBox';
import ChamferButton from '../hud/ChamferButton';
import CornerBrackets from '../hud/CornerBrackets';
import HolographicAvatar from './HolographicAvatar';
import { ExternalLink, Github, Linkedin, Mail, Sparkles, Terminal, Activity } from 'lucide-react';
import './team.css';

/**
 * TeamCard: Tactical HUD profile card for AceDevs co-founders
 * featuring 45° chamfers, holographic avatar, specialties grid,
 * developer telemetry metrics, and secure external cross-links.
 */
export default function TeamCard({
  member,
  isFocused = false,
  className = '',
  style = {}
}) {
  if (!member) return null;

  return (
    <BeveledBox
      variant={isFocused ? 'primary' : 'glass'}
      cornerSize={16}
      glow={isFocused}
      className={`team-card-wrapper ${isFocused ? 'team-card-focused' : ''} ${className}`}
      style={{
        padding: '2rem',
        position: 'relative',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        ...style
      }}
    >
      <CornerBrackets />

      <div className="team-card-inner">
        {/* Top Header: Avatar + Identity Telemetry */}
        <div className="team-card-top">
          <HolographicAvatar
            src={member.avatar}
            name={member.name}
            code={member.code}
            status={member.status || 'ONLINE'}
            size={140}
          />

          <div className="team-card-header-info">
            <div className="team-card-telemetry-meta">
              <span className="team-card-code">[{member.code}]</span>
              <span className="team-card-sector">// SECTOR: {member.sector}</span>
              <span style={{ color: 'var(--color-cyan-hairline)' }}>|</span>
              <span className="hud-telemetry" style={{ fontSize: '0.65rem' }}>
                {member.coordinates}
              </span>
            </div>

            <h2 className="team-card-name">
              {member.name}
            </h2>

            <div className="team-card-designation">
              {member.designation}
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: 'var(--color-cyan-bright)'
            }}>
              <Terminal size={13} />
              <span>ROLE: {member.role}</span>
            </div>
          </div>
        </div>

        {/* Biography Statement */}
        <p className="team-card-bio">
          {member.bio}
        </p>

        {/* Core Specialties & Competencies */}
        <div className="team-specialties-section">
          <div className="team-section-label">
            <Sparkles size={12} />
            <span>PRIMARY ARCHITECTURAL SPECIALTIES</span>
          </div>

          <div className="team-specialties-grid">
            {member.specialties.map((spec) => (
              <div key={spec.name} className="team-specialty-pill">
                <span>{spec.name}</span>
                <span className="team-specialty-level">[{spec.level}]</span>
              </div>
            ))}
          </div>
        </div>

        {/* Developer Metrics Telemetry */}
        <div className="team-metrics-bar">
          <div className="team-metric-item">
            <span className="team-metric-value">{member.metrics.repositories}</span>
            <span className="team-metric-label">REPOSITORIES</span>
          </div>
          <div className="team-metric-item">
            <span className="team-metric-value">{member.metrics.contributions}</span>
            <span className="team-metric-label">CONTRIBUTIONS</span>
          </div>
          <div className="team-metric-item">
            <span className="team-metric-value">{member.metrics.uptime}</span>
            <span className="team-metric-label">PERFORMANCE</span>
          </div>
        </div>

        {/* Action CTAs & Cross-Linking */}
        <div className="team-card-actions">
          {/* Main Portfolio Cross-Link */}
          <a
            href={member.links.portfolio}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
          >
            <ChamferButton
              variant="inverted"
              size="md"
              icon={<ExternalLink size={14} />}
            >
              VISIT PORTFOLIO
            </ChamferButton>
          </a>

          {/* GitHub Profile Link */}
          <a
            href={member.links.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
          >
            <ChamferButton
              variant="primary"
              size="md"
              icon={<Github size={14} />}
            >
              GITHUB [{member.code.replace('DEV-', '')}]
            </ChamferButton>
          </a>

          {/* Social Icons */}
          <div className="team-social-links">
            {member.links.linkedin && (
              <a
                href={member.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="team-social-button"
                title={`${member.name} on LinkedIn`}
              >
                <Linkedin size={15} />
              </a>
            )}

            {member.links.email && (
              <a
                href={member.links.email}
                className="team-social-button"
                title={`Email ${member.name}`}
              >
                <Mail size={15} />
              </a>
            )}
          </div>
        </div>
      </div>
    </BeveledBox>
  );
}
