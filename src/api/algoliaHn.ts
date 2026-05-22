export async function AlgoliaHnApiCall() {
  const response = await fetch(
    "https://hn.algolia.com/api/v1/search?query=react",
  );

  const data = await response.json();

  console.log("Algolia search result:", data);
  console.log("Algolia first hit:", data.hits[0]);
}
