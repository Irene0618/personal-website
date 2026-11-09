import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { cp, readdir, stat } from 'node:fs/promises';
import { resolve, relative, sep } from 'node:path';
import media from './media-manifest.json';

export default defineConfig(({ command }) => ({
  base: '/personal-website/',
  publicDir: command === 'build' ? false : 'public',
  plugins: [react(), {
    name: 'portfolio-public-assets',
    apply: 'build',
    async closeBundle() {
      const source = resolve('public');
      const target = resolve('dist');
      // Original films remain on disk; publish only the site's referenced previews and assets.
      await cp(source, target, { recursive: true, filter: async path => {
        const name = relative(source, path).split(sep).join('/');
        if (media.excludedPublic.some(excluded => name === excluded || name.startsWith(`${excluded}/`))) return false;
        const info = await stat(path);
        if (info.isFile() && info.size > 100 * 1024 * 1024) throw new Error(`Move this large asset to Releases first: ${name}`);
        return true;
      }});
      async function size(path: string): Promise<number> {
        const entries = await readdir(path, { withFileTypes: true });
        return (await Promise.all(entries.map(entry => entry.isDirectory() ? size(resolve(path,entry.name)) : stat(resolve(path,entry.name)).then(info=>info.size)))).reduce((sum,bytes)=>sum+bytes,0);
      }
      const bytes = await size(target);
      if (bytes > 950 * 1024 * 1024) throw new Error('Pages output is too large; move full-length media to Releases.');
      console.log(`Pages assets: ${(bytes / 1024 / 1024).toFixed(1)} MiB; full films are served from GitHub Releases.`);
    },
  }],
}));
