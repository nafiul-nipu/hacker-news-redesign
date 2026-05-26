import type { StoryTab, Theme } from "../types";
import { FaMoon, FaSun } from "react-icons/fa";

type HeaderProps = {
  theme: Theme;
  activeTab: StoryTab;
  onChangeTab: (tab: StoryTab) => void;
  onToggleTheme: () => void;
};

export function Header({
  theme,
  activeTab,
  onChangeTab,
  onToggleTheme,
}: HeaderProps) {
  const isDark = theme === "dark";
  // accessibility ARIA label
  const themeLabel = isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <header className="flex flex-col gap-6 pt-10 pb-12 sm:flex-row sm:items-center sm:justify-between sm:pt-14 sm:pb-14">
      <div className="flex flex-wrap items-center gap-4 sm:gap-8">
        {/* Hacker News logo */}
        <div className="flex h-10 w-10 items-center justify-center bg-[#ff6600] text-2xl text-white">
          Y
        </div>
        <h1 className="text-2xl font-bold tracking-normal sm:text-3xl">
          Hacker News
        </h1>

        {/* navigation between live feed and starred stories */}
        <nav className="flex items-center gap-2 text-base">
          <button
            type="button"
            onClick={() => onChangeTab("latest")}
            className={
              activeTab === "latest"
                ? "cursor-pointer font-bold text-[#ff6600]"
                : isDark
                  ? "cursor-pointer text-gray-200"
                  : "cursor-pointer text-black"
            }
          >
            latest
          </button>

          <span className="text-gray-500">|</span>

          <button
            type="button"
            onClick={() => onChangeTab("starred")}
            className={
              activeTab === "starred"
                ? "cursor-pointer font-bold text-[#ff6600]"
                : isDark
                  ? "cursor-pointer text-gray-200"
                  : "cursor-pointer text-black"
            }
          >
            starred
          </button>
        </nav>
      </div>
      {/* change theme (persists using localstorage) */}
      <button
        type="button"
        onClick={onToggleTheme}
        aria-label={themeLabel}
        className="cursor-pointer text-2xl"
      >
        {isDark ? <FaSun /> : <FaMoon />}
      </button>
    </header>
  );
}
