import React, { useState, useEffect, useRef } from 'react';
import BeveledBox from '../hud/BeveledBox';
import ChamferButton from '../hud/ChamferButton';
import CornerBrackets from '../hud/CornerBrackets';
import HudBadge from '../hud/HudBadge';
import { useAuth } from '../../context/AuthContext';
import { Shield, Lock, Mail, Eye, EyeOff, AlertTriangle, LogIn, UserPlus, CheckCircle2, RotateCw, X } from 'lucide-react';
import './auth.css';

/**
 * AuthModal: Tactical Sci-Fi HUD Access Gateway dialog
 * supporting Google OAuth 2.0 and Direct Email/Password developer authentication.
 */
export default function AuthModal({
  isOpen = false,
  onClose
}) {
  const {
    user,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    connectionStatus,
    authError,
    clearError,
    isDeveloper,
    developerProfile
  } = useAuth();

  const [mode, setMode] = useState('signin'); // 'signin' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const emailInputRef = useRef(null);

  // Focus input and reset state on open
  useEffect(() => {
    if (isOpen) {
      setValidationError('');
      setSuccessMessage('');
      clearError();
      setTimeout(() => {
        if (emailInputRef.current) emailInputRef.current.focus();
      }, 50);
    }
  }, [isOpen, clearError]);

  // Escape key close listener
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = () => {
    if (!email.trim()) {
      setValidationError('ACCESS_ID (Email) is required.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setValidationError('Invalid ACCESS_ID format. Expected standard RFC email format.');
      return false;
    }
    if (!password) {
      setValidationError('PASSPHRASE is required.');
      return false;
    }
    if (password.length < 6) {
      setValidationError('PASSPHRASE must be at least 6 characters in length.');
      return false;
    }
    setValidationError('');
    return true;
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setValidationError('');
    setSuccessMessage('');

    try {
      if (mode === 'signin') {
        const res = await signInWithEmail(email.trim(), password);
        if (res.success) {
          setSuccessMessage('AUTHENTICATION VERIFIED // ACCESS GRANTED');
          setTimeout(() => {
            onClose();
          }, 800);
        }
      } else {
        const res = await signUpWithEmail(email.trim(), password);
        if (res.success) {
          setSuccessMessage('DEVELOPER PROFILE REGISTERED // SESSION ACTIVE');
          setTimeout(() => {
            onClose();
          }, 800);
        }
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setSubmitting(true);
    setValidationError('');
    try {
      const res = await signInWithGoogle();
      if (res.success) {
        setSuccessMessage('INITIATING GOOGLE OAUTH 2.0 PROTOCOL...');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handlePresetLogin = async (presetEmail, devName) => {
    setEmail(presetEmail);
    setPassword('acedevs-sec-pass');
    setSubmitting(true);
    setValidationError('');
    try {
      const res = await signInWithEmail(presetEmail, 'acedevs-sec-pass');
      if (res.success) {
        setSuccessMessage(`ACCESS GRANTED // WELCOME ${devName.toUpperCase()}`);
        setTimeout(() => {
          onClose();
        }, 700);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      id="auth-modal-backdrop"
      className="auth-modal-backdrop"
      onClick={(e) => {
        if (e.target.id === 'auth-modal-backdrop') onClose();
      }}
    >
      <div id="auth-modal-dialog" className="auth-modal-dialog">
        <BeveledBox
          variant="glass"
          cornerSize={18}
          glow
          className="auth-modal-box"
        >
          <CornerBrackets />

          {/* 1. HEADER & CLOSE TRIGGER */}
          <div className="auth-header">
            <div className="auth-header-left">
              <Shield size={20} style={{ color: 'var(--color-cyan-bright)' }} />
              <div>
                <h2 className="auth-title">SECURITY ACCESS GATEWAY</h2>
                <div className="auth-subtitle">
                  ACEDEVS // GOTRUE OAUTH 2.0 PROTOCOL
                </div>
              </div>
            </div>

            <button
              id="auth-btn-close"
              type="button"
              className="auth-close-btn"
              onClick={onClose}
              title="Close (Escape)"
            >
              ✕ ESC
            </button>
          </div>

          {/* 2. TELEMETRY STATUS BAR */}
          <div className="auth-telemetry-bar">
            <div className="auth-telemetry-status">
              <span className="auth-pulse-dot" />
              <span>
                STATUS: {connectionStatus?.status || 'ONLINE'}
              </span>
              {connectionStatus?.latencyMs > 0 && (
                <span style={{ color: 'var(--color-cyan-bright)' }}>
                  ({connectionStatus.latencyMs}ms)
                </span>
              )}
            </div>

            <div style={{ color: 'var(--color-cyan-muted)' }}>
              ENCRYPTION: TLS 1.3 / AES-256
            </div>
          </div>

          {/* 3. ALREADY AUTHENTICATED BANNER */}
          {user && (
            <div style={{
              background: 'rgba(85, 255, 153, 0.12)',
              border: '1px solid rgba(85, 255, 153, 0.35)',
              padding: '0.85rem',
              marginBottom: '1.25rem',
              textAlign: 'left'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                <CheckCircle2 size={16} style={{ color: '#55ff99' }} />
                <strong style={{ fontFamily: 'var(--font-heading)', color: '#ffffff', fontSize: '0.88rem' }}>
                  ACTIVE SESSION DETECTED
                </strong>
                {developerProfile && (
                  <HudBadge label={developerProfile.code} active />
                )}
              </div>
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: 'var(--color-cyan-muted)',
                margin: '0 0 0.5rem 0'
              }}>
                Authenticated as: <strong style={{ color: '#ffffff' }}>{user.email}</strong> ({developerProfile?.name || 'Authorized Member'})
              </p>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <ChamferButton
                  size="sm"
                  variant="inverted"
                  onClick={onClose}
                >
                  CONTINUE TO PORTFOLIO
                </ChamferButton>
              </div>
            </div>
          )}

          {/* 4. MODE SWITCH TABS */}
          <div className="auth-mode-tabs">
            <button
              id="auth-tab-signin"
              type="button"
              className={`auth-mode-tab ${mode === 'signin' ? 'active' : ''}`}
              onClick={() => { setMode('signin'); setValidationError(''); }}
            >
              SIGN IN [DIRECT ACCESS]
            </button>
            <button
              id="auth-tab-signup"
              type="button"
              className={`auth-mode-tab ${mode === 'signup' ? 'active' : ''}`}
              onClick={() => { setMode('signup'); setValidationError(''); }}
            >
              REGISTER DEVELOPER [NEW]
            </button>
          </div>

          {/* 5. GOOGLE OAUTH SECTION */}
          <div className="auth-oauth-section">
            <button
              id="btn-google-oauth"
              type="button"
              className="auth-oauth-btn"
              onClick={handleGoogleSignIn}
              disabled={submitting}
            >
              <svg viewBox="0 0 24 24" width="18" height="18">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.15z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>CONTINUE WITH GOOGLE [OAUTH 2.0]</span>
            </button>
          </div>

          {/* 6. DIVIDER */}
          <div className="auth-divider">
            <div className="auth-divider-line" />
            <span className="auth-divider-text">OR DIRECT DEVELOPER CREDENTIALS</span>
            <div className="auth-divider-line" />
          </div>

          {/* 7. ERROR OR SUCCESS BANNER */}
          {(validationError || authError) && (
            <div id="auth-error-banner" className="auth-alert-banner" style={{ marginBottom: '1rem' }}>
              <AlertTriangle size={15} style={{ flexShrink: 0 }} />
              <span>{validationError || authError}</span>
            </div>
          )}

          {successMessage && (
            <div id="auth-success-banner" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.65rem 0.85rem',
              background: 'rgba(85, 255, 153, 0.12)',
              border: '1px solid rgba(85, 255, 153, 0.4)',
              color: '#55ff99',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              marginBottom: '1rem'
            }}>
              <CheckCircle2 size={15} style={{ flexShrink: 0 }} />
              <span>{successMessage}</span>
            </div>
          )}

          {/* 8. DIRECT FORM */}
          <form className="auth-form" onSubmit={handleEmailSubmit}>
            <div className="auth-input-group">
              <label htmlFor="auth-input-email" className="auth-input-label">
                ACCESS_ID // EMAIL
              </label>
              <div className="auth-input-wrapper">
                <input
                  ref={emailInputRef}
                  id="auth-input-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="developer@acedevs.io"
                  className="auth-input"
                  autoComplete="email"
                  spellCheck="false"
                />
              </div>
            </div>

            <div className="auth-input-group">
              <label htmlFor="auth-input-password" className="auth-input-label">
                PASSPHRASE // KEY
              </label>
              <div className="auth-input-wrapper">
                <input
                  id="auth-input-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="auth-input"
                  autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                />
                <button
                  type="button"
                  className="auth-toggle-pwd"
                  onClick={() => setShowPassword(!showPassword)}
                  title={showPassword ? 'Hide passphrase' : 'Show passphrase'}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <div style={{ marginTop: '0.5rem' }}>
              <ChamferButton
                id="btn-auth-submit"
                variant="inverted"
                size="md"
                type="submit"
                disabled={submitting}
                style={{ width: '100%', justifyContent: 'center' }}
                icon={submitting ? <RotateCw size={14} className="hud-spin" /> : mode === 'signin' ? <LogIn size={14} /> : <UserPlus size={14} />}
              >
                {submitting
                  ? 'VERIFYING CREDENTIALS...'
                  : mode === 'signin'
                    ? 'AUTHENTICATE ACCESS'
                    : 'REGISTER DEVELOPER ACCOUNT'}
              </ChamferButton>
            </div>
          </form>

          {/* 9. PRESET DEVELOPER QUICK-LOGIN BUTTONS (For seamless review & verification) */}
          <div className="auth-preset-section">
            <span className="auth-preset-title">
              DEVELOPER BYPASS // PRESET ACCESS TOKENS:
            </span>
            <div className="auth-preset-pills">
              <button
                id="btn-preset-arbaz"
                type="button"
                className="auth-preset-pill"
                onClick={() => handlePresetLogin('arbaz@acedevs.io', 'Arbaz Arshad')}
              >
                [DEV-01] ARBAZ ARSHAD
              </button>
              <button
                id="btn-preset-devesh"
                type="button"
                className="auth-preset-pill"
                onClick={() => handlePresetLogin('devesh@acedevs.io', 'Devesh Das')}
              >
                [DEV-02] DEVESH DAS
              </button>
            </div>
          </div>

          {/* 10. FOOTER SHORTCUTS */}
          <div className="auth-footer">
            <span>[ESC] CANCEL</span>
            <span>[ENTER] SUBMIT</span>
          </div>
        </BeveledBox>
      </div>
    </div>
  );
}
