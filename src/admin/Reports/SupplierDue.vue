<template>
  <div class="bg-gray-100 h-screen flex flex-col">
    <SideBar />
    <NavBar />
    <div class="flex-grow ml-60">
      <div class="card m-4 bg-white shadow rounded-lg">
        <div class="card-datatable p-4 table-responsive">
          <div class="md:flex block justify-between items-center mb-4">
            <h5 class="text-2xl text-blue-500 font-semibold">Supplier Due</h5>
            <div class="flex justify-between gap-3">
              <button
                class="btn bg-blue-100 text-blue-400 hover:bg-blue-400 hover:text-white px-4 py-2 rounded"
                @click="exportToPDF">
                <span class="pt-2.5 mr-1"><font-awesome-icon icon="file-arrow-down" /></span>
                Export
              </button>
            </div>
          </div>

          <!-- Search Filter -->
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
                <th class="p-2 text-left cursor-pointer" @click="sortTable('supplierName')">
                  Supplier Name
                  <font-awesome-icon :icon="sortColumn === 'supplierName' ? (sortDirection === 'asc' ? 'caret-up' : 'caret-down') : ''" class="text-blue-500" />
                </th>
                <th class="p-2 text-left cursor-pointer" @click="sortTable('referenceNo')">
                  Reference No
                  <font-awesome-icon :icon="sortColumn === 'referenceNo' ? (sortDirection === 'asc' ? 'caret-up' : 'caret-down') : ''" class="text-blue-500" />
                </th>
                <th class="p-2 text-right cursor-pointer" @click="sortTable('duePayment')">
                  Due Payment
                  <font-awesome-icon :icon="sortColumn === 'duePayment' ? (sortDirection === 'asc' ? 'caret-up' : 'caret-down') : ''" class="text-blue-500" />
                </th>
                <th class="p-2 text-center">Actions</th>
              </tr>
              </thead>

              <tbody>
              <tr v-for="(entry, index) in filteredAndSortedData" :key="index" class="border-t-2 border-gray-200">
                <td class="p-2">{{ index + 1 }}</td>
                <td class="p-2">{{ entry.supplierName }}</td>
                <td class="p-2">{{ entry.referenceNo }}</td>
                <td class="p-2 text-right">{{ entry.duePayment }} PKR</td>
                <td class="p-2 text-center">
                  <button @click="viewDetails(entry)" class="text-blue-500 hover:text-blue-700">
                    <font-awesome-icon icon="eye" />
                  </button>
                  <button @click="editDetails(entry)" class="text-green-500 hover:text-green-700">
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
      records: [
        { supplierName: 'Supplier A', referenceNo: 'REF001', duePayment: 300, date: '2025-01-01' },
        { supplierName: 'Supplier B', referenceNo: 'REF002', duePayment: 150, date: '2025-01-02' },
        { supplierName: 'Supplier C', referenceNo: 'REF003', duePayment: 500, date: '2025-01-03' },
        { supplierName: 'Supplier D', referenceNo: 'REF004', duePayment: 250, date: '2025-01-04' },
        { supplierName: 'Supplier E', referenceNo: 'REF005', duePayment: 400, date: '2025-01-05' },
        { supplierName: 'Supplier F', referenceNo: 'REF006', duePayment: 600, date: '2025-01-06' },
        { supplierName: 'Supplier G', referenceNo: 'REF007', duePayment: 200, date: '2025-01-07' },
        { supplierName: 'Supplier H', referenceNo: 'REF008', duePayment: 300, date: '2025-01-08' },
        { supplierName: 'Supplier I', referenceNo: 'REF009', duePayment: 550, date: '2025-01-09' },
        { supplierName: 'Supplier J', referenceNo: 'REF010', duePayment: 700, date: '2025-01-10' },
        { supplierName: 'Supplier K', referenceNo: 'REF011', duePayment: 800, date: '2025-01-11' },
        { supplierName: 'Supplier L', referenceNo: 'REF012', duePayment: 900, date: '2025-01-12' }
      ]
    };
  },
  computed: {
    filteredAndSortedData() {
      let filtered = this.records.filter(record => {
        const searchTerm = this.searchQuery.toLowerCase();

        const matchesSearch =
          record.supplierName.toLowerCase().includes(searchTerm) ||
          record.referenceNo.toLowerCase().includes(searchTerm) ||
          record.duePayment.toString().includes(searchTerm);

        return matchesSearch;
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
    viewDetails(record) {
      console.log('Viewing Details:', record);
    },
    editDetails(record) {
      console.log('Editing Details:', record);
    },
    deleteRecord(record) {
      this.records = this.records.filter(r => r !== record);
      console.log('Deleted Record:', record);
    },
    exportToPDF() {
      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text('Supplier Payments Report', 20, 20);
      doc.setFontSize(12);

      const headers = ['SN', 'Supplier Name', 'Reference No', 'Due Payment'];
      const rows = this.filteredAndSortedData.map((record, index) => [
        index + 1,
        record.supplierName,
        record.referenceNo,
        record.duePayment
      ]);

      doc.autoTable({
        head: [headers],
        body: rows,
        startY: 30,
      });

      doc.save('supplier_payments_report.pdf');
    }
  }
};
</script>
