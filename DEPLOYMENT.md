# Publishing the portfolio

The `main` branch automatically builds and deploys to https://irene0618.github.io/personal-website/ through `.github/workflows/deploy-pages.yml`.

Run `npm ci` and `npm run build` to check a change before pushing it. `npm run dev` uses the local original videos when they are available.

## Original videos

Full-length videos are stored in the same repository's `portfolio-media-v1` GitHub Release. They are not recompressed. `media-manifest.json` records each file's size and SHA-256; the production site uses the release URLs, while local development uses `public/portfolio/` paths.

- `node scripts/publish-media.mjs` uploads missing videos from local storage, then verifies all hashes. It requires an authenticated GitHub CLI.
- `node scripts/publish-media.mjs --verify` checks the uploaded originals without changing anything.
- Update the manifest and upload the files before publishing changes to video URLs. Use a new release tag or filename for revised originals; avoid replacing files that an existing site version uses.

Vite copies website assets into `dist` while excluding the original videos and unused drafts listed in `excludedPublic`. The build checks that the Pages package stays below 950 MiB. Local originals are never removed by this step.

Repository hosting limits: [GitHub Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits), [release asset limits](https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases#storage-and-bandwidth-quotas).
