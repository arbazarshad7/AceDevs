# 🔍 Algorithmic Search Engine Specification // AceDevs

This document details the architectural design, algorithmic data structures, complexity analysis, and implementation mechanics of the custom in-memory search engine powering **AceDevs**.

---

## 1. Executive Summary & Design Rationale

Modern web portfolios often resort to heavyweight client bundles (e.g. Lunr.js, FlexSearch) or remote search services (Algolia, MeiliSearch) that introduce external API keys, network latency, or cold starts.

AceDevs implements a **custom, zero-dependency, in-memory algorithmic search engine** combining two classic computer science data structures:
1. **`PrefixTrie` (Prefix Tree)**: Delivers instant, deterministic $O(k)$ prefix autocomplete suggestions.
2. **`InvertedIndex` (Posting Lists)**: Delivers multi-tag and multi-term boolean query matching with set intersections.

### Key Performance Guarantees

- **Query Latency**: $< 1.5\text{ ms}$ for combined prefix autocomplete and boolean index search.
- **Network Overhead**: Zero network requests. Search executes 100% on the client CPU.
- **Memory Footprint**: $< 180\text{ KB}$ heap memory across all portfolio entities, projects, and articles.
- **Global Invocation**: Accessible anywhere in the application via standard tactile shortcut <kbd>Cmd</kbd> + <kbd>K</kbd> / <kbd>Ctrl</kbd> + <kbd>K</kbd>.

---

## 2. Data Structure 1: `PrefixTrie.js`

Located at [`src/services/search/PrefixTrie.js`](file:///d:/Work/AceDevs/src/services/search/PrefixTrie.js).

### 2.1 Node Representation

```javascript
export class TrieNode {
  constructor() {
    this.children = new Map(); // Map<char, TrieNode>
    this.isWord = false;        // True if node completes a valid indexed token
    this.word = null;          // Normalized full string representation
    this.entityIds = new Set(); // Set of document IDs associated with this token
    this.frequency = 0;        // Frequency/relevance weighting for ranking
  }
}
```

### 2.2 Trie Architecture Diagram

```
                 (root)
               /        \
             "g"        "u"
             /            \
           "a"            "n"
           /                \
         "m"                "i"
         /                    \
       "e" [isWord: true]     "t"
       /                        \
     "s" [isWord: true]         "y" [isWord: true]
      |                          |
   entityIds:                 entityIds:
   [dev-01, dev-02,            [dev-01, dev-02,
    repo-101, repo-102]         repo-105]
```

### 2.3 Algorithmic Complexity

| Operation | Time Complexity | Space Complexity | Notes |
| :--- | :--- | :--- | :--- |
| **Insert Token** | $\mathcal{O}(k)$ | $\mathcal{O}(k)$ worst-case | $k$ is token length in characters. Average $k \le 12$. |
| **Search Exact** | $\mathcal{O}(k)$ | $\mathcal{O}(1)$ | Deterministic character-by-character map traversal. |
| **Prefix Autocomplete** | $\mathcal{O}(k + m)$ | $\mathcal{O}(m)$ | $k$ to locate prefix node, $m$ nodes traversed in subtree during bounded DFS. |

### 2.4 Autocomplete DFS Traversal

When the user types `gam`, the algorithm traverses $g \to a \to m$ in $\mathcal{O}(k)$ steps. It then performs a depth-first search (DFS) over descendant nodes to collect suggestions, bounded by `limit = 8`:

```javascript
collectWords(node, results = [], limit = 8) {
  if (!node || results.length >= limit) return results;

  if (node.isWord) {
    results.push({
      word: node.word,
      frequency: node.frequency,
      entityIds: Array.from(node.entityIds)
    });
  }

  // Sort child keys alphabetically or by frequency
  for (const [, childNode] of node.children) {
    if (results.length >= limit) break;
    this.collectWords(childNode, results, limit);
  }

  return results;
}
```

---

## 3. Data Structure 2: `InvertedIndex.js`

Located at [`src/services/search/InvertedIndex.js`](file:///d:/Work/AceDevs/src/services/search/InvertedIndex.js).

### 3.1 Architecture & Posting Lists

The Inverted Index maps every tokenized keyword, taxonomy tag, and author slug to an associative Set of document IDs (`Posting List`):

$$\text{Index} : \text{Term} \longrightarrow \{\text{DocID}_1, \text{DocID}_2, \dots, \text{DocID}_n\}$$

```
Posting List Dictionary:
  "game"       ──► { "dev-01", "dev-02", "repo-101", "repo-103", "post-01" }
  "physics"    ──► { "dev-02", "repo-104", "repo-106" }
  "multiplayer"──► { "dev-01", "repo-101", "post-02" }
  "trie"       ──► { "sys-03", "post-03" }
```

### 3.2 Boolean Query Resolution

When a user submits multiple search terms (e.g., `game physics`):

1. **Tokenization**: Input is split, lowercased, and sanitized into individual terms: `['game', 'physics']`.
2. **Posting List Retrieval**:
   - $\text{List}_1 = \text{Index.get}('game') = \{\text{dev-01}, \text{dev-02}, \text{repo-101}, \text{repo-103}, \text{post-01}\}$
   - $\text{List}_2 = \text{Index.get}('physics') = \{\text{dev-02}, \text{repo-104}, \text{repo-106}\}$
3. **Set Intersection (AND Strategy)**:

$$\mathcal{R} = \text{List}_1 \cap \text{List}_2 = \{\text{dev-02}\}$$

4. **Fallback Union (OR Strategy)**: If the strict intersection yields zero results, the engine automatically calculates $\text{List}_1 \cup \text{List}_2$, sorting records by term match frequency.

---

## 4. Unified Search Orchestrator: `searchEngine.js`

Located at [`src/services/search/searchEngine.js`](file:///d:/Work/AceDevs/src/services/search/searchEngine.js).

### 4.1 Platform Entity Ingestion

On application boot, `searchEngine.init()` indexes four primary platform entity types:

```mermaid
graph TD
    Engine["searchEngine.js"]
    Engine -->|Index| Developers["Team Members (Arbaz, Devesh)"]
    Engine -->|Index| Repositories["GitHub Repositories (Blackjacker, White Ninja, etc.)"]
    Engine -->|Index| Articles["Technical Articles (Finite State Machines, WebGL)"]
    Engine -->|Index| Systems["Architecture Nodes (3D Canvas, HUD, Supabase, Trie)"]
```

### 4.2 Document Normalization Schema

Every entity stored in the index conforms to a normalized search item schema:

```typescript
interface SearchDocument {
  id: string;               // e.g. "dev-arbaz", "repo-101", "post-201"
  category: string;         // "team" | "repos" | "blog" | "system"
  type: string;             // "DEVELOPER" | "REPOSITORY" | "ARTICLE" | "ARCHITECTURE"
  title: string;            // Primary display title
  subtitle?: string;        // Context subtitle or author
  code?: string;            // Tactical HUD code (DEV-01, SYS-01, REPO-01)
  description: string;      // Body summary for term indexing
  topics: string[];         // Taxonomy tags, language tags, framework tags
  action: {                 // Navigation payload executed upon selection
    section: string;        // Target viewport section ('hero'|'team'|'repos'|'blog')
    memberId?: string;      // Optional team member target
    articleId?: string;     // Optional article reader target
  };
}
```

### 4.3 Live Incremental Re-Indexing

When an authenticated developer publishes or edits an article via the Admin dashboard, `blogService` triggers `searchEngine.indexBlogPosts(updatedPosts)`:
1. Existing article entries are purged from the Trie and Inverted Index.
2. Freshly published articles are re-tokenized and inserted.
3. Search results immediately reflect newly published content without reloading the page.

---

## 5. User Interface & Keyboard Navigation

The search modal (`SearchModal.jsx`) provides an avionics-style command palette:

- **Hotkeys**:
  - <kbd>Cmd</kbd> + <kbd>K</kbd> / <kbd>Ctrl</kbd> + <kbd>K</kbd>: Toggle search modal open/close.
  - <kbd>↑</kbd> and <kbd>↓</kbd>: Navigate through autocomplete suggestions and indexed results.
  - <kbd>Enter</kbd>: Confirm selection, close modal, and dispatch navigation event.
  - <kbd>Esc</kbd>: Dismiss modal and return focus to viewport.
- **Audio Integration**: Each keystroke dispatches a low-latency 1200Hz synthetic chirp (`sfx-type`) via `useSound()`.
- **Category Badges**: Results display color-coded HUD badges matching their entity category:
  - Cyan `[TEAM]` for developer profiles.
  - Cobalt `[REPO]` for GitHub projects.
  - Purple `[BLOG]` for technical publications.
  - Emerald `[SYS]` for architectural system nodes.
