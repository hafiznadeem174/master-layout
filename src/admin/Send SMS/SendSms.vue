<template>
  <SideBar></SideBar>
  <NavBar></NavBar>
  <h1 class="mt-40 ml-16 p-4 bg-red-700 font-bold  text-gray-700 text-3xl
  text-center">Send SMS    </h1>
</template>
<script>

import { defineComponent } from 'vue'
import SideBar from '@/admin/Sidebar/SideBar.vue'
import NavBar from '@/admin/TopBar/NavBar.vue'

export default defineComponent({
  components: { NavBar, SideBar }
})
</script>
