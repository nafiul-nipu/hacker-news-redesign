export async function FirebaseHnApiCall() {
  const getIdsResponse = await fetch(
    "https://hacker-news.firebaseio.com/v0/topstories.json",
  );

  const topStoriesIds = await getIdsResponse.json();

  console.log("Firebase top story ids:", topStoriesIds.slice(0, 10));

  const firstStoryId = topStoriesIds[0];

  const storyResponse = await fetch(
    `https://hacker-news.firebaseio.com/v0/item/${firstStoryId}.json`,
  );

  const story = await storyResponse.json();

  console.log("Firebase first story:", story);
}
