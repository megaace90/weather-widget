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
				/>
			<div v-else class="widget__inner">
				<button @click="openSettings" class="widget__settings" type="button" aria-label="Перейти в настройки">
					<img width="24" height="24" src="/src/assets/icons/settings.svg" alt="">
				</button>
				<div class="widget__locations" v-if="store.length">
					<location-card v-for="cityWeather in weather" :city-weather="cityWeather"/>
				</div>
				<div v-else>Не удалось получить данные о метоположении. Укажите местоположение в настройках вручную</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
.widget {
	button {
		border: none;
	}
	button > img {
		pointer-events: none;
	}
	&__container {
		max-width: 15%;
		margin-inline: auto;
		margin-block: 20px;
		@media screen and (orientation: portrait) {
			max-width: 90%;
		}
	}
	&__inner {
		position: relative;
	}
	&__settings {
		position: absolute;
		top: 0;
		right: 0;
		background: transparent;
		cursor: pointer;
		line-height: 0;
		padding: 0;
	}
	&__locations {
		display: grid;
		grid-auto-flow: row;
		row-gap: 60px;
	}
}
</style>