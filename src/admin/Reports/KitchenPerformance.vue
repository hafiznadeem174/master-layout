<template>
  <div class="bg-gray-100 h-screen flex flex-col">
    <SideBar />
    <NavBar />
    <div class="flex-grow ml-60">
      <div class="card m-4 bg-white shadow rounded-lg">
        <div class="card-datatable p-4 table-responsive">
          <div class="md:flex block justify-between items-center mb-4">
            <h5 class="text-2xl text-blue-500 font-semibold">Kitchen Performance Report</h5>
            <div class="flex justify-between gap-3">
              <button
                class="btn bg-blue-100 text-blue-400 hover:bg-blue-400 hover:text-white px-4 py-2 rounded"
                @click="exportToPDF">
                <span class="pt-2.5 mr-1"><font-awesome-icon icon="file-arrow-down" /></span>
                Export
              </button>
            </div>
          </div>

          <!-- Date Range Filter -->
          <div class="md:flex block justify-between items-center mb-4">
            <!-- Date Range Picker Section -->
            <div class="flex items-center w-full space-x-4">
              <div class="w-full sm:w-1/2 flex border rounded-lg border-gray-300 space-x-2">
                <div class="relative w-1/2">
                  <input
                    v-model="startDate"
                    type="date"
                    id="datepicker-range-start"
                    class="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder:text-gray-500"
                    placeholder="Start Date"
                  />
                </div>
                <span class="pt-2.5"><font-awesome-icon icon="arrow-right-long" /></span>

                <div class="relative w-1/2">
                  <input
                    v-model="endDate"
                    type="date"
                    id="datepicker-range-end"
                    class="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder:text-gray-500"
                    placeholder="End Date"
                  />
                </div>
              </div>
            </div>

            <!-- Search Input Section -->
            <div class="mt-4 md:mt-0 flex items-center">
              <label for="search" class="mr-2">Search:</label>
              <input
                v-model="searchQuery"
                type="text"
                id="search"
                class="form-input border border-gray-300 rounded-lg p-2"
                placeholder="Search by Customer or Email"
              />
            </div>
          </div>

          <!-- Table Display -->
          <div class="overflow-x-auto border-t-[3px] border-b-2 border-blue-500">
            <table class="table-auto w-full">
              <thead>
              <tr>
                <th class="p-2 text-left cursor-pointer">SN</th>
                <th class="p-2 text-left cursor-pointer" @click="sortTable('orderNo')">
                  Order No
                  <font-awesome-icon :icon="sortColumn === 'orderNo' ? (sortDirection === 'asc' ? 'caret-up' : 'caret-down') : ''" class="text-blue-500" />
                </th>
                <th class="p-2 text-left cursor-pointer" @click="sortTable('type')">
                  Type
                  <font-awesome-icon :icon="sortColumn === 'type' ? (sortDirection === 'asc' ? 'caret-up' : 'caret-down') : ''" class="text-blue-500" />
                </th>
                <th class="p-2 text-right cursor-pointer" @click="sortTable('orderTime')">
                  Order Time
                  <font-awesome-icon :icon="sortColumn === 'orderTime' ? (sortDirection === 'asc' ? 'caret-up' : 'caret-down') : ''" class="text-blue-500" />
                </th>
                <th class="p-2 text-right cursor-pointer" @click="sortTable('cookingStartTime')">
                  Cooking Start Time
                  <font-awesome-icon :icon="sortColumn === 'cookingStartTime' ? (sortDirection === 'asc' ? 'caret-up' : 'caret-down') : ''" class="text-blue-500" />
                </th>
                <th class="p-2 text-right cursor-pointer" @click="sortTable('cookingEndTime')">
                  Cooking End Time
                  <font-awesome-icon :icon="sortColumn === 'cookingEndTime' ? (sortDirection === 'asc' ? 'caret-up' : 'caret-down') : ''" class="text-blue-500" />
                </th>
                <th class="p-2 text-right cursor-pointer" @click="sortTable('timeTaken')">
                  Time Taken
                  <font-awesome-icon :icon="sortColumn === 'timeTaken' ? (sortDirection === 'asc' ? 'caret-up' : 'caret-down') : ''" class="text-blue-500" />
                </th>
                <th class="p-2 text-center cursor-pointer" @click="sortTable('date')">
                  Date
                  <font-awesome-icon :icon="sortColumn === 'date' ? (sortDirection === 'asc' ? 'caret-up' : 'caret-down') : ''" class="text-blue-500" />
                </th>
                <th class="p-2 text-center">Actions</th>
              </tr>
              </thead>

              <tbody>
              <tr v-for="(entry, index) in filteredAndSortedOrders" :key="index" class="border-t-2 border-gray-200">
                <td class="p-2">{{ index + 1 }}</td>
                <td class="p-2">{{ entry.orderNo }}</td>
                <td class="p-2">{{ entry.type }}</td>
                <td class="p-2 text-right">{{ entry.orderTime }}</td>
                <td class="p-2 text-right">{{ entry.cookingStartTime }}</td>
                <td class="p-2 text-right">{{ entry.cookingEndTime }}</td>
                <td class="p-2 text-right">{{ entry.timeTaken }}</td>
                <td class="p-2 text-center">{{ entry.date }}</td>
                <td class="p-2 text-center">
                  <button @click="viewOrder(entry)" class="text-blue-500 hover:text-blue-700">
                    <font-awesome-icon icon="eye" />
                  </button>
                  <button @click="editOrder(entry)" class="text-green-500 hover:text-green-700">
                    <font-awesome-icon icon="pen-to-square" />
                  </button>
                  <button @click="deleteOrder(entry)" class="text-red-500 hover:text-red-700">
                    <font-awesome-icon icon="trash-can" />
                  </button>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCaretUp, faCaretDown, faFileArrowDown, faEye, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import jsPDF from 'jspdf';

import SideBar from '@/admin/Sidebar/SideBar.vue';
import NavBar from '@/admin/TopBar/NavBar.vue';

library.add(faCaretUp, faCaretDown, faFileArrowDown, faEye, faPenToSquare, faTrashCan);

export default {
  components: { NavBar, SideBar, FontAwesomeIcon },
  data() {
    return {
      searchQuery: '',
      startDate: '',
      endDate: '',
      sortColumn: '',
      sortDirection: 'asc',
      orders: [
        { orderNo: 'ORD001', type: 'Burger', orderTime: '12:00 PM', cookingStartTime: '12:05 PM', cookingEndTime: '12:20 PM', timeTaken: '15 min', date: '2025-01-01' },
        { orderNo: 'ORD002', type: 'Pizza', orderTime: '12:15 PM', cookingStartTime: '12:20 PM', cookingEndTime: '12:35 PM', timeTaken: '15 min', date: '2025-01-02' },
        { orderNo: 'ORD003', type: 'Fries', orderTime: '12:30 PM', cookingStartTime: '12:35 PM', cookingEndTime: '12:50 PM', timeTaken: '15 min', date: '2025-01-03' },
        { orderNo: 'ORD004', type: 'Hotdog', orderTime: '1:00 PM', cookingStartTime: '1:05 PM', cookingEndTime: '1:20 PM', timeTaken: '15 min', date: '2025-01-04' },
        { orderNo: 'ORD005', type: 'Burger', orderTime: '1:30 PM', cookingStartTime: '1:35 PM', cookingEndTime: '1:50 PM', timeTaken: '15 min', date: '2025-01-05' },
        { orderNo: 'ORD0011', type: 'Burger', orderTime: '12:00 PM', cookingStartTime: '12:05 PM', cookingEndTime: '12:20 PM', timeTaken: '15 min', date: '2025-01-01' },
        { orderNo: 'ORD0021', type: 'Pizza', orderTime: '12:15 PM', cookingStartTime: '12:20 PM', cookingEndTime: '12:35 PM', timeTaken: '15 min', date: '2025-01-02' },
        { orderNo: 'ORD0031', type: 'Fries', orderTime: '12:30 PM', cookingStartTime: '12:35 PM', cookingEndTime: '12:50 PM', timeTaken: '15 min', date: '2025-01-03' },
        { orderNo: 'ORD0041', type: 'Hotdog', orderTime: '1:00 PM', cookingStartTime: '1:05 PM', cookingEndTime: '1:20 PM', timeTaken: '15 min', date: '2025-01-04' },
        { orderNo: 'ORD0051', type: 'Burger', orderTime: '1:30 PM', cookingStartTime: '1:35 PM', cookingEndTime: '1:50 PM', timeTaken: '15 min', date: '2025-01-05' },
        { orderNo: 'ORD0011', type: 'Burger', orderTime: '12:00 PM', cookingStartTime: '12:05 PM', cookingEndTime: '12:20 PM', timeTaken: '15 min', date: '2025-01-01' },
        { orderNo: 'ORD0012', type: 'Pizza', orderTime: '12:15 PM', cookingStartTime: '12:20 PM', cookingEndTime: '12:35 PM', timeTaken: '15 min', date: '2025-01-02' },
        { orderNo: 'ORD0013', type: 'Fries', orderTime: '12:30 PM', cookingStartTime: '12:35 PM', cookingEndTime: '12:50 PM', timeTaken: '15 min', date: '2025-01-03' },
        { orderNo: 'ORD0014', type: 'Hotdog', orderTime: '1:00 PM', cookingStartTime: '1:05 PM', cookingEndTime: '1:20 PM', timeTaken: '15 min', date: '2025-01-04' },
        { orderNo: 'ORD0015', type: 'Burger', orderTime: '1:30 PM', cookingStartTime: '1:35 PM', cookingEndTime: '1:50 PM', timeTaken: '15 min', date: '2025-01-05' },

        // Add 35 more entries in the same pattern...
      ]
    };
  },
  computed: {
    filteredAndSortedOrders() {
      let filtered = this.orders.filter(order => {
        const searchTerm = this.searchQuery.toLowerCase();

        const matchesSearch =
          order.orderNo.toLowerCase().includes(searchTerm) ||
          order.type.toLowerCase().includes(searchTerm) ||
          order.date.toLowerCase().includes(searchTerm);

        const matchesDateRange =
          (this.startDate ? new Date(order.date) >= new Date(this.startDate) : true) &&
          (this.endDate ? new Date(order.date) <= new Date(this.endDate) : true);

        return matchesSearch && matchesDateRange;
      });

      if (this.sortColumn) {
        filtered.sort((a, b) => {
          const valA = a[this.sortColumn];
          const valB = b[this.sortColumn];
          if (this.sortDirection === 'asc') {
            return valA > valB ? 1 : valA < valB ? -1 : 0;
          } else {
            return valA < valB ? 1 : valA > valB ? -1 : 0;
          }
        });
      }

      return filtered;
    }
  },
  methods: {
    sortTable(column) {
      if (this.sortColumn === column) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortColumn = column;
        this.sortDirection = 'asc';
      }
    },
    viewOrder(order) {
      console.log('View Order', order);
    },
    editOrder(order) {
      console.log('Edit Order', order);
    },
    deleteOrder(order) {
      this.orders = this.orders.filter(o => o !== order);
      console.log('Deleted Order', order);
    },
    exportToPDF() {
      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text('Order Cooking Time Report', 20, 20);
      doc.setFontSize(12);

      const headers = ['SN', 'Order No', 'Type', 'Order Time', 'Cooking Start Time', 'Cooking End Time', 'Time Taken', 'Date'];
      const rows = this.filteredAndSortedOrders.map((order, index) => [
        index + 1,
        order.orderNo,
        order.type,
        order.orderTime,
        order.cookingStartTime,
        order.cookingEndTime,
        order.timeTaken,
        order.date
      ]);

      doc.autoTable({
        head: [headers],
        body: rows,
        startY: 30,
      });

      doc.save('order_cooking_time_report.pdf');
    }
  }
};
</script>
