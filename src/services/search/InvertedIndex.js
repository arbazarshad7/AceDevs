import { PrefixTrie } from './PrefixTrie.js';

const STOP_WORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and',
  'any', 'are', 'as', 'at', 'be', 'because', 'been', 'before', 'being', 'below',
  'between', 'both', 'but', 'by', 'could', 'did', 'do', 'does', 'doing', 'down',
  'during', 'each', 'few', 'for', 'from', 'further', 'had', 'has', 'have', 'having',
  'he', 'her', 'here', 'hers', 'herself', 'him', 'himself', 'his', 'how', 'i',
  'if', 'in', 'into', 'is', 'it', 'its', 'itself', 'just', 'me', 'more', 'most',
  'my', 'myself', 'no', 'nor', 'not', 'now', 'of', 'off', 'on', 'once', 'only',
  'or', 'other', 'our', 'ours', 'ourselves', 'out', 'over', 'own', 'same', 'she',
  'should', 'so', 'some', 'such', 'than', 'that', 'the', 'their', 'theirs', 'them',
  'themselves', 'then', 'there', 'these', 'they', 'this', 'those', 'through', 'to',
  'too', 'under', 'until', 'up', 'very', 'was', 'we', 'were', 'what', 'when',
  'where', 'which', 'while', 'who', 'whom', 'why', 'with', 'would', 'you', 'your'
]);

/**
 * Tokenizes arbitrary input string into normalized, searchable tokens
 * Handles tech tokens (e.g. "three-js", "c++", "node.js") and n-grams
 */
export function tokenize(text) {
  if (!text || typeof text !== 'string') return [];

  // Normalize lowercase and strip punctuation except hyphens, underscores, dots, and pluses
  const cleaned = text
    .toLowerCase()
    .replace(/[^\w\s\-+.#]/g, ' ')
    .trim();

  const rawTokens = cleaned.split(/\s+/).filter(Boolean);
  const tokenSet = new Set();

  rawTokens.forEach((t) => {
    // Trim special chars at borders
    const trimmed = t.replace(/^[^\w#]+|[^\w#]+$/g, '');
    if (!trimmed || trimmed.length < 2) return;

    if (!STOP_WORDS.has(trimmed)) {
      tokenSet.add(trimmed);
    }

    // Sub-tokenization for hyphenated/dotted terms (e.g. "pulsar-mq" -> "pulsar", "mq")
    if (trimmed.includes('-') || trimmed.includes('.')) {
      const parts = trimmed.split(/[-.]/).filter((p) => p.length >= 2 && !STOP_WORDS.has(p));
      parts.forEach((p) => tokenSet.add(p));
    }
  });

  return Array.from(tokenSet);
}

/**
 * InvertedIndex: High-performance posting index mapping vocabulary tokens
 * to entity references with boolean query intersection and BM25-style scoring.
 */
export class InvertedIndex {
  constructor() {
    this.index = new Map(); // token -> Set<docId>
    this.documents = new Map(); // docId -> document
    this.trie = new PrefixTrie(); // prefix trie for vocabulary expansions
  }

  /**
   * Adds and indexes a document entity
   * @param {Object} doc - Document with id, title, description, tags, category, etc.
   */
  addDocument(doc) {
    if (!doc || doc.id === undefined) return;
    this.documents.set(doc.id, doc);

    // Extract weighted fields
    const titleTokens = tokenize(doc.title || doc.name || '');
    const tagTokens = Array.isArray(doc.topics || doc.tags || doc.specialties)
      ? tokenize(
          (doc.topics || doc.tags || doc.specialties)
            .map((t) => (typeof t === 'string' ? t : t.name || ''))
            .join(' ')
        )
      : [];
    const metaTokens = tokenize(`${doc.category || ''} ${doc.owner?.name || ''} ${doc.sector || ''} ${doc.designation || ''}`);
    const descTokens = tokenize(doc.description || doc.bio || '');

    // 1. Index Title (Weight: 3)
    titleTokens.forEach((t) => {
      this._addTokenPosting(t, doc.id);
      this.trie.insert(t, doc.id, 3);
    });

    // 2. Index Tags & Specialties (Weight: 2)
    tagTokens.forEach((t) => {
      this._addTokenPosting(t, doc.id);
      this.trie.insert(t, doc.id, 2);
    });

    // 3. Index Meta (Weight: 2)
    metaTokens.forEach((t) => {
      this._addTokenPosting(t, doc.id);
      this.trie.insert(t, doc.id, 2);
    });

    // 4. Index Description (Weight: 1)
    descTokens.forEach((t) => {
      this._addTokenPosting(t, doc.id);
      this.trie.insert(t, doc.id, 1);
    });
  }

  _addTokenPosting(token, docId) {
    if (!this.index.has(token)) {
      this.index.set(token, new Set());
    }
    this.index.get(token).add(docId);
  }

  /**
   * Queries the inverted index with boolean intersection and relevance ranking
   * @param {string} queryString
   * @param {Object} options
   * @returns {{ results: Array, suggestions: Array, totalMatches: number }}
   */
  query(queryString, options = {}) {
    const { category = 'all', limit = 20 } = options;

    if (!queryString || !queryString.trim()) {
      // Return default documents filtered by category
      let allDocs = Array.from(this.documents.values());
      if (category !== 'all') {
        allDocs = allDocs.filter((d) => d.category === category);
      }
      return {
        results: allDocs.slice(0, limit),
        suggestions: [],
        totalMatches: allDocs.length
      };
    }

    const queryTokens = tokenize(queryString);
    if (queryTokens.length === 0) {
      return { results: [], suggestions: [], totalMatches: 0 };
    }

    // Collect prefix suggestions from the Trie for the last query token
    const lastToken = queryTokens[queryTokens.length - 1];
    const prefixSuggestions = this.trie
      .getPrefixSuggestions(lastToken, 6)
      .map((s) => s.word);

    // Map each document ID to a computed relevance score and match statistics
    const scores = new Map(); // docId -> { score, matchedTokens: Set, termHitCount: Map }

    queryTokens.forEach((token) => {
      // 1. Direct exact token postings
      const exactDocIds = this.index.get(token) || new Set();

      // 2. Prefix expansions if no exact hits or short token
      const expandedTokens = [token];
      if (exactDocIds.size === 0 || token.length >= 3) {
        const trieMatches = this.trie.getPrefixSuggestions(token, 4);
        trieMatches.forEach((tm) => {
          if (tm.word !== token) expandedTokens.push(tm.word);
        });
      }

      // Score documents for this query token
      expandedTokens.forEach((expToken) => {
        const docIds = this.index.get(expToken) || new Set();
        const isExact = expToken === token;
        const baseWeight = isExact ? 4.0 : 2.0;

        docIds.forEach((docId) => {
          if (!scores.has(docId)) {
            scores.set(docId, { score: 0, matchedTokens: new Set() });
          }

          const entry = scores.get(docId);
          entry.score += baseWeight;
          entry.matchedTokens.add(token);

          // Deep field boosts
          const doc = this.documents.get(docId);
          if (doc) {
            const titleLower = (doc.title || doc.name || '').toLowerCase();
            if (titleLower.includes(token)) {
              entry.score += 8.0; // Huge boost for title match
            }
            if (Array.isArray(doc.topics) && doc.topics.some((t) => t.toLowerCase().includes(token))) {
              entry.score += 4.0; // Boost for tag match
            }
          }
        });
      });
    });

    // Multi-term boolean intersection multiplier:
    // If a document matches ALL tokens in the query, multiply score!
    scores.forEach((entry, docId) => {
      if (queryTokens.length > 1 && entry.matchedTokens.size === queryTokens.length) {
        entry.score += 15.0; // Boolean intersection reward
      }

      // Add popularity factor if available
      const doc = this.documents.get(docId);
      if (doc && doc.stars) {
        entry.score += Math.log(doc.stars + 1) * 0.4;
      }
    });

    // Filter by category and format results
    let ranked = Array.from(scores.entries())
      .map(([docId, meta]) => {
        const doc = this.documents.get(docId);
        return {
          ...doc,
          _score: Math.round(meta.score * 10) / 10,
          _matchedTokens: Array.from(meta.matchedTokens)
        };
      })
      .filter((doc) => {
        if (!doc) return false;
        if (category !== 'all' && doc.category !== category) return false;
        return true;
      })
      .sort((a, b) => b._score - a._score);

    return {
      results: ranked.slice(0, limit),
      suggestions: prefixSuggestions,
      totalMatches: ranked.length
    };
  }

  /**
   * Clears the entire index
   */
  clear() {
    this.index.clear();
    this.documents.clear();
    this.trie.clear();
  }
}
