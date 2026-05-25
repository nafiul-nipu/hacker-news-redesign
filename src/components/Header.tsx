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
  const themeLabel = isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <header className="flex items-center justify-between pt-14 pb-14">
      <div className="flex items-center gap-8">
        <div className="flex h-10 w-10 items-center justify-center bg-[#ff6600] text-2xl text-white">
          Y
        </div>
        <h1 className="text-3xl font-bold tracking-normal">Hacker News</h1>

        <nav className="flex items-center gap-2 text-base">
          <button
            type="button"
            onClick={() => onChangeTab("latest")}
            className={
              activeTab === "latest"
                ? "font-bold text-[#ff6600]"
                : isDark
                  ? "text-gray-200"
                  : "text-black"
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
                ? "font-bold text-[#ff6600]"
                : isDark
                  ? "text-gray-200"
                  : "text-black"
            }
          >
            starred
          </button>
        </nav>
      </div>
      <button
        type="button"
        onClick={onToggleTheme}
        aria-label={themeLabel}
        className="text-2xl"
      >
        {isDark ? <FaSun /> : <FaMoon />}
      </button>
    </header>
  );
}
