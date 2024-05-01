<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <router-link v-if="isLoggedIn" :to="{ name: 'matkulList' }" class="nav-link" exact active-class="active-link">Mata Kuliah</router-link>
      <router-link v-if="isLoggedIn" :to="{ name: 'mahasiswaList' }" class="nav-link" exact active-class="active-link">Mahasiswa</router-link>
      <router-link v-if="isLoggedIn" :to="{ name: 'dosenList' }" class="nav-link" exact active-class="active-link">Dosen</router-link>
      <router-link v-if="isLoggedIn" :to="{ name: 'daftarPengajarList' }" class="nav-link" exact active-class="active-link">Daftar Pengajar</router-link>
    </div>
  </nav>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const isLoggedIn = route.name === 'matkulList' || route.name === 'mahasiswaList' || route.name === 'dosenList' ||route.name==='daftarPengajarList';
</script>

<style>
.active-link {
  background-color: #28a745; /* Green background color */
  color: white; /* Text color */
  border-radius: 5px; /* Rounded corners */
  padding: 8px 16px; /* Padding for spacing */
  transition: background-color 0.3s ease; /* Smooth transition */
}

.active-link:hover {
  background-color: #218838; /* Darker green on hover */
}
</style>