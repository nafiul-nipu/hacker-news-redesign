import type { AlgoliaStory } from "../types";
import { StoryItem } from "./StoryItem";

type StoryListProps = {
  stories: AlgoliaStory[];
  isStoryOpened: (storyId: string) => boolean;
  onOpenStory: (storyId: string) => void;
};

export function StoryList({
  stories,
  isStoryOpened,
  onOpenStory,
}: StoryListProps) {
  return (
    <>
      <ol className="space-y-7 list-decimal list-inside">
        {stories.map((story) => (
          <StoryItem
            key={story.objectID}
            story={story}
            isOpened={isStoryOpened(story.objectID)}
            onOpenStory={onOpenStory}
          />
        ))}
      </ol>

      <button className="mt-12 bg-[#ff6600] px-8 py-4 text-xl text-white">
        show more
      </button>
    </>
  );
}
