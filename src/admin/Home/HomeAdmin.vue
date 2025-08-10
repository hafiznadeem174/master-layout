<template>
  <div class="bg-gray-100 h-screen flex flex-col">
    <!-- Sidebar and Navbar components will be rendered here -->
    <SideBar />
    <NavBar />


    <div class="flex-grow ml-60">



      <!-- White Box in the Center with blue border -->
      <div class="bg-white mx-4 mt-4 p-2.5 shadow-lg border border-custom-blue flex justify-between ">
        <!-- Image on the left with 5/12 width -->
        <div class="flex-shrink-0 w-5/12">
          <img src="/Images/chef.png" alt="Food Image 1" class=" w-full">
        </div>

        <!-- Text on the right with 7/12 width -->
        <div class="w-7/12">

          <h1 class="text-white bg-custom-blue rounded-lg   text-3xl p-2">
            JAFFAZ</h1>
          <div class="p-2 mt-2 ml-2 text-[14px] text-custom-blue">
            <font-awesome-icon icon="users"/>
            <span class="ml-1">Admin</span>

          </div>
          <div class="p-2 ml-2 text-[14px] text-custom-blue">
            <font-awesome-icon icon="phone"/>
            <span class="ml-1">067-3366305 0306-1060005</span>

          </div>
          <div class="p-2 ml-2 text-[14px] text-custom-blue">
            <font-awesome-icon icon="envelope"/>
            <span class="ml-1">jaffaz@gmail.com</span>

          </div>

        </div>
      </div>


      <!-- Gray bottom section -->
      <div class="bg-gray-100 h-20"></div> <!-- Bottom gray space -->
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import SideBar from '@/admin/Sidebar/SideBar.vue';
import NavBar from '@/admin/TopBar/NavBar.vue';

export default defineComponent({
  components: { NavBar, SideBar }
});
</script>

<style scoped>
/* You can add custom styles here if necessary */
</style>
