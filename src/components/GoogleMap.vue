<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

interface MarkerData {
  lat: number
  lng: number
  title: string
}

const mapContainer = ref<HTMLElement | null>(null)
const mapMarkers = ref<MarkerData[]>([])
let map: google.maps.Map

function createMarker(markerData: MarkerData) {
  const markerElement = document.createElement('div')
  markerElement.innerHTML = `
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="6" cy="6" r="5.5" fill="white" stroke="#4C6EF5"/>
      </svg>`
  return new google.maps.marker.AdvancedMarkerElement({
    map,
    position: { lat: markerData.lat, lng: markerData.lng },
    content: markerElement,
    title: markerData.title,
  })
}

async function fetchData() {
  try {
    const response = await fetch('/data/properties.json')
    if (response.ok) {
      const data = await response.json()
      mapMarkers.value = data.data.map((property: any) => ({
        lat: property.attributes.latitude,
        lng: property.attributes.longitude,
        title: property.attributes.street,
      }))
      initializeMap()
    } else {
      console.error('Failed to fetch JSON data')
    }
  } catch (error) {
    console.error('Error loading JSON data:', error)
  }
}

function initializeMap() {
  if (!mapContainer.value) return
  map = new google.maps.Map(mapContainer.value, {
    center: { lat: 52.373414082256666, lng: 4.891359392520797 },
    zoom: 13,
    mapId: 'DEMO_MAP_ID',
  })

  mapMarkers.value.forEach(markerData => createMarker(markerData))
}

onMounted(() => {
  if (window.google && window.google.maps) {
    fetchData()
  } else {
    console.error('Google Maps API not loaded')
  }
})

watch(mapMarkers, initializeMap)
</script>

<template>
  <div class="position relative container xl flex self-center">
    <div ref="mapContainer" class="height w-full rounded border mb-4"></div>
  </div>
</template>

<style scoped>
.position {
  left: 50%;
  transform: translateX(-50%);
}
.height {
  height: calc(100vh - 120px);
}
</style>
