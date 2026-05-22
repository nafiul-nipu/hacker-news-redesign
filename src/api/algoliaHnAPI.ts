const ALGOLIA_BASE_URL = "https://hn.algolia.com/api/v1";

// fetch latest stories
export async function fetchLatestStories() {
  // api call
  const response = await fetch(`${ALGOLIA_BASE_URL}/search?tags=front_page`);

  // data
  const data = await response.json();

  console.log(data.hits[0]);
  return data.hits;
}
