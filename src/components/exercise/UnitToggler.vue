<script setup>
import { useConfigStore } from '@/stores/configStore'

const config = useConfigStore()
</script>
<template>
  <div>
    <p>날씨 단위: {{ config.unit === 'celsius' ? '섭씨' : '화씨' }}({{ config.getSymbol() }})</p>
    <button @click="config.toggleUnit()">단위변경</button>
  </div>
</template>
<style scoped>
button {
  border: none;
  border-radius: 5px;
  color: #fff;
  background-color: rgb(37, 37, 101);
}
div {
  display: flex;
  gap: 10px;
}
</style>
