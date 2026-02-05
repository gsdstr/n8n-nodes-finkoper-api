# AGENTS.md - n8n Nodes Guidelines

## Project Overview

This project provides n8n community nodes for the Finkoper CRM API. It uses the `finkoper-api` library for all API operations.

## Architecture

```
finkoper-n8n/
├── credentials/
│   └── FinkoperApi.credentials.ts   # Auth with token refresh
├── nodes/Finkoper/
│   ├── Finkoper.node.ts             # Main node implementation
│   ├── Finkoper.node.json           # Codex metadata
│   └── resources/                    # UI field definitions
│       ├── mail/index.ts
│       ├── task/index.ts
│       ├── customer/index.ts
│       ├── role/index.ts
│       ├── user/index.ts
│       └── company/index.ts
└── icons/
    ├── finkoper.svg
    └── finkoper.dark.svg
```

## Implementation Pattern

- **Hybrid approach**: Declarative UI definitions + programmatic execute using `FinkoperClient`
- Uses `@n8n/node-cli` for build tools (not tsc+gulp)
- Modern n8n patterns: `NodeConnectionTypes`, `usableAsTool: true`

## Adding New Operations

1. Add the operation to the resource's `index.ts` in `resources/`
2. Implement the method call in the corresponding `execute*Operation` method in `Finkoper.node.ts`
3. Ensure the corresponding method exists in `finkoper-api`

## Build & Test

```bash
# Rebuild finkoper-api first (if changed)
cd ../finkoper-api && pnpm build && cd ../finkoper-n8n

# Install and build
pnpm install
pnpm run build

# Start dev server (runs n8n with node loaded)
pnpm run dev
```

## Related Projects

- `../finkoper-api/` - Core client library (dependency)
- `../finkoper-mcp/` - MCP server
- `../finkoper-cli/` - CLI tool
