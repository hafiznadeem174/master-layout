<template>
  <header class="bg-gray-800 text-white">
    <div class="container mx-auto flex justify-between items-center py-4">
      <h1 class="text-xl font-bold">My Website</h1>
      <nav class="flex space-x-6">
        <RouterLink to="/" class="hover:text-blue-400">Home</RouterLink>
        <RouterLink to="/about" class="hover:text-blue-400">About</RouterLink>
        <RouterLink to="/services" class="hover:text-blue-400">Services</RouterLink>
        <RouterLink to="/portfolio" class="hover:text-blue-400">Portfolio</RouterLink>
        <RouterLink to="/blog" class="hover:text-blue-400">Blog</RouterLink>
        <RouterLink to="/contact" class="hover:text-blue-400">Contact</RouterLink>
      </nav>
    </div>
  </header>
</template>

<script>
export default {};
</script>
