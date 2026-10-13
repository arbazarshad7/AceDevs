import React, { useState, useEffect, useRef, useMemo } from 'react';
import BeveledBox from '../hud/BeveledBox';
import ChamferButton from '../hud/ChamferButton';
import CornerBrackets from '../hud/CornerBrackets';
import HudBadge from '../hud/HudBadge';
import searchEngine from '../../services/search/searchEngine';
import { Search, X, GitBranch, User, Cpu, Sparkles, CornerDownLeft, ArrowDown, ArrowUp, Activity } from 'lucide-react';
import './search.css';

/**
 * SearchModal: Tactical HUD spotlight search dialog triggered by Cmd+K / Ctrl+K
 * powered by the custom in-memory Trie and Inverted Index query engine.
 */
export default function SearchModal({
  isOpen = false,
  onClose,
  onSelectResult
}) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all'); // 'all' | 'repos' | 'team' | 'system'
  const [selectedIndex, setSelectedIndex] = useState(0);

  const inputRef = useRef(null);
  const resultsContainerRef = useRef(null);

  // Execute query via searchEngine
  const searchOutput = useMemo(() => {
    return searchEngine.search(query, { category, limit: 25 });
  }, [query, category]);

  const { results, suggestions, searchTimeMs, totalMatches } = searchOutput;

  // Auto-focus input on open
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 50);
    }
  }, [isOpen]);

  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [query, category]);

  // Keyboard navigation inside modal
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (results.length === 0) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % results.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (results[selectedIndex] && onSelectResult) {
          onSelectResult(results[selectedIndex]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, onClose, onSelectResult]);

  // Auto-scroll selected item into view
  useEffect(() => {
    if (resultsContainerRef.current) {
      const activeEl = resultsContainerRef.current.querySelector('.search-result-item.selected');
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  const getTypeIcon = (type) => {
    switch (type) {
      case 'REPOSITORY':
        return <GitBranch size={14} style={{ color: 'var(--color-cyan-bright)' }} />;
      case 'DEVELOPER':
        return <User size={14} style={{ color: '#ffd700' }} />;
      case 'ARCHITECTURE':
      default:
        return <Cpu size={14} style={{ color: 'var(--color-cyan-glow)' }} />;
    }
  };

  return (
    <div
      id="search-modal-backdrop"
      className="search-modal-backdrop"
      onClick={(e) => {
        if (e.target.id === 'search-modal-backdrop') onClose();
      }}
    >
      <div className="search-modal-dialog">
        <BeveledBox
          variant="glass"
          cornerSize={18}
          glow
          className="search-modal-box"
        >
          <CornerBrackets />

          {/* 1. SEARCH INPUT ROW */}
          <div className="search-input-header">
            <Search size={18} className="search-input-icon" />

            <input
              ref={inputRef}
              id="search-modal-input"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search repositories, founders, topics, or system architecture..."
              className="search-input-field"
              autoComplete="off"
              spellCheck="false"
            />

            {query && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => setQuery('')}
                title="Clear query"
              >
                ✕
              </button>
            )}

            <div className="search-esc-badge" onClick={onClose}>
              <span>ESC</span>
            </div>
          </div>

          {/* 2. ALGORITHMIC TELEMETRY BAR */}
          <div className="search-telemetry-bar">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Activity size={12} style={{ color: 'var(--color-cyan-bright)' }} />
              <span className="search-telemetry-text">
                ENGINE: IN-MEMORY TRIE // LATENCY:
              </span>
              <span className="search-telemetry-latency">
                {searchTimeMs}ms
              </span>
            </div>

            <div className="search-telemetry-text">
              MATCHES: [{totalMatches}]
            </div>
          </div>

          {/* 3. PREFIX AUTOCOMPLETE SUGGESTIONS (from Trie) */}
          {suggestions.length > 0 && (
            <div className="search-suggestions-row">
              <span className="search-suggestions-label">
                <Sparkles size={11} /> TRIE SUGGESTIONS:
              </span>
              <div className="search-suggestions-pills">
                {suggestions.map((sug) => (
                  <button
                    key={sug}
                    type="button"
                    className="search-suggestion-pill"
                    onClick={() => setQuery(sug)}
                  >
                    #{sug}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 4. CATEGORY FILTER TABS */}
          <div className="search-category-tabs">
            <button
              type="button"
              className={`search-cat-tab ${category === 'all' ? 'active' : ''}`}
              onClick={() => setCategory('all')}
            >
              ALL RESULTS
            </button>
            <button
              type="button"
              className={`search-cat-tab ${category === 'repos' ? 'active' : ''}`}
              onClick={() => setCategory('repos')}
            >
              REPOSITORIES
            </button>
            <button
              type="button"
              className={`search-cat-tab ${category === 'team' ? 'active' : ''}`}
              onClick={() => setCategory('team')}
            >
              FOUNDERS
            </button>
            <button
              type="button"
              className={`search-cat-tab ${category === 'system' ? 'active' : ''}`}
              onClick={() => setCategory('system')}
            >
              ARCHITECTURE
            </button>
          </div>

          {/* 5. SEARCH RESULTS LIST */}
          <div ref={resultsContainerRef} id="search-results-list" className="search-results-list">
            {results.length > 0 ? (
              results.map((item, idx) => (
                <div
                  key={item.id}
                  id={`search-item-${idx}`}
                  className={`search-result-item ${idx === selectedIndex ? 'selected' : ''}`}
                  onClick={() => onSelectResult && onSelectResult(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                >
                  <div className="search-item-left">
                    <span className="search-item-icon">
                      {getTypeIcon(item.type)}
                    </span>

                    <div className="search-item-details">
                      <div className="search-item-header">
                        <span className="search-item-title">
                          {item.title || item.name}
                        </span>

                        {item.owner?.code && (
                          <span className="search-item-badge">
                            [{item.owner.code}]
                          </span>
                        )}

                        {item.code && (
                          <span className="search-item-badge">
                            [{item.code}]
                          </span>
                        )}

                        <span className="search-item-type">
                          {item.type}
                        </span>
                      </div>

                      <p className="search-item-desc">
                        {item.description || item.bio || item.designation}
                      </p>
                    </div>
                  </div>

                  <div className="search-item-right">
                    {item._score !== undefined && (
                      <span className="search-item-score">
                        SCORE: {item._score}
                      </span>
                    )}

                    <span className="search-item-enter-hint">
                      <CornerDownLeft size={12} />
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="search-empty-results">
                <p>No indexed artifacts matched query: "{query}"</p>
                <span style={{ fontSize: '0.72rem', opacity: 0.6 }}>
                  Try querying tags like 'webgl', 'distributed', 'go', or founder names
                </span>
              </div>
            )}
          </div>

          {/* 6. KEYBOARD NAVIGATION FOOTER */}
          <div className="search-footer-shortcuts">
            <div className="search-shortcut-item">
              <span className="search-key">↑</span>
              <span className="search-key">↓</span>
              <span>NAVIGATE</span>
            </div>

            <div className="search-shortcut-item">
              <span className="search-key">ENTER</span>
              <span>SELECT</span>
            </div>

            <div className="search-shortcut-item">
              <span className="search-key">ESC</span>
              <span>CLOSE</span>
            </div>
          </div>
        </BeveledBox>
      </div>
    </div>
  );
}
