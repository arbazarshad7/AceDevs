# Phase 07: Technical Engineering Blog System — Technical Research

## Objective
Construct a high-performance Markdown-powered technical publication and article reader system featuring author attribution (`DEV-01` Arbaz Arshad, `DEV-02` Devesh Das), syntax-highlighted code blocks with copy utilities, read-time calculation, multi-tag filtering, and integration with the in-memory Trie search engine.

---

## 1. Markdown Parsing & Syntax Highlighting Architecture (`BLOG-02`)

### Architectural Choice
For an ultra-fast, zero-dependency, and strictly security-isolated client environment:
- **Parser Design**:
  - Structured AST-based or rule-based Markdown lexer/renderer that translates Markdown tokens into semantic React elements:
    - Headings (`#`, `##`, `###`) with anchor IDs and cybernetic accent dividers.
    - Code blocks (` ```lang ... ``` `) with language badges, copy-to-clipboard buttons, line numbers, and keyword coloring.
    - Blockquotes and tactical callouts (`> [!NOTE]`, `> [!WARNING]`).
    - Lists (ordered, unordered, checkboxes).
    - Inline formatting (`**bold**`, `*italic*`, `` `inline code` ``, links).
    - Tables with border hairlines and monospace headers.
- **Benefits**:
  - Zero heavy external dependencies or bundling conflicts with Vite.
  - Immune to malicious raw HTML injection (XSS-safe tokenization).
  - Pixel-perfect compliance with the AceDevs 45° chamfered HUD geometry and `#020a19` / `#d5e0ff` palette.

---

## 2. Article Corpus & Metadata Schema (`BLOG-01`)

### Data Schema
```typescript
interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  author: {
    id: 'arbaz' | 'devesh';
    code: 'DEV-01' | 'DEV-02';
    name: string;
    designation: string;
  };
  publishedAt: string;        // ISO 8601 string
  readingTimeMinutes: number; // Derived or specified
  tags: string[];             // Tech topics (e.g. ['webgl', 'glsl'])
  content: string;            // Full markdown document
  featured?: boolean;
}
```

### Initial Curated Engineering Articles
1. **Article 1 (Arbaz Arshad // DEV-01)**:
   - *Title*: "Architecting 60FPS Procedural Three.js Node Networks with Custom GLSL Pulse Shaders"
   - *Topics*: `webgl`, `threejs`, `glsl`, `shaders`, `performance`
2. **Article 2 (Devesh Das // DEV-02)**:
   - *Title*: "Building Zero-Allocation Distributed Message Queues in Go and Raft Consensus"
   - *Topics*: `go`, `distributed-systems`, `raft`, `concurrency`, `networking`
3. **Article 3 (Arbaz Arshad // DEV-01)**:
   - *Title*: "Algorithmic Prefix Tries & Inverted Indexes in Client-Side Web Applications"
   - *Topics*: `algorithms`, `data-structures`, `trie`, `javascript`, `search`
4. **Article 4 (Devesh Das // DEV-02)**:
   - *Title*: "Hardening Cloud Microservices with eBPF Kernel Tracing and Linux Namespaces"
   - *Topics*: `security`, `ebpf`, `linux`, `microservices`, `cloud`

---

## 3. Reading Time & Telemetry Metrics

### Word Count & Read Time Formula
- Average reading speed: 200 words per minute for dense technical prose with code blocks.
- `readingTimeMinutes = Math.max(1, Math.ceil(wordsCount / 200))`.
- Telemetry readout:
  `TELEMETRY: POST_ID: {id} // WORDS: {count} // READ_TIME: {minutes} MIN // PROTOCOL: MARKDOWN-V2`

---

## 4. Tactical HUD UI & User Experience

### Dual-State Stage Interface
1. **Archives Stage (`BlogList.jsx`)**:
   - Header telemetry: `SECTION: 05 // TECHNICAL ARCHIVES // REPOSITORY: BLOG`.
   - Author toggle tabs: `ALL ARTICLES [04]`, `ARBAZ ARSHAD [DEV-01]`, `DEVESH DAS [DEV-02]`.
   - Tag filter pills: `#webgl`, `#distributed-systems`, `#go`, `#security`, etc.
   - Real-time search query box.
   - Grid of chamfered article cards with author attribution badges, read time, date, excerpt, tags, and "READ ARTICLE" CTA.
2. **Article Reader Stage (`BlogArticle.jsx`)**:
   - Top action: `← RETURN TO ARCHIVES [05]` chamfer button.
   - Header metadata card with author identity, avatar placeholder, publication date, and tag pills.
   - Markdown article content formatted with rich tactical typography.
   - Interactive code blocks with language labels and "COPY CODE" feedback indicator.

---

## 5. Integration with Search Engine (Phase 5 Synergy)

When the article dataset is loaded, `searchEngine.indexBlogArticles(articles)` registers each article into the in-memory Trie and Inverted Index:
- Enables instant lookup via `Cmd+K` / `Ctrl+K`.
- Queries like `"raft"`, `"glsl"`, or `"ebpf"` instantly present the article in the HUD search modal, jumping directly to the article reader when selected!

---

## 6. Validation Strategy

- `npm run build`: Zero errors, bundle compiles in < 2s.
- Browser subagent tests:
  1. Navigating to the BLOG section via HUD top bar `BLOG [05]`.
  2. Filtering articles by author (`DEV-01` and `DEV-02`).
  3. Filtering articles by tech tag pill.
  4. Clicking an article card to enter the full article reader.
  5. Verifying Markdown rendering: headings, blockquotes, lists, tables, and syntax-highlighted code blocks.
  6. Testing copy-to-clipboard on code blocks.
  7. Returning to blog listing via "RETURN TO ARCHIVES" button.
