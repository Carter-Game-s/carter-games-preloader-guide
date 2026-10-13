# Carter Game’s · Preloader Guide

A public **Fumadocs** site by **Carter (carteraccs)** explaining how to build a verified game preloader. AI assistance helped prepare the documentation. Carter's production preloader remains private.

The guide covers catalog validation, immutable game hashes, atomic caching, automatic publishing, secure asset delivery and administration, VPS deployment, testing, and recovery.

## Run locally

Install Bun and Node.js 22 or later:

```bash
bun install --frozen-lockfile
bun run dev
```

Open `http://localhost:3000`. MDX chapters live in `content/docs`; the sidebar order is in `content/docs/meta.json`.

## Validate and build

```bash
bun run typecheck
bun run build
node examples/hash-file.mjs examples/demo.html
git hash-object --no-filters examples/demo.html
```

The integrity example and Git should print the same hash. `bun run build` exports the site to `out/`. Production search runs locally in the browser using the exported index; no search-provider credentials or server are required.

## GitHub Pages

The included workflow builds and deploys the static site when Pages is configured to use GitHub Actions. It derives the repository identity and base path from GitHub, so it also supports an organization-owned project repository.

For a manual project-path build, set `NEXT_PUBLIC_BASE_PATH=/YOUR_REPOSITORY_NAME`. Set `NEXT_PUBLIC_GITHUB_REPOSITORY=YOUR_OWNER/YOUR_REPOSITORY` for source links. Keep `NEXT_PUBLIC_BASE_PATH` empty when hosting at a domain root. These variables contain public site metadata, never credentials.

## Contents

The 18-chapter handbook includes quickstart, architecture, catalog contracts, integrity and atomic caching, publishing, automatic synchronization, configuration, asset APIs, VPS deployment, administration, observability, testing, recovery, troubleshooting, and contribution guides.

Read the [published handbook](https://carter-game-s.github.io/carter-games-preloader-guide/) or browse `content/docs`.

Original documentation and educational examples are [MIT licensed](LICENSE). Fumadocs and its dependencies retain their own licenses. Use games you own or have permission to host.
