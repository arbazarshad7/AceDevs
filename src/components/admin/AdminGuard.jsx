import React from 'react';
import BeveledBox from '../hud/BeveledBox';
import ChamferButton from '../hud/ChamferButton';
import CornerBrackets from '../hud/CornerBrackets';
import HudBadge from '../hud/HudBadge';
import { useAuth } from '../../context/AuthContext';
import { ShieldAlert, LogIn, ArrowLeft, RotateCw, Lock } from 'lucide-react';
import './admin.css';

/**
 * AdminGuard: Protected route guard restricting administrative access
 * strictly to authenticated lead developers (Arbaz Arshad & Devesh Das).
 * Unauthenticated or civilian visitors encounter a tactical 403 Lockout screen.
 */
export default function AdminGuard({
  children,
  onOpenAuthModal,
  onBackToHero
}) {
  const { user, isDeveloper, developerProfile, loading } = useAuth();

  // 1. LOADING STATE
  if (loading) {
    return (
      <div style={{
        minHeight: '65vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        fontFamily: 'var(--font-mono)',
        color: 'var(--color-cyan-bright)'
      }}>
        <RotateCw size={24} className="hud-spin" />
        <span style={{ fontSize: '0.8rem', letterSpacing: '0.12em' }}>
          VERIFYING OPERATOR CLEARANCE LEVEL 5...
        </span>
      </div>
    );
  }

  // 2. LOCKOUT SCREEN (UNAUTHENTICATED OR NON-DEVELOPER)
  if (!user || !isDeveloper) {
    return (
      <div id="admin-lockout-screen" className="admin-lockout-container">
        <BeveledBox
          variant="faint"
          cornerSize={18}
          glow
          className="admin-lockout-box"
        >
          <CornerBrackets />

          {/* Warning Icon */}
          <div className="admin-lockout-icon">
            <ShieldAlert size={48} />
          </div>

          {/* Monospace Telemetry Banner */}
          <div className="admin-lockout-telemetry">
            SECURITY PROTOCOL: RLS-GATEWAY // REASON: UNAUTHORIZED_OPERATOR
          </div>

          {/* 403 Title */}
          <h1 className="admin-lockout-title">
            ACCESS RESTRICTED
          </h1>

          <p className="admin-lockout-desc">
            Administrative sector <strong style={{ color: '#ffffff' }}>[SECTOR 08 // ADMIN]</strong> is
            strictly governed by Row-Level Security policies and reserved for verified founders{' '}
            <strong style={{ color: 'var(--color-cyan-bright)' }}>Arbaz Arshad [DEV-01]</strong> and{' '}
            <strong style={{ color: 'var(--color-cyan-bright)' }}>Devesh Das [DEV-02]</strong>.
          </p>

          {/* Action Triggers */}
          <div className="admin-lockout-actions">
            <ChamferButton
              id="btn-lockout-auth"
              variant="inverted"
              size="md"
              icon={<LogIn size={15} />}
              onClick={onOpenAuthModal}
            >
              AUTHENTICATE AS DEVELOPER [00]
            </ChamferButton>

            <ChamferButton
              id="btn-lockout-return"
              variant="faint"
              size="md"
              icon={<ArrowLeft size={15} />}
              onClick={onBackToHero}
            >
              RETURN TO PUBLIC VIEW [01]
            </ChamferButton>
          </div>
        </BeveledBox>
      </div>
    );
  }

  // 3. AUTHORIZED DEVELOPER ACCESS GRANTED
  return <>{children}</>;
}
