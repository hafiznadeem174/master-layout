<template>
  <SideBar></SideBar>
  <NavBar></NavBar>
  <h1 class="mt-48 ml-12 p-24 bg-sky-500 text-gray-700 text-2xl text-center">Bar</h1>
</template>
<script>

import { defineComponent } from 'vue'
import SideBar from '@/admin/Sidebar/SideBar.vue'
import NavBar from '@/admin/TopBar/NavBar.vue'

export default defineComponent({
  components: { NavBar, SideBar }
})
</script>
