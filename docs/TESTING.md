# Testing and troubleshooting

Use tiny locally owned fixtures for automated tests instead of downloading a real game pack in CI.

## Required checks

- Valid content is accepted; altered bytes and incorrect pinned hashes are rejected.
- A verified cache hit causes no new download.
- Concurrent requests for one version share one download.
- Streaming and declared size limits stop oversized responses.
- Redirects cannot escape the configured source policy.
- Slugs, file paths, revisions, versions, and split-file reconstruction reject invalid input.
- Failed updates leave old verified versions available.
- Catalog state survives a restart and newly published games appear without one.
- Asset credentials are required and arbitrary files cannot be requested.
- Admin login, rate limits, session expiry, logout, and CSRF checks work.
- Pause/resume affects discovery without interrupting cached delivery.
- A failed per-game repair is visible as a failure rather than a ready game.
- Diagnostics contain no credentials or session tokens.

Test password hashing and cache verification in the production Node runtime as well as the development test runner. A successful TypeScript build does not prove that listeners, filesystem permissions, or runtime cryptography work on the VPS.

## Browser acceptance

Open the actual deployed URL. Sign in, search and filter the library, move between pages, verify a cached game, pause and resume synchronization, export diagnostics, and sign out. Check both desktop and mobile widths and inspect failed requests and console errors.

Also open a game through the portal and confirm that the asset API delivered the expected pinned bytes. Do not run downloaded game scripts on the VPS.

## Common problems

| Symptom | Check |
| --- | --- |
| Page downloads instead of rendering | Content-Type, Content-Disposition, and whether you opened the status/API port instead of the admin port |
| Codespaces link returns 404 | Codespace state, tunnel process, port registration/visibility, and forwarded hostname |
| Login succeeds locally but fails over HTTPS | Trusted origin configuration, proxy rewriting, cookie Secure/Path settings, and CSRF handling |
| Sync sees no new game | Watched branch, source revision, deploy-key access, catalog path, and publication of assets together with metadata |
| Cached game fails integrity checks | Hash original bytes before compression; verify the expected Git object format and full reconstructed content |
| Controls stay disabled | Current operation, queued work, verification progress, and whether errors release the operation lock |
| Restart loses catalog | Writable data directory, atomic persistence, and service-account permissions |

Record operation start and finish times and show a safe error when a job fails. Always release a busy flag in a finally block. Keep raw secret-bearing command output out of dashboards and public logs.
