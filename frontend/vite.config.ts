import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@/components": path.resolve(__dirname, "./src/components"),
      "@/pages": path.resolve(__dirname, "./page"),
      "@/hooks": path.resolve(__dirname, "./hooks"),
      "@/utils": path.resolve(__dirname, "./utils"),
      "@/constants": path.resolve(__dirname, "./constants"),
      "@/server-action": path.resolve(__dirname, "./server-action"),
      "@/global": path.resolve(__dirname, "./global"),
      "@/store": path.resolve(__dirname, "./store"),
      "@/types": path.resolve(__dirname, "./types"),
    },
  },
  server: {
    port: 3000,
    host: true,
    proxy: {
      "/api": {
        target: "http://localhost:8081",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  preview: {
    port: 3000,
    host: true,
  },
  build: {
    outDir: "dist",
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          router: ["react-router-dom"],
          query: ["@tanstack/react-query"],
          forms: ["formik", "yup"],
          ui: ["@iconify/react", "react-toastify"],
        },
      },
    },
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "@tanstack/react-query",
      "formik",
      "yup",
      "axios",
    ],
  },
  define: {
    global: "globalThis",
  },
});
