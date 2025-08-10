<template>
  <div class="flex justify-center items-center min-h-screen">
    <!-- Button to trigger modal -->
    <button
      @click="openModal = true"
      class="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md"
    >
      Launch Modal
    </button>

    <!-- Modal -->
    <div v-if="openModal" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div class="bg-white w-full max-w-md rounded-lg shadow-lg">
        <!-- Modal Header -->
        <div class="flex justify-between items-center p-4 border-b">
          <h5 class="text-lg font-medium">Modal Title</h5>
          <button
            @click="openModal = false"
            class="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <!-- Modal Body -->
        <div class="p-4">
          <div class="space-y-4">
            <!-- Name Field -->
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
              <input type="text" id="name" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Enter Name" />
            </div>

            <!-- Email and DOB Fields -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" id="email" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="xxxx@xxx.xx" />
              </div>
              <div>
                <label for="dob" class="block text-sm font-medium text-gray-700">DOB</label>
                <input type="date" id="dob" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
              </div>
            </div>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="flex justify-end p-4 border-t">
          <button
            @click="openModal = false"
            class="px-4 py-2 text-sm text-gray-500 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Close
          </button>
          <button
            @click="saveChanges"
            class="ml-2 px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      openModal: false, // Track modal visibility
    };
  },
  methods: {
    saveChanges() {
      // Handle save changes logic here
      console.log("Changes saved!");
      this.openModal = false;
    }
  }
};
</script>

<style scoped>
/* Custom styling if needed */
</style>
