<template>
  <div class="bg-gray-100 h-screen flex flex-col">
    <SideBar />
    <NavBar />

    <div class="flex-grow ml-60">
      <div class="card m-4 bg-white shadow rounded-lg">
        <div class="card-datatable p-4 table-responsive">
          <div class="md:flex block justify-between items-center mb-4">
            <h5 class="text-2xl text-blue-500 font-semibold">Customer Due Receive</h5>
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
                placeholder="Search by Category, Responsible Person, Payment or Reference No."
              />
            </div>
          </div>
          <div class="overflow-x-auto border-t-[3px] border-b-2 border-blue-500">
            <table class="table-auto w-full">
              <thead>
              <tr>
                <th class="p-2 text-left">SN</th>
                <th class="p-2 text-left cursor-pointer" @click="sortTable('referenceNo')">
                  Reference No.
                  <span v-if="sortColumn === 'referenceNo'">
                      <font-awesome-icon :icon="sortOrder === 'asc' ? 'caret-up' : 'caret-down'" class="text-blue-500" />
                    </span>
                </th>
                <th class="p-2 text-left cursor-pointer" @click="sortTable('supplier')">
                  Customer
                  <span v-if="sortColumn === 'supplier'">
                      <font-awesome-icon :icon="sortOrder === 'asc' ? 'caret-up' : 'caret-down'" class="text-blue-500" />
                    </span>
                </th>
                <th class="p-2 text-left cursor-pointer" @click="sortTable('amount')">
                  Amount
                  <span v-if="sortColumn === 'amount'">
                      <font-awesome-icon :icon="sortOrder === 'asc' ? 'caret-up' : 'caret-down'" class="text-blue-500" />
                    </span>
                </th>
                <th class="p-2 text-left">Note</th>
                <th class="p-2 text-left">Added By</th>
                <th class="p-2 text-center cursor-pointer" @click="sortTable('createdAt')">
                  Date
                  <span v-if="sortColumn === 'createdAt'">
                      <font-awesome-icon :icon="sortOrder === 'asc' ? 'caret-up' : 'caret-down'" class="text-blue-500" />
                    </span>
                </th>
                <th class="p-2 text-center">Actions</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(record, index) in filteredRecords" :key="index" class="border-t-2 border-gray-200">
                <td class="p-2">{{ index + 1 }}</td>
                <td class="p-2">{{ record.referenceNo }}</td>
                <td class="p-2">{{ record.supplier }}</td>
                <td class="p-2">{{ record.amount }}</td>
                <td class="p-2">{{ record.note }}</td>
                <td class="p-2">{{ record.addedBy }}</td>
                <td class="p-2 text-center">{{ record.createdAt }}</td>
                <td class="flex p-2 justify-center gap-1">
                  <button @click="viewRecord(record)" class="text-blue-500 hover:text-blue-700">
                    <font-awesome-icon icon="eye" />
                  </button>
                  <button @click="editRecord(record)" class="text-green-500 hover:text-green-700">
                    <font-awesome-icon icon="pen-to-square" />
                  </button>
                  <button @click="deleteRecord(record)" class="text-red-500 hover:text-red-700">
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
import { faCaretUp, faCaretDown, faEye, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import jsPDF from 'jspdf'; // Import jsPDF

import SideBar from '@/admin/Sidebar/SideBar.vue';
import NavBar from '@/admin/TopBar/NavBar.vue';

library.add(faCaretUp, faCaretDown, faEye, faPenToSquare, faTrashCan);

export default {
  components: { NavBar, SideBar, FontAwesomeIcon },
  data() {
    return {
      searchQuery: '', // The search query for filtering records
      startDate: '', // Start date for date range filter
      endDate: '', // End date for date range filter
      records: [
        { referenceNo: "R-001", supplier: "Customer A", amount: "₨ 3500.00", note: "Note for Customer A", addedBy: "Jaffa'z", createdAt: "2025-01-01" },
        { referenceNo: "R-002", supplier: "Customer B", amount: "₨ 4500.50", note: "Note for Customer B", addedBy: "Jaffa'z", createdAt: "2025-01-02" },
        { referenceNo: "R-003", supplier: "Customer C", amount: "₨ 2500.75", note: "Note for Customer C", addedBy: "Jaffa'z", createdAt: "2025-01-03" },
        { referenceNo: "R-004", supplier: "Customer D", amount: "₨ 3200.00", note: "Note for Customer D", addedBy: "Jaffa'z", createdAt: "2025-01-04" },
        { referenceNo: "R-005", supplier: "Customer E", amount: "₨ 5000.00", note: "Note for Customer E", addedBy: "Jaffa'z", createdAt: "2025-01-05" },
        { referenceNo: "R-006", supplier: "Customer F", amount: "₨ 6000.00", note: "Note for Customer F", addedBy: "Jaffa'z", createdAt: "2025-01-06" },
        { referenceNo: "R-007", supplier: "Customer G", amount: "₨ 4200.30", note: "Note for Customer G", addedBy: "Jaffa'z", createdAt: "2025-01-07" },
        { referenceNo: "R-008", supplier: "Customer H", amount: "₨ 3100.45", note: "Note for Customer H", addedBy: "Jaffa'z", createdAt: "2025-01-08" },
        { referenceNo: "R-009", supplier: "Customer I", amount: "₨ 4700.20", note: "Note for Customer I", addedBy: "Jaffa'z", createdAt: "2025-01-09" },
        { referenceNo: "R-010", supplier: "Customer J", amount: "₨ 3900.75", note: "Note for Customer J", addedBy: "Jaffa'z", createdAt: "2025-01-10" },
      ],
      sortColumn: null,
      sortOrder: 'asc',
    };
  },
  computed: {
    filteredRecords() {
      // Filter records based on search query and date range
      const filteredData = this.records.filter(record => {
        const searchTerm = this.searchQuery.toLowerCase();
        const amount = record.amount.toLowerCase();
        const referenceNo = record.referenceNo.toLowerCase();
        const customer = record.supplier.toLowerCase();

        const matchesSearchQuery =
          customer.includes(searchTerm) ||
          record.note.toLowerCase().includes(searchTerm) ||
          record.addedBy.toLowerCase().includes(searchTerm) ||
          record.createdAt.includes(searchTerm) ||
          amount.includes(searchTerm) ||
          referenceNo.includes(searchTerm);

        const recordDate = new Date(record.createdAt);
        const startDate = this.startDate ? new Date(this.startDate) : null;
        const endDate = this.endDate ? new Date(this.endDate) : null;
        const matchesDateRange =
          (!startDate || recordDate >= startDate) &&
          (!endDate || recordDate <= endDate);

        return matchesSearchQuery && matchesDateRange;
      });

      // Sort filtered data based on sortColumn and sortOrder
      if (this.sortColumn) {
        filteredData.sort((a, b) => {
          const aValue = a[this.sortColumn];
          const bValue = b[this.sortColumn];

          if (this.sortOrder === 'asc') {
            return aValue > bValue ? 1 : -1;
          } else {
            return aValue < bValue ? 1 : -1;
          }
        });
      }

      return filteredData; // No need for slice(0, 15) here unless you want to limit records
    }
  },
  methods: {
    sortTable(column) {
      if (this.sortColumn === column) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortColumn = column;
        this.sortOrder = 'asc';
      }
    },
    viewRecord(record) {
      console.log('View Record', record);
    },
    editRecord(record) {
      console.log('Edit Record', record);
    },
    deleteRecord(record) {
      this.records = this.records.filter(r => r !== record);
      console.log('Deleted Record', record);
    },
    exportToPDF() {
      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text('Customer Due Receive', 20, 20);
      doc.setFontSize(12);
      const headers = ['SN', 'Reference No.', 'Customer', 'Amount', 'Note', 'Added By', 'Created At'];
      const rows = this.filteredRecords.map((record, index) => [
        index + 1,
        record.referenceNo,
        record.supplier,
        record.amount,
        record.note,
        record.addedBy,
        record.createdAt,
      ]);

      doc.autoTable({
        head: [headers],
        body: rows,
        startY: 30,
      });

      doc.save('customer_due_receive.pdf');
    }
  },
};
</script>
