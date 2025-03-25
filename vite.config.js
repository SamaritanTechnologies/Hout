import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "localhost",
    port: 3000,
    // allowedHosts: ["fa8a-101-53-233-25.ngrok-free.app", "101.53.233.25"],
  },
});
