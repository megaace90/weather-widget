import { useStorage } from '@vueuse/core'
import { onBeforeMount } from 'vue'
import { type LocationCoord } from '../helpers/types'

export const useGetLocation = () => {

	const store = useStorage('weather-locations', [] as LocationCoord[])

	const getLocations = () => {
		if (!store.value.length && window.navigator.geolocation) {
			window.navigator.geolocation.getCurrentPosition(
				(pos) => {
					if (pos.coords.latitude && pos.coords.longitude) {
						store.value.push({ lon: pos.coords.longitude, lat: pos.coords.latitude, })
					}
				},
				(err) => {
					console.warn(`Ошибка: ${err.message}`);
				},
				{ enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
			);
		}
	}

	const updateLocations = (locations: LocationCoord[]) => {
		store.value = locations
	}

	onBeforeMount(() => {
		getLocations()
	})

	return {
		store,
		updateLocations
	}
}
