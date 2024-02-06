<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue';
</script>

<template>
  <main>
    <NavBar />
    <RouterView />
  </main>
  <Footer />
</template>

<style scoped>
main{
  position: relative;
  min-height: 95vh;
}
</style>