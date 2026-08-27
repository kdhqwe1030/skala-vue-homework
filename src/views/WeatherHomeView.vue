<script setup>
import BaseDashboardCard from '@/components/exercise/BaseDashboardCard.vue'
import SearchBar from '@/components/exercise/SearchBar.vue'
import WeatherCard from '@/components/exercise/WeatherCard.vue'
import { computed, ref, watch, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useWeatherStore } from '@/stores/weatherStore.js'

const { cityList } = useWeatherStore()
const searchQuery = ref('')
const weatherList = ref(cityList)

const selectedCityInfo = ref('')
const setSelected = (name) => (selectedCityInfo.value = name)

const router = useRouter()
const showDetail = (cityId) => {
  router.push(`/weather/${cityId}`)
}

watch(selectedCityInfo, (newInfo) =>
  console.log(`🤖 [watch 감지] 상태바 문구가 업데이트 되었습니다. "${newInfo}"이 선택되었습니다.`),
)
watchEffect(() => {
  console.log(
    `🤖 [watchEffect 자동호출] 현재 검색어 ${searchQuery.value}에 매칭되는 API 데이터를 필터했습니다.`,
  )
})

const selectRegion = ref('all')
watchEffect(() => {
  console.log(`🤖 [나만의 watchEffect] 지역 카테고리가 ${selectRegion.value}으로 변경되었습니다`)
})

const filteredByRegion = computed(() => {
  if (selectRegion.value === 'all') return weatherList.value
  return weatherList.value.filter((item) => item.region.includes(selectRegion.value))
})

const filteredWeatherList = computed(() => {
  if (searchQuery.value === '') return filteredByRegion.value
  return filteredByRegion.value.filter((item) => item.name.includes(searchQuery.value))
})
const updateQuery = (v) => (searchQuery.value = v)
const updateRegion = (v) => (selectRegion.value = v)
</script>
<template>
  <BaseDashboardCard title="🔎 도시 검색">
    <SearchBar
      :search-query="searchQuery"
      :select-region="selectRegion"
      @update-query="updateQuery"
      @update-region="updateRegion"
    />
  </BaseDashboardCard>

  <BaseDashboardCard title="🌈 지역별 날씨 현황">
    <div class="list">
      <div v-if="filteredWeatherList.length === 0" class="empty">
        <h3>❌ 존재하는 도시가 없습니다.</h3>
        <p>검색어를 확인해 주세요.</p>
      </div>
      <WeatherCard
        v-else
        v-for="item in filteredWeatherList"
        :key="item.id"
        :city="item"
        :selected="selectedCityInfo === item.name"
        @select-card="setSelected"
        @click-detail="showDetail(item.id)"
      />
    </div>
  </BaseDashboardCard>
  <div class="des" v-if="selectedCityInfo === ''">카드를 클릭하거나 검색해 보세요.</div>
  <div class="des" v-else>{{ selectedCityInfo }}이 선택되었습니다.</div>
</template>
<style scoped>
.des {
  color: rgb(0, 106, 0);
  font-weight: bold;
  background-color: rgb(184, 251, 184);
  border-radius: 5px;
  padding: 5px 10px;
  text-align: center;
}
.list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 400px;
  height: 400px;
  overflow: auto;
  padding: 10px 5px;
}
</style>
