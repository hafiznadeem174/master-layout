<template>
  <div class="flex min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <Sidebar :is-open="isOpen" @toggle="isOpen = !isOpen" />

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <AdminHeader @toggle="isOpen = !isOpen" />
      <main class="p-4 flex-1">
        <RouterView /> <!-- This will load the current admin page -->
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Sidebar from "@/components/Admin/Sidebar.vue";
import AdminHeader from "@/components/Admin/AdminHeader.vue";

const isOpen = ref(true);
</script>
