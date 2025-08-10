<template>
  <div class="bg-gray-100 h-screen flex flex-col">
    <SideBar />
    <NavBar />
    <div class="flex-grow ml-60">
      <div class="card m-4 bg-white shadow rounded-lg">
        <div class="card-datatable p-4 table-responsive">
          <div class="md:flex block justify-between items-center mb-4">
            <h5 class="text-2xl text-blue-500 font-semibold">Detailed Sales</h5>
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
                placeholder="Search by Reference No, Total Items, Sub Total"
              />
            </div>
          </div>

          <!-- Table Display -->
          <div class="overflow-x-auto border-t-[3px] border-b-2 border-blue-500">
            <table class="table-auto w-full">
              <thead>
              <tr>
                <th class="p-2 text-left cursor-pointer">SN</th>
                <th class="p-2 text-left cursor-pointer" @click="sortTable('referenceNo')">
                  Reference No
                  <font-awesome-icon :icon="sortColumn === 'referenceNo' ? (sortDirection === 'asc' ? 'caret-up' : 'caret-down') : ''" class="text-blue-500" />
                </th>
                <th class="p-2 text-left cursor-pointer" @click="sortTable('totalItems')">
                  Total Items
                  <font-awesome-icon :icon="sortColumn === 'totalItems' ? (sortDirection === 'asc' ? 'caret-up' : 'caret-down') : ''" class="text-blue-500" />
                </th>
                <th class="p-2 text-left cursor-pointer" @click="sortTable('subTotal')">
                  Sub Total
                  <font-awesome-icon :icon="sortColumn === 'subTotal' ? (sortDirection === 'asc' ? 'caret-up' : 'caret-down') : ''" class="text-blue-500" />
                </th>
                <th class="p-2 text-left cursor-pointer" @click="sortTable('discount')">
                  Discount
                  <font-awesome-icon :icon="sortColumn === 'discount' ? (sortDirection === 'asc' ? 'caret-up' : 'caret-down') : ''" class="text-blue-500" />
                </th>
                <th class="p-2 text-left cursor-pointer" @click="sortTable('vat')">
                  VAT
                  <font-awesome-icon :icon="sortColumn === 'vat' ? (sortDirection === 'asc' ? 'caret-up' : 'caret-down') : ''" class="text-blue-500" />
                </th>
                <th class="p-2 text-left cursor-pointer" @click="sortTable('grandTotal')">
                  G. Total
                  <font-awesome-icon :icon="sortColumn === 'grandTotal' ? (sortDirection === 'asc' ? 'caret-up' : 'caret-down') : ''" class="text-blue-500" />
                </th>
                <th class="p-2 text-left cursor-pointer" @click="sortTable('paymentMethod')">
                  Payment Method
                  <font-awesome-icon :icon="sortColumn === 'paymentMethod' ? (sortDirection === 'asc' ? 'caret-up' : 'caret-down') : ''" class="text-blue-500" />
                </th>
                <th class="p-2 text-left cursor-pointer" @click="sortTable('date')">
                  Date
                  <font-awesome-icon :icon="sortColumn === 'date' ? (sortDirection === 'asc' ? 'caret-up' : 'caret-down') : ''" class="text-blue-500" />
                </th>
              </tr>
              </thead>

              <tbody>
              <tr v-for="(transaction, index) in filteredAndSortedTransactions" :key="index" class="border-t-2 border-gray-200">
                <td class="p-2">{{ index + 1 }}</td>
                <td class="p-2">{{ transaction.referenceNo }}</td>
                <td class="p-2">{{ transaction.totalItems }}</td>
                <td class="p-2">{{ transaction.subTotal }}</td>
                <td class="p-2">{{ transaction.discount }}</td>
                <td class="p-2">{{ transaction.vat }}</td>
                <td class="p-2">{{ transaction.grandTotal }}</td>
                <td class="p-2">{{ transaction.paymentMethod }}</td>
                <td class="p-2">{{ new Date(transaction.date).toLocaleDateString() }}</td>
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
import { faEye, faPenToSquare, faTrashCan, faArrowRightLong, faFileArrowDown, faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

import SideBar from '@/admin/Sidebar/SideBar.vue';
import NavBar from '@/admin/TopBar/NavBar.vue';

library.add(faEye, faPenToSquare, faTrashCan, faArrowRightLong, faFileArrowDown, faCaretUp, faCaretDown);

export default {
  components: { NavBar, SideBar, FontAwesomeIcon },
  data() {
    return {
      searchQuery: '',
      startDate: '',
      endDate: '',
      sortColumn: '',
      sortDirection: 'asc',
      transactions: [
        { referenceNo: 'RF001', totalItems: 3, subTotal: 30, discount: 5, vat: 5, grandTotal: 30, paymentMethod: 'Cash', date: '2025-01-01' },
        { referenceNo: 'RF002', totalItems: 5, subTotal: 50, discount: 10, vat: 10, grandTotal: 50, paymentMethod: 'Credit Card', date: '2025-01-02' },
        { referenceNo: 'RF003', totalItems: 2, subTotal: 20, discount: 2, vat: 2, grandTotal: 20, paymentMethod: 'Cash', date: '2025-01-03' },
        { referenceNo: 'RF004', totalItems: 6, subTotal: 60, discount: 5, vat: 5, grandTotal: 60, paymentMethod: 'Debit Card', date: '2025-01-04' },
        { referenceNo: 'RF005', totalItems: 4, subTotal: 40, discount: 8, vat: 4, grandTotal: 40, paymentMethod: 'PayPal', date: '2025-01-05' },
        { referenceNo: 'RF006', totalItems: 8, subTotal: 80, discount: 10, vat: 8, grandTotal: 80, paymentMethod: 'Cash', date: '2025-01-06' },
        { referenceNo: 'RF007', totalItems: 7, subTotal: 70, discount: 7, vat: 7, grandTotal: 70, paymentMethod: 'Credit Card', date: '2025-01-07' },
        { referenceNo: 'RF008', totalItems: 1, subTotal: 10, discount: 1, vat: 1, grandTotal: 10, paymentMethod: 'Cash', date: '2025-01-08' },
        { referenceNo: 'RF009', totalItems: 9, subTotal: 90, discount: 9, vat: 9, grandTotal: 90, paymentMethod: 'PayPal', date: '2025-01-09' },
        { referenceNo: 'RF010', totalItems: 3, subTotal: 30, discount: 5, vat: 5, grandTotal: 30, paymentMethod: 'Debit Card', date: '2025-01-10' },
        { referenceNo: 'RF011', totalItems: 4, subTotal: 40, discount: 4, vat: 4, grandTotal: 40, paymentMethod: 'Credit Card', date: '2025-01-11' },
        { referenceNo: 'RF012', totalItems: 5, subTotal: 50, discount: 5, vat: 5, grandTotal: 50, paymentMethod: 'Cash', date: '2025-01-12' }
      ]
    };
  },
  computed: {
    filteredAndSortedTransactions() {
      let filtered = this.transactions.filter(transaction => {
        const searchTerm = this.searchQuery.toLowerCase();

        // Filter based on search query (Reference No, Total Items, Sub Total, etc.)
        const matchesSearch = transaction.referenceNo.toLowerCase().includes(searchTerm) ||
          transaction.totalItems.toString().includes(searchTerm) ||
          transaction.subTotal.toString().includes(searchTerm) ||
          transaction.discount.toString().includes(searchTerm) ||
          transaction.vat.toString().includes(searchTerm) ||
          transaction.grandTotal.toString().includes(searchTerm) ||
          transaction.paymentMethod.toLowerCase().includes(searchTerm);

        // Filter by date range (if any)
        const matchesDateRange = (this.startDate && this.endDate) ?
          (new Date(transaction.date) >= new Date(this.startDate) && new Date(transaction.date) <= new Date(this.endDate)) :
          true;

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
      doc.text('Sales Transactions', 20, 20);
      doc.setFontSize(12);
      const headers = ['SN', 'Reference No', 'Total Items', 'Sub Total', 'Discount', 'VAT', 'G. Total', 'Payment Method', 'Date'];
      const rows = this.filteredAndSortedTransactions.map((transaction, index) => [
        index + 1,
        transaction.referenceNo,
        transaction.totalItems,
        transaction.subTotal,
        transaction.discount,
        transaction.vat,
        transaction.grandTotal,
        transaction.paymentMethod,
        new Date(transaction.date).toLocaleDateString()
      ]);

      doc.autoTable({
        head: [headers],
        body: rows,
        startY: 30,
      });

      doc.save('sales_transactions.pdf');
    }
  }
};
</script>
