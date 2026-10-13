import React from 'react';
import CodeBlock from './CodeBlock';
import { AlertCircle, Info } from 'lucide-react';

/**
 * Parses inline markdown: bold, italic, inline code, and links.
 */
function renderInline(text) {
  if (!text) return null;

  // Split by inline code first
  const codeParts = text.split(/(`[^`]+`)/g);

  return codeParts.map((part, idx) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={idx}
          style={{
            background: 'rgba(10, 28, 61, 0.8)',
            border: '1px solid rgba(213, 224, 255, 0.25)',
            color: 'var(--color-cyan-bright)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85em',
            padding: '0.12rem 0.4rem',
            borderRadius: '2px'
          }}
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    // Parse bold, italic, and links inside plain text
    // Replace markdown links [text](url)
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let match;
    let lastIndex = 0;
    const elements = [];

    const str = part;
    while ((match = linkRegex.exec(str)) !== null) {
      if (match.index > lastIndex) {
        elements.push(formatFormatting(str.slice(lastIndex, match.index), `${idx}-${lastIndex}`));
      }
      elements.push(
        <a
          key={`${idx}-link-${match.index}`}
          href={match[2]}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: 'var(--color-cyan-bright)',
            textDecoration: 'underline',
            textUnderlineOffset: '3px'
          }}
        >
          {match[1]}
        </a>
      );
      lastIndex = linkRegex.lastIndex;
    }

    if (lastIndex < str.length) {
      elements.push(formatFormatting(str.slice(lastIndex), `${idx}-${lastIndex}`));
    }

    return <React.Fragment key={idx}>{elements}</React.Fragment>;
  });
}

function formatFormatting(text, keyPrefix) {
  // Parse **bold** and *italic*
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((seg, i) => {
    if (seg.startsWith('**') && seg.endsWith('**')) {
      return <strong key={`${keyPrefix}-${i}`} style={{ color: '#ffffff', fontWeight: 700 }}>{seg.slice(2, -2)}</strong>;
    }
    if (seg.startsWith('*') && seg.endsWith('*')) {
      return <em key={`${keyPrefix}-${i}`} style={{ color: 'var(--color-cyan-glow)' }}>{seg.slice(1, -1)}</em>;
    }
    return seg;
  });
}

/**
 * Sanitized AST-style Markdown renderer translating markdown documents
 * into interactive tactical HUD React components.
 */
export default function MarkdownRenderer({ content = '' }) {
  if (!content) return null;

  const lines = content.split('\n');
  const blocks = [];
  let currentCodeBlock = null;
  let currentList = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // 1. Code Block Fence Start / End
    if (line.startsWith('```')) {
      if (currentCodeBlock) {
        blocks.push(
          <CodeBlock
            key={`code-${i}`}
            code={currentCodeBlock.lines.join('\n')}
            language={currentCodeBlock.lang}
          />
        );
        currentCodeBlock = null;
      } else {
        if (currentList) {
          blocks.push(renderList(currentList, `list-${i}`));
          currentList = null;
        }
        const lang = line.replace('```', '').trim() || 'bash';
        currentCodeBlock = { lang, lines: [] };
      }
      continue;
    }

    if (currentCodeBlock) {
      currentCodeBlock.lines.push(line);
      continue;
    }

    // 2. Headings
    if (line.startsWith('# ')) {
      if (currentList) { blocks.push(renderList(currentList, `list-${i}`)); currentList = null; }
      blocks.push(
        <h1 key={`h1-${i}`} className="markdown-h1">
          {renderInline(line.slice(2))}
        </h1>
      );
      continue;
    }

    if (line.startsWith('## ')) {
      if (currentList) { blocks.push(renderList(currentList, `list-${i}`)); currentList = null; }
      blocks.push(
        <h2 key={`h2-${i}`} className="markdown-h2">
          {renderInline(line.slice(3))}
        </h2>
      );
      continue;
    }

    if (line.startsWith('### ')) {
      if (currentList) { blocks.push(renderList(currentList, `list-${i}`)); currentList = null; }
      blocks.push(
        <h3 key={`h3-${i}`} className="markdown-h3">
          {renderInline(line.slice(4))}
        </h3>
      );
      continue;
    }

    // 3. Blockquotes / Alerts
    if (line.startsWith('> ')) {
      if (currentList) { blocks.push(renderList(currentList, `list-${i}`)); currentList = null; }
      const rawQuote = line.slice(2).trim();
      const isNote = rawQuote.includes('[!NOTE]');
      const isWarning = rawQuote.includes('[!WARNING]');
      const cleanQuote = rawQuote.replace(/\[!(NOTE|WARNING)\]/, '').trim();

      blocks.push(
        <blockquote
          key={`quote-${i}`}
          className="markdown-blockquote"
          style={{
            borderLeftColor: isWarning ? '#ffaa44' : isNote ? 'var(--color-cyan-bright)' : 'rgba(213, 224, 255, 0.4)',
            background: isWarning ? 'rgba(255, 170, 68, 0.08)' : 'rgba(10, 28, 61, 0.45)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 700, color: isWarning ? '#ffaa44' : 'var(--color-cyan-bright)' }}>
            {isWarning ? <AlertCircle size={14} /> : <Info size={14} />}
            <span>{isWarning ? 'SECURITY ALERT // WARNING' : 'TELEMETRY NOTE'}</span>
          </div>
          <p style={{ margin: 0, lineHeight: 1.6 }}>{renderInline(cleanQuote)}</p>
        </blockquote>
      );
      continue;
    }

    // 4. Lists (unordered or numbered)
    const listMatch = line.match(/^(\s*)([-*]|\d+\.)\s+(.+)$/);
    if (listMatch) {
      const isOrdered = /^\d+\./.test(listMatch[2]);
      const text = listMatch[3];
      if (!currentList) {
        currentList = { ordered: isOrdered, items: [] };
      }
      currentList.items.push(text);
      continue;
    } else if (currentList) {
      blocks.push(renderList(currentList, `list-${i}`));
      currentList = null;
    }

    // 5. Blank lines
    if (!line.trim()) {
      continue;
    }

    // 6. Regular Paragraph
    blocks.push(
      <p key={`p-${i}`} className="markdown-p">
        {renderInline(line)}
      </p>
    );
  }

  if (currentList) {
    blocks.push(renderList(currentList, 'list-final'));
  }

  return (
    <article className="markdown-body">
      {blocks}
    </article>
  );
}

function renderList(listObj, key) {
  const Tag = listObj.ordered ? 'ol' : 'ul';
  return (
    <Tag key={key} className="markdown-list">
      {listObj.items.map((item, idx) => (
        <li key={idx} className="markdown-list-item">
          {renderInline(item)}
        </li>
      ))}
    </Tag>
  );
}
