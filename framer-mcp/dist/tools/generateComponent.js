import fs from "fs-extra";
import path from "path";
import { z } from "zod";
import { bold, green } from "kolorist";
function renderComponent(componentName, props) {
    const propsTypeEntries = Object.entries(props).map(([key, value]) => {
        const tsType = inferTsType(value);
        return `  ${key}?: ${tsType};`;
    });
    const defaultPropsEntries = Object.entries(props).map(([key, value]) => {
        return `  ${key}: ${JSON.stringify(value)},`;
    });
    const controlsEntries = Object.entries(props).map(([key, value]) => {
        const type = inferControlType(value);
        return `  ${key}: { type: '${type}', title: '${toTitleCase(key)}' },`;
    });
    return `import * as React from 'react';
import { addPropertyControls, ControlType } from 'framer';

export type ${componentName}Props = {
${propsTypeEntries.join("\n")}
};

export function ${componentName}(props: ${componentName}Props) {
  const { ${Object.keys(props).join(", ")} } = props;
  return <div style={{ padding: 8 }}>${componentName}</div>;
}

(${componentName} as any).defaultProps = {
${defaultPropsEntries.join("\n")}
};

addPropertyControls(${componentName}, {
${controlsEntries.join("\n")}
});
`;
}
function inferTsType(sample) {
    const t = typeof sample;
    if (t === "string")
        return "string";
    if (t === "number")
        return "number";
    if (t === "boolean")
        return "boolean";
    if (Array.isArray(sample))
        return "any[]";
    if (sample && t === "object")
        return "Record<string, any>";
    return "any";
}
function inferControlType(sample) {
    const t = typeof sample;
    if (t === "string")
        return "string";
    if (t === "number")
        return "number";
    if (t === "boolean")
        return "boolean";
    if (Array.isArray(sample))
        return "array";
    return "string";
}
function toTitleCase(s) {
    return s
        .replace(/[-_]+/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .replace(/\b\w/g, (c) => c.toUpperCase());
}
export const generateComponent = async (args) => {
    const schema = z.object({
        packageDir: z.string(),
        componentName: z.string(),
        props: z.record(z.string(), z.any()).default({}),
    });
    const { packageDir, componentName, props } = schema.parse(args);
    const pkgRoot = path.resolve(packageDir);
    const componentsDir = path.join(pkgRoot, "code", "components");
    await fs.ensureDir(componentsDir);
    const filePath = path.join(componentsDir, `${componentName}.tsx`);
    const content = renderComponent(componentName, props);
    await fs.writeFile(filePath, content);
    const indexPath = path.join(componentsDir, "index.ts");
    const exportLine = `export { ${componentName} } from './${componentName}';\n`;
    await fs.ensureFile(indexPath);
    const existing = (await fs.readFile(indexPath, "utf8").catch(() => "")) || "";
    if (!existing.includes(exportLine)) {
        await fs.appendFile(indexPath, exportLine);
    }
    return {
        message: `${green("Component generated:")} ${bold(filePath)}`,
        filePath,
    };
};
//# sourceMappingURL=generateComponent.js.map