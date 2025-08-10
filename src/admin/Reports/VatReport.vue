<template>
  <div class="bg-gray-100 h-screen flex flex-col">
    <SideBar />
    <NavBar />
    <div class="flex-grow ml-60">
      <div class="card m-4 bg-white shadow rounded-lg">
        <div class="card-datatable p-4 table-responsive">
          <div class="md:flex block justify-between items-center mb-4">
            <h5 class="text-2xl text-blue-500 font-semibold">VAT Report</h5>
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
                <th class="p-2 text-left cursor-pointer" @click="sortTable('vatName')">
                  VAT Name
                  <font-awesome-icon :icon="sortColumn === 'vatName' ? (sortDirection === 'asc' ? 'caret-up' : 'caret-down') : ''" class="text-blue-500" />
                </th>
                <th class="p-2 text-right cursor-pointer" @click="sortTable('totalSale')">
                  Total Sale
                  <font-awesome-icon :icon="sortColumn === 'totalSale' ? (sortDirection === 'asc' ? 'caret-up' : 'caret-down') : ''" class="text-blue-500" />
                </th>

                <th class="p-2 text-right cursor-pointer" @click="sortTable('vatPercentage')">
                  VAT Percentage
                  <font-awesome-icon :icon="sortColumn === 'vatPercentage' ? (sortDirection === 'asc' ? 'caret-up' : 'caret-down') : ''" class="text-blue-500" />
                </th>
                <th class="p-2 text-right cursor-pointer" @click="sortTable('vatAmount')">
                  VAT Amount
                  <font-awesome-icon :icon="sortColumn === 'vatAmount' ? (sortDirection === 'asc' ? 'caret-up' : 'caret-down') : ''" class="text-blue-500" />
                </th>
                <th class="p-2 text-center cursor-pointer" @click="sortTable('date')">
                  Date
                  <font-awesome-icon :icon="sortColumn === 'date' ? (sortDirection === 'asc' ? 'caret-up' : 'caret-down') : ''" class="text-blue-500" />
                </th>
                <th class="p-2 text-center">Actions</th>
              </tr>
              </thead>

              <tbody>
              <tr v-for="(entry, index) in filteredAndSortedEntries" :key="index" class="border-t-2 border-gray-200">
                <td class="p-2">{{ index + 1 }}</td>
                <td class="p-2">{{ entry.vatName }}</td>
                <td class="p-2 text-right">{{ entry.totalSale }} PKR</td>
                <td class="p-2 text-right">{{ entry.vatPercentage }}</td>
                <td class="p-2 text-right">{{ entry.vatAmount }} PKR</td>
                <td class="p-2 text-center">{{ entry.date }}</td>
                <td class="p-2 text-center">
                  <button @click="viewEntry(entry)" class="text-blue-500 hover:text-blue-700">
                    <font-awesome-icon icon="eye" />
                  </button>
                  <button @click="editEntry(entry)" class="text-green-500 hover:text-green-700">
                    <font-awesome-icon icon="pen-to-square" />
                  </button>
                  <button @click="deleteEntry(entry)" class="text-red-500 hover:text-red-700">
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
      entries: [
        { totalSale: 1000, vatName: "Standard VAT", vatPercentage: "10%", vatAmount: 100, date: '2025-01-01' },
        { totalSale: 1500, vatName: "Reduced VAT", vatPercentage: "5%", vatAmount: 75, date: '2025-01-02' },
        { totalSale: 2000, vatName: "Standard VAT", vatPercentage: "10%", vatAmount: 200, date: '2025-01-03' },
        { totalSale: 2500, vatName: "Exempt VAT", vatPercentage: "0%", vatAmount: 0, date: '2025-01-04' },
        { totalSale: 3000, vatName: "Standard VAT", vatPercentage: "10%", vatAmount: 300, date: '2025-01-05' },
        { totalSale: 3500, vatName: "Reduced VAT", vatPercentage: "5%", vatAmount: 175, date: '2025-01-06' },
        { totalSale: 4000, vatName: "Standard VAT", vatPercentage: "10%", vatAmount: 400, date: '2025-01-07' },
        { totalSale: 4500, vatName: "Exempt VAT", vatPercentage: "0%", vatAmount: 0, date: '2025-01-08' },
        { totalSale: 5000, vatName: "Standard VAT", vatPercentage: "10%", vatAmount: 500, date: '2025-01-09' },
        { totalSale: 5500, vatName: "Reduced VAT", vatPercentage: "5%", vatAmount: 275, date: '2025-01-10' },
        { totalSale: 6000, vatName: "Standard VAT", vatPercentage: "10%", vatAmount: 600, date: '2025-01-11' },
        { totalSale: 6500, vatName: "Exempt VAT", vatPercentage: "0%", vatAmount: 0, date: '2025-01-12' },
        { totalSale: 7000, vatName: "Standard VAT", vatPercentage: "10%", vatAmount: 700, date: '2025-01-13' },
        { totalSale: 7500, vatName: "Reduced VAT", vatPercentage: "5%", vatAmount: 375, date: '2025-01-14' }
      ]
    };
  },
  computed: {
    filteredAndSortedEntries() {
      let filtered = this.entries.filter(entry => {
        const searchTerm = this.searchQuery.toLowerCase();
        const matchesSearch =
          entry.vatName.toLowerCase().includes(searchTerm) ||
          entry.date.toLowerCase().includes(searchTerm);

        // Filter by date range
        const matchesDateRange = (this.startDate ? new Date(entry.date) >= new Date(this.startDate) : true) &&
          (this.endDate ? new Date(entry.date) <= new Date(this.endDate) : true);

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
    exportToPDF() {
      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text('Sales Data with VAT Report', 20, 20);
      doc.setFontSize(12);

      const headers = ['SN', 'Total Sale', 'VAT Name', 'VAT Percentage', 'VAT Amount', 'Date'];
      const rows = this.filteredAndSortedEntries.map((entry, index) => [
        index + 1,
        entry.totalSale,
        entry.vatName,
        entry.vatPercentage,
        entry.vatAmount,
        entry.date
      ]);

      doc.autoTable({
        head: [headers],
        body: rows,
        startY: 30,
      });

      doc.save('sales_with_vat_report.pdf');
    },
    viewEntry(entry) {
      console.log('View Entry', entry);
    },
    editEntry(entry) {
      console.log('Edit Entry', entry);
    },
    deleteEntry(entry) {
      this.entries = this.entries.filter(e => e !== entry);
      console.log('Deleted Entry', entry);
    }
  }
};
</script>
