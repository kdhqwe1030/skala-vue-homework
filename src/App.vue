<script setup>
import MainHeader from './components/exercise/MainHeader.vue'
import { useWeatherStore } from './stores/weatherStore.js'

const { loadAllWeather } = useWeatherStore()
loadAllWeather()
</script>

<template>
  <div class="container">
    <main>
      <MainHeader />
      <div style="display: flex; flex-direction: column; gap: 20px; padding: 30px 0">
        <router-view />
      </div>
    </main>
    <!-- <StoreCounter /> -->
  </div>
</template>
<style>
.practice-section {
  width: 50vw;
  border: 1px solid #838383;
  color: #fff;
  padding: 10px 20px;
  padding-bottom: 30px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin: 30px 0px;
  h2 {
    width: 100%;
    padding: 10px 5px;
    border-bottom: 1px solid #838383;
  }
  button {
    border-radius: 5px;
    padding: 5px 10px;
    border: none;
    margin: 5px 0px;
  }
}
</style>
