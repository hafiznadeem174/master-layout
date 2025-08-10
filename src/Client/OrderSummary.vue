<template>
  <div class="h-screen flex flex-col">
    <div class="bg-white shadow rounded h-[90%] flex flex-col">
      <!-- Order Type Selection -->
      <div class="grid grid-cols-3 gap-4 p-2">

        <div class="w-full" v-for="(icon, label) in orderTypes" :key="label">
          <button
            class="w-full"
            :class="[dropdownClass, { 'bg-gray-500 text-white': selectedOrderType === label }]"
            @click="selectedOrderType = label"
          >
            <font-awesome-icon :icon="['fas', icon]" />
            {{ label }}
          </button>
        </div>


      </div>

      <!-- Dropdowns and Buttons -->
      <div class="grid grid-cols-3 gap-4 p-2">
        <div class="w-full" v-for="(label, index) in ['Select Table', 'Customer']" :key="index">
          <div class="relative ">
            <button class="w-full" @click="label === 'Select Table' ? toggleTableDropdown() : toggleCustomerDropdown()" :class="dropdownClass">
              <span v-if="!selectedTable && label === 'Select Table'">{{ label }}</span>
              <span v-if="selectedTable && label === 'Select Table'">{{ selectedTable }}</span>
              <span v-if="!selectedCustomer && label === 'Customer'">{{ label }}</span>
              <span v-if="selectedCustomer && label === 'Customer'">{{ selectedCustomer.name }} {{ selectedCustomer.phone }}</span>

              <font-awesome-icon icon="angle-down" class="ml-2" />
            </button>
            <ul v-if="label === 'Select Table' && openTableDropdown" class="absolute left-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
              <li>
                <a class="block px-4 py-2 text-gray-700" href="javascript:void(0);" @click="setTable('Main Hall')">Main Hall</a>
              </li>
              <li>
                <a class="block px-4 py-2 text-gray-700" href="javascript:void(0);" @click="setTable('Family Hall')">Family Hall</a>
              </li>
              <li>
                <a class="block px-4 py-2 text-gray-700" href="javascript:void(0);" @click="setTable('VIP Hall')">VIP Hall</a>
              </li>
            </ul>

            <ul v-if="label === 'Customer' && openCustomerDropdown" class="absolute left-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
              <!-- Search bar for customer phone number -->
              <div class="p-2">
                <input
                  v-model="phoneSearch"
                  type="text"
                  placeholder="Search by phone"
                  class="w-full px-2 py-1 border rounded-lg text-sm"
                />
              </div>

              <li v-if="!showAddCustomerOption">
                <!-- Filtered customers based on phone number search -->
                <a
                  class="block px-2 py-2 text-black font-semibold bg-gray-100"
                  href="javascript:void(0);"
                  @click="setCustomer(customer)"
                  v-for="customer in filteredCustomers"
                  :key="customer.id"
                >
                  {{ customer.name }}
                  ({{ customer.phone }})
                </a>
              </li>
              <li v-if="showAddCustomerOption">
                <a class="block px-4 py-2 text-blue-500" href="javascript:void(0);" @click="openAddCustomerModal">
                  Add New Customer
                </a>
              </li>
            </ul>
          </div>
        </div>

        <button class="flex justify-center  items-center text-2xl text-black" @click="showAddCustomerModal = true">
          <font-awesome-icon icon="square-plus" />
        </button>
      </div>

      <div class="text-black p-2 flex-grow  overflow-y-auto custom-scroll">
        <ul v-if="orderList.length > 0">
          <li class="flex w-full bg-gray-500 p-2">
            <span class="w-2/5 font-bold">Items</span>
            <span class="w-1/5 font-bold">Price</span>
            <span class="w-1/5 text-center font-bold">Qty</span>
            <span class="w-1/5 text-right font-bold">Total</span>
          </li>

          <li v-for="(item, index) in orderList" :key="index" class="p-1 flex">
            <div class="w-2/5 font-semibold ">
              <font-awesome-icon icon="xmark" @click="removeFromOrder(index)" class="cursor-pointer text-red-500" />
              <span class="ml-1">{{ item.text }}</span>
            </div>
            <span class="w-1/5 font-semibold">PKR {{ item.price.toFixed(2) }} </span>
            <div class="w-1/5 text-center font-semibold">
              <font-awesome-icon
                icon="circle-minus"
                @click="changeQuantity(item, -1)"
                class="cursor-pointer"
              />
              <span class="mx-1.5"> {{ item.quantity }}</span>
              <font-awesome-icon
                icon="circle-plus"
                @click="changeQuantity(item, 1)"
                class="cursor-pointer"
              />
            </div>
            <span class="w-1/5 text-right font-semibold">PKR {{ (item.price * item.quantity).toFixed(2) }} </span>
          </li>
        </ul>

        <div v-else><p class="p-2 font-bold text-[#4B5563]"> No items in the order.</p></div>
      </div>

      <!-- Discount and Service Charge Inputs + Billing Section at the Bottom -->
      <div class="w-full px-2   mt-auto">


        <div class="justify-end  text-right bg-gray-200  text-black">
          <div class="px-3 py-0.5 gap-2 flex text-right justify-end">
            <span class="w-3/4 text-right font-semibold">Subtotal:</span>
            <span class="w-1/4 text-right font-semibold">PKR {{ subtotal }}</span>
          </div>

          <div class="px-3 py-0.5 gap-2 flex text-right justify-end">
            <label for="discount" class="w-3/4 text-right block font-semibold">Discount:</label>
            <div class="w-1/4"><input
              id="discount"
              v-model.number="discount"
              type="number"
              min="0"
              max="100"
              class=" text-right  border  bg-white "
              placeholder="Enter discount percentage"
            />
            </div>
          </div>
          <div class="px-3 py-0.5 gap-2 flex text-right justify-end">
            <span class="w-3/4 text-right font-semibold">Discount Amount:</span>
            <span class="w-1/4 text-right font-semibold"> -PKR {{ discountAmount }}</span>
          </div>
          <div class="px-3 py-0.5 gap-2 flex text-right justify-end">
            <label for="serviceCharge" class="w-3/4 text-right block font-semibold">Service Charges:</label>
            <div class="w-1/4"> <input
              id="serviceCharge"
              v-model.number="serviceCharge"
              type="number"
              min="0"
              max="100"
              class=" border bg-white text-right"
              placeholder="Enter service charge percentage"
            />
            </div>
          </div>
          <div class="px-3 py-0.5 gap-2 flex text-right justify-end">
            <span class="w-3/4 text-right font-semibold">Service Charges: </span>
            <span class="w-1/4 text-right font-semibold">  +PKR {{ serviceChargeAmount }}</span>
          </div>
          <div class="px-3 py-2 gap-2 bg-gray-500 flex text-right justify-end">
            <span class="w-3/4 text-right font-bold"> Total Payable:  </span>
            <span class="w-1/4 text-right font-bold">  PKR {{ finalTotal }} </span>
          </div>
        </div>
      </div>
      <div class="w-full gap-4 flex p-2">
        <button class="w-3/12 " :class="[dropdownClass]" @click="cancelOrder">
          <font-awesome-icon icon="xmark" class="mr-1 text-red-500 " />
          Cancel
        </button>
        <button class="w-3/12 " :class="[dropdownClass]">
          <font-awesome-icon icon="shield" class="mr-1" />Hold</button>
        <!-- In Parent Component -->
        <button class="w-3/12 flex justify-center"  :class="[dropdownClass]">
          <PrintBill
            :orderList="orderList"
            :subtotal="subtotal"
            :discountAmount="discountAmount"
            :serviceChargeAmount="serviceChargeAmount"
            :finalTotal="finalTotal"
            :selectedOrderType="selectedOrderType"
            :selectedCustomer="selectedCustomer"
            buttonName="Invoice"
          />
        </button>

        <button class="w-3/12 flex justify-center" :class="[dropdownClass]">
          <PrintBill
            :orderList="orderList"
            :subtotal="subtotal"
            :discountAmount="discountAmount"
            :serviceChargeAmount="serviceChargeAmount"
            :finalTotal="finalTotal"
            :selectedOrderType="selectedOrderType"
            :selectedCustomer="selectedCustomer"
            buttonName="Place Order"
          />
        </button>


      </div>
    </div>
  </div>


  <!-- Add Customer Modal -->
  <div v-if="showAddCustomerModal" class="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
    <div class="bg-white p-6 rounded-lg w-96">
      <h3 class="text-xl font-bold mb-4">Add New Customer</h3>
      <input
        v-model="newCustomerName"
        type="text"
        class="w-full p-2 border rounded-lg "
        placeholder="Enter new customer's name"
      />
      <p v-if="nameError" class="text-red-500 text-sm">{{ nameError }}</p>

      <input
        v-model="newCustomerPhone"
        type="text"
        class="w-full p-2 border rounded-lg mt-4"
        placeholder="Enter phone number"
      />
      <p v-if="phoneError" class="text-red-500 text-sm">{{ phoneError }}</p>

      <button @click="addNewCustomer" class="w-full bg-gray-300 font-semibold text-black p-2 rounded-lg mb-2 mt-4">Add Customer</button>
      <button @click="closeAddCustomerModal" class="w-full bg-red-500 text-white p-2 rounded-lg">Cancel</button>
    </div>
  </div>

</template>

<script>
import PrintBill from './PrintBill.vue'; // Import the PrintBill component

export default {
  components: {
    PrintBill,
  },
  props: {
    orderList: {
      type: Array,
      required: true,
    },
    theme: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      openDropdown: false,
      discount: 0,
      serviceCharge: 0,
      openTableDropdown: false,
      openCustomerDropdown: false,
      selectedTable: null,
      selectedCustomer: null,
      newCustomerName: "",
      newCustomerPhone: "",
      nameError: "",
      phoneError: "",
      existingCustomers: [
        { id: 1, name: "nadeem", phone: "0300-7734174" },
        { id: 2, name: "irfan", phone: "0308-7933900" },
        { id: 3, name: "manzoor", phone: "0300-8528063" },
        { id: 4, name: "babar", phone: "0305-7833865" },
        { id: 5, name: "ali", phone: "0323-5242965" },
      ],
      selectedOrderType: 'Dine In', // Set Dine In as the default
      orderTypes: {
        'Dine In': 'dice-four',
        'Take Away': 'ghost',
        'Delivery': 'truck',
      },

      showAddCustomerModal: false,
      showAddCustomerOption: false,
      phoneSearch: '',
    };
  },
  computed: {

    dropdownClass() {
      return [
        'rounded text-center p-2 font-bold text-xs',
        this.theme === 'dark'
          ? 'blue-theme blue-theme-hover'
          : this.theme === 'green'
            ? 'green-theme green-theme-hover'
            : 'gray-theme gray-theme-hover',
      ];
    },
    subtotal() {
      return this.orderList.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
    },
    discountAmount() {
      return ((this.subtotal * this.discount) / 100).toFixed(2);
    },
    serviceChargeAmount() {
      return ((this.subtotal * this.serviceCharge) / 100).toFixed(2);
    },
    finalTotal() {
      let subtotalAmount = parseFloat(this.subtotal);
      let discountAmount = parseFloat(this.discountAmount);
      let serviceChargeAmount = parseFloat(this.serviceChargeAmount);

      return (subtotalAmount - discountAmount + serviceChargeAmount).toFixed(2);
    },
    filteredCustomers() {
      if (this.phoneSearch === '') {
        return this.existingCustomers;
      }
      return this.existingCustomers.filter(customer =>
        customer.phone.includes(this.phoneSearch)
      );
    },
  },
  methods: {
    toggleDropdown() {
      this.openDropdown = !this.openDropdown;
    },
    toggleTableDropdown() {
      this.openTableDropdown = !this.openTableDropdown;
      this.openCustomerDropdown = false;
    },
    toggleCustomerDropdown() {
      this.openCustomerDropdown = !this.openCustomerDropdown;
      this.openTableDropdown = false;
      this.showAddCustomerOption = false;
    },
    setTable(tableName) {
      this.selectedTable = tableName;
      this.openTableDropdown = false;
    },
    setCustomer(customer) {
      this.selectedCustomer = customer;
      this.openCustomerDropdown = false;
      this.showAddCustomerOption = false;
    },
    openAddCustomerModal() {
      this.showAddCustomerModal = true;
    },
    closeAddCustomerModal() {
      this.showAddCustomerModal = false;
    },
    addNewCustomer() {
      this.nameError = "";
      this.phoneError = "";

      if (!this.newCustomerName.trim()) {
        this.nameError = "Name is required.";
      }
      if (!this.newCustomerPhone.trim()) {
        this.phoneError = "Phone number is required.";
      }

      if (this.nameError || this.phoneError) {
        return;
      }

      const newCustomer = {
        id: Date.now(),
        name: this.newCustomerName,
        phone: this.newCustomerPhone,
      };
      this.existingCustomers.unshift(newCustomer);
      this.selectedCustomer = newCustomer;
      this.closeAddCustomerModal();
      this.newCustomerName = "";
      this.newCustomerPhone = "";
      this.showAddCustomerOption = false;
    },
    changeQuantity(item, delta) {
      if (item.quantity + delta > 0) {
        item.quantity += delta;
      }
    },
    removeFromOrder(index) {
      this.orderList.splice(index, 1);
    },
    cancelOrder() {
      // Emit an event to the parent component to close the order
      this.$emit('cancel-order');
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
</style>
