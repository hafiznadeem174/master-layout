<template>
  <SideBar></SideBar>
  <NavBar></NavBar>
  <h1 class="mt-20 ml-16 p-24 bg-gray-900  font-semibold  text-white text-3xl
  text-center">Log out   </h1>
</template>
<script>

import { defineComponent } from 'vue'
import SideBar from '@/admin/Sidebar/SideBar.vue'
import NavBar from '@/admin/TopBar/NavBar.vue'

export default defineComponent({
  components: { NavBar, SideBar }
})
</script>
