<script setup>
import BaseDashboardCard from '@/components/exercise/BaseDashboardCard.vue'
import WeatherForecast from '@/components/exercise/WeatherForecast.vue'
import { useTemperature } from '@/composables/useGetTemp'
import { useConfigStore } from '@/stores/configStore'
import { useWeatherStore } from '@/stores/weatherStore'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute()

const cityId = ref('')
const city = ref('')
const { cityList } = useWeatherStore()
onMounted(() => {
  cityId.value = route.params.cityId
  city.value = cityList.find((item) => item.id === cityId.value)
})
const config = useConfigStore()
const { convert, statusConvert, statusChangeEmoji } = useTemperature()
</script>
<template>
  <h3>📊 지역별 상세 기상 관측 정보</h3>
  <BaseDashboardCard>
    <p>📍 지정 지역: {{ city.name }}</p>
    <p>실시간 기온: {{ convert(city.temp) }} {{ config.getSymbol() }}</p>
    <p>기상 현황: {{ statusConvert(city.status) }} {{ statusChangeEmoji(city.status) }}</p>
  </BaseDashboardCard>
  <h3>🌏 일기 예보</h3>
  <BaseDashboardCard><WeatherForecast :city="city" /></BaseDashboardCard>
  <button @click="() => router.push('/')">&lt;- 메인 대시보드로 돌아가기</button>
</template>

<style scoped>
h3 {
  border-bottom: 1px solid #d0d0d0;
  font-weight: 600;
}
button {
  border: none;
  border-radius: 5px;
  width: 200px;
  padding: 10px 0;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  background-color: #242a40;
}
</style>
