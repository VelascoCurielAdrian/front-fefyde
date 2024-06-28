import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa'


export default defineConfig({
	plugins: [
		react(),
		VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        clientsClaim: true,
        skipWaiting: true
      }
    }),
	],
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
