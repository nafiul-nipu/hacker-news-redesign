import { useLocalStorage } from "./useLocalStorage";

export function useOpenedStories() {
  // save opened story ids so we can make sure they are still marked after refresh
  const [openedStoryIds, setOpenedStoryIds] = useLocalStorage<string[]>(
    "hn-opened-story-ids",
    [],
  );

  function openStory(storyId: string) {
    setOpenedStoryIds((currentIds) => {
      // do not add the id of the story that is already opened once
      if (currentIds.includes(storyId)) {
        return currentIds;
      }

      return [...currentIds, storyId];
    });
  }

  // is this story opened??
  function isStoryOpened(storyId: string) {
    return openedStoryIds.includes(storyId);
  }

  return {
    openedStoryIds,
    openStory,
    isStoryOpened,
  };
}
