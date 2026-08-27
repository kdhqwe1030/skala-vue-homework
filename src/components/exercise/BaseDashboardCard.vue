<script setup>
defineProps({
  title: {
    type: String,
    required: false,
  },
})
</script>

<template>
  <section>
    <h3 v-if="title !== null">{{ title }}</h3>
    <slot />
  </section>
</template>

<style scoped>
section {
  border-radius: 5px;
  width: 100%;
  background-color: #f5f5f5;
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}
section h3 {
  font-weight: 600;
}
</style>
