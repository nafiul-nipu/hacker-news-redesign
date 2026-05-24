import type { AlgoliaStory } from "../types";
import { StoryItem } from "./StoryItem";

type StoryListProps = {
  stories: AlgoliaStory[];
};

export function StoryList({ stories }: StoryListProps) {
  return (
    <>
      <ol className="space-y-7 list-decimal list-inside">
        {stories.map((story) => (
          <StoryItem key={story.objectID} story={story} />
        ))}
      </ol>

      <button className="mt-12 bg-[#ff6600] px-8 py-4 text-xl text-white">
        show more
      </button>
    </>
  );
}
