import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const isProjectSite =
  Boolean(repositoryName) && !repositoryName?.endsWith(".github.io");
const base = isProjectSite ? `/${repositoryName}/` : "/";

export default defineConfig({
  base,
  root: "github-pages-src",
  publicDir: "../public",
  plugins: [react()],
  build: {
    outDir: "../dist-pages",
    emptyOutDir: true,
  },
});
