<template>
  <SideBar></SideBar>
  <NavBar></NavBar>
  <h1 class="mt-40 ml-24 p-24 bg-gray-300 font-bold text-blue-700 text-2xl text-center">Waiter</h1>
</template>
<script>

import { defineComponent } from 'vue'
import SideBar from '@/admin/Sidebar/SideBar.vue'
import NavBar from '@/admin/TopBar/NavBar.vue'

export default defineComponent({
  components: { NavBar, SideBar }
})
</script>
