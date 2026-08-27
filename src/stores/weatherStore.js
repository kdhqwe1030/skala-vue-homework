import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getWeather } from '@/api/weather'
import { tmpCity } from './mockData'

export const useWeatherStore = defineStore('weather', () => {
  //state
  const cityList = ref(tmpCity.map((city) => ({ ...city })))
  const isLoading = ref(false)
  const error = ref(null)

  //getter & action
  const loadWeather = async (city) => {
    try {
      const data = await getWeather(city.en_name)
      const target = cityList.value.find((c) => c.id === city.id)
      if (target) {
        target.temp = data.main.temp
        target.temp_max = data.main.temp_max
        target.temp_min = data.main.temp_min
        target.feels_like = data.main.feels_like
        target.humidity = data.main.humidity
        target.sunrise = data.sys.sunrise
        target.sunset = data.sys.sunset
        target.status = data.weather[0].main
      }
    } catch (err) {
      error.value = err
    }
  }

  const loadAllWeather = async () => {
    isLoading.value = true
    error.value = null
    try {
      await Promise.all(cityList.value.map((city) => loadWeather(city)))
    } finally {
      isLoading.value = false
    }
  }

  return { cityList, isLoading, error, loadAllWeather }
})
