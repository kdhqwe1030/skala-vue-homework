<script setup>
import BaseDashboardCard from '@/components/exercise/BaseDashboardCard.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
</script>
<template>
  <BaseDashboardCard>
    <div class="nfContianer">
      <h1>☀️ ❓</h1>
      <h2>페이지를 찾을 수 없습니다.</h2>
      <div>
        <p>요청하신 주소가 존재하지 않거나,</p>
        <p>아직 개발되지 않았습니다.</p>
      </div>

      <button @click="() => router.push('/')">날씨 메인으로 이동</button>
    </div></BaseDashboardCard
  >
</template>

<style scoped>
.nfContianer {
  background-color: #fff;
  border-radius: 10px;
  width: 80%;
  padding: 50px 0;
  margin: 40px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 20px;
  h1 {
    font-size: 84px;
  }
  h2 {
    font-weight: bold;
  }
  button {
    font-size: 16px;
    color: white;
    background-color: rgb(59, 59, 249);
    border-radius: 25px;
    padding: 10px 10px;
    border: none;
    width: 180px;
  }
}
</style>
