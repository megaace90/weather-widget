import { defineCustomElement } from 'vue'
import WeatherWidget from './WeatherWidget.vue'

const WeatherWidgetElement = defineCustomElement(WeatherWidget)

// Авто-регистрация всех <weather-widget>
if (typeof window !== 'undefined') {
  window.WeatherWidget = WeatherWidgetElement
  customElements.define('weather-widget', WeatherWidgetElement)
}

export default WeatherWidgetElement


// import { defineCustomElement } from 'vue'
// import WeatherWidget from './WeatherWidget.vue'

// const WeatherWidgetElement = defineCustomElement(WeatherWidget)

// customElements.define('weather-widget', WeatherWidgetElement)
