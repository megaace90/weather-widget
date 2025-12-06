import vue from '@vitejs/plugin-vue'

export default {
  plugins: [vue({ customElement: true })],
  build: {
    lib: {
      entry: 'src/main.ts',
      name: 'WeatherWidget',
      formats: ['iife'],
			fileName: 'weather-widget-v0.0.1'
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: { vue: 'Vue' }
      }
    }
  }
}