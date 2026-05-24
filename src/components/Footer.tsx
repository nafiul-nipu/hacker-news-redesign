import type { Theme } from "../types";

type FooterProps = {
  theme: Theme;
};

export function Footer({ theme }: FooterProps) {
  const isDark = theme === "dark";

  return (
    <footer className="mt-24 border-t-2 border-[#ff6600] py-12 text-center">
      <h2 className="mb-6 text-2xl font-bold">Hacker News</h2>

      <nav className="text-xl">
        <button className={isDark ? "text-white" : "text-black"}>latest</button>
        <span className="mx-2 text-gray-500">|</span>
        <button className={isDark ? "text-white" : "text-black"}>
          starred
        </button>
      </nav>
    </footer>
  );
}
