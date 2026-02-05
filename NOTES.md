# Notes

## Package Management

This project uses **pnpm** for dependency management.

```bash
pnpm install
```

## Team & Bookkeeper Discovery Flow

To operate on tasks, the API requires a `bookkeeper_team_id`. This ID is identical to the primary `teamId` (Company ID).

### Discovery Chain

1. **User Identity**: Call `user.info()` (optional, for profile context).
2. **Team/Bookkeeper ID**: Call `company.list()`. The `id` of the first company is the `teamId` used for all operations (tasks, settings, etc.).

This flow is handled automatically in the node's `execute` method by calling `client.getTeamId()`.

## Icons

- `icons/finkoper.svg`: Light mode icon
- `icons/finkoper.dark.svg`: Dark mode icon

---

## Related Documentation

* [[AGENTS.md]] - Engineering guidelines and project architecture.
