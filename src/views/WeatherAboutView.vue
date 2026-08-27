<script setup>
import BaseDashboardCard from '@/components/exercise/BaseDashboardCard.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
</script>
<template>
  <h3>1️⃣ 서비스 소개</h3>
  <BaseDashboardCard>
    <p>본 앱은 Vue 3 및 Vue Router 4 기반 제작된 실습용 기상 관측 대시보드 시스템입니다.</p>
    <ul>
      <li>component/exercise/ 폴더 내부의 독립 부품 연동</li>
      <li>클라이언트 사이드 라우팅을 통한 새로고침 없는 화면 전환</li>
      <li>URL 쿼리 스트링 매핑을 활용한 실시간 검색 상태 동기화</li>
    </ul></BaseDashboardCard
  >

  <button @click="() => router.push('/')">대시보드 홈으로 이동</button>
</template>

<style scoped>
h3 {
  border-bottom: 1px solid #d0d0d0;

  font-weight: 600;
}
button {
  border: none;
  border-radius: 5px;
  padding: 10px 0;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  background-color: rgb(0, 115, 255);
}
</style>
