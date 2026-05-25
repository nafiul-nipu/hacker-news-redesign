import type { AlgoliaStory } from "../types";
import { StoryItem } from "./StoryItem";

type StoryListProps = {
  stories: AlgoliaStory[];
  isStoryOpened: (storyId: string) => boolean;
  onOpenStory: (storyId: string) => void;
  isStoryStarred: (storyId: string) => boolean;
  onToggleStarredStory: (story: AlgoliaStory) => void;
};

export function StoryList({
  stories,
  isStoryOpened,
  onOpenStory,
  isStoryStarred,
  onToggleStarredStory,
}: StoryListProps) {
  return (
    <>
      <div className="space-y-7">
        {stories.map((story, index) => (
          <StoryItem
            key={story.objectID}
            position={index + 1}
            story={story}
            isOpened={isStoryOpened(story.objectID)}
            onOpenStory={onOpenStory}
            isStarred={isStoryStarred(story.objectID)}
            onToggleStarredStory={onToggleStarredStory}
          />
        ))}
      </div>

      <button className="mt-12 bg-[#ff6600] px-8 py-4 text-xl text-white">
        show more
      </button>
    </>
  );
}
