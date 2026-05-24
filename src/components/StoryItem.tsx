import type { AlgoliaStory } from "../types";
import { formatRelativeTimeFromSeconds } from "../utils/formatRelativeTime";
import { getNewsDomain } from "../utils/getNewsDomain";

type StoryItemProps = {
  story: AlgoliaStory;
};

export function StoryItem({ story }: StoryItemProps) {
  // Some Hacker News posts do not have external URLs, so fall back to the HN discussion page.
  const storyUrl =
    story.url ?? `https://news.ycombinator.com/item?id=${story.objectID}`;

  const newsDomain = getNewsDomain(story.url);
  const relativeTime = formatRelativeTimeFromSeconds(story.created_at_i);

  return (
    <li>
      <div>
        <a
          href={storyUrl}
          target="_blank"
          rel="noreferrer"
          className="font-mono text-xl font-bold hover:text-[#ff6600]"
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
