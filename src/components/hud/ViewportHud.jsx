import React, { useState } from 'react';
import ChamferButton from './ChamferButton';
import HudBadge from './HudBadge';
import ScaleIndicator from './ScaleIndicator';
import CompassRosette from './CompassRosette';
import { useSound } from '../../context/SoundContext';
import { Search, LogIn, LogOut, Menu, Layers, Shield } from 'lucide-react';
import './viewport.css';

/**
 * ViewportHud: Fixed perimeter HUD cockpit framing that encases the application,
 * integrating Top Navigation, Left Section Rail, Bottom Scale, and Compass Rosette.
 */
export default function ViewportHud({
  children,
  activeSection = 'hero',
  onSectionSelect = null,
  onLoginClick = null,
  onLogoutClick = null,
  user = null,
  isDeveloper = false,
  developerProfile = null,
  onSearchClick = null,
  onOpenListClick = null,
  filterCount = 0,
  bearing: controlledBearing,
  onBearingChange = null
}) {
  const { playClick, playHover, playModalOpen } = useSound();
  const [internalSection, setInternalSection] = useState(activeSection);
  const [internalBearing, setInternalBearing] = useState(0);

  const currentSection = activeSection !== undefined ? activeSection : internalSection;
  const activeBearing = controlledBearing !== undefined ? controlledBearing : internalBearing;

  const handleBearingChange = (newBearing) => {
    setInternalBearing(newBearing);
    if (onBearingChange) onBearingChange(newBearing);
  };

  const navSections = [
    { id: 'hero', label: 'HERO', code: '01' },
    { id: 'showcase', label: 'SHOWCASE', code: '02' },
    { id: 'team', label: 'TEAM', code: '03' },
    { id: 'repos', label: 'REPOSITORIES', code: '04' },
    { id: 'blog', label: 'BLOG', code: '05' },
    ...(isDeveloper || currentSection === 'admin' ? [{ id: 'admin', label: 'ADMIN', code: '08' }] : [])
  ];

  const handleSectionClick = (id) => {
    playClick();
    setInternalSection(id);
    if (onSectionSelect) onSectionSelect(id);
  };

  const handleSearchTrigger = () => {
    playModalOpen();
    if (onSearchClick) onSearchClick();
  };

  return (
    <div className="viewport-hud-wrapper">
      {/* Scrollable / Interactive Page Content Area */}
      <main className="viewport-hud-content">
        {children}
      </main>

      {/* Fixed HUD Cockpit Frame Overlay */}
      <div className="viewport-hud-frame">
        {/* 1. TOP BAR */}
        <header className="hud-top-bar">
          <a href="#" className="hud-brand" onClick={(e) => { e.preventDefault(); handleSectionClick('hero'); }}>
            <div className="hud-logo-icon">
              {/* Modular Geometric Triangle Logo */}
              <svg viewBox="0 0 40 40" width="26" height="26">
                <polygon
                  points="20,2 38,36 2,36"
                  fill="none"
                  stroke="#d5e0ff"
                  strokeWidth="2.5"
                />
                <polygon
                  points="20,12 32,32 8,32"
                  fill="#d5e0ff"
                  opacity="0.85"
                />
              </svg>
            </div>
            <div className="hud-brand-title">
              ACEDEVS
            </div>
          </a>

          {/* Center Navigation Links */}
          <nav className="hud-nav-links">
            {navSections.slice(1).map((sec) => (
              <button
                key={sec.id}
                id={`nav-${sec.id}`}
                type="button"
                className={`hud-nav-link ${currentSection === sec.id ? 'active' : ''}`}
                onClick={() => handleSectionClick(sec.id)}
                onMouseEnter={playHover}
              >
                <span>{sec.label}</span>
                <span style={{ fontSize: '0.65rem', opacity: 0.6 }}>[{sec.code}]</span>
              </button>
            ))}
          </nav>

          {/* Right Top Actions */}
          <div className="hud-top-actions">
            {onSearchClick && (
              <button
                id="nav-search-btn"
                type="button"
                className="hud-nav-link"
                onClick={handleSearchTrigger}
                onMouseEnter={playHover}
                title="Search (Cmd+K / Ctrl+K)"
                style={{ padding: '0.4rem 0.6rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
              >
                <Search size={14} />
                <span>SEARCH</span>
                <span style={{ fontSize: '0.62rem', opacity: 0.65 }}>[⌘K]</span>
              </button>
            )}

            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                {isDeveloper && (
                  <ChamferButton
                    id="nav-admin-btn"
                    size="sm"
                    variant={currentSection === 'admin' ? 'inverted' : 'faint'}
                    icon={<Shield size={12} />}
                    onClick={() => handleSectionClick('admin')}
                    style={{ padding: '0.35rem 0.55rem', fontSize: '0.68rem' }}
                  >
                    ADMIN [08]
                  </ChamferButton>
                )}

                <div
                  id="hud-user-profile-badge"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.3rem 0.6rem',
                    background: 'rgba(10, 28, 61, 0.75)',
                    border: '1px solid var(--color-cyan-bright)',
                    color: '#ffffff',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    letterSpacing: '0.06em',
                    clipPath: 'polygon(3px 0%, 100% 0%, 100% calc(100% - 3px), calc(100% - 3px) 100%, 0% 100%, 0% 3px)'
                  }}
                  title={`Logged in as ${user.email}`}
                >
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#55ff99', boxShadow: '0 0 6px #55ff99' }} />
                  <span>
                    {developerProfile ? `[${developerProfile.code} // ${developerProfile.name.split(' ')[0].toUpperCase()}]` : `[${user.email.split('@')[0].toUpperCase()}]`}
                  </span>
                </div>

                <button
                  id="nav-logout-btn"
                  type="button"
                  className="hud-nav-link"
                  onClick={onLogoutClick}
                  title="Sign Out"
                  style={{ padding: '0.35rem 0.5rem', fontSize: '0.65rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                >
                  <LogOut size={12} />
                  <span>EXIT</span>
                </button>
              </div>
            ) : (
              <ChamferButton
                id="nav-login-btn"
                variant="inverted"
                size="sm"
                icon={<LogIn size={13} />}
                onClick={onLoginClick}
              >
                LOGIN [00]
              </ChamferButton>
            )}
          </div>
        </header>

        {/* 2. LEFT SECTION RAIL */}
        <aside className="hud-left-rail">
          {navSections.map((sec) => (
            <button
              key={sec.id}
              id={`rail-${sec.id}`}
              type="button"
              className={`hud-rail-item ${currentSection === sec.id ? 'active' : ''}`}
              onClick={() => handleSectionClick(sec.id)}
            >
              <span className="hud-rail-bullet" />
              <span>{sec.label}</span>
            </button>
          ))}
        </aside>

        {/* 3. BOTTOM BAR */}
        <footer className="hud-bottom-bar">
          {/* Bottom Left: Scale & Audio */}
          <ScaleIndicator
            zoom="1.0X"
            distance="500M"
            onToggleSound={(active) => console.log('Audio toggle:', active)}
          />

          {/* Center Floating Pill Trigger */}
          <div className="hud-center-action">
            <ChamferButton
              variant="primary"
              size="sm"
              icon={<Layers size={13} />}
              onClick={onOpenListClick || (() => handleSectionClick('repos'))}
            >
              OPEN PROJECT LIST
            </ChamferButton>
          </div>

          {/* Bottom Right: Filters & Heading Rosette */}
          <div className="hud-bottom-right">
            <button
              type="button"
              onClick={() => console.log('Filter drawer opened')}
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <HudBadge label="FILTERS" count={filterCount} active />
            </button>

            <CompassRosette
              bearing={activeBearing}
              onChange={handleBearingChange}
            />
          </div>
        </footer>
      </div>
    </div>
  );
}
