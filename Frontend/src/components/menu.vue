<script setup lang="ts"></script>
<template>
  <ul>
    <li><a href="">Menu</a></li>
    <li><a href="">Ou</a></li>
    <li><a href="">Pas</a></li>
    <li><a href="">Menu</a></li>
  </ul>
</template>
<style scoped>
ul {
  position: fixed;
  z-index: 10;
  background-color: #000030;
  width: 100%;
  opacity: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
a {
  color: var(--text_2);
  font-size: 1.5rem;
  padding: 1rem;
}
</style>
