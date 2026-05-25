import type { AlgoliaStory } from "../types";
import { useLocalStorage } from "./useLocalStorage";

export function useStarredStories() {
  const [starredStories, setStarredStories] = useLocalStorage<AlgoliaStory[]>(
    "hn-starred-stories",
    [],
  );

  function isStoryStarred(storyId: string) {
    return starredStories.some((story) => story.objectID === storyId);
  }

  function toggleStarredStory(story: AlgoliaStory) {
    setStarredStories((currentStories) => {
      const isAlreadyStarred = currentStories.some(
        (currentStory) => currentStory.objectID === story.objectID,
      );

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
