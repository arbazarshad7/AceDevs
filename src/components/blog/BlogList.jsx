import React, { useState, useMemo } from 'react';
import BeveledBox from '../hud/BeveledBox';
import ChamferButton from '../hud/ChamferButton';
import CornerBrackets from '../hud/CornerBrackets';
import HudBadge from '../hud/HudBadge';
import { BLOG_POSTS } from '../../data/blogPosts';
import { BookOpen, Search, Calendar, Clock, ArrowRight, ArrowLeft, Filter, Sparkles, User, AlertCircle } from 'lucide-react';
import './blog.css';

/**
 * BlogList: Tactical HUD technical publication archive stage
 * featuring multi-criteria author & tag filtering, live search, and telemetry sync.
 */
export default function BlogList({
  posts = BLOG_POSTS,
  onSelectArticle,
  onBackToHero = null,
  initialAuthorFilter = 'all'
}) {
  const [authorFilter, setAuthorFilter] = useState(initialAuthorFilter); // 'all' | 'arbaz' | 'devesh'
  const [tagFilter, setTagFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tagsSet = new Set();
    posts.forEach((p) => {
      if (Array.isArray(p.tags)) {
        p.tags.forEach((t) => tagsSet.add(t));
      }
    });
    return Array.from(tagsSet);
  }, [posts]);

  // Filter posts
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      // Author filter
      if (authorFilter !== 'all') {
        if (authorFilter === 'arbaz' && post.author?.id !== 'arbaz') return false;
        if (authorFilter === 'devesh' && post.author?.id !== 'devesh') return false;
      }

      // Tag filter
      if (tagFilter !== 'all') {
        if (!Array.isArray(post.tags) || !post.tags.includes(tagFilter)) return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const titleMatch = post.title?.toLowerCase().includes(q);
        const excerptMatch = post.excerpt?.toLowerCase().includes(q);
        const tagMatch = Array.isArray(post.tags) && post.tags.some((t) => t.toLowerCase().includes(q));
        const authorMatch = post.author?.name?.toLowerCase().includes(q);
        if (!titleMatch && !excerptMatch && !tagMatch && !authorMatch) return false;
      }

      return true;
    });
  }, [posts, authorFilter, tagFilter, searchQuery]);

  const arbazCount = posts.filter((p) => p.author?.id === 'arbaz').length;
  const deveshCount = posts.filter((p) => p.author?.id === 'devesh').length;

  const formatDate = (isoString) => {
    if (!isoString) return '';
    const d = new Date(isoString);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div id="blog-archives-stage" className="blog-stage">
      {/* 1. SECTION TELEMETRY HEADER */}
      <div className="blog-header">
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
              id="blog-btn-return-hero"
              size="sm"
              variant="faint"
              icon={<ArrowLeft size={13} />}
              onClick={onBackToHero}
            >
              RETURN TO HERO [01]
            </ChamferButton>
          )}

          <span className="hud-telemetry">SECTION: 05 // TECHNICAL ARCHIVES</span>
          <span style={{ color: 'var(--color-cyan-hairline)' }}>|</span>
          <span className="hud-telemetry" style={{ color: 'var(--color-cyan-bright)' }}>
            FEED: {filteredPosts.length} OF {posts.length} ARTICLES
          </span>
          <span style={{ color: 'var(--color-cyan-hairline)' }}>|</span>
          <HudBadge label="MARKDOWN // LIVE" showDot active />
        </div>

        <h1 className="blog-title">
          ENGINEERING ARCHIVES
        </h1>

        <p className="blog-desc">
          In-depth technical writing, architectural post-mortems, distributed systems patterns,
          and WebGL shader engineering authored by Arbaz Arshad and Devesh Das.
        </p>
      </div>

      {/* 2. TACTICAL CONTROLS TOOLBAR */}
      <div className="blog-toolbar">
        {/* Top: Author Selectors + Search Query */}
        <div className="blog-toolbar-top">
          <div className="blog-author-filters">
            <ChamferButton
              id="blog-filter-all"
              size="sm"
              variant={authorFilter === 'all' ? 'inverted' : 'faint'}
              icon={<BookOpen size={13} />}
              onClick={() => setAuthorFilter('all')}
            >
              ALL ARTICLES [{posts.length}]
            </ChamferButton>

            <ChamferButton
              id="blog-filter-arbaz"
              size="sm"
              variant={authorFilter === 'arbaz' ? 'inverted' : 'faint'}
              onClick={() => setAuthorFilter('arbaz')}
            >
              ARBAZ ARSHAD [DEV-01] ({arbazCount})
            </ChamferButton>

            <ChamferButton
              id="blog-filter-devesh"
              size="sm"
              variant={authorFilter === 'devesh' ? 'inverted' : 'faint'}
              onClick={() => setAuthorFilter('devesh')}
            >
              DEVESH DAS [DEV-02] ({deveshCount})
            </ChamferButton>
          </div>

          {/* Search Box */}
          <div className="blog-search-box">
            <Search size={14} style={{ color: 'var(--color-cyan-bright)' }} />
            <input
              id="blog-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles, topics, shaders, raft..."
              className="blog-search-input"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                style={{ background: 'none', border: 'none', color: 'var(--color-cyan-muted)', cursor: 'pointer', padding: '0 0.2rem' }}
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Bottom: Tag Filter Pills */}
        <div className="blog-toolbar-bottom">
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            color: 'var(--color-cyan-bright)',
            marginRight: '0.25rem'
          }}>
            TOPICS:
          </span>

          <button
            type="button"
            className={`blog-tag-pill ${tagFilter === 'all' ? 'active' : ''}`}
            onClick={() => setTagFilter('all')}
          >
            ALL
          </button>

          {allTags.map((t) => (
            <button
              key={t}
              type="button"
              className={`blog-tag-pill ${tagFilter === t ? 'active' : ''}`}
              onClick={() => setTagFilter(t)}
            >
              #{t}
            </button>
          ))}
        </div>
      </div>

      {/* 3. ARTICLES GRID */}
      {filteredPosts.length > 0 ? (
        <div id="blog-posts-grid" className="blog-grid">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              id={`blog-card-${post.id}`}
              className="blog-card"
              onClick={() => onSelectArticle && onSelectArticle(post.id)}
            >
              <BeveledBox
                variant="faint"
                cornerSize={14}
                glow
                style={{ padding: '1.75rem', height: '100%', display: 'flex', flexDirection: 'column' }}
              >
                <CornerBrackets />

                {/* Metadata Top Row */}
                <div className="blog-card-meta">
                  <div className="blog-card-author">
                    <HudBadge
                      label={`[${post.author.code}] ${post.author.name.toUpperCase()}`}
                      active={post.author.id === 'arbaz'}
                    />
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span className="blog-card-time">
                      <Clock size={11} style={{ verticalAlign: 'middle', marginRight: '3px' }} />
                      {post.readingTimeMinutes} MIN READ
                    </span>
                  </div>
                </div>

                {/* Post Title */}
                <h3 className="blog-card-title">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="blog-card-excerpt">
                  {post.excerpt}
                </p>

                {/* Tags & Action */}
                <div className="blog-card-footer">
                  <div className="blog-card-tags">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="blog-card-tag">
                        #{tag}
                      </span>
                    ))}
                    {post.tags.length > 3 && (
                      <span className="blog-card-tag" style={{ opacity: 0.6 }}>
                        +{post.tags.length - 3}
                      </span>
                    )}
                  </div>

                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: 'var(--color-cyan-bright)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }}>
                    READ ARTICLE <ArrowRight size={13} />
                  </span>
                </div>
              </BeveledBox>
            </div>
          ))}
        </div>
      ) : (
        <div className="blog-empty-state" style={{
          textAlign: 'center',
          padding: '4rem 1rem',
          background: 'rgba(10, 28, 61, 0.4)',
          border: '1px solid rgba(213, 224, 255, 0.15)'
        }}>
          <AlertCircle size={32} style={{ color: 'var(--color-cyan-bright)', marginBottom: '0.75rem' }} />
          <h3 style={{ fontFamily: 'var(--font-heading)', color: '#ffffff', marginBottom: '0.5rem' }}>
            NO MATCHING ARTICLES FOUND
          </h3>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--color-cyan-muted)', marginBottom: '1.5rem' }}>
            Zero articles matched search: "{searchQuery || authorFilter || tagFilter}"
          </p>
          <ChamferButton
            size="sm"
            variant="inverted"
            onClick={() => {
              setAuthorFilter('all');
              setTagFilter('all');
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
