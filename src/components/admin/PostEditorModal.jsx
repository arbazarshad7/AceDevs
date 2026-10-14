import React, { useState, useEffect } from 'react';
import BeveledBox from '../hud/BeveledBox';
import ChamferButton from '../hud/ChamferButton';
import CornerBrackets from '../hud/CornerBrackets';
import MarkdownRenderer from '../blog/MarkdownRenderer';
import { calculateReadingTime } from '../../utils/readingTime';
import { blogService } from '../../services/blogService';
import { X, Eye, Edit3, Save, CheckCircle2, RotateCw } from 'lucide-react';

/**
 * PostEditorModal: Tactical HUD article creation & editing modal
 * featuring split-pane live Markdown preview and read-time telemetry.
 */
export default function PostEditorModal({
  isOpen = false,
  post = null,
  onClose,
  onSave
}) {
  const isEditing = Boolean(post?.id);

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [authorId, setAuthorId] = useState('arbaz');
  const [excerpt, setExcerpt] = useState('');
  const [tags, setTags] = useState('');
  const [published, setPublished] = useState(true);
  const [content, setContent] = useState('');
  const [activeTab, setActiveTab] = useState('edit'); // 'edit' | 'preview'
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (post) {
        setTitle(post.title || '');
        setSlug(post.slug || '');
        setAuthorId(post.author?.id || 'arbaz');
        setExcerpt(post.excerpt || '');
        setTags(Array.isArray(post.tags) ? post.tags.join(', ') : '');
        setPublished(post.published !== undefined ? post.published : true);
        setContent(post.content || '');
      } else {
        setTitle('');
        setSlug('');
        setAuthorId('arbaz');
        setExcerpt('');
        setTags('webgl, architecture');
        setPublished(true);
        setContent('## Introduction\n\nWrite your technical analysis here...\n\n```javascript\nconsole.log("Hello from AceDevs CMS");\n```');
      }
      setActiveTab('edit');
      setError('');
    }
  }, [isOpen, post]);

  // Auto-generate slug from title if new
  const handleTitleChange = (val) => {
    setTitle(val);
    if (!isEditing) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
    }
  };

  const { wordsCount, readingTimeMinutes } = calculateReadingTime(content);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Article title is required.');
      return;
    }
    if (!content.trim()) {
      setError('Article content cannot be empty.');
      return;
    }

    setSaving(true);
    setError('');

    try {
      const author = authorId === 'arbaz'
        ? { id: 'arbaz', code: 'DEV-01', name: 'Arbaz Arshad', designation: 'Game Developer · AI & Systems' }
        : { id: 'devesh', code: 'DEV-02', name: 'Devesh Das', designation: 'Game Developer & Computer Science Engineer' };

      const postData = {
        title,
        slug: slug.trim() || undefined,
        author,
        excerpt,
        tags,
        published,
        content
      };

      let result;
      if (isEditing) {
        result = await blogService.updatePost(post.id, postData);
      } else {
        result = await blogService.createPost(postData);
      }

      if (onSave) onSave(result);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      id="post-editor-backdrop"
      className="auth-modal-backdrop"
      onClick={(e) => {
        if (e.target.id === 'post-editor-backdrop') onClose();
      }}
    >
      <div className="editor-modal-dialog">
        <BeveledBox
          variant="glass"
          cornerSize={18}
          glow
          className="auth-modal-box"
        >
          <CornerBrackets />

          {/* 1. HEADER */}
          <div className="auth-header">
            <div>
              <h2 className="auth-title">
                {isEditing ? `EDIT PUBLICATION // [${post.id}]` : 'NEW TECHNICAL PUBLICATION'}
              </h2>
              <div className="auth-subtitle">
                TELEMETRY: {wordsCount} WORDS // {readingTimeMinutes} MIN ESTIMATE
              </div>
            </div>

            <button
              id="editor-btn-close"
              type="button"
              className="auth-close-btn"
              onClick={onClose}
            >
              ✕ ESC
            </button>
          </div>

          {/* 2. TAB TOGGLE */}
          <div className="editor-tab-row">
            <button
              id="editor-tab-edit"
              type="button"
              className={`admin-tab-btn ${activeTab === 'edit' ? 'active' : ''}`}
              onClick={() => setActiveTab('edit')}
            >
              <Edit3 size={13} />
              <span>MARKDOWN INPUT</span>
            </button>

            <button
              id="editor-tab-preview"
              type="button"
              className={`admin-tab-btn ${activeTab === 'preview' ? 'active' : ''}`}
              onClick={() => setActiveTab('preview')}
            >
              <Eye size={13} />
              <span>LIVE TACTICAL PREVIEW</span>
            </button>
          </div>

          {error && (
            <div className="auth-alert-banner" style={{ marginBottom: '1rem' }}>
              <span>{error}</span>
            </div>
          )}

          {/* 3. FORM INPUTS */}
          {activeTab === 'edit' ? (
            <form onSubmit={handleSubmit}>
              <div className="editor-form-grid">
                {/* Left Column: Title & Content */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <div className="auth-input-group">
                    <label className="auth-input-label">ARTICLE TITLE</label>
                    <input
                      id="editor-input-title"
                      type="text"
                      value={title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="e.g. Architecting Distributed Message Queues..."
                      className="auth-input"
                      required
                    />
                  </div>

                  <div className="auth-input-group">
                    <label className="auth-input-label">EXCERPT (SHORT SUMMARY)</label>
                    <textarea
                      id="editor-input-excerpt"
                      value={excerpt}
                      onChange={(e) => setExcerpt(e.target.value)}
                      placeholder="Summary snippet displayed on cards and search..."
                      className="auth-input"
                      rows={2}
                    />
                  </div>

                  <div className="auth-input-group">
                    <label className="auth-input-label">MARKDOWN CONTENT BODY</label>
                    <textarea
                      id="editor-input-content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Write full markdown body with headings, code fences, etc."
                      className="auth-input"
                      rows={12}
                      style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', lineHeight: '1.5' }}
                      required
                    />
                  </div>
                </div>

                {/* Right Column: Metadata & Settings */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <div className="auth-input-group">
                    <label className="auth-input-label">AUTHOR ATTRIBUTION</label>
                    <select
                      id="editor-select-author"
                      value={authorId}
                      onChange={(e) => setAuthorId(e.target.value)}
                      className="auth-input"
                      style={{ background: '#0a1c3d', color: '#ffffff' }}
                    >
                      <option value="arbaz">[DEV-01] Arbaz Arshad</option>
                      <option value="devesh">[DEV-02] Devesh Das</option>
                    </select>
                  </div>

                  <div className="auth-input-group">
                    <label className="auth-input-label">URL SLUG</label>
                    <input
                      id="editor-input-slug"
                      type="text"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      placeholder="custom-url-slug"
                      className="auth-input"
                    />
                  </div>

                  <div className="auth-input-group">
                    <label className="auth-input-label">TAGS (COMMA SEPARATED)</label>
                    <input
                      id="editor-input-tags"
                      type="text"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      placeholder="webgl, shaders, go, raft"
                      className="auth-input"
                    />
                  </div>

                  <div className="auth-input-group" style={{ marginTop: '0.5rem' }}>
                    <label className="auth-input-label">PUBLICATION STATUS</label>
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
                      <button
                        id="editor-btn-status-live"
                        type="button"
                        className={`admin-status-badge ${published ? 'admin-status-published' : ''}`}
                        onClick={() => setPublished(true)}
                        style={{ cursor: 'pointer', padding: '0.4rem 0.75rem' }}
                      >
                        PUBLISHED [LIVE]
                      </button>
                      <button
                        id="editor-btn-status-draft"
                        type="button"
                        className={`admin-status-badge ${!published ? 'admin-status-draft' : ''}`}
                        onClick={() => setPublished(false)}
                        style={{ cursor: 'pointer', padding: '0.4rem 0.75rem' }}
                      >
                        DRAFT [OFFLINE]
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* FOOTER ACTIONS */}
              <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '1rem',
                marginTop: '1.5rem',
                paddingTop: '1rem',
                borderTop: '1px solid rgba(213, 224, 255, 0.15)'
              }}>
                <ChamferButton
                  size="md"
                  variant="faint"
                  type="button"
                  onClick={onClose}
                >
                  CANCEL
                </ChamferButton>

                <ChamferButton
                  id="editor-btn-save"
                  size="md"
                  variant="inverted"
                  type="submit"
                  onClick={handleSubmit}
                  disabled={saving}
                  icon={saving ? <RotateCw size={14} className="hud-spin" /> : <Save size={14} />}
                >
                  {saving ? 'SAVING PUBLICATION...' : isEditing ? 'UPDATE PUBLICATION' : 'PUBLISH ARTICLE'}
                </ChamferButton>
              </div>
            </form>
          ) : (
            <div>
              <div className="editor-preview-container">
                <MarkdownRenderer content={content} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                <ChamferButton
                  size="sm"
                  variant="inverted"
                  onClick={() => setActiveTab('edit')}
                >
                  RETURN TO EDIT
                </ChamferButton>
              </div>
            </div>
          )}
        </BeveledBox>
      </div>
    </div>
  );
}
