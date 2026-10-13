import { createGetUrl } from 'fumadocs-core/source';

export const appName = 'Carter Game’s';
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
export const docsRoute = '/docs';
export const docsImageRoute = '/og/docs';
export const docsContentRoute = '/llms.mdx/docs';
const repository = process.env.NEXT_PUBLIC_GITHUB_REPOSITORY || 'Carter-Game-s/carter-games-preloader-guide';
const [user, repo] = repository.split('/');
export const gitConfig = { user, repo, branch: 'main' };
const getContentUrl = createGetUrl(docsContentRoute);
export function getPageMarkdownUrl(page: { slugs: string[]; locale?: string }) {
  const segments = [...page.slugs, 'content.md'];
  return { segments, url: basePath + getContentUrl(segments, page.locale) };
}
const getImageUrl = createGetUrl(docsImageRoute);
export function getPageImageUrl(page: { slugs: string[]; locale?: string }) {
  const segments = [...page.slugs, 'image.png'];
  return { segments, url: basePath + getImageUrl(segments, page.locale) };
}
