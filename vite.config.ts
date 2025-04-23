import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// 仓库名用于 GitHub Pages base
const repo = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";

export default defineConfig({
  base: repo ? `/${repo}/` : "/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});