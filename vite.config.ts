import path from "path";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist", // Ensures build output is in a folder named `dist`
  },
  server: {
    port: 5173, // Local dev server port
    open: true, // Opens the app in the browser on start
    host: true, // Allows external devices to access the app
  },
  preview: {
    port: 5000, // Preview server port
    host: true, // External access during preview
    strictPort: true, // Ensures the port is fixed
  },
});
