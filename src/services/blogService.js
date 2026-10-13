import { BLOG_POSTS } from '../data/blogPosts';
import { calculateReadingTime } from '../utils/readingTime';
import { supabase, isConfigured } from './supabaseClient';
import searchEngine from './search/searchEngine';

const STORAGE_KEY = 'acedevs_admin_posts';

class BlogService {
  constructor() {
    this._subscribers = new Set();
    this._posts = this._loadInitialPosts();
    // Synchronize initial posts into searchEngine
    if (searchEngine?.indexBlogPosts) {
      searchEngine.indexBlogPosts(this._posts);
    }
  }

  _loadInitialPosts() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (err) {
      console.warn('[BlogService] Failed to load stored posts:', err);
    }

    // Default to curated initial posts, marked as published: true
    const seeded = BLOG_POSTS.map((p) => ({
      ...p,
      published: p.published !== undefined ? p.published : true
    }));
    this._savePosts(seeded);
    return seeded;
  }

  _savePosts(posts) {
    this._posts = posts;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    } catch (err) {
      console.warn('[BlogService] Failed to persist posts:', err);
    }

    // Notify subscribers
    this._notify();

    // Synchronize with client-side Trie and Inverted Index search engine
    if (searchEngine?.indexBlogPosts) {
      searchEngine.indexBlogPosts(posts.filter((p) => p.published !== false));
    }
  }

  subscribe(callback) {
    this._subscribers.add(callback);
    callback(this._posts);
    return () => this._subscribers.delete(callback);
  }

  _notify() {
    this._subscribers.forEach((cb) => cb(this._posts));
  }

  /**
   * Retrieves all posts (both published and drafts for admin view)
   */
  async getPosts() {
    if (isConfigured) {
      try {
        const { data, error } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
        if (!error && Array.isArray(data) && data.length > 0) {
          return data;
        }
      } catch {
        // Fallback to local store
      }
    }
    return [...this._posts];
  }

  /**
   * Retrieves only published posts for public view
   */
  async getPublishedPosts() {
    const all = await this.getPosts();
    return all.filter((p) => p.published !== false);
  }

  /**
   * Retrieves a single post by ID or Slug
   */
  async getPostById(idOrSlug) {
    const all = await this.getPosts();
    return all.find((p) => p.id === idOrSlug || p.slug === idOrSlug) || null;
  }

  /**
   * Creates a new technical article
   */
  async createPost(postData) {
    const now = new Date().toISOString();
    const slug = postData.slug?.trim() || postData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const { readingTimeMinutes } = calculateReadingTime(postData.content || '');

    const newPost = {
      id: `post-${Date.now()}`,
      slug,
      title: postData.title.trim(),
      excerpt: postData.excerpt?.trim() || '',
      author: postData.author || {
        id: 'arbaz',
        code: 'DEV-01',
        name: 'Arbaz Arshad',
        designation: 'Full-Stack & Systems Architect'
      },
      publishedAt: now,
      readingTimeMinutes,
      tags: Array.isArray(postData.tags) ? postData.tags : (postData.tags || '').split(',').map((t) => t.trim().toLowerCase()).filter(Boolean),
      featured: Boolean(postData.featured),
      published: postData.published !== undefined ? Boolean(postData.published) : true,
      content: postData.content || ''
    };

    if (isConfigured) {
      try {
        await supabase.from('posts').insert([newPost]);
      } catch (err) {
        console.warn('[BlogService:Supabase] Insert fallback to storage:', err);
      }
    }

    const updated = [newPost, ...this._posts];
    this._savePosts(updated);
    return newPost;
  }

  /**
   * Updates an existing post
   */
  async updatePost(id, updates) {
    const existingIndex = this._posts.findIndex((p) => p.id === id);
    if (existingIndex === -1) {
      throw new Error(`Post ${id} not found.`);
    }

    const current = this._posts[existingIndex];
    const newContent = updates.content !== undefined ? updates.content : current.content;
    const { readingTimeMinutes } = calculateReadingTime(newContent || '');

    const updatedPost = {
      ...current,
      ...updates,
      tags: updates.tags !== undefined
        ? (Array.isArray(updates.tags) ? updates.tags : updates.tags.split(',').map((t) => t.trim().toLowerCase()).filter(Boolean))
        : current.tags,
      readingTimeMinutes,
      updatedAt: new Date().toISOString()
    };

    if (isConfigured) {
      try {
        await supabase.from('posts').update(updatedPost).eq('id', id);
      } catch (err) {
        console.warn('[BlogService:Supabase] Update fallback to storage:', err);
      }
    }

    const updatedList = [...this._posts];
    updatedList[existingIndex] = updatedPost;
    this._savePosts(updatedList);
    return updatedPost;
  }

  /**
   * Toggles published status
   */
  async togglePublishStatus(id) {
    const post = this._posts.find((p) => p.id === id);
    if (!post) return null;
    return this.updatePost(id, { published: !post.published });
  }

  /**
   * Deletes a post
   */
  async deletePost(id) {
    if (isConfigured) {
      try {
        await supabase.from('posts').delete().eq('id', id);
      } catch (err) {
        console.warn('[BlogService:Supabase] Delete fallback to storage:', err);
      }
    }

    const filtered = this._posts.filter((p) => p.id !== id);
    this._savePosts(filtered);
    return true;
  }
}

export const blogService = new BlogService();
export default blogService;
