<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="article-card">
    <h2>{{ props.title }}</h2>
    <img :src="props.image" :alt="props.title" />
    <p>{{ props.description }}</p>
    <p>{{ props.price }}</p>
  </div>
</template>

<style scoped lang="sass"></style>
