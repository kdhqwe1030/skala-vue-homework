<script setup>
import { useTemperature } from '@/composables/useGetTemp'
import { useConfigStore } from '@/stores/configStore'
import { computed } from 'vue'

const props = defineProps({
  city: {
    type: Object,
    required: true,
  },
  selected: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['select-card', 'click-detail'])
const config = useConfigStore()
const { convert, statusChangeEmoji } = useTemperature()
const weatherLevel = computed(() => {
  const displayValue = convert(props.city.temp)

  if (config.unit === 'fahrenheit') {
    if (displayValue >= 82.4) return 'hot'
    if (displayValue >= 68) return 'good'
    return 'cool'
  } else {
    if (displayValue >= 28) return 'hot'
    if (displayValue >= 20) return 'good'
    return 'cool'
  }
})
console.log(props.city)
</script>

<template>
  <div
    class="card"
    @click="emit('select-card', city.name)"
    :style="selected ? { border: '2px solid rgb(73, 230, 138)' } : { border: 'none' }"
  >
    <div>
      <p>
        {{ city.name }}
        {{ statusChangeEmoji(city.status) }}
      </p>
      <p>현재 기온: {{ convert(city.temp) }}{{ config.getSymbol() }}</p>
      <div v-if="weatherLevel === 'hot'" class="hot">
        🔥 더움({{ config.unit === 'fahrenheit' ? '82.4°F' : '28°C' }} 이상)
      </div>
      <div v-else-if="weatherLevel === 'good'" class="good">
        🌈 선선함({{ config.unit === 'fahrenheit' ? '68°F' : '20°C' }} 이상)
      </div>
      <div v-else class="cool">
        ❄️ 추움({{ config.unit === 'fahrenheit' ? '68°F' : '20°C' }} 미만)
      </div>
    </div>
    <div>
      <button @click.stop="emit('click-detail', city)" style="padding: 3px 5px">상세보기</button>
    </div>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  width: 100%;
  justify-content: space-between;
  background-color: #fff;
  padding: 10px 15px;
  border-radius: 5px;
}
.hot {
  background-color: rgb(248, 99, 99);
  max-width: 145px;
  font-weight: 500;
  color: white;
  padding: 2px 3px;
  border-radius: 5px;
  margin-top: 5px;
}
.good {
  background-color: rgb(73, 230, 138);
  max-width: 145px;
  font-weight: 500;
  color: white;
  padding: 2px 3px;
  border-radius: 5px;
  margin-top: 5px;
}
.cool {
  background-color: rgb(88, 136, 240);
  max-width: 135px;
  font-weight: 500;
  color: white;
  padding: 2px 3px;
  border-radius: 5px;
  margin-top: 5px;
}
</style>
