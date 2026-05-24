// Extract a readable domain from article URLs for display beside the story title.
export function getNewsDomain(url: string | null): string {
  if (!url) {
    return "news.ycombinator.com";
  }

  try {
    const hostname = new URL(url).hostname;
    return hostname.replace(/^www\./, "");
  } catch {
    return "news.ycombinator.com";
  }
}
