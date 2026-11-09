import media from '../media-manifest.json';

/** Keep local originals for editing; production streams the identical GitHub Release files. */
export function portfolioAsset(path: string): string {
  const files = media.files as Record<string, { asset: string }>;
  if (import.meta.env.PROD && Object.prototype.hasOwnProperty.call(files, path)) {
    return `https://github.com/${media.repository}/releases/download/${media.tag}/${encodeURIComponent(files[path].asset)}`;
  }
  return `${import.meta.env.BASE_URL}portfolio/${path}`;
}
