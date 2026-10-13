import React from 'react';
import BeveledBox from '../hud/BeveledBox';
import ChamferButton from '../hud/ChamferButton';
import CornerBrackets from '../hud/CornerBrackets';
import HudBadge from '../hud/HudBadge';
import MarkdownRenderer from './MarkdownRenderer';
import { ArrowLeft, Clock, Calendar, User, Tag, Share2, BookOpen } from 'lucide-react';
import './blog.css';

/**
 * BlogArticle: Full tactical reader view for technical engineering publications
 * with telemetry metadata, author profile card, and sanitized Markdown rendering.
 */
export default function BlogArticle({
  post,
  onBackToList
}) {
  if (!post) {
    return (
      <div className="article-reader-container" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-cyan-muted)' }}>Article not found.</p>
        <ChamferButton size="sm" variant="inverted" onClick={onBackToList}>
          RETURN TO ARCHIVES
        </ChamferButton>
      </div>
    );
  }

  const formatDate = (isoString) => {
    if (!isoString) return '';
    const d = new Date(isoString);
    return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <div id="blog-article-reader" className="article-reader-container">
      {/* 1. TOP NAVIGATION ACTION */}
      <div className="article-nav-back">
        <ChamferButton
          id="btn-blog-back"
          size="sm"
          variant="faint"
          icon={<ArrowLeft size={13} />}
          onClick={onBackToList}
        >
          RETURN TO ARCHIVES [05]
        </ChamferButton>
      </div>

      {/* 2. ARTICLE HEADER BOX */}
      <BeveledBox
        variant="glass"
        cornerSize={18}
        glow
        className="article-header-box"
        style={{ padding: '2.5rem 2rem' }}
      >
        <CornerBrackets />

        {/* Telemetry Metadata Header */}
        <div className="article-meta-telemetry">
          <span>POST_ID: {post.slug.toUpperCase()}</span>
          <span style={{ color: 'var(--color-cyan-hairline)' }}>|</span>
          <span style={{ color: 'var(--color-cyan-bright)' }}>
            <Clock size={11} style={{ verticalAlign: 'middle', marginRight: '3px' }} />
            {post.readingTimeMinutes} MIN READ
          </span>
          <span style={{ color: 'var(--color-cyan-hairline)' }}>|</span>
          <span>
            <Calendar size={11} style={{ verticalAlign: 'middle', marginRight: '3px' }} />
            {formatDate(post.publishedAt)}
          </span>
          <span style={{ color: 'var(--color-cyan-hairline)' }}>|</span>
          <HudBadge label="MARKDOWN // VERIFIED" active />
        </div>

        {/* Hero Title */}
        <h1 className="article-hero-title">
          {post.title}
        </h1>

        {/* Author Metadata Card */}
        <div className="article-author-card">
          <div className="article-author-info">
            <div className="article-author-avatar">
              [{post.author.code}]
            </div>

            <div>
              <div style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1rem',
                fontWeight: 700,
                color: '#ffffff',
                letterSpacing: '0.04em'
              }}>
                {post.author.name}
              </div>

              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                color: 'var(--color-cyan-bright)',
                letterSpacing: '0.06em'
              }}>
                // {post.author.designation}
              </div>
            </div>
          </div>

          {/* Tags */}
          <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
            {post.tags.map((tag) => (
              <span key={tag} className="blog-card-tag">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* 3. MARKDOWN ARTICLE BODY */}
        <MarkdownRenderer content={post.content} />

        {/* 4. FOOTER RETURN CTA */}
        <div style={{
          marginTop: '3.5rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid rgba(213, 224, 255, 0.15)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--color-cyan-muted)' }}>
            PUBLISHED UNDER ACEDEVS COLLECTIVE ENGINEERING ARCHIVE
          </div>

          <ChamferButton
            size="sm"
            variant="inverted"
            icon={<ArrowLeft size={13} />}
            onClick={onBackToList}
          >
            RETURN TO ARCHIVES
          </ChamferButton>
        </div>
      </BeveledBox>
    </div>
  );
}
