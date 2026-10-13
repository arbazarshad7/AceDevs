import React, { useState, useEffect } from 'react';
import BeveledBox from '../hud/BeveledBox';
import ChamferButton from '../hud/ChamferButton';
import CornerBrackets from '../hud/CornerBrackets';
import HudBadge from '../hud/HudBadge';
import PostEditorModal from './PostEditorModal';
import { useAuth } from '../../context/AuthContext';
import { blogService } from '../../services/blogService';
import { fetchCollectiveRepos } from '../../services/githubService';
import { TEAM_MEMBERS } from '../../data/teamData';
import {
  Shield,
  FileText,
  RotateCw,
  Users,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  ArrowLeft,
  ExternalLink,
  GitBranch,
  Activity
} from 'lucide-react';
import './admin.css';

/**
 * AdminDashboard: Level 5 administrative cockpit for lead developers
 * managing Technical Publications CMS, GitHub Repositories Sync, and Founder Profiles.
 */
export default function AdminDashboard({
  onBackToHero = null
}) {
  const { user, developerProfile } = useAuth();

  const [activeTab, setActiveTab] = useState('cms'); // 'cms' | 'github' | 'profiles'
  const [posts, setPosts] = useState([]);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  // GitHub Sync telemetry
  const [syncing, setSyncing] = useState(false);
  const [syncTelemetry, setSyncTelemetry] = useState({
    source: 'cache',
    repoCount: 11,
    lastSync: 'Within 30m TTL',
    durationMs: 0
  });

  // Subscribe to live posts updates
  useEffect(() => {
    const unsubscribe = blogService.subscribe((updatedPosts) => {
      setPosts(updatedPosts);
    });
    return () => unsubscribe();
  }, []);

  const handleCreatePost = () => {
    setEditingPost(null);
    setIsEditorOpen(true);
  };

  const handleEditPost = (post) => {
    setEditingPost(post);
    setIsEditorOpen(true);
  };

  const handleTogglePublish = async (id) => {
    await blogService.togglePublishStatus(id);
  };

  const handleDeletePost = async (id) => {
    if (window.confirm('Confirm deletion of technical publication? This action will remove it from search and public view.')) {
      await blogService.deletePost(id);
    }
  };

  const handleTriggerGithubSync = async () => {
    setSyncing(true);
    const start = performance.now();
    try {
      const result = await fetchCollectiveRepos({ forceRefresh: true });
      const duration = Math.round((performance.now() - start) * 10) / 10;
      setSyncTelemetry({
        source: result.source || 'api',
        repoCount: result.repos?.length || 0,
        lastSync: new Date().toLocaleTimeString(),
        durationMs: duration
      });
    } catch (err) {
      console.error('GitHub sync failed:', err);
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div id="admin-dashboard-cockpit" className="admin-dashboard-container">
      {/* 1. SECTION HEADER & TELEMETRY */}
      <div className="admin-header">
        <div className="admin-telemetry-banner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Shield size={14} />
            <span>SECTOR: 08 // LEVEL 5 OPERATOR:</span>
            <span style={{ color: '#ffffff', fontWeight: 700 }}>
              [{developerProfile?.code || 'DEV-01'}] {developerProfile?.name?.toUpperCase() || 'DEVELOPER'}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>CLEARANCE: LEVEL 5 // SESSION: ACTIVE</span>
          </div>
        </div>

        <div className="admin-title-row">
          <div>
            <h1 className="admin-title">DEVELOPER COCKPIT</h1>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--color-cyan-muted)', marginTop: '0.25rem' }}>
              ACEDEVS CENTRAL OPERATIONS & PUBLICATIONS CMS
            </div>
          </div>

          {onBackToHero && (
            <ChamferButton
              id="admin-btn-back-hero"
              size="sm"
              variant="faint"
              icon={<ArrowLeft size={13} />}
              onClick={onBackToHero}
            >
              RETURN TO PUBLIC VIEW [01]
            </ChamferButton>
          )}
        </div>
      </div>

      {/* 2. ADMIN TABS */}
      <div className="admin-tabs">
        <button
          id="admin-tab-cms"
          type="button"
          className={`admin-tab-btn ${activeTab === 'cms' ? 'active' : ''}`}
          onClick={() => setActiveTab('cms')}
        >
          <FileText size={14} />
          <span>[01] ARTICLE CMS ({posts.length})</span>
        </button>

        <button
          id="admin-tab-github"
          type="button"
          className={`admin-tab-btn ${activeTab === 'github' ? 'active' : ''}`}
          onClick={() => setActiveTab('github')}
        >
          <GitBranch size={14} />
          <span>[02] GITHUB AGGREGATOR SYNC</span>
        </button>

        <button
          id="admin-tab-profiles"
          type="button"
          className={`admin-tab-btn ${activeTab === 'profiles' ? 'active' : ''}`}
          onClick={() => setActiveTab('profiles')}
        >
          <Users size={14} />
          <span>[03] FOUNDER PROFILES (2)</span>
        </button>
      </div>

      {/* 3. TAB 1: ARTICLE CMS */}
      {activeTab === 'cms' && (
        <div id="admin-panel-cms">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-cyan-bright)' }}>
              DATABASE TABLE: \`posts\` // {posts.length} TOTAL ENTRIES
            </div>

            <ChamferButton
              id="admin-btn-new-post"
              size="sm"
              variant="inverted"
              icon={<Plus size={14} />}
              onClick={handleCreatePost}
            >
              NEW PUBLICATION [00]
            </ChamferButton>
          </div>

          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>STATUS</th>
                  <th>ARTICLE TITLE</th>
                  <th>AUTHOR</th>
                  <th>READ TIME</th>
                  <th>TAGS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id} id={`admin-post-row-${post.id}`}>
                    <td>
                      <span className={`admin-status-badge ${post.published ? 'admin-status-published' : 'admin-status-draft'}`}>
                        {post.published ? 'LIVE' : 'DRAFT'}
                      </span>
                    </td>
                    <td style={{ fontWeight: 700, color: '#ffffff', maxWidth: '320px' }}>
                      {post.title}
                    </td>
                    <td>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem' }}>
                        [{post.author?.code || 'DEV-01'}] {post.author?.name?.split(' ')[0]}
                      </span>
                    </td>
                    <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem' }}>
                      {post.readingTimeMinutes} MIN
                    </td>
                    <td>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--color-cyan-glow)' }}>
                        {Array.isArray(post.tags) ? post.tags.slice(0, 2).map((t) => `#${t}`).join(' ') : ''}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        <ChamferButton
                          id={`admin-btn-edit-${post.id}`}
                          size="sm"
                          variant="faint"
                          icon={<Edit size={12} />}
                          onClick={() => handleEditPost(post)}
                          title="Edit article"
                        >
                          EDIT
                        </ChamferButton>

                        <ChamferButton
                          id={`admin-btn-toggle-${post.id}`}
                          size="sm"
                          variant={post.published ? 'faint' : 'inverted'}
                          onClick={() => handleTogglePublish(post.id)}
                          title="Toggle publish status"
                        >
                          {post.published ? 'UNPUBLISH' : 'PUBLISH'}
                        </ChamferButton>

                        <button
                          id={`admin-btn-delete-${post.id}`}
                          type="button"
                          onClick={() => handleDeletePost(post.id)}
                          title="Delete article"
                          style={{
                            background: 'rgba(255, 85, 85, 0.1)',
                            border: '1px solid rgba(255, 85, 85, 0.3)',
                            color: '#ff8888',
                            padding: '0.3rem 0.5rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. TAB 2: GITHUB SYNC */}
      {activeTab === 'github' && (
        <div id="admin-panel-github" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          <BeveledBox variant="faint" cornerSize={14} glow style={{ padding: '2rem' }}>
            <CornerBrackets />
            <h3 style={{ fontFamily: 'var(--font-heading)', color: '#ffffff', fontSize: '1.2rem', marginBottom: '0.75rem' }}>
              Automated Repository Aggregator
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-cyan-muted)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
              Synchronizes public codebases and architectures authored by Arbaz Arshad and Devesh Das directly from the GitHub REST API.
            </p>

            <ChamferButton
              id="admin-btn-sync-github"
              size="md"
              variant="inverted"
              disabled={syncing}
              icon={<RotateCw size={14} className={syncing ? 'hud-spin' : ''} />}
              onClick={handleTriggerGithubSync}
            >
              {syncing ? 'SYNCING GITHUB REPOSITORIES...' : 'FORCE REFRESH REPOSITORIES CACHE'}
            </ChamferButton>
          </BeveledBox>

          <BeveledBox variant="faint" cornerSize={14} style={{ padding: '2rem' }}>
            <h4 style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-cyan-bright)', fontSize: '0.78rem', letterSpacing: '0.1em', marginBottom: '1.25rem' }}>
              TELEMETRY & CACHE METRICS
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(213, 224, 255, 0.08)', paddingBottom: '0.5rem' }}>
                <span style={{ color: 'var(--color-cyan-muted)' }}>CACHE SOURCE:</span>
                <span style={{ color: 'var(--color-cyan-bright)' }}>{syncTelemetry.source.toUpperCase()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(213, 224, 255, 0.08)', paddingBottom: '0.5rem' }}>
                <span style={{ color: 'var(--color-cyan-muted)' }}>INGESTED REPOSITORIES:</span>
                <span style={{ color: '#ffffff' }}>{syncTelemetry.repoCount} PROJECTS</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(213, 224, 255, 0.08)', paddingBottom: '0.5rem' }}>
                <span style={{ color: 'var(--color-cyan-muted)' }}>PERSISTENCE TTL:</span>
                <span style={{ color: '#55ff99' }}>30 MINUTES</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(213, 224, 255, 0.08)', paddingBottom: '0.5rem' }}>
                <span style={{ color: 'var(--color-cyan-muted)' }}>LAST SYNC TIMESTAMP:</span>
                <span style={{ color: '#ffffff' }}>{syncTelemetry.lastSync}</span>
              </div>
              {syncTelemetry.durationMs > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-cyan-muted)' }}>ROUNDTRIP LATENCY:</span>
                  <span style={{ color: 'var(--color-cyan-bright)' }}>{syncTelemetry.durationMs}ms</span>
                </div>
              )}
            </div>
          </BeveledBox>
        </div>
      )}

      {/* 5. TAB 3: FOUNDER PROFILES */}
      {activeTab === 'profiles' && (
        <div id="admin-panel-profiles" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
          {TEAM_MEMBERS.map((member) => (
            <BeveledBox key={member.id} variant="faint" cornerSize={14} glow style={{ padding: '2rem' }}>
              <CornerBrackets />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <HudBadge label={member.code} active />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--color-cyan-muted)' }}>
                  CLEARANCE: VERIFIED
                </span>
              </div>

              <h3 style={{ fontFamily: 'var(--font-heading)', color: '#ffffff', fontSize: '1.3rem', marginBottom: '0.35rem' }}>
                {member.name}
              </h3>

              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-cyan-bright)', marginBottom: '1rem' }}>
                // {member.designation}
              </div>

              <p style={{ fontSize: '0.85rem', color: 'var(--color-cyan-muted)', lineHeight: '1.6', marginBottom: '1.25rem' }}>
                {member.bio}
              </p>

              <div style={{ borderTop: '1px solid rgba(213, 224, 255, 0.1)', paddingTop: '1rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--color-cyan-bright)', display: 'block', marginBottom: '0.5rem' }}>
                  CORE ARCHITECTURAL SPECIALTIES:
                </span>
                <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                  {member.specialties.map((s) => (
                    <span key={s.name} style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.65rem',
                      background: 'rgba(213, 224, 255, 0.08)',
                      padding: '0.15rem 0.4rem',
                      color: 'var(--color-cyan-glow)'
                    }}>
                      {s.name} ({s.level}%)
                    </span>
                  ))}
                </div>
              </div>
            </BeveledBox>
          ))}
        </div>
      )}

      {/* POST EDITOR MODAL */}
      <PostEditorModal
        isOpen={isEditorOpen}
        post={editingPost}
        onClose={() => setIsEditorOpen(false)}
        onSave={(saved) => {
          console.log('Post saved successfully:', saved);
        }}
      />
    </div>
  );
}
