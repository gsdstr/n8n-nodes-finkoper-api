# Debugging n8n Nodes

This guide explains how to debug the Finkoper n8n nodes locally using VS Code.

## Prerequisites

- VS Code
- `pnpm` installed
- The project built at least once (`pnpm build`)

## Debugging Workflows

### 1. Launch from VS Code (Recommended)

This is the easiest way to develop. It starts the internal `n8n-node dev` server and automatically attaches the VS Code debugger.

1. Open the **Run and Debug** tab in VS Code (`Ctrl+Shift+D` or `Cmd+Shift+D`).
2. Select **"Debug n8n Node (Live)"** from the dropdown menu.
3. Press **F5**.
4. n8n will start in the integrated terminal. You can set breakpoints directly in your `.ts` files in the `nodes/` or `credentials/` directories.

### 2. Attach to an External n8n Process

Use this if you prefer running n8n in a separate terminal window or have a custom startup flow.

1. **Start n8n with inspection enabled**:

   ```bash
   NODE_OPTIONS="--inspect" npx n8n start
   ```

2. In VS Code, go to **Run and Debug**.
3. Select **"Attach to local n8n"**.
4. Press **F5**.

## Technical Details

### Source Maps

To allow debugging TypeScript code directly, the `bundle` script in `package.json` includes the `--sourcemap` flag for `esbuild`.

- **Development Build**: `pnpm run build` or `pnpm run dev` generates `.map` files in `dist/`.
- **Production Build**: If you need to bundle without sourcemaps, use `npm run bundle_prod`.

### VS Code Configuration

The configurations are stored in `.vscode/launch.json`:

- **Port**: 9229 (Default Node.js debug port)
- **Restart**: Enabled (Attempt to auto-reconnect if the process restarts)

## Troubleshooting

### "Address already in use"

If you see `Starting inspector on 127.0.0.1:9229 failed: address already in use`, it means another process (likely another n8n instance or a previous debug session) is already using the debug port.

- Kill existing n8n processes: `killall node` (use with caution) or find the PID using `lsof -i :9229`.

### Breakpoints not hitting

- Ensure you have run `pnpm build` or are running `pnpm run dev` to ensure the `dist/` folder and sourcemaps are up to date.
- Verify that the node is actually being executed in your n8n workflow.
