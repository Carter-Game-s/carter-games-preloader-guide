# Automatic publishing and synchronization

Publication should create a catalog entry and upload the corresponding immutable game bytes in the same source revision. Do not announce a version whose files are unavailable.

## Publication flow

1. Validate the new game and choose a stable slug.
2. Calculate its content hash and byte length.
3. Store the game at a permitted path; split large files only if both publisher and cache support the same verified reconstruction format.
4. Generate the catalog entry and portal metadata.
5. Commit and push the catalog and assets together.
6. Deploy the portal using that catalog revision.

## Reconciliation loop

Poll a configured repository and branch on a bounded interval. Resolve the branch to an immutable commit, then read the catalog and assets from that exact commit. Use a deploy key scoped to that repository if authentication is required.

```text
if another reconciliation is running:
    reuse that operation
fetch current revision from trusted source
validate entire catalog
compare accepted revision and known content IDs
queue only missing or changed versions
verify every queued download
save accepted catalog and progress atomically
publish verified versions to asset API
```

Avoid overlapping checks. Back off when the source is unavailable, then retry automatically. A rejected update must leave the accepted catalog and verified games available. Persist the accepted catalog so service restarts do not forget published games.

Keep failed entries pending until a later successful attempt. Do not remove old cached versions immediately when a game disappears from the latest portal catalog: clients running an older deployment may still need them.

## Admin controls

Manual sync should use the same reconciliation function as scheduled sync. Pausing automatic sync should cancel its future timer and allow an already running operation to finish safely. Pausing discovery must not stop serving cached games.

Resume should schedule checks again. During initial cache verification, remember an admin's pause request rather than unconditionally enabling the timer afterward.

Show the current source revision, last successful check, pending items, operation start/finish times, and a sanitized failure message. Do not return deploy keys, Git credentials, command environments, or raw secret-bearing logs.
