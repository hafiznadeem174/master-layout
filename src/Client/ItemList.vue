<template>
  <div>
    <!-- Category Filter Buttons -->
    <div class="mx-2 my-2 flex space-x-2">
      <button
        v-for="(button, index) in buttonLabels"
        :key="index"
        :class="getButtonClasses(button)"
        @click="filterItems(button)"
      >
        {{ button }}
      </button>
    </div>

    <!-- No Items Message -->
    <div v-if="noItemsMessage" class="text-red-500 text-2xl text-center mt-12">
      {{ noItemsMessage }}
    </div>

    <!-- Item Grid Display -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 p-2">
      <div
        v-for="(item, index) in filteredItems"
        :key="index"
        class="max-w-sm rounded overflow-hidden shadow-lg bg-white cursor-pointer"
        @click="addToOrder(item)"
      >
        <img
          :src="item.image"
          :alt="item.altText"
          class="w-full h-28 object-cover"
        />
        <div class="px-2 py-2">
          <h2 class="font-bold text-lg text-gray-800">{{ item.text }}</h2>
          <p class="text-lg font-semibold text-gray-900">
            <span class="text-sm">PKR</span>
            {{ item.price.toFixed(2) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    items: Array,
    searchQuery: String,
    theme: String, // Accept theme prop from parent
  },
  data() {
    return {
      buttonLabels: [
        "All", "Burgers", "Pizzas", "Wraps", "Deals", "Big Deals", "Drinks", "Drinks & Beverages",
      ],
      selectedCategory: "All", // Track the selected category for filtering
      noItemsMessage: "", // Message when no items match the filter
    };
  },

  computed: {
    filteredItems() {
      let filteredItems = this.items.filter(item =>
        item.text.toLowerCase().includes(this.searchQuery.toLowerCase())
      );

      // Filter by category
      if (this.selectedCategory !== "All") {
        filteredItems = filteredItems.filter(item =>
          item.category.toLowerCase() === this.selectedCategory.toLowerCase()
        );
      }

      // Check if there are no filtered items
      if (filteredItems.length === 0) {
        this.noItemsMessage = "No items available in this category."; // Set the message
      } else {
        this.noItemsMessage = ""; // Clear the message if there are results
      }

      return filteredItems;
    },
  },

  methods: {
    getButtonClasses(button) {
      return [
        'rounded font-bold px-3.5 py-1',
        this.theme === 'dark'
          ? 'blue-theme blue-theme-hover'
          : this.theme === 'green'
            ? 'green-theme green-theme-hover'
            : 'gray-theme gray-theme-hover',
        this.selectedCategory === button ? 'bg-black text-white' : '',
      ];
    },
    filterItems(button) {
      this.selectedCategory = button;
      this.$emit('filter-items', button); // Emit to parent to filter items
    },
    addToOrder(item) {
      this.$emit('add-to-order', item); // Emit the add-to-order event to the parent
    },
  },
};
</script>
<style scoped>
/* Custom Styling for Buttons */
button {
  transition: background-color 0.3s;
}

button:hover {
  opacity: 0.8;
}

/* Add hover effects for the item cards */
.item-card {
  transition: transform 0.3s ease-in-out;
}

.item-card:hover {
  transform: scale(1.05);
}
</style>
