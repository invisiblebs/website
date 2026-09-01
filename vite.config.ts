import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { viteSourceLocator } from "@metagptx/vite-plugin-source-locator";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    viteSourceLocator({
      prefix: "mgx",
      // The locator stamps data-mgx-line onto every JSX element. react-three-fiber
      // treats unknown props as THREE object properties and throws on them
      // ("Cannot set data-mgx-line"), which kills the WebGL scenes in dev.
      exclude: ["**/components/three/**"],
    }),
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // three.js + drei dominate the bundle and are only needed by the two
        // WebGL scenes, which are lazy-loaded. Keeping them in their own chunk
        // stops them blocking the first paint of the hero copy and CTA.
        manualChunks: {
          three: ["three", "@react-three/fiber", "@react-three/drei"],
          react: ["react", "react-dom", "react-router-dom"],
        },
      },
    },
    chunkSizeWarningLimit: 900,
  },
}));
