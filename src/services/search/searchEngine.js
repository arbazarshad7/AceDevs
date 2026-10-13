import { InvertedIndex } from './InvertedIndex.js';
import { MOCK_REPOSITORIES } from '../../data/mockRepos.js';
import { TEAM_MEMBERS } from '../../data/teamData.js';
import { BLOG_POSTS } from '../../data/blogPosts.js';

/**
 * System sectors and architecture components for global search
 */
const SYSTEM_SECTORS = [
  {
    id: 'sys-01',
    category: 'system',
    type: 'ARCHITECTURE',
    title: 'Core 3D WebGL Hero Canvas',
    name: '3D WebGL Hero Canvas',
    code: 'SYS-01',
    description: 'Procedural Three.js cybernetic constellation with GLSL pulse shaders and real-time bidirectional compass rosette tracking.',
    topics: ['webgl', 'threejs', 'glsl', 'shaders', 'digital-twin', 'hero'],
    action: { section: 'hero' }
  },
  {
    id: 'sys-02',
    category: 'system',
    type: 'ARCHITECTURE',
    title: 'Tactical Viewport HUD Framing',
    name: 'Tactical Viewport HUD Framing',
    code: 'HUD-00',
    description: 'Fixed perimeter digital twin telemetry with 45° chamfers, sound toggle, scale bar, and 360° heading compass dial.',
    topics: ['hud', 'design-system', 'telemetry', 'compass', 'audio', 'chamfer'],
    action: { section: 'hero' }
  },
  {
    id: 'sys-03',
    category: 'system',
    type: 'ARCHITECTURE',
    title: 'Algorithmic Trie & Inverted Index',
    name: 'Algorithmic Trie & Inverted Index',
    code: 'SRCH-01',
    description: 'Custom in-memory prefix tree and boolean query posting lists for sub-millisecond portfolio-wide search.',
    topics: ['trie', 'inverted-index', 'algorithms', 'search', 'performance'],
    action: { section: 'hero' }
  },
  {
    id: 'sys-04',
    category: 'system',
    type: 'ARCHITECTURE',
    title: 'Supabase Postgres & Auth Gateway',
    name: 'Supabase Postgres & Auth Gateway',
    code: 'AUTH-01',
    description: 'Row-Level Security (RLS) PostgreSQL database with Google OAuth and Email/Password developer authentication.',
    topics: ['supabase', 'postgresql', 'auth', 'oauth', 'rls', 'security'],
    action: { section: 'hero' }
  },
  {
    id: 'sys-05',
    category: 'system',
    type: 'ARCHITECTURE',
    title: 'Automated GitHub Repository Aggregator',
    name: 'Automated GitHub Repository Aggregator',
    code: 'REPO-01',
    description: 'REST API pipeline fetching public projects with 30-minute persistent caching and developer attribution tags.',
    topics: ['github', 'api', 'caching', 'repositories', 'automation'],
    action: { section: 'repos' }
  },
  {
    id: 'sys-06',
    category: 'system',
    type: 'ARCHITECTURE',
    title: 'Engineering Technical Blog CMS',
    name: 'Engineering Technical Blog CMS',
    code: 'BLOG-01',
    description: 'Markdown engineering publication engine with syntax highlighting and authenticated developer management panel.',
    topics: ['blog', 'markdown', 'cms', 'articles', 'engineering'],
    action: { section: 'blog' }
  }
];

class SearchEngine {
  constructor() {
    this.index = new InvertedIndex();
    this.initialized = false;
    this.init();
  }

  /**
   * Initializes and populates the search index with all platform entities
   */
  init(repositories = MOCK_REPOSITORIES) {
    this.index.clear();

    // 1. Index Team Members
    TEAM_MEMBERS.forEach((member) => {
      this.index.addDocument({
        id: `dev-${member.id}`,
        category: 'team',
        type: 'DEVELOPER',
        title: member.name,
        name: member.name,
        code: member.code,
        designation: member.designation,
        sector: member.sector,
        bio: member.bio,
        specialties: member.specialties,
        topics: member.specialties.map((s) => s.name),
        owner: { id: member.id, code: member.code, name: member.name },
        action: { section: 'team', memberId: member.id }
      });
    });

    // 2. Index Repositories
    this.indexRepositories(repositories);

    // 3. Index System Architecture Sectors
    SYSTEM_SECTORS.forEach((sec) => {
      this.index.addDocument(sec);
    });

    // 4. Index Engineering Blog Articles
    this.indexBlogPosts(BLOG_POSTS);

    this.initialized = true;
  }

  /**
   * Re-indexes repositories when fresh data is loaded
   */
  indexRepositories(repositories) {
    if (!Array.isArray(repositories)) return;
    repositories.forEach((repo) => {
      this.index.addDocument({
        id: `repo-${repo.id || repo.name}`,
        category: 'repos',
        type: 'REPOSITORY',
        title: repo.name,
        name: repo.name,
        fullName: repo.fullName,
        description: repo.description,
        topics: repo.topics || [],
        language: repo.language,
        stars: repo.stars || 0,
        forks: repo.forks || 0,
        owner: repo.owner,
        htmlUrl: repo.htmlUrl,
        homepage: repo.homepage,
        action: { section: 'repos', repoName: repo.name, url: repo.htmlUrl }
      });
    });
  }

  /**
   * Indexes technical engineering blog articles
   */
  indexBlogPosts(posts = BLOG_POSTS) {
    if (!Array.isArray(posts)) return;
    posts.forEach((post) => {
      this.index.addDocument({
        id: `post-${post.id}`,
        category: 'blog',
        type: 'ARTICLE',
        title: post.title,
        name: post.title,
        description: post.excerpt,
        topics: post.tags || [],
        author: post.author,
        readingTime: `${post.readingTimeMinutes} MIN`,
        owner: { id: post.author.id, code: post.author.code, name: post.author.name },
        action: { section: 'blog', articleId: post.id }
      });
    });
  }

  /**
   * Executes a high-performance query across all indexed entities
   * @param {string} query - The search query
   * @param {Object} options - Search options
   * @returns {{ results: Array, suggestions: Array, totalMatches: number, searchTimeMs: number }}
   */
  search(query, options = {}) {
    const startTime = typeof performance !== 'undefined' ? performance.now() : Date.now();

    const queryResult = this.index.query(query, options);

    const endTime = typeof performance !== 'undefined' ? performance.now() : Date.now();
    const duration = Math.round((endTime - startTime) * 100) / 100;

    return {
      results: queryResult.results,
      suggestions: queryResult.suggestions,
      totalMatches: queryResult.totalMatches,
      searchTimeMs: Math.max(0.05, duration) // High-precision duration
    };
  }

  /**
   * Diagnostic statistics for HUD telemetry
   */
  getStats() {
    return {
      indexedDocuments: this.index.documents.size,
      vocabularyTokens: this.index.index.size,
      trieNodes: this.index.trie.size
    };
  }
}

// Global Singleton Instance
export const searchEngine = new SearchEngine();

export default searchEngine;
