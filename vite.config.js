import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [react()],
	server: {
		port: 5156,
		host: true,
		watch: {
			usePolling: true,
		},
	},
	resolve: {
		preserveSymlinks: true,
	},
});
