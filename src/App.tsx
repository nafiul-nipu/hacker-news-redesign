import "./App.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { StoryList } from "./components/StoryList";
import type { StoryTab } from "./types";
import { useTheme } from "./hooks/useTheme";
import { useOpenedStories } from "./hooks/useOpenedStories";
import { useStarredStories } from "./hooks/useStarredStories";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useLatestStories } from "./hooks/useLatestStories";

function App() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    isFetchingNextPage,
  } = useLatestStories();
  const stories = data?.pages.flatMap((page) => page.stories) ?? [];

  const [activeTab, setActiveTab] = useLocalStorage<StoryTab>(
    "hn-active-tab",
    "latest",
  );
  const { theme, toggleTheme } = useTheme();
  const { openStory, isStoryOpened } = useOpenedStories();
  const { starredStories, isStoryStarred, toggleStarredStory } =
    useStarredStories();

  const visibleStories = activeTab === "starred" ? starredStories : stories;

  const [, setSavedPage] = useLocalStorage<number>("hn-latest-page", 0);

  const isDark = theme === "dark";
  const pageClasses = isDark
    ? "min-h-screen border-t-4 border-[#ff6600] bg-[#1f2127] text-white"
    : "min-h-screen border-t-4 border-[#ff6600] bg-white text-black";

  const contentClasses = "mx-auto max-w-[1530px] px-5 sm:px-8 lg:px-16";

  async function handleLoadMore() {
    if (!hasNextPage || isFetchingNextPage) {
      return;
    }

    const result = await fetchNextPage();
    const latestPage = result.data?.pages.at(-1);

    // console.log(result.data?.pages.map((page) => page.stories.length));

    if (latestPage) {
      setSavedPage(latestPage.page);
    }
  }

  const canLoadMore =
    activeTab === "latest" && Boolean(hasNextPage) && !isFetchingNextPage;

  if (isLoading) {
    return (
      <div className={pageClasses}>
        <div className={contentClasses}>Loading stories...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={pageClasses}>
        <div className={contentClasses}>Failed to load stories.</div>
      </div>
    );
  }
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
            onLoadMore={handleLoadMore}
            canLoadMore={canLoadMore}
            isLoadingMore={isFetchingNextPage}
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
