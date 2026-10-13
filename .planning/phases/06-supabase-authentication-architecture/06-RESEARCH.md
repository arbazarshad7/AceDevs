# Phase 06: Supabase Authentication Architecture — Technical Research

## Objective
Construct a robust, client-side authentication architecture utilizing `@supabase/supabase-js` (GoTrue Auth) supporting persistent developer sessions, reactive state listeners, Google OAuth 2.0 flow, direct Email/Password authentication, and a tactical Sci-Fi HUD authentication modal styled to match the Hubtown design language.

---

## 1. Supabase Client & Session Architecture (`AUTH-01`)

### Dependency Selection
- **Library**: `@supabase/supabase-js` (^2.48.0+)
- **Runtime Environment**: Vite + React SPA in modern browser ESM.
- **Environment Configuration**:
  - `VITE_SUPABASE_URL`: Supabase project HTTPS endpoint (`https://<project-ref>.supabase.co`).
  - `VITE_SUPABASE_ANON_KEY`: Supabase Public Anonymous API Key (safe for client exposure via JWT headers and RLS).

### Resilient Client Initializer (`src/services/supabaseClient.js`)
To guarantee that the AceDevs portfolio operates smoothly both in production and in offline/mock/preview development environments without crashing on unconfigured keys:
1. **Config Validation**:
   - Check if `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are provided and match valid URL format.
   - If missing, initialize in `mock/fallback` mode with mock session capability and clear HUD diagnostic telemetry.
2. **Session Persistence**:
   - `auth.persistSession: true`: Persists JWT access and refresh tokens to browser `localStorage`.
   - `auth.autoRefreshToken: true`: Automatically refreshes expiring JWTs in background.
   - `auth.detectSessionInUrl: true`: Extracts OAuth access tokens and code exchange fragments from URL hash/query on redirect return.
3. **Connection Telemetry Ping**:
   - Provide `checkConnection()` helper to query `/auth/v1/health` or ping public table to measure round-trip latency in milliseconds for HUD telemetry.

---

## 2. Google OAuth 2.0 Sign-In Flow (`AUTH-02`)

### Flow Lifecycle
1. User triggers Google sign-in from HUD Auth Modal.
2. Client calls:
   ```javascript
   const { data, error } = await supabase.auth.signInWithOAuth({
     provider: 'google',
     options: {
       redirectTo: window.location.origin,
       queryParams: {
         access_type: 'offline',
         prompt: 'consent'
       }
     }
   });
   ```
3. Browser redirects to Google Account selection / consent screen.
4. Google returns user to `window.location.origin` with `#access_token=...` or `?code=...`.
5. Supabase client parses the token automatically via `detectSessionInUrl: true`, establishing active session.
6. The `onAuthStateChange` listener emits `SIGNED_IN` event, instantly updating React state.

---

## 3. Direct Email & Password Sign-In Flow (`AUTH-03`)

### Direct Developer Authentication
For direct access by developers (**Arbaz Arshad** & **Devesh Das**):
1. **Sign-In Function**:
   ```javascript
   const { data, error } = await supabase.auth.signInWithPassword({
     email,
     password
   });
   ```
2. **Input Validation**:
   - Standard RFC 5322 email regex checking.
   - Minimum 6-character passphrase threshold.
   - Monospace tactical error readouts for `invalid_credentials` and `rate_limit_exceeded`.
3. **Developer Identity Authorization**:
   - Authorized developer emails configured via `VITE_DEV_EMAILS` or matched against founder profiles:
     - Arbaz Arshad (`DEV-01`)
     - Devesh Das (`DEV-02`)
   - Role tag: `DEVELOPER_ADMIN` vs `GUEST_VIEWER`.

---

## 4. Tactical Sci-Fi HUD Auth Modal & UX Integration

### Visual Style Requirements
- **45° Chamfered Geometry**: Consistent with `BeveledBox`, `ChamferButton`, and `CornerBrackets`.
- **Obsidian Palette**: `#020a19` backdrop with `14px` blur and ice cyan `#d5e0ff` hairlines.
- **Telemetry Readout**:
  - `PROTOCOL: SUPABASE GOTRUE // ENCRYPTION: TLS 1.3 / AES-256`
  - `STATUS: CONNECTED (18ms) // SESSION: NONE`
- **Interactive State in Viewport HUD**:
  - Unauthenticated: Top bar button reads `LOGIN [00]` with `LogIn` icon.
  - Authenticated: Top bar button transitions to `[DEV-01 // ARBAZ]` with online pulse dot, allowing user menu / sign-out.

---

## 5. Security & Threat Modeling

| Threat ID | Threat Description | Severity | Mitigation |
| :--- | :--- | :--- | :--- |
| **T-06-01** | Exposure of Supabase Service Role Key in client bundle | High | Strictly enforce use of `VITE_SUPABASE_ANON_KEY` only; `.env.example` documents that service key must never be used on client. |
| **T-06-02** | Open redirect vulnerability during OAuth callback | Medium | Set `redirectTo: window.location.origin` explicitly; validate callback URL in Supabase Dashboard. |
| **T-06-03** | Brute force password attempts | Medium | Handled upstream by Supabase rate-limiting with visual HUD error feedback on client. |
| **T-06-04** | Client unhandled crash when environment keys are absent | Medium | Implement graceful fallback client with telemetry diagnostic indicator. |

---

## 6. Validation Architecture

### Automated Verification
- `npm run build`: Zero compilation errors with `@supabase/supabase-js`.
- Unit tests / verification script testing:
  - Client initialization and session state listener registration.
  - Email format validation logic.
  - Developer attribution mapping (`isDeveloper(email)`).
- Browser subagent end-to-end verification:
  - Opening HUD Auth Modal via top bar `LOGIN` button.
  - Form validation on empty or malformed email/password inputs.
  - Tab switching between OAuth and Email/Password modes.
  - Modal dismissal via `ESC` key and close trigger.
