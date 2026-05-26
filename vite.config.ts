import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import checker from "vite-plugin-checker";

// https://vite.dev/config/
export default defineConfig({
  base: "/hacker-news-redesign/",
  plugins: [
    checker({
      typescript: { tsconfigPath: "tsconfig.app.json" },
    }),
    react(),
    tailwindcss(),
  ],
});
