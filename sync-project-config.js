import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

const CONFIG_FILES = {
project: 'project-config.json',
package: 'package.json',
tauri: 'src-tauri/tauri.conf.json'
};

function readJsonFile(filePath) {
try {
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
} catch (error) {
    console.error(chalk.red(`Error reading ${filePath}:`), error.message);
    process.exit(1);
}
}

function writeJsonFile(filePath, content) {
try {
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2) + '\n');
    console.log(chalk.green(`✓ Updated ${filePath}`));
} catch (error) {
    console.error(chalk.red(`Error writing ${filePath}:`), error.message);
    process.exit(1);
}
}

function updatePackageJson(projectConfig) {
const packageJson = readJsonFile(CONFIG_FILES.package);

// Update package.json fields
packageJson.version = projectConfig.version;
packageJson.name = projectConfig.name;
packageJson.description = projectConfig.description.long;
packageJson.author = projectConfig.author;
packageJson.repository = projectConfig.repository;

// Add sync-config script if it doesn't exist
if (!packageJson.scripts) packageJson.scripts = {};
packageJson.scripts['sync-config'] = 'node sync-project-config.js';

writeJsonFile(CONFIG_FILES.package, packageJson);
}

function updateTauriConfig(projectConfig) {
if (!fs.existsSync(CONFIG_FILES.tauri)) {
    console.error(chalk.red(`Error: ${CONFIG_FILES.tauri} does not exist`));
    process.exit(1);
}

const tauriConfig = readJsonFile(CONFIG_FILES.tauri);

try {
    // Update tauri.conf.json fields
    tauriConfig.version = projectConfig.version;
    tauriConfig.identifier = projectConfig.identifier;
    tauriConfig.tauri.windows[0].title = projectConfig.productName;

    writeJsonFile(CONFIG_FILES.tauri, tauriConfig);
} catch (error) {
    console.error(chalk.red(`Error updating tauri config: ${error.message}`));
    process.exit(1);
}
}

function main() {
console.log(chalk.blue('📦 Syncing project configuration...'));

// Read project config
const projectConfig = readJsonFile(CONFIG_FILES.project);

// Update both config files
updatePackageJson(projectConfig);
updateTauriConfig(projectConfig);

console.log(chalk.green('\n✨ Configuration sync completed successfully!'));
}

main();

