<template>
  <div class="bg-gray-100 h-screen flex flex-col">
    <!-- Sidebar and Navbar components will be rendered here -->
    <SideBar />
    <NavBar />

    <div class="flex-grow ml-60">
      <div class="card m-4 bg-white shadow rounded-lg">
        <div class="card-datatable p-4 table-responsive">
          <div class="md:flex block justify-between items-center mb-4">
            <h5 class="text-2xl text-blue-500 font-semibold">Expense Report</h5>
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
                placeholder="Search by Category or Responsible Person"
              />
            </div>
          </div>

          <div class="overflow-x-auto border-t-[3px] border-b-2 border-blue-500">
            <table class="table-auto w-full">
              <thead>
              <tr>
                <th class="p-2 text-left">SN</th>
                <th class="p-2 text-left cursor-pointer" @click="sortTable('category')">
                  Category
                  <span v-if="sortColumn === 'category'">
                    <font-awesome-icon :icon="sortOrder === 'asc' ? 'caret-up' : 'caret-down'" class="text-blue-500" />
                  </span>
                </th>
                <th class="p-2 text-left cursor-pointer" @click="sortTable('responsiblePerson')">
                  Responsible Person
                  <span v-if="sortColumn === 'responsiblePerson'">
                    <font-awesome-icon :icon="sortOrder === 'asc' ? 'caret-up' : 'caret-down'" class="text-blue-500" />
                  </span>
                </th>
                <th class="p-2 text-left">Note</th>
                <th class="p-2 text-right cursor-pointer" @click="sortTable('amount')">
                  Amount
                  <span v-if="sortColumn === 'amount'">
                    <font-awesome-icon :icon="sortOrder === 'asc' ? 'caret-up' : 'caret-down'" class="text-blue-500" />
                  </span>
                </th>

                <th class="p-2 text-center cursor-pointer" @click="sortTable('date')">
                  Date
                  <span v-if="sortColumn === 'date'">
                    <font-awesome-icon :icon="sortOrder === 'asc' ? 'caret-up' : 'caret-down'" class="text-blue-500" />
                  </span>
                </th>
                <th class="p-2 text-center">Actions</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(record, index) in filteredRecords" :key="index" class="border-t-2 border-gray-200">
                <td class="p-2">{{ index + 1 }}</td>
                <td class="p-2">{{ record.category }}</td>
                <td class="p-2">{{ record.responsiblePerson }}</td>
                <td class="p-2">{{ record.note }}</td>
                <td class="p-2 text-right">{{ record.amount }}</td>

                <td class="p-2 text-center">{{ record.date }}</td>
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
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import SideBar from '@/admin/Sidebar/SideBar.vue';
import NavBar from '@/admin/TopBar/NavBar.vue';

library.add(faCaretUp, faCaretDown, faEye, faPenToSquare, faTrashCan);

export default {
  components: { NavBar, SideBar, FontAwesomeIcon },
  data() {
    return {
      entries: 25,
      searchQuery: '',
      startDate: '',
      endDate: '',
      records: Array.from({ length: 25 }, (_, index) => ({
        category: `Category ${index + 1}`,
        responsiblePerson: `Person ${index + 1}`,
        note: `Note for record ${index + 1}`,
        amount: ` ${(Math.random() * 5000 + 1500).toFixed(2)}PKR`,

        date: `01/01/202${index + 1} `,
      })),
      currentPage: 1,
      sortColumn: null,
      sortOrder: 'asc',
    };
  },
  computed: {
    filteredRecords() {
      let filteredData = this.records.filter(record => {
        const recordDate = new Date(record.date);
        const startDate = this.startDate ? new Date(this.startDate) : null;
        const endDate = this.endDate ? new Date(this.endDate) : null;

        const matchesSearchQuery =
          record.category.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          record.responsiblePerson.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          record.note.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          record.amount.includes(this.searchQuery);

        const matchesDateRange =
          (!startDate || recordDate >= startDate) &&
          (!endDate || recordDate <= endDate);

        return matchesSearchQuery && matchesDateRange;
      });

      if (this.sortColumn) {
        return filteredData.sort((a, b) => {
          let valueA = a[this.sortColumn];
          let valueB = b[this.sortColumn];

          if (this.sortColumn === 'amount') {
            valueA = parseFloat(valueA.replace('₨', '').replace(',', ''));
            valueB = parseFloat(valueB.replace('₨', '').replace(',', ''));
          }

          if (valueA < valueB) return this.sortOrder === 'asc' ? -1 : 1;
          if (valueA > valueB) return this.sortOrder === 'asc' ? 1 : -1;
          return 0;
        });
      }
      return filteredData;
    },
  },
  methods: {
    exportToPDF() {
      const doc = new jsPDF();
      const tableData = this.filteredRecords.map(record => [
        record.category,
        record.responsiblePerson,
        record.note,
        record.amount,
        record.addedBy,
        record.date,
      ]);

      const headers = ['Category', 'Responsible Person', 'Note', 'Amount', 'Added By', 'Date'];

      doc.autoTable({
        head: [headers],
        body: tableData,
        startY: 20,
      });

      doc.save('records.pdf');
    },

    editRecord(record) {
      console.log('Edit Record', record);
    },
    deleteRecord(record) {
      this.records = this.records.filter(r => r !== record);
      console.log('Deleted Record', record);
    },
    viewRecord(record) {
      console.log('View Record', record);
    },
    sortTable(column) {
      if (this.sortColumn === column) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortColumn = column;
        this.sortOrder = 'asc';
      }
    },
  },
};
</script>
