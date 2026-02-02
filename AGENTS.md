# AGENTS.md - n8n Nodes Guidelines

## Project Overview

This project contains n8n nodes for Finkoper. It is currently undergoing a rewrite from "Legacy" (direct HTTP requests) to "V2" (using the `finkoper-api` library).

## Architecture

- `nodes/FinkoperApi/`: Main node directory.
  - `v2/`: **NEW** implementation using the base library.
  - `execute/`: Legacy execution logic (being migrated).
  - `properties/`: Node UI fields and operation definitions.

## Rewrite Strategy (Migrating to V2)

1. **Use the Library**: All new operations MUST use `FinkoperClient` from `finkoper-api`.
2. **V2 Node**: `nodes/FinkoperApi/v2/FinkoperApiV2.node.ts` is the entry point for version 2.
3. **Compatibility**: We are maintaining the legacy structure within `v2/` for now but injecting the client into the execution functions.

## Implementation Guide

To migrate a new operation to V2:
1. Copy the legacy file to `nodes/FinkoperApi/v2/execute/...`.
2. Update the function signature to accept `client: FinkoperClient`.
3. Replace the `finkoperApiRequest` call with a call to the appropriate client method (e.g., `client.task.list()`).
4. Register the new function in `nodes/FinkoperApi/v2/execute/index.ts`.

## Build & Link

This project links to `finkoper-api`. If you update the library, you must rebuild it there (`pnpm build`).
Due to environment constraints, we use `npm install ../finkoper-api` for linking here.

```bash
npm install
npm run build
```
