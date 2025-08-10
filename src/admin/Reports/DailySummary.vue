<template>
  <SideBar></SideBar>
  <NavBar></NavBar>
  <h1 class="mt-40 ml-16 p-12 bg-yellow-900 font-bold text-black text-2xl
  text-center">Daily Summary</h1>
</template>
<script>

import { defineComponent } from 'vue'
import SideBar from '@/admin/Sidebar/SideBar.vue'
import NavBar from '@/admin/TopBar/NavBar.vue'

export default defineComponent({
  components: { NavBar, SideBar }
})
</script>
