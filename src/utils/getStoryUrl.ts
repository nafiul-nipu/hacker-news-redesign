// Use the original article URL when available,
// otherwise fall back to the HN discussion page.
export function getStoryUrl(url: string | null, storyId: string): string {
  return url ?? `https://news.ycombinator.com/item?id=${storyId}`;
}
