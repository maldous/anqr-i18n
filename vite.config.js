import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig(({ mode }) => {
  const analyze =
    process.env.ANALYZE === "1" ||
    process.env.REPORT === "1" ||
    mode === "analyze";

  return {
    base: "./",
    plugins: [
      analyze &&
        visualizer({
          filename: "reports/bundle/rollup-visualizer.html",
          template: "treemap",
          gzipSize: true,
          brotliSize: true,
          open: false,
        }),
    ].filter(Boolean),
    build: {
      outDir: "dist",
      assetsDir: "assets",
      // Sourcemaps are expensive; only enable when analyzing
      sourcemap: analyze,
      minify: "terser",
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
    },
    server: {
      port: 3000,
      open: true,
    },
    preview: {
      port: 3000,
    },
  };
});
