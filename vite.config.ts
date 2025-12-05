 import { defineConfig } from 'vite'
 import vue from '@vitejs/plugin-vue'
 import path from 'path'

 export default defineConfig({
	plugins: [vue({ customElement: true })],
	build: {
		lib: {
			entry: 'src/main.ts',
			formats: ['iife'],
			name: 'WeatherWidget',
			fileName: 'weather-widget',
		},
	},
	resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/assets/styles/shared" as *;
        `,
      },
    },
  },
	base: '/weather-widget/'
 })
