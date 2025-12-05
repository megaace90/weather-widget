 import { defineConfig } from 'vite'
 import vue from '@vitejs/plugin-vue'

 export default defineConfig({
	plugins: [vue({ customElement: true })],
	build: {
		lib: {
			entry: 'src/main.ts',
			formats: ['iife'],
			fileName: 'weather-widget',
		},
	},
  css: {
		preprocessorOptions: {
			scss: {
				additionalData: `@use "./src/assets/styles/shared.scss" as *;`
			}
		}
	},
	base: '/weather-widget/'
 })
