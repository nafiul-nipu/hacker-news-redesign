import type { AlgoliaStory } from "../types";
import { useLocalStorage } from "./useLocalStorage";

// custom hook to save, toggle starred stories
export function useStarredStories() {
  // store full stories locally
  // goal is to make sure articles remain independently of the live data
  // so if the data is not available anymore in the API, we can still show them
  const [starredStories, setStarredStories] = useLocalStorage<AlgoliaStory[]>(
    "hn-starred-stories",
    [],
  );

  // check if the story is already saved
  function isStoryStarred(storyId: string) {
    return starredStories.some((story) => story.objectID === storyId);
  }

  // if story already starred - remove
  // otherwise - add
  function toggleStarredStory(story: AlgoliaStory) {
    setStarredStories((currentStories) => {
      const isAlreadyStarred = currentStories.some(
        (currentStory) => currentStory.objectID === story.objectID,
      );

      // clicking an already-starred story removes it from the saved list.
      if (isAlreadyStarred) {
        return currentStories.filter(
          (currentStory) => currentStory.objectID !== story.objectID,
        );
      }

      return [...currentStories, story];
    });
  }

  return {
    starredStories,
    isStoryStarred,
    toggleStarredStory,
  };
}
