import { createClient } from '@supabase/supabase-js';

const envUrl = import.meta.env.VITE_SUPABASE_URL;
const envAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if credentials are validly provided (not placeholders or empty)
const isValidUrl = typeof envUrl === 'string' && envUrl.startsWith('http') && !envUrl.includes('your-project');
const isValidKey = typeof envAnonKey === 'string' && envAnonKey.length > 20 && !envAnonKey.includes('your-supabase-anon-key');

export const isConfigured = Boolean(isValidUrl && isValidKey);

/**
 * Fallback Mock Auth Client for local preview or unconfigured environments.
 * Prevents application crashes and provides telemetry diagnostic capability.
 */
class FallbackMockAuthClient {
  constructor() {
    this._listeners = new Set();
    this._session = null;
    this._user = null;

    // Load any persisted mock session
    try {
      const stored = localStorage.getItem('acedevs_mock_auth_session');
      if (stored) {
        const parsed = JSON.parse(stored);
        this._session = parsed.session;
        this._user = parsed.user;
      }
    } catch {
      // ignore
    }
  }

  async getSession() {
    return { data: { session: this._session }, error: null };
  }

  async getUser() {
    return { data: { user: this._user }, error: null };
  }

  onAuthStateChange(callback) {
    this._listeners.add(callback);
    // Initial emission
    setTimeout(() => {
      callback(this._session ? 'SIGNED_IN' : 'INITIAL_SESSION', this._session);
    }, 0);

    return {
      data: {
        subscription: {
          unsubscribe: () => {
            this._listeners.delete(callback);
          }
        }
      }
    };
  }

  async signInWithOAuth({ provider, options }) {
    return {
      data: null,
      error: {
        message: `Live Supabase configuration required for ${provider.toUpperCase()} OAuth. Please configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.`
      }
    };
  }

  async signInWithPassword({ email, password }) {
    if (!email || !password) {
      return { data: { user: null, session: null }, error: { message: 'Missing credentials.' } };
    }

    const mockUser = {
      id: 'mock-dev-' + Date.now(),
      email,
      created_at: new Date().toISOString(),
      user_metadata: {
        full_name: email.toLowerCase().includes('arbaz')
          ? 'Arbaz Arshad'
          : email.toLowerCase().includes('devesh')
            ? 'Devesh Das'
            : email.split('@')[0],
        avatar_url: email.toLowerCase().includes('arbaz')
          ? 'https://github.com/arbazarshad7.png'
          : email.toLowerCase().includes('devesh')
            ? 'https://github.com/ninja27dev.png'
            : null
      }
    };

    const mockSession = {
      access_token: 'mock-jwt-token-' + Date.now(),
      token_type: 'bearer',
      expires_in: 3600,
      refresh_token: 'mock-refresh-token',
      user: mockUser
    };

    this._user = mockUser;
    this._session = mockSession;

    try {
      localStorage.setItem('acedevs_mock_auth_session', JSON.stringify({ user: mockUser, session: mockSession }));
    } catch {}

    this._listeners.forEach((cb) => cb('SIGNED_IN', mockSession));
    return { data: { user: mockUser, session: mockSession }, error: null };
  }

  async signUp({ email, password }) {
    return this.signInWithPassword({ email, password });
  }

  async signOut() {
    this._user = null;
    this._session = null;
    try {
      localStorage.removeItem('acedevs_mock_auth_session');
    } catch {}

    this._listeners.forEach((cb) => cb('SIGNED_OUT', null));
    return { error: null };
  }
}

/**
 * Primary Supabase Client singleton.
 * Uses real createClient if valid credentials exist, otherwise falls back gracefully to FallbackMockAuthClient.
 */
let clientInstance;

if (isConfigured) {
  clientInstance = createClient(envUrl, envAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storageKey: 'acedevs_auth_token'
    }
  });
} else {
  clientInstance = {
    auth: new FallbackMockAuthClient(),
    from: () => ({
      select: async () => ({ data: [], error: null })
    })
  };
}

export const supabase = clientInstance;

/**
 * Health check ping to measure authentication backend connection latency
 * @returns {Promise<{ status: string, latencyMs: number, isMock: boolean, error?: string }>}
 */
export async function checkConnection() {
  const start = performance.now();
  if (!isConfigured) {
    return {
      status: 'MOCK_PREVIEW',
      latencyMs: 0.1,
      isMock: true,
      error: null
    };
  }

  try {
    const { error } = await supabase.auth.getSession();
    const duration = Math.round((performance.now() - start) * 10) / 10;
    if (error) {
      return { status: 'ERROR', latencyMs: duration, isMock: false, error: error.message };
    }
    return { status: 'ONLINE', latencyMs: duration, isMock: false, error: null };
  } catch (err) {
    const duration = Math.round((performance.now() - start) * 10) / 10;
    return { status: 'OFFLINE', latencyMs: duration, isMock: false, error: err.message };
  }
}

export default supabase;
