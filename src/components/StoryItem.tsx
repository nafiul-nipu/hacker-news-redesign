import type { AlgoliaStory } from "../types";

type StoryItemProps = {
  story: AlgoliaStory;
};

export function StoryItem({ story }: StoryItemProps) {
  // Some Hacker News posts do not have external URLs, so fall back to the HN discussion page.
  const storyUrl =
    story.url ?? `https://news.ycombinator.com/item?id=${story.objectID}`;

  return (
    <li>
      <a
        href={storyUrl}
        target="_blank"
        rel="noreferrer"
        className="font-mono text-xl font-bold hover:text-[#ff6600]"
      >
        {story.title ?? "Untitled story"}
      </a>

      <p className="mt-2 text-sm text-gray-500">
        {story.points ?? 0} points by {story.author} 1 hour ago |{" "}
        {story.num_comments ?? 0} comments | ☆ save
      </p>
    </li>
  );
}
