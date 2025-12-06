import { ref, type MaybeRefOrGetter, toValue, watch, computed } from "vue"
import { API_KEY, BASE_URL, WEATHER_URL } from "../helpers/constants"
import { type LocationCoord, type CityWeather } from "../helpers/types"
import { HttpError } from "../helpers/types"


export const useLoadWeather = (locations: MaybeRefOrGetter<LocationCoord[]>) => {

  const weather = ref<CityWeather[]>([])
  const isLoading = ref(false)

  const requests = computed(() => {
    const locs = toValue(locations)
    return locs.map(location => {
      const url = new URL(WEATHER_URL, BASE_URL)
      url.searchParams.set('lat', String(location.lat))
      url.searchParams.set('lon', String(location.lon))
      url.searchParams.set('units', 'metric')
      url.searchParams.set('appid', API_KEY)
      return fetch(url).then(async response => {
        if (!response.ok) throw new HttpError(response.status)
        return response.json() as Promise<CityWeather>
      }).catch(error => {
        console.error(error)
        return null
      })
    })
  })

  watch(requests, async (promises) => {
    isLoading.value = true
    weather.value = []
    try {
      const responses = await Promise.allSettled(promises)
      responses.forEach(response => {
        if (response.status === 'fulfilled' && response.value) {
          weather.value.push(response.value)
        }
      })
    } catch (error) {
      console.error(error)
    } finally {
      isLoading.value = false
    }
  	}, { immediate: true, deep: true })

  return {
    weather,
    isLoading
  }
}
