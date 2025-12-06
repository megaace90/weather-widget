<script setup lang="ts">
import { ref } from 'vue';
import LocationCard from './components/LocationCard.vue';
import WidgetSettings from './components/WidgetSettings.vue';
import { useGetLocation } from './composables/useGetLocation';
import { useLoadWeather } from './composables/useLoadWeather';
import type { LocationCoord } from './helpers/types';

const isSettingsOpened = ref(false)
const { store, updateLocations } = useGetLocation()
const { weather } = useLoadWeather(store)

const openSettings = () => {
	isSettingsOpened.value = true
}

const closeSettings = () => {
	isSettingsOpened.value = false
}

const updateLoc = (locations: LocationCoord[]) => {
	updateLocations(locations)
}
</script>
<template>
	<div class="widget">
		<div class="widget__container">
			<widget-settings 
				v-if="isSettingsOpened" 
				:weather="weather" 
				@close-settings="closeSettings"
				@update-locations="updateLoc"
				class="widget__settings"
				/>
			<div v-else class="widget__inner">
				<button @click="openSettings" class="widget__settings-button" type="button" aria-label="Перейти в настройки">
					<img width="24" height="24" src="/src/assets/icons/settings.svg" alt="">
				</button>
				<div class="widget__locations" v-if="store.length">
					<location-card class="widget__location-card" v-for="cityWeather in weather" :city-weather="cityWeather" />
				</div>
				<div class="widget__geolocation-failed" v-else>Failed to retrieve location data. Specify the location manually in the settings</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
.widget {
	container-type: inline-size;
	width: 100%;

	* {
		box-sizing: border-box;
	}

	font-family: IBM Plex Sans;
	font-size: 1rem;

	button {
		border: none;
	}
	button > img {
		pointer-events: none;
	}
	&__container {
		max-width: 90%;
		margin-inline: auto;
		margin-block: 20px;
		padding: 16px;
		min-height: 355px;
		background: lightblue;
		border-radius: 16px;
		
		@container (min-width: 600px) {
			max-width: 320px;
		}
	}
	&__inner {
		position: relative;
	}
	&__settings-button {
		position: absolute;
		top: 0;
		right: 0;
		background: transparent;
		cursor: pointer;
		line-height: 0;
		padding: 0;
	}
	&__geolocation-failed {
		max-width: 84%;
	}
	&__locations {
		display: grid;
		grid-auto-flow: row;
		justify-content: center; //
		row-gap: 60px;
	}
}


// @container (min-width: 600px) {
//   .widget__container { 
// 		max-width: 320px;
// 	}
// }
</style>