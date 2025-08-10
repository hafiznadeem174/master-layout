<script setup>
import { useRoute } from 'vue-router'
import SideBar from '@/admin/Sidebar/SideBar.vue'
import NavBar from '@/admin/TopBar/NavBar.vue'
import TopBar from '@/Client/TopBar.vue'

const route = useRoute()  // Get the current route
</script>

<template>

  <TopBar></TopBar>
  <div v-if="route.path === '/admin'">
    <SideBar />
    <NavBar />
  </div>
</template>
<style scoped>
/* Custom Scrollbar Styling */
.custom-scroll::-webkit-scrollbar {
  width: 2px; /* Set the width to 2px */
}

.custom-scroll::-webkit-scrollbar-track {
  background: #f1f1f1; /* Optional: set track color */
}

.custom-scroll::-webkit-scrollbar-thumb {
  background: #888; /* Set the thumb color */
  border-radius: 10px;
}

.custom-scroll::-webkit-scrollbar-thumb:hover {
  background: #555; /* Optional: change thumb color on hover */
}
</style>
