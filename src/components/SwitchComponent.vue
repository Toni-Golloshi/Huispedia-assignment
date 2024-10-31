<template>
  <div>
    <div class="flex justify-center items-center flex-col">
      <h1 v-show="selectedComponent === null" class="text-2xl mb-3">
        Select how you want to browse properties
      </h1>

      <div>
        <button
          :class="[
            'px-4 py-2 mr-5 rounded-full border border-hp-grey',
            selectedComponent === 'one'
              ? 'text-hp-primair bg-hp-bg-primair border-hp-primair'
              : 'text-hp-button-text bg-transparent',
          ]"
          @click="selectedComponent = 'one'"
        >
          List View
        </button>
        <button
          :class="[
            'px-4 py-2 rounded-full border border-hp-grey',
            selectedComponent === 'two'
              ? 'text-hp-primair bg-hp-bg-primair border-hp-primair'
              : 'text-hp-button-text bg-transparent',
          ]"
          @click="selectedComponent = 'two'"
        >
          Map View
        </button>
      </div>
    </div>

    <div class="mt-5">
      <div class="justify-items-center">
        <ListComponent v-if="selectedComponent === 'one'" />
      </div>
      <GoogleMap v-if="selectedComponent === 'two'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ListComponent from './ListComponent.vue'
import GoogleMap from './GoogleMap.vue'

const selectedComponent = ref<'one' | 'two' | null>(null)
</script>
