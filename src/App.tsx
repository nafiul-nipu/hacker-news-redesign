import "./App.css";
import { useEffect, useRef } from "react";
import { useIsRestoring } from "@tanstack/react-query";

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
  // server state
  // using react query to handle the data fetch, loading, error etc
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    isFetchingNextPage,
  } = useLatestStories();

  // true while react query is restoring persisted query data from localstorage
  const isRestoring = useIsRestoring();

  // client or UI states
  // localstorage independent to persist query
  const [activeTab, setActiveTab] = useLocalStorage<StoryTab>(
    "hn-active-tab",
    "latest",
  );
  const [savedScrollY, setSavedScrollY] = useLocalStorage<number>(
    "hn-scroll-y",
    0,
  );
  const { theme, toggleTheme } = useTheme();
  const { openStory, isStoryOpened } = useOpenedStories();
  const { starredStories, isStoryStarred, toggleStarredStory } =
    useStarredStories();

  // flatten the paginated react query response stories into one single array for rendering
  const stories = data?.pages.flatMap((page) => page.stories) ?? [];

  // which tab to show (starred | latest)
  const visibleStories = activeTab === "starred" ? starredStories : stories;

  // save scroll position so refresh restores user's position
  useEffect(() => {
    let timeoutId: number | undefined;

    function handleScroll() {
      window.clearTimeout(timeoutId);

      timeoutId = window.setTimeout(() => {
        setSavedScrollY(window.scrollY);
      }, 150);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [setSavedScrollY]);

  // track whether scroll restoration has already happened or not
  const hasRestoredScroll = useRef(false);
  // scroll restore only after react query restored data and stories are rendered
  useEffect(() => {
    if (isRestoring || hasRestoredScroll.current || stories.length === 0) {
      return;
    }

    hasRestoredScroll.current = true;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.scrollTo({
          top: savedScrollY,
          behavior: "auto",
        });
      });
    });
  }, [isRestoring, savedScrollY, stories.length]);

  // theme and styling
  const isDark = theme === "dark";
  const pageClasses = isDark
    ? "min-h-screen border-t-4 border-[#ff6600] bg-[#1f2127] text-white"
    : "min-h-screen border-t-4 border-[#ff6600] bg-white text-black";

  const contentClasses = "mx-auto max-w-[1530px] px-5 sm:px-8 lg:px-16";

  // prevent duplicate pagination request while restoring or
  // already fetching the next page
  async function handleLoadMore() {
    if (!hasNextPage || isFetchingNextPage || isRestoring) {
      return;
    }

    await fetchNextPage();
  }

  // load more only for live feed
  const canLoadMore =
    !isRestoring &&
    activeTab === "latest" &&
    Boolean(hasNextPage) &&
    !isFetchingNextPage;

  if (isLoading || isRestoring) {
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
