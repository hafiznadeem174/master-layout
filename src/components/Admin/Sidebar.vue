<template>
  <div :class="[isOpen ? 'w-64' : 'w-16', 'bg-gray-800 text-white transition-all duration-300']">
    <div class="flex justify-between items-center p-4">
      <h1 v-if="isOpen" class="text-lg font-bold">Admin</h1>
      <button class="text-gray-300" @click="$emit('toggle')">☰</button>
    </div>
    <ul>
      <li
        v-for="(item, index) in menuItems"
        :key="index"
        class="flex items-center p-3 hover:bg-gray-700 cursor-pointer"
      >
        <RouterLink
          :to="item.to"
          class="flex items-center w-full"
          active-class="bg-gray-900"
        >
          <i :class="['fas', item.icon]"></i>
          <span v-if="isOpen" class="ml-3">{{ item.label }}</span>
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({ isOpen: Boolean });

const menuItems = [
  { icon: "fa-home", label: "Dashboard", to: "/admin" },
  { icon: "fa-users", label: "Users", to: "/admin/users" },
  { icon: "fa-cog", label: "Settings", to: "/admin/settings" },
  { icon: "fa-chart-bar", label: "Reports", to: "/admin/reports" },
  { icon: "fa-envelope", label: "Messages", to: "/admin/messages" },
  { icon: "fa-user", label: "Profile", to: "/admin/profile" },
];
</script>
