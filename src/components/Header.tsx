import type { Theme } from "../types";
import { FaMoon, FaSun } from "react-icons/fa";

type HeaderProps = {
  theme: Theme;
  onToggleTheme: () => void;
};

export function Header({ theme, onToggleTheme }: HeaderProps) {
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
          <button className="font-bold text-[#ff6600]">latest</button>
          <span className={isDark ? "text-gray-500" : "text-gray-500"}>|</span>
          <button className={isDark ? "text-gray-200" : "text-black"}>
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
