import { FaRegStar, FaStar } from "react-icons/fa";
import type { AlgoliaStory } from "../types";
import { formatRelativeTimeFromSeconds } from "../utils/formatRelativeTime";
import { getNewsDomain } from "../utils/getNewsDomain";
import { getStoryUrl } from "../utils/getStoryUrl";

type StoryItemProps = {
  position: number;
  story: AlgoliaStory;
  isOpened: boolean;
  onOpenStory: (storyId: string) => void;
  isStarred: boolean;
  onToggleStarredStory: (story: AlgoliaStory) => void;
};

export function StoryItem({
  position,
  story,
  isOpened,
  onOpenStory,
  isStarred,
  onToggleStarredStory,
}: StoryItemProps) {
  const storyUrl = getStoryUrl(story.url, story.objectID);

  const newsDomain = getNewsDomain(story.url);
  const relativeTime = formatRelativeTimeFromSeconds(story.created_at_i);

  const titleClasses = isOpened
    ? "font-mono text-xl font-bold text-gray-500 hover:text-[#ff6600]"
    : "font-mono text-xl font-bold hover:text-[#ff6600]";

  const starButtonClasses = isStarred
    ? "inline-flex items-center gap-1 text-[#ff6600]"
    : "inline-flex items-center gap-1 text-gray-500 hover:text-[#ff6600]";

  return (
    <article className="grid grid-cols-[3rem_1fr] gap-4">
      <span className="pt-1 text-right font-mono text-xl text-gray-500">
        {position}.
      </span>

      <div>
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
          {story.num_comments ?? 0} comments |{" "}
          <button
            type="button"
            onClick={() => onToggleStarredStory(story)}
            aria-label={
              isStarred ? "Remove from starred stories" : "Save story"
            }
            className={starButtonClasses}
          >
            {isStarred ? <FaStar /> : <FaRegStar />}
            <span>{isStarred ? "saved" : "save"}</span>
          </button>
        </p>
      </div>
    </article>
  );
}
