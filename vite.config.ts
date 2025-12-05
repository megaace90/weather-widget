 import { defineConfig } from 'vite'
 import vue from '@vitejs/plugin-vue'

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
	base: './'
 })
