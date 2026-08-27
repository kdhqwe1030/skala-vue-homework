<script setup>
import UnitToggler from './UnitToggler.vue'
</script>
<template>
  <h1 style="font-weight: bold; border-bottom: 1px solid #d0d0d0; padding-bottom: 5px">
    🌤️ 종합실습 5: 스토어적용
  </h1>
  <div class="tabWrapper">
    <div class="tabs">
      <router-link to="/" class="tab" active-class="active"> 🌤️ 날씨 대시보드 </router-link>
      <div>|</div>
      <router-link to="/about" class="tab" active-class="active"> 1️⃣ 서비스 소개 </router-link>
    </div>
    <unit-toggler />
  </div>
</template>
<style scoped>
.tabWrapper {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  border-bottom: 1px solid #d0d0d0;
  padding: 20px 10px;
}
.tabs {
  display: flex;
  justify-content: center;
  gap: 25px;
}
.tab {
  font-weight: 600;
  font-size: 16px;
  text-decoration: none;
  color: inherit;
}
.tab.active {
  color: #4fc3f7;
  border-bottom: 2px solid #4fc3f7;
}
</style>
