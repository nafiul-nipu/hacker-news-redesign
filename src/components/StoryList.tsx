import type { AlgoliaStory } from "../types";
import { StoryItem } from "./StoryItem";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";

type StoryListProps = {
  stories: AlgoliaStory[];
  isStoryOpened: (storyId: string) => boolean;
  onOpenStory: (storyId: string) => void;
  isStoryStarred: (storyId: string) => boolean;
  onToggleStarredStory: (story: AlgoliaStory) => void;
  onLoadMore: () => void;
  canLoadMore: boolean;
  isLoadingMore: boolean;
};

export function StoryList({
  stories,
  isStoryOpened,
  onOpenStory,
  isStoryStarred,
  onToggleStarredStory,
  onLoadMore,
  canLoadMore,
  isLoadingMore,
}: StoryListProps) {
  // detect when the user reaches the bottom of the list to load more stories automatically.
  const loadMoreRef = useInfiniteScroll({
    enabled: canLoadMore,
    onLoadMore,
  });

  // check if we have stories
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

      {/* element used to detect when the user reaches the bottom of the list. */}
      <div ref={loadMoreRef} className="h-10" />

      {/* fallback button in case automatic loading is missed. */}
      {canLoadMore && (
        <button
          type="button"
          onClick={onLoadMore}
          className="mt-8 bg-[#ff6600] px-8 py-4 text-xl text-white hover:bg-[#e85c00]"
        >
          load more
        </button>
      )}

      {isLoadingMore && (
        <p className="mt-8 text-sm text-gray-500">Loading more stories...</p>
      )}
    </>
  );
}
