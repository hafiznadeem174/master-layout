<template>
  <div class="ml-0 sm:ml-[230px]">

    <nav class="bg-white text-[#222D32] ">
      <ul class="flex ">

        <li>
          <router-link
            to="/"
            class="block  hover:bg-gray-300 p-3.5  transition-all duration-300">
            <font-awesome-icon icon="bars" class="text-[14px] ml-0.5" />
          </router-link>
        </li>


        <li>
          <router-link
            to="/admin/all-screen/pos"
            class="block  hover:bg-gray-300 p-3.5  transition-all duration-300">
            <font-awesome-icon icon="utensils" class="text-[14px] mr-1.5" />
            <span class="text-xs font-source-sans font-regular"> POS </span>
          </router-link>
        </li>

        <li>
          <router-link
            to="/admin/navbar/add-purchase"
            class="block  hover:bg-gray-300 p-3.5  transition-all duration-300">
            <font-awesome-icon icon="truck" class="text-xs mr-1" />
            <span class="text-xs font-source-sans font-regular"> Add Purchase </span>
          </router-link>
        </li>

        <li>
          <router-link
            to="/admin/sample-work/DataStore"
            class="block  hover:bg-gray-300 p-3.5  transition-all duration-300">
            <font-awesome-icon icon="list" class="text-[14px] mr-1" />
            <span class="text-xs font-source-sans font-regular"> Today's Summary </span>
          </router-link>
        </li>

        <li>
          <router-link
            to="/admin/sample-work/form-layout"
            class="block  hover:bg-gray-300 p-3.5  transition-all duration-300">
            <font-awesome-icon icon="registered" class="text-[14px] mr-1" />
            <span class="text-xs font-source-sans font-regular"> Register Details </span>
          </router-link>
        </li>

        <li>
          <router-link
            to="/admin/sample-work/table-layout"
            class="block  hover:bg-gray-300 p-3.5  transition-all duration-300">
            <font-awesome-icon icon="circle-xmark" class="text-[14px] mr-1" />
            <span class="text-xs font-source-sans font-regular">Close Register</span>
          </router-link>
        </li>



      </ul>
    </nav>



  </div>
</template>

<script setup lang="ts">
// No special logic is needed for the navbar itself
</script>

<style scoped>
/* You can add any custom styles here */
</style>
