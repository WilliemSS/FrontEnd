<template>
  <div id="app">
    <!-- Conditional rendering of navbar -->
    <template v-if="isLoggedIn">
      <!-- <Navbar /> -->
    </template>
    
    <router-view />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isLoggedIn = ref(false);
</script>

<style>
/* App styles go here */
</style>