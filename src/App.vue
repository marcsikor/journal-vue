<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
// import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <NavBar />
  <RouterView />
</template>

<style scoped>
#app{
  text-align: center;
}
</style>
