# Deployment and administration

## Service isolation

Create a dedicated unprivileged service account. Put compiled application files in a read-only application directory and give the service write access only to its data directory. Store credentials in a protected environment file outside Git.

Run the service under a supervisor such as systemd with restart-on-failure, network readiness, a single-instance lock, and bounded shutdown handling. Test configuration before restarting the running service. Preserve cached game data across code deployments.

Suggested listener separation:

| Listener | Default exposure |
| --- | --- |
| Authenticated asset API | Loopback or private network |
| Read-only status page | Optional public HTTPS |
| Admin control room | Loopback, accessed through SSH |

Choose your own ports. These listener names describe roles rather than fixed production endpoints.

## Admin authentication

Generate a strong random initial password on the server. Save a salted scrypt or Argon2 password hash, and keep any one-time plaintext delivery file readable only by the service account. Never commit or log passwords.

After login, issue a random session identifier in an HttpOnly, SameSite cookie. Use Secure cookies when serving HTTPS. Expire sessions, rotate the session ID on login, invalidate logout immediately, and limit failed logins and concurrent password-hashing work.

Require a CSRF token and validate the request origin before state-changing operations. Behind an HTTPS proxy, compare forwarded metadata only against an explicitly configured trusted origin. Do not accept arbitrary forwarded hosts.

## Open the admin page securely

For a loopback listener, use your own SSH account and server:

```bash
ssh -L 8083:127.0.0.1:8083 YOUR_SSH_USER@YOUR_VPS_HOST
```

Then open `http://127.0.0.1:8083/admin`. The tunnel encrypts traffic to the VPS. A restricted tunnel key should allow only the required destination port and should not grant a shell.

If using Codespaces, forward the local tunnel listener as a private port. Confirm its visibility through GitHub and test the actual HTTPS browser link; a healthy VPS listener does not prove that GitHub forwarding is connected. Keep private keys outside the repository and pin the VPS host key.

## Useful control-room features

Provide cache readiness, verified files, download attempts, failures, delivered bytes, active transfers, uptime, process memory, CPU load, free disk, and synchronization health. Distinguish cached availability from the progress of a full verification pass.

Add search, source/status filters, sorting, pagination, per-game verification/repair, sync pause/resume, a bounded activity log, and diagnostics export. Sanitize exported data and exclude passwords, authorization headers, CSRF tokens, session IDs, and private paths.

Use text nodes for game titles and error messages. Serve pages as `text/html`, CSS as `text/css`, and scripts as JavaScript. An HTML endpoint should not return attachment headers. Handle unknown routes and unsupported methods with explicit content types.

## Capacity and recovery

Track disk space before accepting new content, reserve room for temporary files, and set finite download/body limits. Start with low concurrency and measure memory use on the target VPS.

Back up the accepted catalog and configuration separately from game caches. To recover, restore configuration, verify cached files, and reconcile with the trusted source. Rotate credentials separately from code deployment.
