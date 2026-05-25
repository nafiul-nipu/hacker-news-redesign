import { useEffect, useState } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { StoryList } from "./components/StoryList";
import type { AlgoliaStory, StoryTab } from "./types";
import { fetchLatestStories } from "./api/algoliaHnAPI";
import { useTheme } from "./hooks/useTheme";
import { useOpenedStories } from "./hooks/useOpenedStories";
import { useStarredStories } from "./hooks/useStarredStories";
import { useLocalStorage } from "./hooks/useLocalStorage";

function App() {
  const [page, setPage] = useLocalStorage<number>("hn-latest-page", 0);
  const [totalPages, setTotalPages] = useState(0);
  const [activeTab, setActiveTab] = useLocalStorage<StoryTab>(
    "hn-active-tab",
    "latest",
  );
  const [stories, setStories] = useState<AlgoliaStory[]>([]);
  const { theme, toggleTheme } = useTheme();
  const { openStory, isStoryOpened } = useOpenedStories();
  const { starredStories, isStoryStarred, toggleStarredStory } =
    useStarredStories();

  const visibleStories = activeTab === "starred" ? starredStories : stories;

  const isDark = theme === "dark";
  const pageClasses = isDark
    ? "min-h-screen border-t-4 border-[#ff6600] bg-[#1f2127] text-white"
    : "min-h-screen border-t-4 border-[#ff6600] bg-white text-black";

  const contentClasses = "mx-auto max-w-[1530px] px-16";

  useEffect(() => {
    async function loadStories() {
      const pages = await Promise.all(
        Array.from({ length: page + 1 }, (_, pageIndex) =>
          fetchLatestStories(pageIndex),
        ),
      );

      const allStories = pages.flatMap((storyPage) => storyPage.stories);
      const lastPage = pages[pages.length - 1];

      setStories(allStories);
      setTotalPages(lastPage.totalPages);
    }

    loadStories();
  }, []);

  async function handleShowMore() {
    const nextPage = page + 1;

    if (nextPage >= totalPages) {
      return;
    }

    const nextStoriesPage = await fetchLatestStories(nextPage);

    setStories((currentStories) => [
      ...currentStories,
      ...nextStoriesPage.stories,
    ]);

    setPage(nextStoriesPage.page);
    setTotalPages(nextStoriesPage.totalPages);
  }

  const hasMoreStories = page + 1 < totalPages;
  return (
    <div className={pageClasses}>
      <div className={contentClasses}>
        <Header
          theme={theme}
          activeTab={activeTab}
          onChangeTab={setActiveTab}
          onToggleTheme={toggleTheme}
        />

        <main>
          <StoryList
            stories={visibleStories}
            isStoryOpened={isStoryOpened}
            onOpenStory={openStory}
            isStoryStarred={isStoryStarred}
            onToggleStarredStory={toggleStarredStory}
            onShowMore={handleShowMore}
            canShowMore={activeTab === "latest" && hasMoreStories}
          />
        </main>

        <Footer
          theme={theme}
          activeTab={activeTab}
          onChangeTab={setActiveTab}
        />
      </div>
    </div>
  );
}

export default App;
