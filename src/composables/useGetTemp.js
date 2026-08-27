import { useConfigStore } from '@/stores/configStore'

const statusMap = {
  Clear: '맑음',
  Clouds: '흐림',
  Rain: '비',
  Drizzle: '이슬비',
  Thunderstorm: '뇌우',
  Snow: '눈',
  Mist: '안개',
  Fog: '안개',
  Haze: '실안개',
  Smoke: '연무',
  Dust: '먼지',
  Sand: '황사',
  Ash: '화산재',
  Squall: '돌풍',
  Tornado: '토네이도',
}

const emojiMap = {
  Clear: '☀️',
  Clouds: '☁️',
  Rain: '🌧️',
  Drizzle: '🌦️',
  Thunderstorm: '⛈️',
  Snow: '❄️',
  Mist: '🌫️',
  Fog: '🌫️',
  Haze: '🌫️',
  Smoke: '🌫️',
  Dust: '💨',
  Sand: '💨',
  Ash: '🌋',
  Squall: '🌬️',
  Tornado: '🌪️',
}
export const useTemperature = () => {
  const configStore = useConfigStore()

  const convert = (celsius) => {
    if (configStore.unit === 'fahrenheit') return ((celsius * 9) / 5 + 32).toFixed(1)
    return celsius
  }

  const statusConvert = (status) => statusMap[status] ?? status

  const statusChangeEmoji = (status) => emojiMap[status] ?? ''
  return { convert, statusConvert, statusChangeEmoji }
}
