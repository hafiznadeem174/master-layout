<template>
  <div class="bg-gray-100 h-screen flex flex-col">
    <SideBar />
    <NavBar />
    <div class="flex-grow ml-60">
      <div class="card m-4 bg-white shadow rounded-lg">
        <div class="card-datatable p-4 table-responsive">
          <div class="md:flex block justify-between items-center mb-4">
            <h5 class="text-2xl text-blue-500 font-semibold">Payments Methods</h5>
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
                placeholder="Search by Payment Method, Description or Added By"
              />
            </div>
          </div>

          <!-- Table Display -->
          <div class="overflow-x-auto border-t-[3px] border-b-2 border-blue-500">
            <table class="table-auto w-full">
              <thead>
              <tr>
                <th class="p-2 text-left cursor-pointer">SN</th>
                <th class="p-2 text-left cursor-pointer" @click="sortTable('paymentMethod')">
                  Payment Method
                  <font-awesome-icon :icon="sortColumn === 'paymentMethod' ? (sortDirection === 'asc' ? 'caret-up' : 'caret-down') : ''" class="text-blue-500" />
                </th>
                <th class="p-2 text-left cursor-pointer" @click="sortTable('description')">
                  Description
                  <font-awesome-icon :icon="sortColumn === 'description' ? (sortDirection === 'asc' ? 'caret-up' : 'caret-down') : ''" class="text-blue-500" />
                </th>
                <th class="p-2 text-left cursor-pointer" @click="sortTable('addedBy')">
                  Added By
                  <font-awesome-icon :icon="sortColumn === 'addedBy' ? (sortDirection === 'asc' ? 'caret-up' : 'caret-down') : ''" class="text-blue-500" />
                </th>
                <th class="p-2 text-center cursor-pointer" @click="sortTable('date')">
                  Date
                  <font-awesome-icon :icon="sortColumn === 'date' ? (sortDirection === 'asc' ? 'caret-up' : 'caret-down') : ''" class="text-blue-500" />
                </th>
                <th class="p-2 text-center">Actions</th>
              </tr>
              </thead>

              <tbody>
              <tr v-for="(payment, index) in filteredAndSortedPayments" :key="index" class="border-t-2 border-gray-200">
                <td class="p-2">{{ index + 1 }}</td>
                <td class="p-2">{{ payment.paymentMethod }}</td>
                <td class="p-2">{{ payment.description }}</td>
                <td class="p-2">{{ payment.addedBy }}</td>
                <td class="p-2 text-center">{{ new Date(payment.date).toLocaleDateString() }}</td>
                <td class="flex p-2 justify-center gap-1">
                  <button @click="viewPayment(payment)" class="text-blue-500 hover:text-blue-700">
                    <font-awesome-icon icon="eye" />
                  </button>
                  <button @click="editPayment(payment)" class="text-green-500 hover:text-green-700">
                    <font-awesome-icon icon="pen-to-square" />
                  </button>
                  <button @click="deletePayment(payment)" class="text-red-500 hover:text-red-700">
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
      payments: [
        { paymentMethod: "Credit Card", description: "Monthly subscription", addedBy: "JAFFA'Z", date: "2025-01-01" },
        { paymentMethod: "PayPal", description: "Online purchase", addedBy: "JAFFA'Z", date: "2025-01-02" },
        { paymentMethod: "Bank Transfer", description: "Salary payment", addedBy: "JAFFA'Z", date: "2025-01-03" },
        { paymentMethod: "Debit Card", description: "Restaurant bill", addedBy: "JAFFA'Z", date: "2025-01-04" },
        { paymentMethod: "Cash", description: "Grocery shopping", addedBy: "JAFFA'Z", date: "2025-01-05" },
        { paymentMethod: "Credit Card", description: "Gift purchase", addedBy: "JAFFA'Z", date: "2025-01-06" },
        { paymentMethod: "PayPal", description: "Freelance work payment", addedBy: "JAFFA'Z", date: "2025-01-07" },
        { paymentMethod: "Bank Transfer", description: "Business expense", addedBy: "JAFFA'Z", date: "2025-01-08" },
        { paymentMethod: "Debit Card", description: "Travel expenses", addedBy: "JAFFA'Z", date: "2025-01-09" },
        { paymentMethod: "Cash", description: "Personal loan repayment", addedBy: "JAFFA'Z", date: "2025-01-10" }
      ]
    };
  },
  computed: {
    filteredAndSortedPayments() {
      let filtered = this.payments.filter(payment => {
        const searchTerm = this.searchQuery.toLowerCase();

        // Filter based on search query (Payment Method, Description, Added By)
        const matchesSearch =
          payment.paymentMethod.toLowerCase().includes(searchTerm) ||
          payment.description.toLowerCase().includes(searchTerm) ||
          payment.addedBy.toLowerCase().includes(searchTerm);

        // Filter by date range
        const matchesDateRange = (this.startDate ? new Date(payment.date) >= new Date(this.startDate) : true) &&
          (this.endDate ? new Date(payment.date) <= new Date(this.endDate) : true);

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
    viewPayment(payment) {
      console.log('View Payment', payment);
    },
    editPayment(payment) {
      console.log('Edit Payment', payment);
    },
    deletePayment(payment) {
      this.payments = this.payments.filter(p => p !== payment);
      console.log('Deleted Payment', payment);
    },
    exportToPDF() {
      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text('Payment List', 20, 20);
      doc.setFontSize(12);
      const headers = ['SN', 'Payment Method', 'Description', 'Added By', 'Date'];
      const rows = this.filteredAndSortedPayments.map((payment, index) => [
        index + 1,
        payment.paymentMethod,
        payment.description,
        payment.addedBy,
        new Date(payment.date).toLocaleDateString()
      ]);

      doc.autoTable({
        head: [headers],
        body: rows,
        startY: 30,
      });

      doc.save('payment_list.pdf');
    },
    clearSearch() {
      this.searchQuery = '';
    }
  }
};
</script>
