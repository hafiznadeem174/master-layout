<template>
  <div class="bg-gray-100 h-screen flex flex-col">
    <!-- Sidebar and Navbar components will be rendered here -->
    <SideBar />
    <NavBar />

    <div class="flex-grow ml-60">
      <div class="card m-4 bg-white shadow rounded-lg">
        <div class="card-datatable p-4 table-responsive">
          <div class="md:flex block justify-between items-center mb-4">
            <h5 class="text-2xl text-blue-500  font-semibold">DataTable with Buttons</h5>
            <div class="flex justify-between gap-3">

              <button
                class="btn bg-blue-100 text-blue-400 hover:bg-blue-400
                hover:text-white px-4 py-2  rounded"
                @click="exportToPDF">
                <span class="pt-2.5 mr-1"><font-awesome-icon icon="file-arrow-down" /></span>
                Export

              </button>
              <button
                class="btn bg-blue-500 text-white hover:opacity-70 px-4 py-2 rounded"
                @click="addNewRecord">
                <font-awesome-icon icon="plus" /> Add New Record
              </button>
            </div>
          </div>

          <div class="md:flex block justify-between items-center mb-4">
            <!-- Date Range Picker Section -->
            <div class="flex items-center w-full space-x-4">
              <!-- Date Range Picker -->
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
                placeholder="Search by Name or Email"
              />
            </div>
          </div>

          <div class="overflow-x-auto border-t-[3px] border-b-2 border-blue-500">
            <table class="table-auto w-full">
              <thead>
              <tr>
                <th class="p-2 text-left cursor-pointer">
                  SN
                </th>

                <!-- Update the Reference No column -->
                <th class="p-2 text-left cursor-pointer" @click="sortTable('referenceNo')">
                  Reference No.
                  <span v-if="sortColumn === 'referenceNo'">
                    <font-awesome-icon :icon="sortOrder === 'asc' ? 'caret-up' : 'caret-down'" class="text-blue-500" />
                  </span>
                </th>
                <th class="p-2 text-left">Image</th>
                <th class="p-2 text-left cursor-pointer" @click="sortTable('name')">
                  Name
                  <span v-if="sortColumn === 'name'">
                    <font-awesome-icon :icon="sortOrder === 'asc' ? 'caret-up' : 'caret-down'" class="text-blue-500" />
                  </span>
                </th>
                <th class="p-2 text-left cursor-pointer" @click="sortTable('email')">
                  Email
                  <span v-if="sortColumn === 'email'">
                    <font-awesome-icon :icon="sortOrder === 'asc' ? 'caret-up' : 'caret-down'" class="text-blue-500" />
                  </span>
                </th>
                <th class="p-2 text-left cursor-pointer" @click="sortTable('date')">
                  Date
                  <span v-if="sortColumn === 'date'">
                    <font-awesome-icon :icon="sortOrder === 'asc' ? 'caret-up' : 'caret-down'" class="text-blue-500" />
                  </span>
                </th>
                <th class="p-2 text-left cursor-pointer" @click="sortTable('salary')">
                  Salary
                  <span v-if="sortColumn === 'salary'">
                    <font-awesome-icon :icon="sortOrder === 'asc' ? 'caret-up' : 'caret-down'" class="text-blue-500" />
                  </span>
                </th>
                <th class="p-2 text-center cursor-pointer" @click="sortTable('status')">
                  Status
                  <span v-if="sortColumn === 'status'">
                    <font-awesome-icon :icon="sortOrder === 'asc' ? 'caret-up' : 'caret-down'" class="text-blue-500" />
                  </span>
                </th>
                <th class="p-2 text-center">Actions</th>
              </tr>
              </thead>
              <tbody class="overflow-y-auto">
              <tr v-for="(record, index) in filteredRecords" :key="index" class="border-t-2 border-gray-200">
                <td class="p-2">{{ index + 1 }}</td>
                <td class="p-2">{{ record.referenceNo }}</td>
                <td class="p-2">
                  <img :src="record.image" alt="Record Image" class="w-10 h-10 object-cover rounded-full" />
                </td>
                <td class="p-2">{{ record.name }}</td>
                <td class="p-2">{{ record.email }}</td>
                <td class="p-2">{{ record.date }}</td>
                <td class="p-2">{{ record.salary }}</td>
                <td class="p-2 text-center">
                    <span :class="{
                      'bg-green-100 text-green-900': record.status === 'Professional',
                      'bg-yellow-100 text-yellow-900': record.status === 'Resigned',
                      'bg-blue-100 text-blue-900': record.status === 'Current',
                    }" class="px-2 py-1">
                      {{ record.status }}
                    </span>
                </td>
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

          <div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCaretUp, faCaretDown, faEye, faPenToSquare, faTrashCan, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import jsPDF from 'jspdf';  // Import jsPDF
import autoTable from 'jspdf-autotable';  // Import jsPDF autoTable

import SideBar from '@/admin/Sidebar/SideBar.vue';
import NavBar from '@/admin/TopBar/NavBar.vue';

// Add icons to the library
library.add(faCaretUp, faCaretDown, faEye, faPenToSquare, faTrashCan, faAngleDown);

export default {
  components: { NavBar, SideBar, FontAwesomeIcon },
  data() {
    return {
      entries: 7, // Records per page
      searchQuery: '',
      startDate: '',  // Add startDate for filtering
      endDate: '',    // Add endDate for filtering
      records: Array.from({ length: 24 }, (_, index) => ({
        referenceNo: `REF-${index + 1}`,
        image: `https://randomuser.me/api/portraits/men/${index + 10}.jpg`, // Random user images
        name: `Name ${index + 1}`,
        email: `email${index + 1}@example.com`,
        date: `01/01/202${index + 1}`,
        salary: `$${(Math.random() * 50000 + 15000).toFixed(2)}`,
        status: index % 3 === 0 ? 'Professional' : index % 3 === 1 ? 'Resigned' : 'Current',
      })),
      currentPage: 1,
      sortColumn: null,
      sortOrder: 'asc',
    };
  },
  computed: {
    filteredRecords() {
      let filteredData = this.records
        .filter(record => {
          const recordDate = new Date(record.date);
          const startDate = this.startDate ? new Date(this.startDate) : null;
          const endDate = this.endDate ? new Date(this.endDate) : null;

          // Filter based on search query (name or email)
          const matchesSearchQuery =
            record.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            record.email.toLowerCase().includes(this.searchQuery.toLowerCase());

          // Filter by date range
          const matchesDateRange =
            (!startDate || recordDate >= startDate) &&
            (!endDate || recordDate <= endDate);

          return matchesSearchQuery && matchesDateRange;
        })
        .slice(this.pageStart - 1, this.pageEnd);

      // Sorting logic (same as before)
      if (this.sortColumn) {
        return filteredData.sort((a, b) => {
          let valueA = a[this.sortColumn];
          let valueB = b[this.sortColumn];

          // Sorting by salary as a numeric value
          if (this.sortColumn === 'salary') {
            valueA = parseFloat(valueA.replace('$', '').replace(',', ''));
            valueB = parseFloat(valueB.replace('$', '').replace(',', ''));
          }

          // Handle sorting for referenceNo (extract numeric part from "REF-1")
          if (this.sortColumn === 'referenceNo') {
            valueA = parseInt(a[this.sortColumn].replace('REF-', ''), 10);
            valueB = parseInt(b[this.sortColumn].replace('REF-', ''), 10);
          }

          // Sorting by SN (index of record)
          if (this.sortColumn === 'sn') {
            valueA = a.referenceNo; // We're using referenceNo to determine the SN
            valueB = b.referenceNo;
          }

          // Handle sorting for name (extract numeric part)
          if (this.sortColumn === 'name') {
            valueA = parseInt(a[this.sortColumn].split(' ')[1], 10); // Extract number from "Name X"
            valueB = parseInt(b[this.sortColumn].split(' ')[1], 10); // Extract number from "Name X"
          }

          // Handle sorting for email (extract numeric part before '@')
          if (this.sortColumn === 'email') {
            valueA = parseInt(a[this.sortColumn].match(/\d+/g)?.[0], 10) || 0;
            valueB = parseInt(b[this.sortColumn].match(/\d+/g)?.[0], 10) || 0;
          }

          if (valueA < valueB) return this.sortOrder === 'asc' ? -1 : 1;
          if (valueA > valueB) return this.sortOrder === 'asc' ? 1 : -1;
          return 0;
        });
      }
      return filteredData;
    }
  },
  methods: {
    exportToPDF() {
      const doc = new jsPDF();
      const tableData = this.filteredRecords.map(record => [
        record.referenceNo,
        record.name,
        record.email,
        record.date,
        record.salary,
        record.status
      ]);

      const headers = ['Reference No.', 'Name', 'Email', 'Date', 'Salary', 'Status'];

      doc.autoTable({
        head: [headers],
        body: tableData,
        startY: 20,
      });

      doc.save('records.pdf');
    },

    addNewRecord() {
      console.log('Add New Record');
    },
    editRecord(record) {
      console.log('Edit Record', record);
    },
    deleteRecord(record) {
      this.records = this.records.filter(r => r !== record);
      console.log('Deleted Record', record);
    },
    changePage(page) {
      if (page === 'previous' && this.currentPage > 1) {
        this.currentPage--;
      } else if (page === 'next' && this.currentPage < this.totalPages) {
        this.currentPage++;
      } else if (typeof page === 'number') {
        this.currentPage = page;
      }
    },
    viewRecord(record) {
      console.log('View Record', record);
    },
    sortTable(column) {
      if (this.sortColumn === column) {
        // Toggle the sort order if the same column is clicked
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        // Set the clicked column as the sort column and default to ascending
        this.sortColumn = column;
        this.sortOrder = 'asc';
      }
    },
  },
};
</script>
