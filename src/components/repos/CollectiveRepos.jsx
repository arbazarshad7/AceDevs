import React, { useState, useEffect, useMemo } from 'react';
import RepoCard from './RepoCard';
import ChamferButton from '../hud/ChamferButton';
import HudBadge from '../hud/HudBadge';
import { fetchCollectiveRepos } from '../../services/githubService';
import { Search, RotateCw, GitBranch, ArrowLeft, Filter, Sparkles, AlertCircle } from 'lucide-react';
import './repos.css';

/**
 * CollectiveRepos: Primary panel for aggregated developer repositories
 * featuring multi-criteria filtering, live search, and telemetry sync.
 */
export default function CollectiveRepos({
  onBackToHero = null,
  initialDevFilter = 'all',
  className = ''
}) {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [syncMeta, setSyncMeta] = useState({ source: 'loading', error: null, cacheAgeMinutes: 0 });

  const [devFilter, setDevFilter] = useState(initialDevFilter); // 'all' | 'arbaz' | 'devesh'
  const [langFilter, setLangFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('stars'); // 'stars' | 'updated' | 'name'

  // Load repositories on mount
  const loadRepos = async (force = false) => {
    setLoading(true);
    try {
      const result = await fetchCollectiveRepos({ forceRefresh: force });
      setRepos(result.repos || []);
      setSyncMeta({
        source: result.source,
        error: result.error,
        cacheAgeMinutes: result.cacheAgeMinutes || 0
      });
    } catch (err) {
      console.error('[CollectiveRepos] Failed to load repos:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRepos(false);
  }, []);

  // Compute available languages
  const availableLanguages = useMemo(() => {
    const langs = new Set();
    repos.forEach((r) => {
      if (r.language && r.language !== 'Code') langs.add(r.language);
    });
    return Array.from(langs);
  }, [repos]);

  // Multi-criteria filtering & sorting
  const filteredRepos = useMemo(() => {
    return repos
      .filter((repo) => {
        // Developer filter
        if (devFilter !== 'all') {
          if (devFilter === 'arbaz' && repo.owner?.id !== 'arbaz') return false;
          if (devFilter === 'devesh' && repo.owner?.id !== 'devesh') return false;
        }

        // Language filter
        if (langFilter !== 'all' && repo.language !== langFilter) {
          return false;
        }

        // Search query filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const nameMatch = repo.name?.toLowerCase().includes(q);
          const descMatch = repo.description?.toLowerCase().includes(q);
          const topicMatch = Array.isArray(repo.topics) && repo.topics.some((t) => t.toLowerCase().includes(q));
          const langMatch = repo.language?.toLowerCase().includes(q);
          const ownerMatch = repo.owner?.name?.toLowerCase().includes(q);
          if (!nameMatch && !descMatch && !topicMatch && !langMatch && !ownerMatch) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'stars') {
          return (b.stars || 0) - (a.stars || 0);
        }
        if (sortBy === 'updated') {
          return new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0);
        }
        if (sortBy === 'name') {
          return a.name.localeCompare(b.name);
        }
        return 0;
      });
  }, [repos, devFilter, langFilter, searchQuery, sortBy]);

  // Counts
  const arbazCount = repos.filter((r) => r.owner?.id === 'arbaz').length;
  const deveshCount = repos.filter((r) => r.owner?.id === 'devesh').length;

  return (
    <div id="collective-repos-stage" className={`repos-stage ${className}`}>
      {/* 1. SECTION TELEMETRY HEADER */}
      <div className="repos-header">
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
              id="repos-btn-return-hero"
              size="sm"
              variant="faint"
              icon={<ArrowLeft size={13} />}
              onClick={onBackToHero}
            >
              RETURN TO HERO [01]
            </ChamferButton>
          )}

          <span className="hud-telemetry">SECTION: 04 // COLLECTIVE REPOSITORIES</span>
          <span style={{ color: 'var(--color-cyan-hairline)' }}>|</span>

          {/* Sync Source Indicator */}
          <span className="hud-telemetry" style={{ color: 'var(--color-cyan-bright)' }}>
            SOURCE: {syncMeta.source.toUpperCase()}
          </span>

          <span style={{ color: 'var(--color-cyan-hairline)' }}>|</span>
          <HudBadge label={`INDEX: ${filteredRepos.length}/${repos.length}`} showDot active />
        </div>

        <h1 className="repos-title">
          COLLECTIVE REPOSITORIES
        </h1>

        <p className="repos-desc">
          Automated GitHub pipeline aggregating open-source repositories and architectural codebases
          authored by Arbaz Arshad and Devesh Das.
        </p>
      </div>

      {/* 2. TACTICAL CONTROLS TOOLBAR */}
      <div className="repos-toolbar">
        {/* Top Toolbar: Developer Selectors + Search Input */}
        <div className="repos-toolbar-top">
          <div className="repos-developer-filters">
            <ChamferButton
              id="repo-filter-all"
              size="sm"
              variant={devFilter === 'all' ? 'inverted' : 'faint'}
              icon={<GitBranch size={13} />}
              onClick={() => setDevFilter('all')}
            >
              ALL PROJECTS [{repos.length}]
            </ChamferButton>

            <ChamferButton
              id="repo-filter-arbaz"
              size="sm"
              variant={devFilter === 'arbaz' ? 'inverted' : 'faint'}
              onClick={() => setDevFilter('arbaz')}
            >
              ARBAZ ARSHAD [DEV-01] ({arbazCount})
            </ChamferButton>

            <ChamferButton
              id="repo-filter-devesh"
              size="sm"
              variant={devFilter === 'devesh' ? 'inverted' : 'faint'}
              onClick={() => setDevFilter('devesh')}
            >
              DEVESH DAS [DEV-02] ({deveshCount})
            </ChamferButton>
          </div>

          {/* Real-time Search Box */}
          <div className="repos-search-box">
            <Search size={14} style={{ color: 'var(--color-cyan-bright)' }} />
            <input
              id="repo-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects, tags, technologies..."
              className="repos-search-input"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-cyan-muted)',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  padding: '0 0.25rem'
                }}
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Bottom Toolbar: Language Filters + Sort Options + Refresh */}
        <div className="repos-toolbar-bottom">
          <div className="repos-language-pills">
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              color: 'var(--color-cyan-bright)',
              marginRight: '0.25rem'
            }}>
              TECH:
            </span>

            <button
              type="button"
              className={`repos-lang-pill ${langFilter === 'all' ? 'active' : ''}`}
              onClick={() => setLangFilter('all')}
            >
              ALL
            </button>

            {availableLanguages.map((lang) => (
              <button
                key={lang}
                type="button"
                className={`repos-lang-pill ${langFilter === lang ? 'active' : ''}`}
                onClick={() => setLangFilter(lang)}
              >
                {lang}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Sort Selector */}
            <div className="repos-sort-controls">
              <span>SORT:</span>
              <select
                id="repo-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="repos-sort-select"
              >
                <option value="stars">MOST STARS</option>
                <option value="updated">RECENTLY UPDATED</option>
                <option value="name">REPOSITORY NAME</option>
              </select>
            </div>

            {/* Manual Cache Refresh Trigger */}
            <button
              id="repo-btn-refresh"
              type="button"
              onClick={() => loadRepos(true)}
              className="hud-nav-link"
              title="Sync latest repositories from GitHub API"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.7rem'
              }}
            >
              <RotateCw size={12} className={loading ? 'hud-spin' : ''} />
              <span>SYNC</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. REPOSITORIES GRID OR EMPTY STATE */}
      {filteredRepos.length > 0 ? (
        <div id="repos-grid" className="repos-grid">
          {filteredRepos.map((repo) => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
        </div>
      ) : (
        <div className="repos-empty-state">
          <AlertCircle size={32} style={{ color: 'var(--color-cyan-bright)', marginBottom: '0.75rem' }} />
          <h3 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.25rem',
            color: '#ffffff',
            marginBottom: '0.5rem'
          }}>
            NO MATCHING REPOSITORIES FOUND
          </h3>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            color: 'var(--color-cyan-muted)',
            marginBottom: '1.5rem'
          }}>
            Telemetry query yielded zero projects for current filter criteria: "{searchQuery || devFilter || langFilter}"
          </p>
          <ChamferButton
            size="sm"
            variant="inverted"
            onClick={() => {
              setDevFilter('all');
              setLangFilter('all');
              setSearchQuery('');
            }}
          >
            RESET ALL FILTERS
          </ChamferButton>
        </div>
      )}
    </div>
  );
}
