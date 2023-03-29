import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        category: resolve(__dirname, "src/categories/index.html"),
        recipe: resolve(__dirname, "src/recipe/index.html"),
        saved: resolve(__dirname, "src/saved/index.html"),
      },
    },
  },
});
