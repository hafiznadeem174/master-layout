<template>
  <SideBar></SideBar>
  <NavBar></NavBar>
  <h1 class="mt-20 ml-24 p-6 bg-gray-300 font-bold  text-blue-700 text-3xl text-center">POS</h1>
</template>
<script>

import { defineComponent } from 'vue'
import SideBar from '@/admin/Sidebar/SideBar.vue'
import NavBar from '@/admin/TopBar/NavBar.vue'

export default defineComponent({
  components: { NavBar, SideBar }
})
</script>
