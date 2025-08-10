<template>
  <div class="bg-gray-100 h-screen flex flex-col">
    <SideBar />
    <NavBar />
    <div class="flex-grow ml-60">
      <div class="card m-4 bg-white shadow rounded-lg">
        <div class="card-datatable p-4 table-responsive">
          <div class="md:flex block justify-between items-center mb-4">
            <h5 class="text-2xl text-blue-500 font-semibold">Profit and Loss</h5>
            <div class="flex justify-between gap-3">
              <button
                class="btn bg-blue-100 text-blue-400 hover:bg-blue-400 hover:text-white px-4 py-2 rounded"
                @click="exportToPDF">
                <span class="pt-2.5 mr-1"><font-awesome-icon icon="file-arrow-down" /></span>
                Export
              </button>
            </div>
          </div>

          <!-- Search Filters -->
          <div class="md:flex block justify-between items-center mb-4">
            <div class="flex items-center w-full space-x-4">
              <div class="w-full sm:w-1/2 flex border rounded-lg border-gray-300 space-x-2">
                <input
                  v-model="searchQuery"
                  type="text"
                  class="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder:text-gray-500"
                  placeholder="Search by Date"
                />
              </div>
            </div>
          </div>

          <!-- Table Display -->
          <div class="overflow-x-auto border-t-[3px] border-b-2 border-blue-500">
            <table class="table-auto w-full">
              <thead>
              <tr>
                <th class="p-2 text-left cursor-pointer">SN</th>
                <th class="p-2 text-left">Transaction Type</th>
                <th class="p-2 text-right cursor-pointer" @click="sortTable('profit')">
                  Total Profit
                  <font-awesome-icon :icon="sortColumn === 'profit' ? (sortDirection === 'asc' ? 'caret-up' : 'caret-down') : ''" class="text-blue-500" />
                </th>
                <th class="p-2 text-right cursor-pointer" @click="sortTable('loss')">
                  Total Loss
                  <font-awesome-icon :icon="sortColumn === 'loss' ? (sortDirection === 'asc' ? 'caret-up' : 'caret-down') : ''" class="text-blue-500" />
                </th>
                <th class="p-2 text-right cursor-pointer" @click="sortTable('netProfit')">
                  Net Profit/Loss
                  <font-awesome-icon :icon="sortColumn === 'netProfit' ? (sortDirection === 'asc' ? 'caret-up' : 'caret-down') : ''" class="text-blue-500" />
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
                <td class="p-2">{{ entry.transactionType }}</td>
                <td class="p-2 text-right">{{ entry.profit }} PKR</td>
                <td class="p-2 text-right">{{ entry.loss }} PKR</td>
                <td class="p-2 text-right">{{ entry.netProfit }} PKR</td>

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
      sortColumn: '',
      sortDirection: 'asc',
      entries: [
        { date: '2025-12-01', profit: 150, loss: 50, netProfit: 100, transactionType: 'Profit' },
        { date: '2025-12-02', profit: 200, loss: 100, netProfit: 100, transactionType: 'Profit' },
        { date: '2025-12-03', profit: 180, loss: 30, netProfit: 150, transactionType: 'Profit' },
        { date: '2025-12-04', profit: 220, loss: 120, netProfit: 100, transactionType: 'Profit' },
        { date: '2025-12-05', profit: 250, loss: 80, netProfit: 170, transactionType: 'Profit' },
        { date: '2025-12-06', profit: 300, loss: 200, netProfit: 100, transactionType: 'Profit' },
        { date: '2025-12-07', profit: 500, loss: 300, netProfit: 200, transactionType: 'Profit' },
        { date: '2025-12-08', profit: 400, loss: 100, netProfit: 300, transactionType: 'Profit' },
        { date: '2025-12-09', profit: 600, loss: 400, netProfit: 200, transactionType: 'Profit' },
        { date: '2025-12-10', profit: 700, loss: 350, netProfit: 350, transactionType: 'Profit' },
        { date: '2025-12-11', profit: 450, loss: 150, netProfit: 300, transactionType: 'Profit' },
        { date: '2025-12-12', profit: 320, loss: 100, netProfit: 220, transactionType: 'Profit' },
        { date: '2025-12-13', profit: 250, loss: 50, netProfit: 200, transactionType: 'Profit' },
        { date: '2025-12-14', profit: 150, loss: 70, netProfit: 80, transactionType: 'Loss' },
        { date: '2025-12-15', profit: 300, loss: 150, netProfit: 150, transactionType: 'Profit' },
        { date: '2025-12-16', profit: 200, loss: 50, netProfit: 150, transactionType: 'Profit' },
        { date: '2025-12-17', profit: 400, loss: 200, netProfit: 200, transactionType: 'Profit' },
        { date: '2025-12-18', profit: 250, loss: 50, netProfit: 200, transactionType: 'Profit' },
        { date: '2025-12-19', profit: 380, loss: 180, netProfit: 200, transactionType: 'Profit' },
        { date: '2025-12-20', profit: 500, loss: 100, netProfit: 400, transactionType: 'Profit' },
        { date: '2025-12-21', profit: 450, loss: 250, netProfit: 200, transactionType: 'Profit' },
        { date: '2025-12-22', profit: 220, loss: 50, netProfit: 170, transactionType: 'Profit' },
        { date: '2025-12-23', profit: 150, loss: 40, netProfit: 110, transactionType: 'Profit' },
        { date: '2025-12-24', profit: 300, loss: 100, netProfit: 200, transactionType: 'Profit' },
        { date: '2025-12-25', profit: 500, loss: 200, netProfit: 300, transactionType: 'Profit' },
        { date: '2025-12-26', profit: 450, loss: 250, netProfit: 200, transactionType: 'Profit' },
        { date: '2025-12-27', profit: 350, loss: 100, netProfit: 250, transactionType: 'Profit' },
        { date: '2025-12-28', profit: 600, loss: 300, netProfit: 300, transactionType: 'Profit' },
        { date: '2025-12-29', profit: 400, loss: 100, netProfit: 300, transactionType: 'Profit' },
        { date: '2025-12-30', profit: 450, loss: 50, netProfit: 400, transactionType: 'Profit' },
        { date: '2025-12-31', profit: 700, loss: 350, netProfit: 350, transactionType: 'Profit' }
      ]
    };
  },
  computed: {
    filteredAndSortedEntries() {
      let filtered = this.entries.filter(entry => {
        const searchTerm = this.searchQuery.toLowerCase();
        return entry.date.toLowerCase().includes(searchTerm);
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
      doc.text('Last Month Profit and Loss', 20, 20);
      doc.setFontSize(12);
      const headers = ['SN', 'Date', 'Profit', 'Loss', 'Net Profit/Loss', 'Transaction Type'];
      const rows = this.filteredAndSortedEntries.map((entry, index) => [
        index + 1,
        entry.date,
        entry.profit,
        entry.loss,
        entry.netProfit,
        entry.transactionType
      ]);

      doc.autoTable({
        head: [headers],
        body: rows,
        startY: 30,
      });

      doc.save('profit_loss_report.pdf');
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
