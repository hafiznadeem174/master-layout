<template>
  <SideBar></SideBar>
  <NavBar></NavBar>
  <h1 class="mt-16 ml-24 p-8 bg-black font-bold  text-yellow-300
  text-3xl text-center">Register Details  </h1>
</template>
<script>

import { defineComponent } from 'vue'
import SideBar from '@/admin/Sidebar/SideBar.vue'
import NavBar from '@/admin/TopBar/NavBar.vue'

export default defineComponent({
  components: { NavBar, SideBar }
})
</script>
