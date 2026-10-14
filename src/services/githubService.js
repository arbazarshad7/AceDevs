import { MOCK_REPOSITORIES } from '../data/mockRepos';

const CACHE_KEY = 'acedevs_github_repos_cache_v2';
const DEFAULT_TTL_MS = 30 * 60 * 1000; // 30 minutes

const ARBAZ_OWNER = {
  id: 'arbaz',
  code: 'DEV-01',
  name: 'Arbaz Arshad',
  sector: 'GAME SYSTEMS & AI'
};

const DEVESH_OWNER = {
  id: 'devesh',
  code: 'DEV-02',
  name: 'Devesh Das',
  sector: 'GAME SYSTEMS & PHYSICS'
};

/**
 * Normalizes raw GitHub API repository record into AceDevs HUD schema
 */
function normalizeRepo(rawRepo, ownerInfo) {
  return {
    id: rawRepo.id,
    name: rawRepo.name,
    fullName: rawRepo.full_name,
    description: rawRepo.description || 'Public software repository and architectural artifact.',
    htmlUrl: rawRepo.html_url,
    homepage: rawRepo.homepage || null,
    stars: rawRepo.stargazers_count || 0,
    forks: rawRepo.forks_count || 0,
    language: rawRepo.language || 'Code',
    topics: Array.isArray(rawRepo.topics) && rawRepo.topics.length > 0
      ? rawRepo.topics
      : [rawRepo.language?.toLowerCase() || 'project'],
    updatedAt: rawRepo.updated_at || new Date().toISOString(),
    archived: rawRepo.archived || false,
    owner: ownerInfo
  };
}

/**
 * Fetch public repos for a specific GitHub username with custom timeout
 */
async function fetchUserRepos(username, ownerInfo, token = null) {
  const url = `https://api.github.com/users/${username}/repos?sort=updated&per_page=100&type=owner`;
  const headers = {
    Accept: 'application/vnd.github.v3+json'
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 7500); // 7.5s network timeout

  try {
    const response = await fetch(url, { headers, signal: controller.signal });
    clearTimeout(timeoutId);

    if (response.status === 403 || response.status === 429) {
      throw new Error(`GitHub API rate limit exceeded (HTTP ${response.status})`);
    }

    if (!response.ok) {
      throw new Error(`GitHub API error (HTTP ${response.status})`);
    }

    const data = await response.json();
    if (!Array.isArray(data)) {
      throw new Error('Invalid GitHub response structure');
    }

    return data
      .filter((repo) => !repo.fork) // Prioritize original authored projects
      .map((repo) => normalizeRepo(repo, ownerInfo));
  } catch (err) {
    clearTimeout(timeoutId);
    throw err;
  }
}

/**
 * Fetch and aggregate collective repositories for both developers
 * with persistent localStorage caching and resilient fallback.
 */
export async function fetchCollectiveRepos(options = {}) {
  const {
    forceRefresh = false,
    ttlMs = DEFAULT_TTL_MS,
    token = null
  } = options;

  // 1. Check local storage cache
  try {
    const rawCache = localStorage.getItem(CACHE_KEY);
    if (rawCache) {
      const parsed = JSON.parse(rawCache);
      const cacheAge = Date.now() - parsed.timestamp;

      if (!forceRefresh && cacheAge < (parsed.ttlMs || ttlMs) && Array.isArray(parsed.data) && parsed.data.length > 0) {
        return {
          repos: parsed.data,
          source: 'cache',
          timestamp: parsed.timestamp,
          cacheAgeMinutes: Math.round(cacheAge / 60000),
          error: null
        };
      }
    }
  } catch (cacheErr) {
    console.warn('[GitHub Service] Cache read error, continuing to fetch:', cacheErr);
  }

  // 2. Fetch live data from GitHub API in parallel
  try {
    const arbazUsername = import.meta.env?.VITE_GITHUB_USER_ARBAZ || 'arbazarshad7';
    const deveshUsername = import.meta.env?.VITE_GITHUB_USER_DEVESH || 'ninja27dev';
    const authToken = token || import.meta.env?.VITE_GITHUB_TOKEN || null;

    const [arbazRes, deveshRes] = await Promise.allSettled([
      fetchUserRepos(arbazUsername, ARBAZ_OWNER, authToken),
      fetchUserRepos(deveshUsername, DEVESH_OWNER, authToken)
    ]);

    const liveRepos = [];

    if (arbazRes.status === 'fulfilled' && arbazRes.value.length > 0) {
      liveRepos.push(...arbazRes.value);
    } else {
      console.warn('[GitHub Service] Arbaz repos fetch error or empty:', arbazRes.reason);
    }

    if (deveshRes.status === 'fulfilled' && deveshRes.value.length > 0) {
      liveRepos.push(...deveshRes.value);
    } else {
      console.warn('[GitHub Service] Devesh repos fetch error or empty:', deveshRes.reason);
    }

    // If at least one developer yielded live repos:
    if (liveRepos.length > 0) {
      // Include the core AceDevs collective portfolio project if not present
      const hasCollective = liveRepos.some((r) => r.name === 'acedevs-collective-portfolio');
      if (!hasCollective) {
        const collectiveMock = MOCK_REPOSITORIES.find((r) => r.id === 301);
        if (collectiveMock) liveRepos.unshift(collectiveMock);
      }

      // Sort by stars descending
      liveRepos.sort((a, b) => (b.stars || 0) - (a.stars || 0));

      // Save to localStorage
      try {
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({
            timestamp: Date.now(),
            ttlMs,
            data: liveRepos
          })
        );
      } catch (writeErr) {
        console.warn('[GitHub Service] Cache write error:', writeErr);
      }

      return {
        repos: liveRepos,
        source: 'api',
        timestamp: Date.now(),
        cacheAgeMinutes: 0,
        error: null
      };
    }

    throw new Error('Zero live repositories fetched from GitHub accounts');
  } catch (apiErr) {
    console.warn('[GitHub Service] Live API fetch failed, falling back:', apiErr.message);

    // 3. Check for stale cache before falling back to mock dataset
    try {
      const rawCache = localStorage.getItem(CACHE_KEY);
      if (rawCache) {
        const parsed = JSON.parse(rawCache);
        if (Array.isArray(parsed.data) && parsed.data.length > 0) {
          return {
            repos: parsed.data,
            source: 'cache',
            isStale: true,
            timestamp: parsed.timestamp,
            cacheAgeMinutes: Math.round((Date.now() - parsed.timestamp) / 60000),
            error: apiErr.message
          };
        }
      }
    } catch (e) {
      // ignore
    }

    // 4. Return curated mock telemetry dataset
    return {
      repos: MOCK_REPOSITORIES,
      source: 'fallback',
      timestamp: Date.now(),
      cacheAgeMinutes: 0,
      error: apiErr.message
    };
  }
}

/**
 * Clear client-side repository cache
 */
export function clearRepoCache() {
  try {
    localStorage.removeItem(CACHE_KEY);
  } catch (e) {
    // ignore
  }
}

/**
 * Get current cache diagnostic status
 */
export function getCacheDiagnostics() {
  try {
    const rawCache = localStorage.getItem(CACHE_KEY);
    if (!rawCache) return { exists: false, count: 0, ageMinutes: 0 };
    const parsed = JSON.parse(rawCache);
    const age = Math.round((Date.now() - parsed.timestamp) / 60000);
    return {
      exists: true,
      count: parsed.data?.length || 0,
      ageMinutes: age,
      isValid: age < ((parsed.ttlMs || DEFAULT_TTL_MS) / 60000)
    };
  } catch (e) {
    return { exists: false, count: 0, ageMinutes: 0 };
  }
}
