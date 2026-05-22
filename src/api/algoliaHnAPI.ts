import type { AlgoliaSearchResponse, AlgoliaStory } from "../types";

const ALGOLIA_BASE_URL = "https://hn.algolia.com/api/v1";

// fetch latest stories
export async function fetchLatestStories(): Promise<AlgoliaStory[]> {
  // front_page tag gives the current hacker news front page in one request
  const response = await fetch(`${ALGOLIA_BASE_URL}/search?tags=front_page`);

  // data
  const data: AlgoliaSearchResponse = await response.json();

  return data.hits;
}
