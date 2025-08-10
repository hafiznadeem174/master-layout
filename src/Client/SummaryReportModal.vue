<template>
  <transition name="fade">
    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div class="relative p-4 w-2/3 max-h-full">
        <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700 transform transition-all">
          <div class="flex items-center justify-between p-4 md:p-5 border-b-2 rounded-t dark:border-gray-600 border-blue-500">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white">
              Daily Summary Report
            </h3>
            <button @click="closeModal" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
              <span class="text-2xl text-red-500"><font-awesome-icon icon="xmark" /></span>
            </button>
          </div>

          <div class="p-4 md:p-5">
            <table class="w-full table-auto border-2">
              <thead>
              <tr class="border-b bg-gray-300">
                <th class="py-2 px-4 text-left text-base font-bold text-gray-900 dark:text-white">Sale Description</th>
                <th class="py-2 px-4 text-left text-base font-bold text-gray-900 dark:text-white">Category</th>
                <th class="py-2 px-4 text-left text-base font-bold text-gray-900 dark:text-white">Price</th>
                <th class="py-2 px-4 text-center text-base font-bold text-gray-900 dark:text-white">Date</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(sale, index) in salesHistory" :key="index" class="border-b">
                <td class="py-2 px-4 text-sm text-gray-800 dark:text-white">{{ sale.text }}</td>
                <td class="py-2 px-4 text-sm text-gray-800 dark:text-white">{{ sale.category }}</td>
                <td class="py-2 px-4 text-sm text-left text-gray-800 dark:text-white">PKR {{ sale.price | currency }}</td>
                <td class="py-2 px-4 text-sm text-center text-gray-800 dark:text-white">{{ sale.date }}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    showModal: Boolean,
    salesHistory: Array,
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
