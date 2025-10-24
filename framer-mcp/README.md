# framer-mcp

Minimal MCP server that scaffolds Framer code packages and generates React code components with Framer property controls.

## Install

```bash
npm install
npm run build
```

## Run (MCP server)

```bash
node dist/index.js
```

Or during development:

```bash
npm run dev
```

## Tools

- `scaffold_framer_package`
  - `targetDir` (string): absolute path to create the package
  - `packageName` (string): kebab-case package name
  - `author` (string, optional)

- `generate_component`
  - `packageDir` (string): absolute path to package root
  - `componentName` (string): PascalCase
  - `props` (record): default prop values to infer types/controls

## Client config example (Cursor / MCP)

Add to your MCP client configuration (adjust paths).

```jsonc
{
  "mcpServers": {
    "framer-mcp": {
      "command": "node",
      "args": ["/workspace/framer-mcp/dist/index.js"],
      "env": {}
    }
  }
}
```

## Example usage

1. Scaffold a package:

```json
{
  "name": "scaffold_framer_package",
  "arguments": {
    "targetDir": "/workspace/example-framer-pkg",
    "packageName": "example-framer-pkg",
    "author": "Your Name"
  }
}
```

2. Generate a component:

```json
{
  "name": "generate_component",
  "arguments": {
    "packageDir": "/workspace/example-framer-pkg",
    "componentName": "HelloCard",
    "props": { "title": "Hello", "count": 1, "enabled": true }
  }
}
```
