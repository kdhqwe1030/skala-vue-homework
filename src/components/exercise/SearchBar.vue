<script setup>
import { regionList } from '@/stores/mockData'

defineProps({
  searchQuery: { type: String, required: true },
  selectRegion: { type: String, required: true },
})

const emit = defineEmits(['update-query', 'update-region'])
</script>

<template>
  <div class="searchWraper">
    <input
      type="text"
      :value="searchQuery"
      @input="emit('update-query', $event.target.value)"
      placeholder="검색할 도시 이름 입력"
    />
    <select
      :value="selectRegion"
      @change="emit('update-region', $event.target.value)"
      style="border: none; border-radius: 5px; padding: 0 3px"
    >
      <option value="all">전체</option>
      <option v-for="region in regionList" :value="region" :key="region">{{ region }}</option>
    </select>
  </div>
</template>

<style scoped>
.searchWraper {
  display: flex;
  justify-content: space-between;
  padding-right: 10px;
  input {
    margin-top: 5px;
    width: 70%;
    padding: 5px 5px;
    border: none;
    border-radius: 5px;
  }
}
</style>
