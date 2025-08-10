<template>
  <div class="bg-gray-100 h-screen flex flex-col">
    <SideBar />
    <NavBar />
    <div class="flex-grow ml-60">
      <div class="card m-4 bg-white shadow rounded-lg">
        <div class="card-datatable p-4 table-responsive">
          <div class="md:flex block justify-between items-center mb-4">
            <h5 class="text-2xl text-blue-500 font-semibold">Food Sale Report</h5>
            <div class="flex justify-between gap-3">
              <button
                class="btn bg-blue-100 text-blue-400 hover:bg-blue-400 hover:text-white px-4 py-2 rounded"
                @click="exportToPDF">
                <span class="pt-2.5 mr-1"><font-awesome-icon icon="file-arrow-down" /></span>
                Export
              </button>
            </div>
          </div>

          <!-- Search and Date Range Filters -->
          <div class="md:flex block justify-between items-center mb-4">
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
            <div class="mt-4 md:mt-0 flex items-center">
              <label for="search" class="mr-2">Search:</label>
              <input
                v-model="searchQuery"
                type="text"
                id="search"
                class="form-input border border-gray-300 rounded-lg p-2"
                placeholder="Search by Food Code"
              />
            </div>
          </div>

          <!-- Table Display -->
          <div class="overflow-x-auto border-t-[3px] border-b-2 border-blue-500">
            <table class="table-auto w-full">
              <thead>
              <tr>
                <th class="p-2 text-left cursor-pointer">Food Menu (Code)</th>
                <th class="p-2 text-left cursor-pointer">Quantity</th>
                <th class="p-2 text-left cursor-pointer">Price</th>
                <th class="p-2 text-left cursor-pointer">Sub Total</th>
              </tr>
              </thead>

              <tbody>
              <tr v-for="(item, index) in filteredAndSortedFoodMenuEntries" :key="index" class="border-t-2 border-gray-200">
                <td class="p-2">{{ item.foodCode }}</td>
                <td class="p-2">{{ item.quantity }}</td>
                <td class="p-2">{{ item.price }}</td>
                <td class="p-2">{{ item.subTotal }}</td>
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
import { faEye, faPenToSquare, faTrashCan, faArrowRightLong, faFileArrowDown } from '@fortawesome/free-solid-svg-icons';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

import SideBar from '@/admin/Sidebar/SideBar.vue';
import NavBar from '@/admin/TopBar/NavBar.vue';

library.add(faEye, faPenToSquare, faTrashCan, faArrowRightLong, faFileArrowDown);

export default {
  components: { NavBar, SideBar, FontAwesomeIcon },
  data() {
    return {
      searchQuery: '',
      startDate: '',
      endDate: '',
      foodMenuEntries: [
        { foodCode: "F001", quantity: 2, price: 10, subTotal: 20 },
        { foodCode: "F002", quantity: 3, price: 15, subTotal: 45 },
        { foodCode: "F003", quantity: 1, price: 20, subTotal: 20 },
        { foodCode: "F004", quantity: 4, price: 8, subTotal: 32 },
        { foodCode: "F005", quantity: 5, price: 12, subTotal: 60 },
      ]
    };
  },
  computed: {
    filteredAndSortedFoodMenuEntries() {
      let filtered = this.foodMenuEntries.filter(item => {
        const searchTerm = this.searchQuery.toLowerCase();

        // Filter based on search query (Food Code)
        const matchesSearch = item.foodCode.toLowerCase().includes(searchTerm);

        // Filter by date range (if any)
        const matchesDateRange = (this.startDate && this.endDate) ?
          (new Date(item.date) >= new Date(this.startDate) && new Date(item.date) <= new Date(this.endDate)) :
          true;

        return matchesSearch && matchesDateRange;
      });

      return filtered;
    }
  },
  methods: {
    exportToPDF() {
      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text('Food Menu', 20, 20);
      doc.setFontSize(12);
      const headers = ['Food Menu (Code)', 'Quantity', 'Price', 'Sub Total'];
      const rows = this.filteredAndSortedFoodMenuEntries.map(item => [
        item.foodCode,
        item.quantity,
        item.price,
        item.subTotal
      ]);

      doc.autoTable({
        head: [headers],
        body: rows,
        startY: 30,
      });

      doc.save('food_menu_list.pdf');
    }
  }
};
</script>
