<template>
  <header class="bg-white shadow">
    <div class="container mx-auto flex justify-between items-center px-6 py-4">
      <!-- Logo -->
      <div class="text-2xl font-bold text-blue-600">
        MyWebsite
      </div>

      <!-- Menu -->
      <nav>
        <ul class="hidden md:flex space-x-8 text-gray-700 font-medium">
          <li><a href="#" class="hover:text-blue-600">Home</a></li>
          <li><a href="#" class="hover:text-blue-600">About</a></li>
          <li><a href="#" class="hover:text-blue-600">Services</a></li>
          <li><a href="#" class="hover:text-blue-600">Portfolio</a></li>
          <li><a href="#" class="hover:text-blue-600">Blog</a></li>
          <li><a href="#" class="hover:text-blue-600">Contact</a></li>
        </ul>
      </nav>

      <!-- Mobile menu button -->
      <button @click="isOpen = !isOpen" class="md:hidden text-gray-700 focus:outline-none">
        ☰
      </button>
    </div>

    <!-- Mobile menu -->
    <div v-if="isOpen" class="md:hidden bg-white shadow px-6 py-4 space-y-2">
      <a href="#" class="block hover:text-blue-600">Home</a>
      <a href="#" class="block hover:text-blue-600">About</a>
      <a href="#" class="block hover:text-blue-600">Services</a>
      <a href="#" class="block hover:text-blue-600">Portfolio</a>
      <a href="#" class="block hover:text-blue-600">Blog</a>
      <a href="#" class="block hover:text-blue-600">Contact</a>
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";
const isOpen = ref(false);
</script>
