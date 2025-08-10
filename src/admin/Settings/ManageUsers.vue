<template>
  <div class="bg-gray-100 h-screen flex flex-col">
    <SideBar />
    <NavBar />
    <div class="flex-grow ml-60">
      <div class="card m-4 bg-white shadow rounded-lg">
        <div class="card-datatable p-4 table-responsive">
          <div class="md:flex block justify-between items-center mb-4">
            <h5 class="text-2xl text-blue-500 font-semibold">Users</h5>
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

          <!-- Search Input Section -->
          <div class="md:flex block justify-between items-center mb-4">
            <div class="mt-4 md:mt-0 flex items-center">
              <label for="search" class="mr-2">Search:</label>
              <input
                v-model="searchQuery"
                type="text"
                id="search"
                class="form-input border border-gray-300 rounded-lg p-2"
                placeholder="Search by Name, Designation or Email"
              />
            </div>
          </div>

          <!-- Table Display -->
          <div class="overflow-x-auto border-t-[3px] border-b-2 border-blue-500">
            <table class="table-auto w-full">
              <thead>
              <tr>
                <th class="p-2 text-left cursor-pointer">SN</th>
                <th class="p-2 text-left cursor-pointer" @click="sortTable('name')">
                  Name
                  <font-awesome-icon :icon="sortColumn === 'name' ? (sortDirection === 'asc' ? 'caret-up' : 'caret-down') : ''" class="text-blue-500" />
                </th>
                <th class="p-2 text-left cursor-pointer" @click="sortTable('designation')">
                  Designation
                  <font-awesome-icon :icon="sortColumn === 'designation' ? (sortDirection === 'asc' ? 'caret-up' : 'caret-down') : ''" class="text-blue-500" />
                </th>
                <th class="p-2 text-left cursor-pointer" @click="sortTable('company')">
                  Company
                  <font-awesome-icon :icon="sortColumn === 'company' ? (sortDirection === 'asc' ? 'caret-up' : 'caret-down') : ''" class="text-blue-500" />
                </th>
                <th class="p-2 text-left cursor-pointer" @click="sortTable('email')">
                  Email
                  <font-awesome-icon :icon="sortColumn === 'email' ? (sortDirection === 'asc' ? 'caret-up' : 'caret-down') : ''" class="text-blue-500" />
                </th>
                <th class="p-2 text-left cursor-pointer" @click="sortTable('status')">
                  Status
                  <font-awesome-icon :icon="sortColumn === 'status' ? (sortDirection === 'asc' ? 'caret-up' : 'caret-down') : ''" class="text-blue-500" />
                </th>
                <th class="p-2 text-center">Actions</th>
              </tr>
              </thead>

              <tbody>
              <tr v-for="(entry, index) in filteredAndSortedData" :key="index" class="border-t-2 border-gray-200">
                <td class="p-2">{{ index + 1 }}</td>
                <td class="p-2">{{ entry.name }}</td>
                <td class="p-2">{{ entry.designation }}</td>
                <td class="p-2">{{ entry.company }}</td>
                <td class="p-2">{{ entry.email }}</td>
                <td class="p-2">{{ entry.status }}</td>
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
      employees: ['John Doe', 'Jane Smith', 'Bob Johnson', 'Alice Williams', 'Tom Brown', 'Sarah Lee'],
      records: [
        { name: 'John Doe', designation: 'Manager', company: 'ACME Inc.', email: 'john.doe@example.com', status: 'Active' },
        { name: 'Jane Smith', designation: 'Developer', company: 'TechCorp', email: 'jane.smith@example.com', status: 'Inactive' },
        { name: 'Bob Johnson', designation: 'Designer', company: 'DesignWorks', email: 'bob.johnson@example.com', status: 'Active' },
        { name: 'Alice Williams', designation: 'HR', company: 'Humanify', email: 'alice.williams@example.com', status: 'Active' },
        { name: 'Tom Brown', designation: 'Developer', company: 'TechCorp', email: 'tom.brown@example.com', status: 'Inactive' },
        { name: 'Sarah Lee', designation: 'Manager', company: 'ACME Inc.', email: 'sarah.lee@example.com', status: 'Active' }
      ]
    };
  },
  computed: {
    filteredAndSortedData() {
      let filtered = this.records.filter(record => {
        const searchTerm = this.searchQuery.toLowerCase();

        const matchesSearch =
          record.name.toLowerCase().includes(searchTerm) ||
          record.designation.toLowerCase().includes(searchTerm) ||
          record.company.toLowerCase().includes(searchTerm) ||
          record.email.toLowerCase().includes(searchTerm);

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
      doc.text('Employee List Report', 20, 20);
      doc.setFontSize(12);

      const headers = ['SN', 'Name', 'Designation', 'Company', 'Email', 'Status'];
      const rows = this.filteredAndSortedData.map((record, index) => [
        index + 1,
        record.name,
        record.designation,
        record.company,
        record.email,
        record.status
      ]);

      doc.autoTable({
        head: [headers],
        body: rows,
        startY: 30,
      });

      doc.save('employee_list_report.pdf');
    }
  }
};
</script>
