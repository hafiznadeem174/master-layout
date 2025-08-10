<template>
  <div class="bg-gray-100 h-screen flex flex-col">
    <SideBar />
    <NavBar />
    <div class="flex-grow ml-60">
      <div class="card m-4 bg-white shadow rounded-lg">
        <div class="card-datatable p-4 table-responsive">
          <div class="md:flex block justify-between items-center mb-4">
            <h5 class="text-2xl text-blue-500 font-semibold">Register Report</h5>
            <div class="flex justify-between gap-3">
              <button
                class="btn bg-blue-100 text-blue-400 hover:bg-blue-400 hover:text-white px-4 py-2 rounded"
                @click="exportToPDF">
                <span class="pt-2.5 mr-1"><font-awesome-icon icon="file-arrow-down" /></span>
                Export
              </button>
              <button
                class="btn bg-blue-500 text-white hover:opacity-70 px-4 py-2 rounded"
                @click="addNewRecord">
                <font-awesome-icon icon="plus" /> Add New
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
                placeholder="Search by Payment Method, Description, or Added By"
              />
            </div>
          </div>

          <!-- Table Display -->
          <div class="overflow-x-auto border-t-[3px] border-b-2 border-blue-500">
            <table class="table-auto w-full">
              <thead>
              <tr>
                <th class="p-2 text-left cursor-pointer">SN</th>
                <th class="p-2 text-left cursor-pointer" @click="sortTable('openingDate')">
                  Opening Date & Time
                  <font-awesome-icon :icon="sortColumn === 'openingDate' ? (sortDirection === 'asc' ? 'caret-up' : 'caret-down') : ''" class="text-blue-500" />
                </th>
                <th class="p-2 text-left cursor-pointer">
                  Opening Balance
                  <font-awesome-icon :icon="sortColumn === 'openingBalance' ? (sortDirection === 'asc' ? 'caret-up' : 'caret-down') : ''" class="text-blue-500" />
                </th>
                <th class="p-2 text-left cursor-pointer">
                  Sale (Paid Amount)
                  <font-awesome-icon :icon="sortColumn === 'saleAmount' ? (sortDirection === 'asc' ? 'caret-up' : 'caret-down') : ''" class="text-blue-500" />
                </th>
                <th class="p-2 text-left cursor-pointer">
                  Customer Due Receive
                  <font-awesome-icon :icon="sortColumn === 'dueReceive' ? (sortDirection === 'asc' ? 'caret-up' : 'caret-down') : ''" class="text-blue-500" />
                </th>
                <th class="p-2 text-left cursor-pointer">
                  Closing Date & Time
                  <font-awesome-icon :icon="sortColumn === 'closingDate' ? (sortDirection === 'asc' ? 'caret-up' : 'caret-down') : ''" class="text-blue-500" />
                </th>
                <th class="p-2 text-left cursor-pointer">
                  Closing Balance
                  <font-awesome-icon :icon="sortColumn === 'closingBalance' ? (sortDirection === 'asc' ? 'caret-up' : 'caret-down') : ''" class="text-blue-500" />
                </th>
                <th class="p-2 text-left cursor-pointer">
                  Sale in Payment Method
                  <font-awesome-icon :icon="sortColumn === 'paymentMethod' ? (sortDirection === 'asc' ? 'caret-up' : 'caret-down') : ''" class="text-blue-500" />
                </th>
                <th class="p-2 text-center">Actions</th>
              </tr>
              </thead>

              <tbody>
              <tr v-for="(entry, index) in filteredAndSortedEntries" :key="index" class="border-t-2 border-gray-200">
                <td class="p-2">{{ index + 1 }}</td>
                <td class="p-2">{{ entry.openingDate }}</td>
                <td class="p-2">{{ entry.openingBalance }}</td>
                <td class="p-2">{{ entry.saleAmount }}</td>
                <td class="p-2">{{ entry.dueReceive }}</td>
                <td class="p-2">{{ entry.closingDate }}</td>
                <td class="p-2">{{ entry.closingBalance }}</td>
                <td class="p-2">{{ entry.paymentMethod }}</td>
                <td class="flex p-2 justify-center gap-1">
                  <button @click="viewRecord(entry)" class="text-blue-500 hover:text-blue-700">
                    <font-awesome-icon icon="eye" />
                  </button>
                  <button @click="editRecord(entry)" class="text-green-500 hover:text-green-700">
                    <font-awesome-icon icon="pen-to-square" />
                  </button>
                  <button @click="deleteRecord(entry)" class="text-red-500 hover:text-red-700">
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
import { faEye, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import jsPDF from 'jspdf';

import SideBar from '@/admin/Sidebar/SideBar.vue';
import NavBar from '@/admin/TopBar/NavBar.vue';

library.add(faEye, faPenToSquare, faTrashCan);

export default {
  components: { NavBar, SideBar, FontAwesomeIcon },
  data() {
    return {
      searchQuery: '',
      startDate: '',
      endDate: '',
      sortColumn: '',
      sortDirection: 'asc',
      entries: [
        {
          openingDate: "2025-01-01 08:00",
          openingBalance: 5000,
          saleAmount: 1500,
          dueReceive: 300,
          closingDate: "2025-01-01 16:00",
          closingBalance: 4200,
          paymentMethod: "Credit Card"
        },
        {
          openingDate: "2025-01-02 08:00",
          openingBalance: 4200,
          saleAmount: 2000,
          dueReceive: 500,
          closingDate: "2025-01-02 16:00",
          closingBalance: 3500,
          paymentMethod: "PayPal"
        },
        {
          openingDate: "2025-01-03 08:00",
          openingBalance: 3500,
          saleAmount: 1000,
          dueReceive: 200,
          closingDate: "2025-01-03 16:00",
          closingBalance: 2800,
          paymentMethod: "Bank Transfer"
        },
        {
          openingDate: "2025-01-04 08:00",
          openingBalance: 2800,
          saleAmount: 1200,
          dueReceive: 300,
          closingDate: "2025-01-04 16:00",
          closingBalance: 2400,
          paymentMethod: "Debit Card"
        },
        {
          openingDate: "2025-01-05 08:00",
          openingBalance: 2400,
          saleAmount: 800,
          dueReceive: 150,
          closingDate: "2025-01-05 16:00",
          closingBalance: 2350,
          paymentMethod: "Cash"
        },
        {
          openingDate: "2025-01-06 08:00",
          openingBalance: 2350,
          saleAmount: 1700,
          dueReceive: 600,
          closingDate: "2025-01-06 16:00",
          closingBalance: 1250,
          paymentMethod: "Credit Card"
        },
        {
          openingDate: "2025-01-07 08:00",
          openingBalance: 1250,
          saleAmount: 300,
          dueReceive: 100,
          closingDate: "2025-01-07 16:00",
          closingBalance: 950,
          paymentMethod: "PayPal"
        },
        {
          openingDate: "2025-01-08 08:00",
          openingBalance: 950,
          saleAmount: 500,
          dueReceive: 50,
          closingDate: "2025-01-08 16:00",
          closingBalance: 500,
          paymentMethod: "Bank Transfer"
        },
        {
          openingDate: "2025-01-09 08:00",
          openingBalance: 500,
          saleAmount: 250,
          dueReceive: 100,
          closingDate: "2025-01-09 16:00",
          closingBalance: 350,
          paymentMethod: "Debit Card"
        },
        {
          openingDate: "2025-01-10 08:00",
          openingBalance: 350,
          saleAmount: 400,
          dueReceive: 200,
          closingDate: "2025-01-10 16:00",
          closingBalance: 150,
          paymentMethod: "Cash"
        },
        {
          openingDate: "2025-01-11 08:00",
          openingBalance: 150,
          saleAmount: 800,
          dueReceive: 100,
          closingDate: "2025-01-11 16:00",
          closingBalance: 50,
          paymentMethod: "Credit Card"
        },
        {
          openingDate: "2025-01-12 08:00",
          openingBalance: 50,
          saleAmount: 1200,
          dueReceive: 50,
          closingDate: "2025-01-12 16:00",
          closingBalance: -200,
          paymentMethod: "PayPal"
        }
      ]
    };
  },
  computed: {
    filteredAndSortedEntries() {
      let filtered = this.entries.filter(entry => {
        const searchTerm = this.searchQuery.toLowerCase();

        // Filter based on search query
        const matchesSearch =
          entry.paymentMethod.toLowerCase().includes(searchTerm) ||
          entry.openingBalance.toString().includes(searchTerm) ||
          entry.saleAmount.toString().includes(searchTerm) ||
          entry.dueReceive.toString().includes(searchTerm);

        // Filter by date range
        const matchesDateRange = (this.startDate ? new Date(entry.openingDate) >= new Date(this.startDate) : true) &&
          (this.endDate ? new Date(entry.openingDate) <= new Date(this.endDate) : true);

        return matchesSearch && matchesDateRange;
      });

      // Sorting
      if (this.sortColumn) {
        filtered.sort((a, b) => {
          const valA = a[this.sortColumn];
          const valB = b[this.sortColumn];

          if (this.sortDirection === 'asc') {
            return (valA > valB) ? 1 : (valA < valB) ? -1 : 0;
          } else {
            return (valA < valB) ? 1 : (valA > valB) ? -1 : 0;
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
    viewRecord(entry) {
      console.log('View Record', entry);
    },
    editRecord(entry) {
      console.log('Edit Record', entry);
    },
    deleteRecord(entry) {
      this.entries = this.entries.filter(e => e !== entry);
      console.log('Deleted Record', entry);
    },
    exportToPDF() {
      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text('Sales Data List', 20, 20);
      doc.setFontSize(12);
      const headers = ['SN', 'Opening Date & Time', 'Opening Balance', 'Sale Amount', 'Customer Due Receive', 'Closing Date & Time', 'Closing Balance', 'Payment Method'];
      const rows = this.filteredAndSortedEntries.map((entry, index) => [
        index + 1,
        entry.openingDate,
        entry.openingBalance,
        entry.saleAmount,
        entry.dueReceive,
        entry.closingDate,
        entry.closingBalance,
        entry.paymentMethod
      ]);

      doc.autoTable({
        head: [headers],
        body: rows,
        startY: 30,
      });

      doc.save('sales_data_list.pdf');
    },
    clearSearch() {
      this.searchQuery = '';
    }
  }
};
</script>
