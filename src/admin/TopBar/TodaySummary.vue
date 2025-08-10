<template>
  <SideBar></SideBar>
  <NavBar></NavBar>
  <h1 class="mt-12 ml-24 p-12 bg-blue-400 font-bold  text-black
  text-3xl text-center">Today Summary </h1>
</template>
<script>

import { defineComponent } from 'vue'
import SideBar from '@/admin/Sidebar/SideBar.vue'
import NavBar from '@/admin/TopBar/NavBar.vue'

export default defineComponent({
  components: { NavBar, SideBar }
})
</script>
