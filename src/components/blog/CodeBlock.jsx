import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';

/**
 * CodeBlock: Tactical HUD terminal code viewer with language badges,
 * monospace formatting, and one-click copy-to-clipboard functionality.
 */
export default function CodeBlock({
  code = '',
  language = 'bash',
  filename = ''
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(code);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = code;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.warn('Failed to copy to clipboard', err);
    }
  };

  const lines = code.trim().split('\n');

  return (
    <div className="code-block-wrapper">
      {/* 1. TERMINAL HEADER */}
      <div className="code-block-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div style={{ display: 'flex', gap: '4px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(213, 224, 255, 0.25)' }} />
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(213, 224, 255, 0.25)' }} />
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(213, 224, 255, 0.25)' }} />
          </div>

          <span className="code-block-lang">
            [{language.toUpperCase()}]
          </span>

          {filename && (
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              color: 'var(--color-cyan-muted)'
            }}>
              // {filename}
            </span>
          )}
        </div>

        {/* Copy Button */}
        <button
          type="button"
          className={`code-copy-btn ${copied ? 'copied' : ''}`}
          onClick={handleCopy}
          title="Copy code to clipboard"
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          <span>{copied ? 'COPIED ✓' : 'COPY CODE'}</span>
        </button>
      </div>

      {/* 2. PREFORMATTED CODE WITH LINE NUMBERS */}
      <div style={{ display: 'flex', background: '#010612', overflowX: 'auto' }}>
        {/* Line numbers gutter */}
        <div style={{
          padding: '1rem 0.65rem 1rem 0.85rem',
          userSelect: 'none',
          textAlign: 'right',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          lineHeight: '1.6',
          color: 'rgba(213, 224, 255, 0.25)',
          borderRight: '1px solid rgba(213, 224, 255, 0.08)'
        }}>
          {lines.map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>

        {/* Code Content */}
        <pre className="code-block-content">
          <code>{code.trim()}</code>
        </pre>
      </div>
    </div>
  );
}
