import { useState } from "react";

export function useOpenedStories() {
  const [openedStoryIds, setOpenedStoryIds] = useState<string[]>([]);

  function openStory(storyId: string) {
    setOpenedStoryIds((currentIds) => {
      if (currentIds.includes(storyId)) {
        return currentIds;
      }

      return [...currentIds, storyId];
    });
  }

  function isStoryOpened(storyId: string) {
    return openedStoryIds.includes(storyId);
  }

  return {
    openedStoryIds,
    openStory,
    isStoryOpened,
  };
}
