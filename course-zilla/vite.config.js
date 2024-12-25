import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   host: '0.0.0.0', // Makes the app accessible on your local network
  //   port: 3000, // You can specify a port if you like
  // },
});
