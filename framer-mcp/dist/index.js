import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { scaffoldFramerPackage } from "./tools/scaffoldFramerPackage.js";
import { generateComponent } from "./tools/generateComponent.js";
const server = new McpServer({
    name: "framer-mcp",
    version: "0.1.0",
});
server.tool("scaffold_framer_package", {
    targetDir: z.string().describe("Absolute path to create the package"),
    packageName: z
        .string()
        .min(1)
        .regex(/^[a-z][a-z0-9\-]*$/)
        .describe("kebab-case npm package name"),
    author: z.string().optional(),
}, async (args) => {
    const result = await scaffoldFramerPackage(args);
    return {
        content: [
            {
                type: "text",
                text: JSON.stringify(result, null, 2),
            },
        ],
    };
});
server.tool("generate_component", {
    packageDir: z.string().describe("Absolute path to the package root"),
    componentName: z
        .string()
        .min(1)
        .regex(/^[A-Z][A-Za-z0-9_]*$/)
        .describe("PascalCase React component name"),
    props: z.record(z.string(), z.any()).default({}).describe("Default prop values"),
}, async (args) => {
    const result = await generateComponent(args);
    return {
        content: [
            {
                type: "text",
                text: JSON.stringify(result, null, 2),
            },
        ],
    };
});
const transport = new StdioServerTransport();
await server.connect(transport);
//# sourceMappingURL=index.js.map