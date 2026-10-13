/**
 * TrieNode: Node unit for the in-memory Prefix Trie
 */
export class TrieNode {
  constructor() {
    this.children = new Map();
    this.isWord = false;
    this.word = null;
    this.entityIds = new Set();
    this.frequency = 0;
  }
}

/**
 * PrefixTrie: Algorithmic tree structure providing O(k) prefix matching
 * and frequency-weighted autocomplete suggestions without external dependencies.
 */
export class PrefixTrie {
  constructor() {
    this.root = new TrieNode();
    this.size = 0;
  }

  /**
   * Inserts a word token and optional associated entity ID into the Trie
   * @param {string} word - The token to index
   * @param {string|number|null} entityId - Associated entity/document ID
   * @param {number} weight - Relative priority or frequency weighting
   */
  insert(word, entityId = null, weight = 1) {
    if (!word || typeof word !== 'string') return;
    const normalized = word.trim().toLowerCase();
    if (!normalized) return;

    let current = this.root;
    for (let i = 0; i < normalized.length; i++) {
      const char = normalized[i];
      if (!current.children.has(char)) {
        current.children.set(char, new TrieNode());
      }
      current = current.children.get(char);
    }

    if (!current.isWord) {
      current.isWord = true;
      current.word = normalized;
      this.size++;
    }

    current.frequency += weight;
    if (entityId !== null && entityId !== undefined) {
      current.entityIds.add(entityId);
    }
  }

  /**
   * Checks for exact word presence and returns matching entity IDs
   * @param {string} word
   * @returns {{ found: boolean, entityIds: Array, frequency: number }}
   */
  searchExact(word) {
    if (!word || typeof word !== 'string') return { found: false, entityIds: [], frequency: 0 };
    const normalized = word.trim().toLowerCase();

    let current = this.root;
    for (let i = 0; i < normalized.length; i++) {
      const char = normalized[i];
      if (!current.children.has(char)) {
        return { found: false, entityIds: [], frequency: 0 };
      }
      current = current.children.get(char);
    }

    if (current.isWord) {
      return {
        found: true,
        entityIds: Array.from(current.entityIds),
        frequency: current.frequency
      };
    }

    return { found: false, entityIds: [], frequency: 0 };
  }

  /**
   * O(k) Prefix Autocomplete: returns descendant words matching prefix
   * @param {string} prefix - The prefix query
   * @param {number} limit - Max number of suggestions to return
   * @returns {Array<{ word: string, frequency: number, entityIds: Array }>}
   */
  getPrefixSuggestions(prefix, limit = 8) {
    if (!prefix || typeof prefix !== 'string') return [];
    const normalized = prefix.trim().toLowerCase();
    if (!normalized) return [];

    let current = this.root;
    for (let i = 0; i < normalized.length; i++) {
      const char = normalized[i];
      if (!current.children.has(char)) {
        return [];
      }
      current = current.children.get(char);
    }

    // Collect all terminal words below this prefix node
    const results = [];
    const stack = [current];

    while (stack.length > 0 && results.length < 50) {
      const node = stack.pop();

      if (node.isWord) {
        results.push({
          word: node.word,
          frequency: node.frequency,
          entityIds: Array.from(node.entityIds)
        });
      }

      // Add child nodes to stack
      for (const child of node.children.values()) {
        stack.push(child);
      }
    }

    // Rank results by frequency descending
    results.sort((a, b) => b.frequency - a.frequency);

    return results.slice(0, limit);
  }

  /**
   * Resets the Trie
   */
  clear() {
    this.root = new TrieNode();
    this.size = 0;
  }
}
