<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Image {
  href: string
}

interface Price {
  salePrice: number
}

interface PropertyAttributes {
  street: string
  houseNumberFull: string
  houseType: string
  city: string
  image: Image
  price: Price
}

interface JsonItem {
  id: number
  type: string
  attributes: PropertyAttributes
}

const jsonData = ref<JsonItem[] | null>(null)

onMounted(async () => {
  try {
    const response = await fetch('/data/properties.json', {
      mode: 'cors',
    })

    if (!response.ok) {
      throw new Error('Failed to fetch JSON data')
    }
    jsonData.value = await response.json()
  } catch (error) {
    console.error('Error fetching JSON data:', error)
  }
})
</script>

<template>
  <div
    v-if="jsonData && jsonData.data"
    class="container xl columns-1 md:columns-2 lg:columns-3"
  >
    <ul>
      <li list="list" v-for="property in jsonData.data" :key="property.id">
        <a>
          <div
            class="rounded overflow-hidden border mb-4 shadow-none transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-gray-200"
          >
            <img
              class="height w-full object-cover"
              :src="property.attributes.image.href"
              :alt="property.attributes.houseType"
            />
            <div class="px-6 py-4">
              <div class="font-bold text-xl">
                {{ property.attributes.street }} ,
                {{ property.attributes.houseNumberFull }}
              </div>
              <p>{{ property.attributes.city }}</p>
            </div>
            <div class="px-6 pt-4 pb-2">
              <span
                class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
              >
                {{
                  property.attributes.offer.salePrice !== null
                    ? '€ ' + property.attributes.offer.salePrice
                    : 'N/A'
                }}</span
              >
            </div>
          </div>
        </a>
      </li>
    </ul>
  </div>
  <div v-else>Loading data</div>
</template>

<style scoped>
.height {
  height: 20rem;
}
</style>
