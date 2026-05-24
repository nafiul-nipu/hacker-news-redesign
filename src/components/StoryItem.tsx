import type { AlgoliaStory } from "../types";
import { formatRelativeTimeFromSeconds } from "../utils/formatRelativeTime";
import { getNewsDomain } from "../utils/getNewsDomain";
import { getStoryUrl } from "../utils/getStoryUrl";

type StoryItemProps = {
  story: AlgoliaStory;
  isOpened: boolean;
  onOpenStory: (storyId: string) => void;
};

export function StoryItem({ story, isOpened, onOpenStory }: StoryItemProps) {
  const storyUrl = getStoryUrl(story.url, story.objectID);

  const newsDomain = getNewsDomain(story.url);
  const relativeTime = formatRelativeTimeFromSeconds(story.created_at_i);

  const titleClasses = isOpened
    ? "font-mono text-xl font-bold text-gray-500 hover:text-[#ff6600]"
    : "font-mono text-xl font-bold hover:text-[#ff6600]";

  return (
    <li>
      <div>
        <a
          href={storyUrl}
          target="_blank"
          rel="noreferrer"
          onClick={() => onOpenStory(story.objectID)}
          className={titleClasses}
        >
          {story.title ?? "Untitled story"}
        </a>

        <span className="ml-3 text-sm text-gray-500">({newsDomain})</span>
      </div>

      <p className="mt-2 text-sm text-gray-500">
        {story.points ?? 0} points by {story.author} {relativeTime} |{" "}
        {story.num_comments ?? 0} comments | ☆ save
      </p>
    </li>
  );
}
