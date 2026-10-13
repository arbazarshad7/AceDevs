import React from 'react';
import BeveledBox from '../hud/BeveledBox';
import ChamferButton from '../hud/ChamferButton';
import CornerBrackets from '../hud/CornerBrackets';
import { LANGUAGE_COLORS } from '../../data/mockRepos';
import { Star, GitFork, ExternalLink, Globe, Code, Shield } from 'lucide-react';
import './repos.css';

/**
 * RepoCard: Tactical 45° chamfered repository display card
 * featuring developer attribution, live metrics, and language color coding.
 */
export default function RepoCard({
  repo,
  className = '',
  style = {}
}) {
  if (!repo) return null;

  const langColor = LANGUAGE_COLORS[repo.language] || '#d5e0ff';
  const ownerCode = repo.owner?.code || 'DEV';
  const ownerName = repo.owner?.name?.toUpperCase() || 'DEVELOPER';
  const isCollective = repo.owner?.id === 'collective';

  const formattedDate = repo.updatedAt
    ? new Date(repo.updatedAt).toISOString().split('T')[0]
    : '2026-10-14';

  return (
    <BeveledBox
      variant="faint"
      cornerSize={14}
      className={`repo-card ${className}`}
      style={{
        padding: '1.75rem',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        ...style
      }}
    >
      <CornerBrackets />

      {/* Top Header: Developer Attribution Pill & Date Telemetry */}
      <div className="repo-card-header">
        <div className={`repo-owner-badge ${repo.owner?.id || 'dev'}`}>
          <span className="repo-owner-dot" />
          <span className="repo-owner-code">[{ownerCode}]</span>
          <span className="repo-owner-name">{isCollective ? 'ACEDEVS SHARED' : repo.owner?.name}</span>
        </div>

        <div className="repo-date-telemetry">
          {formattedDate}
        </div>
      </div>

      {/* Repository Title */}
      <h3 className="repo-title">
        <a
          href={repo.htmlUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="repo-title-link"
        >
          {repo.name}
        </a>
      </h3>

      {/* Description */}
      <p className="repo-description">
        {repo.description}
      </p>

      {/* Topics Tags Pills */}
      {repo.topics && repo.topics.length > 0 && (
        <div className="repo-topics-list">
          {repo.topics.slice(0, 4).map((topic) => (
            <span key={topic} className="repo-topic-pill">
              #{topic}
            </span>
          ))}
          {repo.topics.length > 4 && (
            <span className="repo-topic-pill" style={{ opacity: 0.6 }}>
              +{repo.topics.length - 4}
            </span>
          )}
        </div>
      )}

      {/* Footer Metrics & Actions */}
      <div className="repo-card-footer">
        {/* Left: Language & Star/Fork Counters */}
        <div className="repo-metrics-cluster">
          {repo.language && (
            <div className="repo-language-badge">
              <span
                className="repo-lang-dot"
                style={{ backgroundColor: langColor, boxShadow: `0 0 6px ${langColor}` }}
              />
              <span>{repo.language}</span>
            </div>
          )}

          <div className="repo-stat-badge" title={`${repo.stars} GitHub Stars`}>
            <Star size={13} style={{ color: '#ffd700' }} />
            <span>{repo.stars}</span>
          </div>

          <div className="repo-stat-badge" title={`${repo.forks} Forks`}>
            <GitFork size={13} />
            <span>{repo.forks}</span>
          </div>
        </div>

        {/* Right: External Repository Link */}
        <div className="repo-actions">
          {repo.homepage && (
            <a
              href={repo.homepage}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
              title="Open Live Demonstration"
            >
              <ChamferButton size="sm" variant="ghost" icon={<Globe size={13} />}>
                DEMO
              </ChamferButton>
            </a>
          )}

          <a
            id={`repo-link-${repo.name}`}
            href={repo.htmlUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
          >
            <ChamferButton size="sm" variant="inverted" icon={<ExternalLink size={13} />}>
              CODE
            </ChamferButton>
          </a>
        </div>
      </div>
    </BeveledBox>
  );
}
