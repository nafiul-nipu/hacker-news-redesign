import type { AlgoliaSearchResponse, AlgoliaStory } from "../types";

const ALGOLIA_BASE_URL = "https://hn.algolia.com/api/v1";

// fetch latest stories
export async function fetchLatestStories(): Promise<AlgoliaStory[]> {
  // get the latest news
  const response = await fetch(
    `${ALGOLIA_BASE_URL}/search_by_date?tags=story&page=0`,
  );

  // data
  const data: AlgoliaSearchResponse = await response.json();
  console.log(data);

  return data.hits;
}
