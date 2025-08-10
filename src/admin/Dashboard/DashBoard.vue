<template>
  <SideBar></SideBar>
  <NavBar></NavBar>
  <h1 class="mt-40 ml-24 p-24 bg-gray-900 font-bold text-sky-100
  text-2xl text-center">dashboard</h1>
</template>
<script>

import { defineComponent } from 'vue'
import SideBar from '@/admin/Sidebar/SideBar.vue'
import NavBar from '@/admin/TopBar/NavBar.vue'

export default defineComponent({
  components: { NavBar, SideBar }
})
</script>
