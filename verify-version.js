import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const packageJson = JSON.parse(
    await readFile(resolve(__dirname, './package.json'))
);

const { version } = packageJson;
const tagVersion = process.env.GITHUB_REF_NAME;

// Only verify version match if we're on a tag
// Normalize version strings by removing 'v' prefix if present
const normalizeVersion = (v) => v.startsWith('v') ? v.slice(1) : v;

// Only verify version match if we're on a tag that looks like a version
if (tagVersion && (tagVersion.startsWith('v') || /^\d/.test(tagVersion))) {
    const normalizedTagVersion = normalizeVersion(tagVersion);
    const normalizedVersion = normalizeVersion(version);
    
    if (normalizedTagVersion !== normalizedVersion) {
        console.error(`Error: Tag version (${tagVersion}) does not match package.json version (${version})`);
        console.error('Note: Both formats "1.0.0" and "v1.0.0" are accepted.');
        process.exit(1);
    }
}

// Using the new GITHUB_OUTPUT environment file approach
const output = process.env.GITHUB_OUTPUT;
if (output) {
    const fs = await import('fs');
    fs.appendFileSync(output, `version=${version}\n`);
}
