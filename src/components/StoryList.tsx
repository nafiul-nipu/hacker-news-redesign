import type { AlgoliaStory } from "../types";
import { StoryItem } from "./StoryItem";

type StoryListProps = {
  stories: AlgoliaStory[];
  isStoryOpened: (storyId: string) => boolean;
  onOpenStory: (storyId: string) => void;
  isStoryStarred: (storyId: string) => boolean;
  onToggleStarredStory: (story: AlgoliaStory) => void;
  onShowMore: () => void;
  canShowMore: boolean;
};

export function StoryList({
  stories,
  isStoryOpened,
  onOpenStory,
  isStoryStarred,
  onToggleStarredStory,
  onShowMore,
  canShowMore,
}: StoryListProps) {
  if (stories.length === 0) {
    return <p className="text-gray-500">No stories to show.</p>;
  }
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

      {canShowMore && (
        <button
          type="button"
          onClick={onShowMore}
          className="mt-12 bg-[#ff6600] px-8 py-4 text-xl text-white"
        >
          show more
        </button>
      )}
    </>
  );
}
