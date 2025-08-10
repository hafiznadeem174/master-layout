<template>
  <div class="bg-gray-100 h-screen flex flex-col">
    <SideBar />
    <NavBar />
    <div class="flex-grow ml-60">
      <div class="card m-4 bg-white shadow rounded-lg">
        <div class="card-datatable p-4 table-responsive">
          <div class="md:flex block justify-between items-center mb-4">
            <h5 class="text-2xl text-blue-500 font-semibold">Employee Attendance</h5>
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
                placeholder="Search by Employee, Date, or Reference No."
              />
            </div>
          </div>
          <div class="overflow-x-auto border-t-[3px] border-b-2 border-blue-500">
            <table class="table-auto w-full">
              <thead>
              <tr>
                <th class="p-2 text-left" @click="sortTable('SN')">
                  SN
                  <font-awesome-icon v-if="sortColumn === 'SN'" :icon="sortDirection === 'asc' ? 'caret-up' : 'caret-down'"   class="text-blue-500"/>
                </th>
                <th class="p-2 text-left" @click="sortTable('referenceNo')">
                  Reference No.
                  <font-awesome-icon v-if="sortColumn === 'referenceNo'" :icon="sortDirection === 'asc' ? 'caret-up' : 'caret-down'"    class="text-blue-500"/>
                </th>
                <th class="p-2 text-left" @click="sortTable('employee')">
                  Employee
                  <font-awesome-icon v-if="sortColumn === 'employee'" :icon="sortDirection === 'asc' ? 'caret-up' : 'caret-down'"  class="text-blue-500" />
                </th>
                <th class="p-2 text-left" @click="sortTable('inTime')">
                  In Time
                  <font-awesome-icon v-if="sortColumn === 'inTime'" :icon="sortDirection === 'asc' ? 'caret-up' : 'caret-down'" class="text-blue-500" />
                </th>
                <th class="p-2 text-left" @click="sortTable('outTime')">
                  Out Time
                  <font-awesome-icon v-if="sortColumn === 'outTime'" :icon="sortDirection === 'asc' ? 'caret-up' : 'caret-down'"  class="text-blue-500"/>
                </th>
                <th class="p-2 text-left" @click="sortTable('timeCount')">
                  Time Count
                  <font-awesome-icon v-if="sortColumn === 'timeCount'" :icon="sortDirection === 'asc' ? 'caret-up' : 'caret-down'"  class="text-blue-500" />
                </th>
                <th class="p-2 text-left" @click="sortTable('date')">
                  Date
                  <font-awesome-icon v-if="sortColumn === 'date'" :icon="sortDirection === 'asc' ? 'caret-up' : 'caret-down'" class="text-blue-500" />
                </th>
                <th class="p-2 text-left" @click="sortTable('addedBy')">
                  Added By
                  <font-awesome-icon v-if="sortColumn === 'addedBy'" :icon="sortDirection === 'asc' ? 'caret-up' : 'caret-down'" class="text-blue-500" />
                </th>
                <th class="p-2 text-center">Actions</th>
              </tr>
              </thead>

              <tbody>
              <tr v-for="(record, index) in filteredAndSortedRecords" :key="index" class="border-t-2 border-gray-200">
                <td class="p-2">{{ index + 1 }}</td>
                <td class="p-2">{{ record.referenceNo }}</td>
                <td class="p-2">{{ record.employee }}</td>
                <td class="p-2">{{ record.inTime }}</td>
                <td class="p-2">{{ record.outTime }}</td>
                <td class="p-2">{{ record.timeCount }}</td>
                <td class="p-2">{{ record.date }}</td>
                <td class="p-2">{{ record.addedBy }}</td>
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
import { faEye, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import jsPDF from 'jspdf'; // Import jsPDF

import SideBar from '@/admin/Sidebar/SideBar.vue';
import NavBar from '@/admin/TopBar/NavBar.vue';

library.add(faEye, faPenToSquare, faTrashCan);

export default {
  components: { NavBar, SideBar, FontAwesomeIcon },
  data() {
    return {
      searchQuery: '', // The search query for filtering records
      startDate: '',
      endDate: '',
      sortColumn: '',
      sortDirection: 'asc',
      records: [
        { referenceNo: "R-001", employee: "John Doe", inTime: "08:00 AM", outTime: "05:00 PM", timeCount: "9 hours", date: "2025-01-01", addedBy: "Admin" },
        { referenceNo: "R-002", employee: "Jane Smith", inTime: "09:00 AM", outTime: "06:00 PM", timeCount: "9 hours", date: "2025-01-02", addedBy: "Admin" },
        { referenceNo: "R-003", employee: "Alice Brown", inTime: "08:30 AM", outTime: "05:30 PM", timeCount: "9 hours", date: "2025-01-03", addedBy: "Admin" },
        { referenceNo: "R-004", employee: "Bob White", inTime: "09:00 AM", outTime: "06:00 PM", timeCount: "9 hours", date: "2025-01-04", addedBy: "Admin" },
        { referenceNo: "R-005", employee: "Charlie Green", inTime: "08:00 AM", outTime: "04:00 PM", timeCount: "8 hours", date: "2025-01-05", addedBy: "Admin" },
        { referenceNo: "R-006", employee: "David Lee", inTime: "09:30 AM", outTime: "06:30 PM", timeCount: "9 hours", date: "2025-01-06", addedBy: "Admin" },
        { referenceNo: "R-007", employee: "Eva Black", inTime: "08:15 AM", outTime: "05:15 PM", timeCount: "9 hours", date: "2025-01-07", addedBy: "Admin" },
        { referenceNo: "R-008", employee: "Frank Harris", inTime: "09:00 AM", outTime: "05:30 PM", timeCount: "8.5 hours", date: "2025-01-08", addedBy: "Admin" },
        { referenceNo: "R-009", employee: "Grace Miller", inTime: "08:45 AM", outTime: "05:45 PM", timeCount: "9 hours", date: "2025-01-09", addedBy: "Admin" },
        { referenceNo: "R-010", employee: "Hank Lee", inTime: "08:00 AM", outTime: "04:30 PM", timeCount: "8.5 hours", date: "2025-01-10", addedBy: "Admin" },
        { referenceNo: "R-011", employee: "Ivy Young", inTime: "09:00 AM", outTime: "06:00 PM", timeCount: "9 hours", date: "2025-01-11", addedBy: "Admin" },
        { referenceNo: "R-012", employee: "Jack King", inTime: "08:30 AM", outTime: "05:30 PM", timeCount: "9 hours", date: "2025-01-12", addedBy: "Admin" },
        { referenceNo: "R-013", employee: "Lily Adams", inTime: "09:00 AM", outTime: "05:00 PM", timeCount: "8 hours", date: "2025-01-13", addedBy: "Admin" },
        { referenceNo: "R-014", employee: "Mike Scott", inTime: "08:00 AM", outTime: "04:30 PM", timeCount: "8.5 hours", date: "2025-01-14", addedBy: "Admin" },
        { referenceNo: "R-015", employee: "Nina Patel", inTime: "09:15 AM", outTime: "06:00 PM", timeCount: "8.75 hours", date: "2025-01-15", addedBy: "Admin" },
        { referenceNo: "R-016", employee: "Oscar Watson", inTime: "08:45 AM", outTime: "05:45 PM", timeCount: "9 hours", date: "2025-01-16", addedBy: "Admin" },
        { referenceNo: "R-017", employee: "Paul Walker", inTime: "09:00 AM", outTime: "06:00 PM", timeCount: "9 hours", date: "2025-01-17", addedBy: "Admin" },
        { referenceNo: "R-018", employee: "Quincy Adams", inTime: "08:30 AM", outTime: "05:30 PM", timeCount: "9 hours", date: "2025-01-18", addedBy: "Admin" },
        { referenceNo: "R-019", employee: "Rachel Green", inTime: "08:00 AM", outTime: "04:00 PM", timeCount: "8 hours", date: "2025-01-19", addedBy: "Admin" },
        { referenceNo: "R-020", employee: "Steve Harris", inTime: "09:00 AM", outTime: "06:00 PM", timeCount: "9 hours", date: "2025-01-20", addedBy: "Admin" },
        { referenceNo: "R-021", employee: "Tommy Woods", inTime: "08:15 AM", outTime: "05:15 PM", timeCount: "9 hours", date: "2025-01-21", addedBy: "Admin" },
        { referenceNo: "R-022", employee: "Ursula Phelps", inTime: "09:30 AM", outTime: "06:30 PM", timeCount: "9 hours", date: "2025-01-22", addedBy: "Admin" },
        { referenceNo: "R-023", employee: "Victor Garcia", inTime: "08:00 AM", outTime: "04:00 PM", timeCount: "8 hours", date: "2025-01-23", addedBy: "Admin" },
        { referenceNo: "R-024", employee: "Wendy Phillips", inTime: "08:45 AM", outTime: "05:45 PM", timeCount: "9 hours", date: "2025-01-24", addedBy: "Admin" },
        { referenceNo: "R-025", employee: "Xander Jones", inTime: "09:00 AM", outTime: "06:00 PM", timeCount: "9 hours", date: "2025-01-25", addedBy: "Admin" },
        { referenceNo: "R-026", employee: "Yvonne Clark", inTime: "08:30 AM", outTime: "05:30 PM", timeCount: "9 hours", date: "2025-01-26", addedBy: "Admin" },
        { referenceNo: "R-027", employee: "Zane Morgan", inTime: "08:00 AM", outTime: "04:30 PM", timeCount: "8.5 hours", date: "2025-01-27", addedBy: "Admin" },
        { referenceNo: "R-028", employee: "Alicia Lopez", inTime: "09:00 AM", outTime: "06:00 PM", timeCount: "9 hours", date: "2025-01-28", addedBy: "Admin" }
      ],
    };
  },
  computed: {
    filteredAndSortedRecords() {
      let filtered = this.records.filter(record => {
        const searchTerm = this.searchQuery.toLowerCase();
        const searchByDateRange = (
          (this.startDate === '' || new Date(record.date) >= new Date(this.startDate)) &&
          (this.endDate === '' || new Date(record.date) <= new Date(this.endDate))
        );
        return (
          searchByDateRange &&
          (record.employee.toLowerCase().includes(searchTerm) ||
            record.referenceNo.toLowerCase().includes(searchTerm) ||
            record.date.includes(searchTerm)
          )
        );
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
      doc.text('Employee Attendance', 20, 20);
      doc.setFontSize(12);
      const headers = ['SN', 'Reference No.', 'Employee', 'In Time', 'Out Time', 'Time Count', 'Date', 'Added By'];
      const rows = this.filteredAndSortedRecords.map((record, index) => [
        index + 1,
        record.referenceNo,
        record.employee,
        record.inTime,
        record.outTime,
        record.timeCount,
        record.date,
        record.addedBy
      ]);

      doc.autoTable({
        head: [headers],
        body: rows,
        startY: 30, // Starts the table below the title
      });

      doc.save('employee_attendance.pdf');
    },
    sortTable(column) {
      if (this.sortColumn === column) {
        this.sortDirection = (this.sortDirection === 'asc') ? 'desc' : 'asc';
      } else {
        this.sortColumn = column;
        this.sortDirection = 'asc';
      }
    }

  }
};
</script>
