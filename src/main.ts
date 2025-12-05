import { defineCustomElement } from 'vue'
import WeatherWidget from './WeatherWidget.vue'

const WeatherWidgetElement = defineCustomElement(WeatherWidget)

customElements.define('weather-widget', WeatherWidgetElement)
