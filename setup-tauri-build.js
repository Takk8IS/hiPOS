import { promises as fs } from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const AUTHOR = "David C Cavalcante";
const EMAIL = "davcavalcante@proton.me";
const DESCRIPTION = "A modern point-of-sale system for desktop and web";
const CATEGORY = "BusinessAndFinance";

// Configuration templates
const tauriConfig = {
"build": {
    "beforeBuildCommand": "npm run build",
    "beforeDevCommand": "npm run dev",
    "frontendDist": "../out",
    "devPath": "http://localhost:3000",
    "withGlobalTauri": true
},
"package": {
    "productName": "hiPOS",
    "version": "1.0.0"
},
"tauri": {
    "allowlist": {
    "all": true
    },
    "bundle": {
    "active": true,
    "category": CATEGORY,
    "copyright": `Copyright © ${new Date().getFullYear()} ${AUTHOR}`,
    "deb": {
        "depends": [
        "libwebkit2gtk-4.1-0",
        "libgtk-4-1",
        "libappindicator3-1",
        "librsvg2-2"
        ]
    },
    "appimage": {
        "bundleMediaFramework": true
    },
    "externalBin": [],
    "icon": [
        "icons/32x32.png",
        "icons/128x128.png",
        "icons/128x128@2x.png",
        "icons/icon.icns",
        "icons/icon.ico"
    ],
    "identifier": "com.hipos.dev",
    "longDescription": DESCRIPTION,
    "macOS": {
        "frameworks": [],
        "minimumSystemVersion": "10.13",
        "signing": {
        "identity": null,
        "hardened-runtime": true,
        "entitlements": null,
        "entitlements-inherit": null,
        "provisioningProfile": null
        },
        "license": null
    },
    "resources": [
        "../out/**/*"
    ],
    "shortDescription": DESCRIPTION,
    "targets": ["app", "deb", "msi", "dmg", "updater"],
    "windows": {
        "certificateThumbprint": null,
        "digestAlgorithm": "sha256",
        "timestampUrl": "http://timestamp.digicert.com",
        "wix": {
        "language": ["pt-BR"]
        }
    }
    },
    "security": {
    "csp": null
    },
    "updater": {
    "active": true,
    "endpoints": [
        "https://github.com/Takk8IS/hiPOS/releases/latest/download/latest.json"
    ],
    "dialog": true,
    "pubkey": null
    },
    "windows": [
    {
        "title": "hiPOS",
        "width": 1200,
        "height": 800,
        "resizable": true,
        "fullscreen": false,
        "maximized": false
    }
    ]
}
};

const workflowYAML = `
name: Release
on:
push:
    tags:
    - 'v*'
workflow_dispatch:

jobs:
release:
    permissions:
    contents: write
    strategy:
    fail-fast: false
    matrix:
        platform: [macos-latest, ubuntu-latest, windows-latest]
    runs-on: \${{ matrix.platform }}
    steps:
    - uses: actions/checkout@v4

    - name: Setup node
        uses: actions/setup-node@v4
        with:
        node-version: 20.11.1
        cache: npm

    - uses: dtolnay/rust-toolchain@stable
        with:
        components: clippy, rustfmt
        targets: |
            aarch64-apple-darwin
            x86_64-unknown-linux-gnu
            x86_64-pc-windows-msvc
            
    - name: Cache node_modules
        uses: actions/cache@v4
        with:
        path: node_modules
        key: \${{ runner.os }}-node-\${{ hashFiles('**/package-lock.json') }}
        restore-keys: |
            \${{ runner.os }}-node-
            
    - name: Get Version
        id: version
        uses: notiz-dev/github-action-json-property@release
        with:
        path: package.json
        prop_path: version

    - name: Rust Cache
        uses: swatinem/rust-cache@v2
        with:
        workspaces: ./src-tauri -> target

    - name: Install dependencies (ubuntu only)
        if: matrix.platform == 'ubuntu-latest'
        run: |
        sudo apt-get update
        sudo apt-get install -y libgtk-3-dev webkit2gtk-4.0 libappindicator3-dev librsvg2-dev patchelf

    - name: Install dependencies
        run: npm ci

    - name: Next.js Build
        env:
        NEXT_TELEMETRY_DISABLED: 1
        CI: true
        NODE_ENV: production
        run: npm run build

    - name: Build Tauri
        uses: tauri-apps/tauri-action@v0
        env:
        GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
        with:
        tagName: v\${{ steps.version.outputs.version }}
        releaseName: 'hiPOS v\${{ steps.version.outputs.version }}'
        releaseBody: |
            ## hiPOS v\${{ steps.version.outputs.version }}

            ### Downloads
            - Windows: \`.msi\` installer
            - macOS: \`.dmg\` installer and \`.app\` bundle
            - Linux: \`.deb\` package and \`.AppImage\` portable executable

            ### Notes
            - This is an automated release build
            - Assets will be attached automatically after all builds complete
        releaseDraft: true
        prerelease: false

    - name: Upload artifacts
        uses: actions/upload-artifact@v4
        with:
        name: hipos-v\${{ steps.version.outputs.version }}-\${{ matrix.platform }}
        path: |
            src-tauri/target/release/bundle/**/*.deb
            src-tauri/target/release/bundle/**/*.AppImage
            src-tauri/target/release/bundle/**/*.dmg
            src-tauri/target/release/bundle/**/*.app
            src-tauri/target/release/bundle/**/*.msi
`.trim();

async function writeFileIfNotExists(filePath, content) {
try {
    await fs.access(filePath);
    console.log(`File ${filePath} already exists. Updating...`);
    await fs.writeFile(filePath, content);
} catch {
    console.log(`Creating ${filePath}...`);
    await fs.writeFile(filePath, content);
}
}

async function setupBuildConfiguration() {
try {
    // Ensure directories exist
    const workflowDir = path.join('.github', 'workflows');
    const tauriDir = 'src-tauri';
    
    await fs.mkdir(workflowDir, { recursive: true });
    await fs.mkdir(tauriDir, { recursive: true });

    // Write workflow file
    await writeFileIfNotExists(
    path.join(workflowDir, 'release.yml'),
    workflowYAML
    );

    // Write Tauri config
    await writeFileIfNotExists(
    path.join(tauriDir, 'tauri.conf.json'),
    JSON.stringify(tauriConfig, null, 2)
    );

    console.log('\nConfiguration completed successfully! 🎉');
    console.log('\nNext steps:');
    console.log('1. Commit and push the changes');
    console.log('2. Create a new tag: git tag v1.0.0');
    console.log('3. Push the tag: git push origin v1.0.0');
    console.log('4. The GitHub Action will automatically build and release your app');
    
    console.log('\nNote: Your builds will be unsigned. Users may need to:');
    console.log('- macOS: Use xattr -cr /Applications/hiPOS.app');
    console.log('- Windows: Accept the "unknown publisher" warning');
    console.log('- Linux: No special steps needed\n');

} catch (error) {
    console.error('Error setting up build configuration:', error);
    process.exit(1);
}
}

setupBuildConfiguration().catch(console.error);

