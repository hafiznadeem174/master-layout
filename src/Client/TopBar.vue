<template>
  <div :class="themeClass" class="min-h-screen flex flex-col">
    <!-- Theme Toggle and Other Buttons -->
    <div class="mx-4 my-2 flex space-x-4">
      <!-- Other Buttons -->
      <button @click="generateRandomSales" :class="buttonClasses">
        <font-awesome-icon icon="rotate-left" />
        Last 10 Sales
      </button>

      <button @click="showSummaryReport" :class="buttonClasses">
        <font-awesome-icon icon="rectangle-list" />
        Daily Summary Report
      </button>

      <!-- Additional Buttons -->
      <button :class="buttonClasses">
        <font-awesome-icon icon="bell" />
        Kitchen Notification
      </button>

      <button :class="buttonClasses">
        <font-awesome-icon icon="calculator" />
        Calculator
      </button>

      <button :class="buttonClasses">
        <font-awesome-icon icon="xmark" />
        Register
      </button>

      <button :class="buttonClasses">
        <font-awesome-icon icon="backward-step" />
        Back
      </button>

      <button :class="buttonClasses">
        <font-awesome-icon icon="right-from-bracket" />
        Logout
      </button>

      <!-- Theme Toggle Buttons -->
      <button @click="setLightTheme" class="bg-gray-200 w-6 h-6 mt-2 text-custom-gray text-sm font-bold rounded-full px-2"></button>

      <button @click="setDarkTheme" class="bg-customDarkBlue w-6 h-6 mt-2 font-bold border-custom-border-dark text-sm text-white rounded-full px-2"></button>

      <button @click="setGreenTheme" class="bg-custom-green w-6 h-6 mt-2 text-white text-sm font-bold rounded-full px-2"></button>
    </div>

    <!-- Main Content Area -->
    <div class="flex mx-4 gap-4">
      <!-- Item List and Search Area -->
      <div class="w-3/5 bg-white mb-2">
        <div class="relative max-h-screen overflow-y-auto custom-scroll">
          <input
            type="text"
            v-model="searchQuery"
            class="w-full py-2 px-4 pr-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search..."
          />
          <div class="w-full border-t border-blue-500"></div>

          <!-- Item List Component -->
          <ItemList :theme="theme" :items="filteredItems" :searchQuery="searchQuery" @add-to-order="addToOrder"/>
        </div>
      </div>

      <!-- Order Summary Area -->
      <div class="w-2/5">
        <OrderSummary :theme="theme" :orderList="orderList" @cancel-order="cancelOrder" />
      </div>
    </div>

    <!-- Include Last Sales Modal -->
    <LastSalesModal
      :showModal="showModal"
      :salesHistory="salesHistory"
      @close="closeModal"
    />

    <!-- Daily Summary Report Modal -->
    <SummaryReportModal
      :showModal="showSummaryReportModal"
      :salesHistory="salesHistory"
      @close="closeSummaryReportModal"
    />

    <PrintBill
      :orderList="orderList"
      :subtotal="subtotal"
      :discountAmount="discountAmount"
      :serviceChargeAmount="serviceChargeAmount"
      :finalTotal="finalTotal"
    />
  </div>
</template>

<script>
import ItemList from './ItemList.vue';
import OrderSummary from '@/Client/OrderSummary.vue';
import LastSalesModal from './LastSalesModal.vue';
import SummaryReportModal from '@/Client/SummaryReportModal.vue';
import PrintBill from '@/Client/PrintBill.vue';

export default {
  components: {
    ItemList,
    OrderSummary,
    LastSalesModal,
    SummaryReportModal,
    PrintBill,
  },
  data() {
    return {
      searchQuery: '',
      theme: 'light',
      salesHistory: [],
      showModal: false,  // For Last 10 Sales Modal
      showSummaryReportModal: false, // Separate modal visibility for Summary Report
      items: [
        { id: 1, image: '/Images/Zinger-Burgerr.jpeg', text: 'Zinger Burger', price: 450, category: 'Burgers' },
        { id: 2, image: '/Images/Chicken-Burger.jpeg', text: 'Chicken Burger', price: 499, category: 'Burgers' },
        { id: 3, image: '/Images/Beef-Burger.jpeg', text: 'Beef Burger', price: 650.50, category: 'Burgers' },
        { id: 4, image: '/Images/Fish-Burger.jpeg', text: 'Fish Burger', price: 599, category: 'Burgers' },
        { id: 5, image: '/Images/chicken-shawarma.jpg', text: 'Chicken Shawarma', price: 375, category: 'Wraps' },
        { id: 6, image: '/Images/zinger-shawarma.jpg', text: 'Zinger Shawarma', price: 430, category: 'Wraps' },
        { id: 7, image: '/Images/beef-shawarma.jpg', text: 'Beef Shawarma', price: 650, category: 'Wraps' },
        { id: 8, image: '/Images/Tikka shawarma.jpg', text: 'Tikka Shawarma', price: 550, category: 'Wraps' },
        { id: 9, image: '/Images/chicken-nuggets.webp', text: 'Chicken Nuggets', price: 499, category: 'Deals' },
        { id: 10, image: '/Images/chicken-wings.jpg', text: 'Chicken Wings', price: 375, category: 'Deals' },
        { id: 11, image: '/Images/chicken-pasta.jpg', text: 'Chicken Pasta', price: 399, category: 'Deals' },
        { id: 12, image: '/Images/French-fries.jpg', text: 'French Fries', price: 280, category: 'Deals' },
        { id: 13, image: '/Images/BBQ-Chicken-Pizza.jpeg', text: 'BBQ Chicken Pizza', price: 2450, category: 'Pizzas' },
        { id: 14, image: '/Images/Chicken-Tikka-Pizza.jpeg', text: 'Chicken Tikka Pizza', price: 2650, category: 'Pizzas' },
        { id: 15, image: '/Images/Margarita-Pizza.jpeg', text: 'Margarita Pizza', price: 2350, category: 'Pizzas' },
        { id: 16, image: '/Images/Tandoori-Chicken-Pizza.jpeg', text: 'Tandoori Pizza', price: 2550, category: 'Pizzas' }
      ],
      orderList: [],
      subtotal: 1275,
      discountAmount: 100,
      serviceChargeAmount: 50,

      finalTotal: 1225,
      filteredItems: [],
    };
  },
  watch: {
    items: {
      handler() {
        this.filteredItems = this.items;
      },
      immediate: true,
    }
  },
  methods: {
    addToOrder(item) {
      let existingItem = this.orderList.find(order => order.id === item.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.orderList.push({ ...item, quantity: 1 });
      }
    },
    generateRandomSales() {
      const randomSales = [];
      for (let i = 0; i < 10; i++) {
        const item = this.items[Math.floor(Math.random() * this.items.length)];
        const sale = {
          id: item.id,
          text: item.text,
          price: item.price,
          category: item.category,
          date: new Date().toLocaleString(),
        };
        randomSales.push(sale);
      }
      this.salesHistory = randomSales;
      this.showModal = true; // Open Last 10 Sales Modal
    },
    cancelOrder() {
      this.orderList = [];
    },
    showSummaryReport() {
      if (this.salesHistory.length === 0) {
        this.salesHistory = this.generateMockSales(); // Generate 10 mock sales data
      }
      this.showSummaryReportModal = true; // Open Summary Report Modal independently
    },
    closeModal() {
      this.showModal = false; // Close Last 10 Sales Modal
    },
    closeSummaryReportModal() {
      this.showSummaryReportModal = false; // Close Summary Report Modal
    },
    setLightTheme() {
      this.theme = 'light';
    },
    setDarkTheme() {
      this.theme = 'dark';
    },
    setGreenTheme() {
      this.theme = 'green';
    },
    generateMockSales() {
      // Generate 10 mock sales data
      const mockSales = [];
      for (let i = 0; i < 10; i++) {
        const item = this.items[Math.floor(Math.random() * this.items.length)];
        const sale = {
          id: item.id,
          text: item.text,
          price: item.price,
          category: item.category,
          date: new Date().toLocaleString(),
        };
        mockSales.push(sale);
      }
      return mockSales;
    },
  },
  computed: {
    themeClass() {
      switch (this.theme) {
        case 'dark':
          return 'dark-theme';
        case 'green':
          return 'greenn-theme';
        default:
          return 'light-theme';
      }
    },

    buttonClasses() {
      return [
        'rounded font-bold px-6 py-2',
        this.theme === 'dark'
          ? 'blue-theme blue-theme-hover '
          : this.theme === 'green'
            ? 'green-theme green-theme-hover '
            : 'gray-theme gray-theme-hover',
      ];
    },
  },
};
</script>


<style scoped>
/* Custom Scrollbar Styling */
.custom-scroll::-webkit-scrollbar {
  width: 2px;
}

.custom-scroll::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.custom-scroll::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

.custom-scroll::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.dark-theme {
  background-color: #D1D1D1;
  color: #fff;
}

.light-theme {
  background-color: #DFDFDF;
  color: #000;
}

.greenn-theme {
  background-color: #b1afaf;
}
</style>
