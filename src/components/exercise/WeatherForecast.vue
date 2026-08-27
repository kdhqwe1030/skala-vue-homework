<script setup>
import { getTimeLineWeather } from '@/api/weather'
import { useTemperature } from '@/composables/useGetTemp'
import { useConfigStore } from '@/stores/configStore'
import { computed, ref, watch } from 'vue'

const { convert, statusChangeEmoji } = useTemperature()
const config = useConfigStore()
const props = defineProps({
  city: { type: Object, required: true },
})
const isLoading = ref(true)
const forecastList = ref([])
const toLocalTimeStr = (dt) => {
  const date = new Date(dt * 1000)
  const hours = date.getHours()
  const minutes = date.getMinutes()

  const period = hours < 12 ? '오전' : '오후'
  let displayHour = hours % 12
  if (displayHour === 0) displayHour = 12

  if (minutes === 0) return `${period} ${displayHour}시`

  const displayMinutes = String(minutes).padStart(2, '0')
  return `${period} ${displayHour}:${displayMinutes}`
}

watch(
  () => props.city,
  async (newCity) => {
    if (!newCity || !newCity.en_name) return
    isLoading.value = true
    const resData = await getTimeLineWeather(newCity.en_name)
    forecastList.value = resData.list
    isLoading.value = false
  },
  { immediate: true },
)
const todayForecast = computed(() => {
  const today = new Date()
  return forecastList.value.filter((item) => {
    const itemDate = new Date(item.dt * 1000)
    return (
      itemDate.getFullYear() === today.getFullYear() &&
      itemDate.getMonth() === today.getMonth() &&
      itemDate.getDate() === today.getDate()
    )
  })
})

watch(
  () => todayForecast.value,
  () => console.log('todayForecast', todayForecast.value),
)
const dailySummary = computed(() => {
  const grouped = {}
  forecastList.value.forEach((item) => {
    const date = item.dt_txt.split(' ')[0]
    if (!grouped[date]) grouped[date] = []
    grouped[date].push(item)
  })

  return Object.entries(grouped).map(([date, items]) => {
    const temps = items.map((i) => i.main.temp)
    return {
      date,
      temp_max: Math.floor(Math.max(...temps)),
      temp_min: Math.floor(Math.min(...temps)),
      weather: items.find((i) => i.dt_txt.includes('12:00:00'))?.weather[0] || items[0].weather[0],
    }
  })
})
watch(
  () => todayForecast.value,
  () => console.log('todayForecast', todayForecast.value),
)
const formatDateLabel = (dateStr) => {
  const today = new Date()
  const target = new Date(dateStr)

  // 시간 제거하고 날짜만 비교
  const normalize = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate())
  const t = normalize(today)
  const d = normalize(target)

  const diffDays = Math.round((d - t) / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return '오늘'
  if (diffDays === 1) return '내일'
  if (diffDays === 2) return '모레'

  return `${d.getMonth() + 1}.${d.getDate()}`
}
</script>
<template>
  <section>
    <div class="today-list-wrapper">
      <el-skeleton v-if="isLoading" :rows="1" animated style="width: 100%" />
      <div v-else class="today-wrapper" v-for="item in todayForecast" :key="item.dt">
        <h4>{{ toLocalTimeStr(item.dt) }}</h4>
        <div style="font-size: 28px">{{ statusChangeEmoji(item.weather[0].main) }}</div>
        <div>{{ convert(Math.floor(item.main.temp)) }}{{ config.getSymbol() }}</div>
      </div>
    </div>
    <div class="forcast-list-wrapper">
      <div class="title">5일간 일기예보</div>
      <el-skeleton v-if="isLoading" :rows="5" animated style="width: 100%; padding-top: 10px" />

      <div v-else class="forcast-wrapper" v-for="(data, index) in dailySummary" :key="index">
        <div style="width: 40px">{{ formatDateLabel(data.date) }}</div>
        <div>
          {{ statusChangeEmoji(data.weather.main) }}
        </div>
        <div>
          {{ convert(data.temp_min) }}{{ config.getSymbol() }}
          &nbsp;&nbsp;~&nbsp;&nbsp;
          {{ convert(data.temp_max) }}{{ config.getSymbol() }}
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
.forcast-list-wrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #fff;
  padding: 20px 20px;
  padding-top: 40px;
  border-radius: 5px;
  width: 300px;
  position: relative;
  margin-bottom: 20px;
}
.title {
  position: absolute;
  left: 15px;
  top: 8px;
  font-weight: bold;
  color: rgb(32, 73, 185);
}
.forcast-wrapper {
  display: flex;
  gap: 20px;
}
.today-list-wrapper {
  width: 100%;
  display: flex;
  gap: 25px;
  padding: 10px 20px;
  margin: 20px 0;
  background-color: #fff;
  box-sizing: border-box;
  border-radius: 10px;
}
.today-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  h4 {
    font-size: 16px;
    font-weight: 600;
  }
}
</style>
