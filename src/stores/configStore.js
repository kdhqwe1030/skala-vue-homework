import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useConfigStore = defineStore('temp', () => {
  const unit = ref('celsius')
  const toggleUnit = () => {
    if (unit.value === 'celsius') unit.value = 'fahrenheit'
    else unit.value = 'celsius'
  }
  const getSymbol = () => {
    return unit.value === 'celsius' ? '°C' : '°F'
  }

  return { unit, getSymbol, toggleUnit }
})
