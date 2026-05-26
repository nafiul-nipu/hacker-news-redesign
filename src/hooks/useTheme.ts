// custom theme hooks currently supports light and dark
import type { Theme } from "../types";
import { useLocalStorage } from "./useLocalStorage";

export function useTheme() {
  // use local storage to save the theme for page refresh
  const [theme, setTheme] = useLocalStorage<Theme>("hn-theme", "dark");

  function toggleTheme() {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  }

  return {
    theme,
    toggleTheme,
  };
}
