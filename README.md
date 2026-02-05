# n8n Nodes: Finkoper

This package provides community nodes for [n8n](https://n8n.io) to interact with the [Finkoper CRM API](https://finkoper.com).

## Installation

### In n8n

1. Go to **Settings** > **Community Nodes**
2. Select **Install**
3. Enter `n8n-nodes-finkoper` and click **Install**

### Manual

```bash
pnpm add n8n-nodes-finkoper
```

## Features

### Resources

| Resource | Operations |
| --- | --- |
| **Mail** | Get Mailboxes, Get Posts, Get Credentials, Mark Seen |
| **Task** | List, Create |
| **Customer** | List, Get Details |
| **Role** | List, Get Users |
| **User** | Get Info, Get Company |
| **Company** | List |

### Credentials

The node uses email/password authentication with automatic token management:
- Access tokens are cached and reused
- Tokens are automatically refreshed when expired
- Refresh tokens are stored for future token rotation (when API supports it)

## Development

### Prerequisites

- Node.js v22+
- pnpm

### Setup

```bash
# Clone the repository
git clone https://github.com/gsdstr/n8n-nodes-finkoper.git
cd n8n-nodes-finkoper

# Install dependencies
pnpm install

# Start dev server (builds and runs n8n with node loaded)
pnpm run dev
```

### Available Scripts

| Script | Description |
| --- | --- |
| `pnpm run dev` | Start n8n with node loaded (hot reload) |
| `pnpm run build` | Build for production |
| `pnpm run lint` | Check for linting errors |
| `pnpm run lint:fix` | Auto-fix linting issues |

### Debugging

For detailed instructions on how to debug your nodes using VS Code, see [DEBUG.md](./DEBUG.md).

### Architecture

This node uses the `finkoper-api` library for all API interactions:

```text
nodes/Finkoper/
├── Finkoper.node.ts       # Main node with execute logic
├── Finkoper.node.json     # Codex metadata
└── resources/             # UI field definitions
    ├── mail/
    ├── task/
    ├── customer/
    ├── role/
    ├── user/
    └── company/
```

## Related Projects

- [finkoper-api](../finkoper-api) - Core TypeScript client library
- [finkoper-mcp](../finkoper-mcp) - MCP server for AI assistants
- [finkoper-cli](../finkoper-cli) - Command-line interface

## License

[MIT](LICENSE.md)
