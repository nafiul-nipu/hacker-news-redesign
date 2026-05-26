import type { AlgoliaSearchResponse, StoriesPage } from "../types";

const ALGOLIA_BASE_URL = "https://hn.algolia.com/api/v1";

// fetch one page of the latest HN stories
export async function fetchLatestStories(page = 0): Promise<StoriesPage> {
  // get the latest news
  const response = await fetch(
    `${ALGOLIA_BASE_URL}/search_by_date?tags=story&page=${page}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch latest Hacker News stories");
  }

  // data
  const data: AlgoliaSearchResponse = await response.json();
  // console.log(data);

  // return only fields that are needed
  return {
    stories: data.hits,
    page: data.page,
    totalPages: data.nbPages,
  };
}
