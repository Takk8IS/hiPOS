import path from 'path'
import { fileURLToPath } from 'url'

/** @type {import('next').NextConfig} */
const nextConfig = {
output: 'export',
distDir: 'out',
webpack: (config) => {
    config.resolve.alias = {
    ...config.resolve.alias,
    '@': path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'src'),
    };
    return config;
},
}

export default nextConfig
