import { useEffect, useState } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { StoryList } from "./components/StoryList";
import type { AlgoliaStory } from "./types";
import { fetchLatestStories } from "./api/algoliaHnAPI";
import { useTheme } from "./hooks/useTheme";
import { useOpenedStories } from "./hooks/useOpenedStories";
import { useStarredStories } from "./hooks/useStarredStories";

function App() {
  const [stories, setStories] = useState<AlgoliaStory[]>([]);
  const { theme, toggleTheme } = useTheme();
  const { openStory, isStoryOpened } = useOpenedStories();
  const { isStoryStarred, toggleStarredStory } = useStarredStories();

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
          <StoryList
            stories={stories}
            isStoryOpened={isStoryOpened}
            onOpenStory={openStory}
            isStoryStarred={isStoryStarred}
            onToggleStarredStory={toggleStarredStory}
          />
        </main>

        <Footer theme={theme} />
      </div>
    </div>
  );
}

export default App;
