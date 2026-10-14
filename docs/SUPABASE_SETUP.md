# 🔐 Supabase Configuration & Database Setup // AceDevs

This guide provides step-by-step instructions for provisioning and configuring the **Supabase** backend for AceDevs, including database tables, Row-Level Security (RLS) policies, and GoTrue OAuth authentication.

---

## 1. Create a Supabase Project

1. Navigate to the [Supabase Dashboard](https://supabase.com/dashboard) and sign in.
2. Click **New Project** and configure your settings:
   - **Name**: `AceDevs-Portfolio`
   - **Database Password**: Generate a secure password and store it safely.
   - **Region**: Choose a region closest to your primary audience (e.g., `ap-south-1` Mumbai).
3. Once the project finishes provisioning, navigate to **Project Settings** ➔ **API**.
4. Copy the following keys to your local `.env` file:
   - **Project URL** ➔ `VITE_SUPABASE_URL`
   - **Project API Keys (`anon` / `public`)** ➔ `VITE_SUPABASE_ANON_KEY`

> ⚠️ **CRITICAL SECURITY WARNING:**  
> **NEVER** expose the `service_role` key in frontend code or in `.env`. Only use the `anon` public key. Access control is strictly enforced at the database layer via Row-Level Security (RLS).

---

## 2. Database Schema DDL: `posts` Table

Navigate to **SQL Editor** in the Supabase Dashboard and execute the following SQL DDL script:

```sql
-- ==============================================================================
-- AceDevs: Technical Articles Schema
-- ==============================================================================

-- 1. Create posts table
CREATE TABLE IF NOT EXISTS public.posts (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    author JSONB NOT NULL DEFAULT '{"id": "arbaz", "code": "DEV-01", "name": "Arbaz Arshad", "designation": "Game Developer · AI & Systems"}'::jsonb,
    published_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    reading_time_minutes INTEGER DEFAULT 5,
    tags TEXT[] DEFAULT '{}'::TEXT[],
    featured BOOLEAN DEFAULT FALSE,
    published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. Create index on slug for fast lookup
CREATE INDEX IF NOT EXISTS idx_posts_slug ON public.posts(slug);

-- 3. Create index on published flag for public feed queries
CREATE INDEX IF NOT EXISTS idx_posts_published ON public.posts(published);

-- 4. Enable Row-Level Security (RLS)
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
```

---

## 3. Row-Level Security (RLS) Policies

To protect the blog from unauthorized tampering while permitting public reading of published articles, execute the following RLS policies in the **SQL Editor**:

```sql
-- ==============================================================================
-- Row-Level Security (RLS) Policies for AceDevs
-- ==============================================================================

-- POLICY 1: Public Read Access
-- Anyone (anonymous or authenticated) can view published articles.
CREATE POLICY "Public articles are readable by everyone"
ON public.posts
FOR SELECT
USING (published = true);

-- POLICY 2: Authenticated Developer Full Access
-- Authorized developers can view all articles (including drafts).
CREATE POLICY "Developers can read all posts"
ON public.posts
FOR SELECT
TO authenticated
USING (
  auth.jwt() ->> 'email' IN ('arbazarshad7@gmail.com', 'deveshkumardas08@gmail.com')
);

-- POLICY 3: Developer Insert Permission
-- Authorized developers can publish new technical articles.
CREATE POLICY "Developers can insert posts"
ON public.posts
FOR INSERT
TO authenticated
WITH CHECK (
  auth.jwt() ->> 'email' IN ('arbazarshad7@gmail.com', 'deveshkumardas08@gmail.com')
);

-- POLICY 4: Developer Update Permission
-- Authorized developers can update existing articles.
CREATE POLICY "Developers can update posts"
ON public.posts
FOR UPDATE
TO authenticated
USING (
  auth.jwt() ->> 'email' IN ('arbazarshad7@gmail.com', 'deveshkumardas08@gmail.com')
)
WITH CHECK (
  auth.jwt() ->> 'email' IN ('arbazarshad7@gmail.com', 'deveshkumardas08@gmail.com')
);

-- POLICY 5: Developer Delete Permission
-- Authorized developers can delete articles.
CREATE POLICY "Developers can delete posts"
ON public.posts
FOR DELETE
TO authenticated
USING (
  auth.jwt() ->> 'email' IN ('arbazarshad7@gmail.com', 'deveshkumardas08@gmail.com')
);
```

---

## 4. Google OAuth 2.0 Setup

To enable one-click developer login via Google:

### Step 4.1: Google Cloud Console Configuration
1. Open the [Google Cloud Console](https://console.cloud.google.com/).
2. Create or select a Google Cloud Project (e.g., `acedevs-identity`).
3. Navigate to **APIs & Services** ➔ **Credentials**.
4. Click **Create Credentials** ➔ **OAuth Client ID**.
5. Select Application Type: **Web application**.
6. Set **Authorized JavaScript origins**:
   - `http://localhost:3000` (for local development)
   - `https://your-production-domain.com` (for production)
7. Set **Authorized redirect URIs**:
   - `https://<YOUR-SUPABASE-PROJECT-REF>.supabase.co/auth/v1/callback`
8. Click **Create** and copy your **Client ID** and **Client Secret**.

### Step 4.2: Supabase Provider Configuration
1. In the Supabase Dashboard, go to **Authentication** ➔ **Providers**.
2. Select **Google** and toggle it **Enabled**.
3. Paste your **Client ID** and **Client Secret**.
4. Click **Save**.

---

## 5. Email & Password Authentication Setup

1. In Supabase Dashboard, navigate to **Authentication** ➔ **Providers** ➔ **Email**.
2. Ensure **Enable Email provider** is turned **ON**.
3. (Optional for local testing): Disable **Confirm email** under **Auth Settings** if you wish to bypass email verification during staging.
4. Navigate to **Authentication** ➔ **Users** and click **Add User** ➔ **Create User**.
5. Create accounts for authorized developer emails:
   - `arbazarshad7@gmail.com`
   - `deveshkumardas08@gmail.com`

---

## 6. Frontend Environment Configuration

In your `.env` file at the root of the AceDevs workspace, configure the following:

```env
# Supabase API URL
VITE_SUPABASE_URL=https://<your-project-ref>.supabase.co

# Supabase Public Anon Key
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...

# Authorized Developer Email Whitelist (Comma-separated)
VITE_DEV_EMAILS=arbazarshad7@gmail.com,deveshkumardas08@gmail.com

# GitHub Usernames
VITE_GITHUB_USER_ARBAZ=arbazarshad7
VITE_GITHUB_USER_DEVESH=ninja27dev
```

### Verification Checklist

- [ ] `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are populated in `.env`.
- [ ] Dev server restarts cleanly without mock mode warning in browser console.
- [ ] Clicking **[DEVELOPER ACCESS]** in bottom HUD bar opens the login modal.
- [ ] Signing in with an authorized email unlocks the **[COCKPIT // ADMIN]** tab.
- [ ] Creating an article in the Admin Cockpit successfully writes to the Supabase `posts` table.
