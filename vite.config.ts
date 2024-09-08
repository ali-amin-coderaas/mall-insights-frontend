import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		port: 3000,
	},

	// chart.js is a dependency of primereact, and is not esm compatible, so we exclude it from the optimization process.
	// This is a common pattern with vite, and is documented here: https://vitejs.dev/config/#optimizedeps-exclude
	optimizeDeps: {
		exclude: ["chart.js"],
	},
});
