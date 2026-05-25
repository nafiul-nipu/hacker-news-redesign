import type { AlgoliaSearchResponse, StoriesPage } from "../types";

const ALGOLIA_BASE_URL = "https://hn.algolia.com/api/v1";

// fetch latest stories
export async function fetchLatestStories(page = 0): Promise<StoriesPage> {
  // get the latest news
  const response = await fetch(
    `${ALGOLIA_BASE_URL}/search_by_date?tags=story&page=${page}`,
  );

  // data
  const data: AlgoliaSearchResponse = await response.json();
  console.log(data);

  return {
    stories: data.hits,
    page: data.page,
    totalPages: data.nbPages,
  };
}
