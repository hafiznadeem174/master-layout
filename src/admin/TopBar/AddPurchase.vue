<template>
  <SideBar></SideBar>
  <NavBar></NavBar>
  <h1 class="mt-20 ml-24 p-24 bg-blue-950 font-bold  text-white
  text-3xl text-center">Add Purchase </h1>
</template>
<script>

import { defineComponent } from 'vue'
import SideBar from '@/admin/Sidebar/SideBar.vue'
import NavBar from '@/admin/TopBar/NavBar.vue'

export default defineComponent({
  components: { NavBar, SideBar }
})
</script>
