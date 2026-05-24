import { useEffect, useState } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import type { AlgoliaStory } from "./types";
import { fetchLatestStories } from "./api/algoliaHnAPI";
import { useTheme } from "./hooks/useTheme";

function App() {
  const [stories, setStories] = useState<AlgoliaStory[]>([]);
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const pageClasses = isDark
    ? "min-h-screen border-t-4 border-[#ff6600] bg-[#1f2127] text-white"
    : "min-h-screen border-t-4 border-[#ff6600] bg-white text-black";

  const contentClasses = "mx-auto max-w-[1530px] px-16";

  useEffect(() => {
    async function loadStories() {
      const latestStories = await fetchLatestStories();
      setStories(latestStories);
    }

    loadStories();
  }, []);

  return (
    <div className={pageClasses}>
      <div className={contentClasses}>
        <Header theme={theme} onToggleTheme={toggleTheme} />

        <main>
          <ol className="space-y-7 list-decimal list-inside">
            {stories.map((story) => (
              <li key={story.objectID}>
                <a
                  href={
                    story.url ??
                    `https://news.ycombinator.com/item?id=${story.objectID}`
                  }
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
            ))}
          </ol>

          <button className="mt-12 bg-[#ff6600] px-8 py-4 text-xl text-white">
            show more
          </button>
        </main>

        <Footer theme={theme} />
      </div>
    </div>
  );
}

export default App;
