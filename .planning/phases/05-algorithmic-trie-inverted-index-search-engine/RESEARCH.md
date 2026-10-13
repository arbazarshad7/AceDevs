# Phase 05: Algorithmic Trie & Inverted Index Search Engine — Technical Research

## Objective
Implement an algorithmic in-memory Trie data structure ($O(k)$ prefix lookup) and an Inverted Index query engine with multi-tag boolean intersection, coupled to a tactical Sci-Fi HUD Search Modal triggered via `Cmd+K` / `Ctrl+K`.

---

## 1. Trie Data Structure Specification (`PrefixTrie.js`)
The Trie (prefix tree) provides sub-millisecond prefix matching:
- **Node Topology**:
  ```javascript
  class TrieNode {
    constructor() {
      this.children = new Map(); // char -> TrieNode
      this.isWord = false;
      this.entityIds = new Set(); // document/entity IDs matching this exact word
      this.frequency = 0;        // popularity weighting
    }
  }
  ```
- **Time Complexities**:
  - Insert: $O(L)$ where $L$ is word length.
  - Search / Exact Match: $O(L)$.
  - Prefix Autocomplete (`getPrefixSuggestions(prefix, limit)`): $O(k + m)$ where $k$ is prefix length and $m$ is number of descendant nodes traversed up to `limit`.
- **Memory Footprint**:
  Compact memory layout using JavaScript `Map` / character keys, handling ASCII and normalized lowercase alphanumeric tokens.

---

## 2. Inverted Index Engine Specification (`InvertedIndex.js`)
The Inverted Index maps individual vocabulary tokens to sets of document postings:
- **Index Table**:
  `token -> Set<documentId>`
- **Tokenization Pipeline**:
  1. Lowercase normalization.
  2. Punctuation stripping (preserving `#` and `-` for tags like `three-js`, `c++`).
  3. Stopword removal (e.g. "and", "the", "for", "with").
  4. N-gram / sub-token splitting (e.g. `pulsar-mq` -> `pulsar`, `mq`, `pulsar-mq`).
- **Boolean Query Evaluation**:
  - Multi-term query: "webgl pulse" -> finds intersection of `index['webgl']` and `index['pulse']`. If intersection is empty, relaxes to weighted union.
  - Scoring:
    `Score = (TitleMatchWeight * 3) + (TagMatchWeight * 2) + (DescriptionMatchWeight * 1) + Math.log(Stars + 1) * 0.5`.

---

## 3. Search Corpus Aggregator (`searchEngine.js`)
Aggregates and synchronizes all searchable items across the platform:
- **Repositories**: 11+ showcase projects (names, descriptions, topics, languages).
- **Developers**: Arbaz Arshad (`DEV-01`) and Devesh Das (`DEV-02`) (roles, bios, specialties).
- **System Nodes / Sectors**: Core WebGL Engine, Supabase Auth, Telemetry Array, Blog CMS.
- **Topics / Skills**: Tags as direct first-class search entities.

---

## 4. Tactical HUD Search Modal (`Cmd+K`)
- **Keybindings**:
  - Global `keydown` listener on `(e.metaKey || e.ctrlKey) && e.key === 'k'`.
  - `Escape` to close modal.
  - `ArrowDown` / `ArrowUp` to navigate active item.
  - `Enter` to jump directly to selected project, developer card, or section.
- **HUD Visual Design**:
  - 45° chamfered modal window with hairline cyan neon border and glassmorphism backdrop.
  - Monospace input box with blinking tactical cursor and `[ESC TO CLOSE]`.
  - Live algorithmic latency telemetry: `INDEX: 48 TOKENS // TRIE LATENCY: 0.12ms`.
  - Filter category tabs: `ALL`, `PROJECTS`, `DEVELOPERS`, `TAGS`.
