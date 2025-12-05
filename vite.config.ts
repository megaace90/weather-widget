import vue from '@vitejs/plugin-vue'

export default {
  plugins: [vue({ customElement: true })],
  build: {
    lib: {
      entry: 'src/main.ts',
      name: 'WeatherWidget',
      formats: ['iife']
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: { vue: 'Vue' }
      }
    }
  }
}


//  import { defineConfig } from 'vite'
//  import vue from '@vitejs/plugin-vue'

//  export default defineConfig({
// 	plugins: [vue({ customElement: true })],
// 	build: {
// 		lib: {
// 			entry: 'src/main.ts',
// 			formats: ['iife'],
// 			name: 'WeatherWidget',
// 			fileName: 'weather-widget',
// 		},
// 	},
// 	base: './'
//  })
