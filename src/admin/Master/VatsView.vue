<template>
  <div class="bg-gray-100 h-screen flex flex-col">
    <SideBar />
    <NavBar />
    <div class="flex-grow ml-60">
      <div class="card m-4 bg-white shadow rounded-lg">
        <div class="card-datatable p-4 table-responsive">
          <div class="md:flex block justify-between items-center mb-4">
            <h5 class="text-2xl text-blue-500 font-semibold">Taxes List</h5>
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
                placeholder="Search by Name or Added By"
              />
            </div>
          </div>
          <div class="overflow-x-auto border-t-[3px] border-b-2 border-blue-500">
            <table class="table-auto w-full">
              <thead>
              <tr>
                <th class="p-2 text-left" @click="sortTable('SN')">
                  SN
                  <font-awesome-icon v-if="sortColumn === 'SN'" :icon="sortDirection === 'asc' ? 'caret-up' : 'caret-down'" class="text-blue-500"/>
                </th>
                <th class="p-2 text-left" @click="sortTable('name')">
                  Name
                  <font-awesome-icon v-if="sortColumn === 'name'" :icon="sortDirection === 'asc' ? 'caret-up' : 'caret-down'" class="text-blue-500"/>
                </th>
                <th class="p-2 text-left" @click="sortTable('percentage')">
                  Percentage
                  <font-awesome-icon v-if="sortColumn === 'percentage'" :icon="sortDirection === 'asc' ? 'caret-up' : 'caret-down'" class="text-blue-500"/>
                </th>
                <th class="p-2 text-left" @click="sortTable('addedBy')">
                  Added By
                  <font-awesome-icon v-if="sortColumn === 'addedBy'" :icon="sortDirection === 'asc' ? 'caret-up' : 'caret-down'" class="text-blue-500"/>
                </th>
                <th class="p-2 text-center" @click="sortTable('createdAt')">
                  Date
                  <font-awesome-icon v-if="sortColumn === 'createdAt'" :icon="sortDirection === 'asc' ? 'caret-up' : 'caret-down'" class="text-blue-500"/>
                </th>
                <th class="p-2 text-center">Actions</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(tax, index) in filteredAndSortedTaxes" :key="index" class="border-t-2 border-gray-200">
                <td class="p-2">{{ index + 1 }}</td>
                <td class="p-2">{{ tax.name }}</td>
                <td class="p-2">{{ tax.percentage }}%</td>
                <td class="p-2">{{ tax.addedBy }}</td>
                <td class="p-2 text-center">{{ tax.createdAt }}</td>
                <td class="flex p-2 justify-center gap-1">
                  <button @click="viewTax(tax)" class="text-blue-500 hover:text-blue-700">
                    <font-awesome-icon icon="eye" />
                  </button>
                  <button @click="editTax(tax)" class="text-green-500 hover:text-green-700">
                    <font-awesome-icon icon="pen-to-square" />
                  </button>
                  <button @click="deleteTax(tax)" class="text-red-500 hover:text-red-700">
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
      searchQuery: '',
      startDate: '',
      endDate: '',
      sortColumn: '',
      sortDirection: 'asc',
      taxes: [
        { name: "VAT", percentage: 15, addedBy: "Admin", createdAt: "2025-01-01" },
        { name: "Sales Tax", percentage: 18, addedBy: "Admin", createdAt: "2025-01-02" },
        { name: "Service Tax", percentage: 10, addedBy: "Admin", createdAt: "2025-01-03" },
        { name: "Excise Duty", percentage: 12, addedBy: "Admin", createdAt: "2025-01-04" },
        { name: "Income Tax", percentage: 20, addedBy: "Admin", createdAt: "2025-01-05" },
        { name: "Corporate Tax", percentage: 30, addedBy: "Admin", createdAt: "2025-01-06" },
        { name: "Withholding Tax", percentage: 5, addedBy: "Admin", createdAt: "2025-01-07" },
        { name: "Custom Duty", percentage: 8, addedBy: "Admin", createdAt: "2025-01-08" },
        { name: "Import Tax", percentage: 14, addedBy: "Admin", createdAt: "2025-01-09" },
        { name: "Property Tax", percentage: 6, addedBy: "Admin", createdAt: "2025-01-10" },
      ]
    };
  },
  computed: {
    filteredAndSortedTaxes() {
      let filtered = this.taxes.filter(tax => {
        const searchTerm = this.searchQuery.toLowerCase();
        const searchByDateRange = (
          (this.startDate === '' || new Date(tax.createdAt) >= new Date(this.startDate)) &&
          (this.endDate === '' || new Date(tax.createdAt) <= new Date(this.endDate))
        );
        return (
          searchByDateRange &&
          (tax.name.toLowerCase().includes(searchTerm) ||
            tax.addedBy.toLowerCase().includes(searchTerm)
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
    viewTax(tax) {
      console.log('View Tax', tax);
    },
    editTax(tax) {
      console.log('Edit Tax', tax);
    },
    deleteTax(tax) {
      this.taxes = this.taxes.filter(t => t !== tax);
      console.log('Deleted Tax', tax);
    },
    exportToPDF() {
      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text('Taxes List', 20, 20);
      doc.setFontSize(12);
      const headers = ['SN', 'Name', 'Percentage', 'Added By', 'Date'];
      const rows = this.filteredAndSortedTaxes.map((tax, index) => [
        index + 1,
        tax.name,
        `${tax.percentage}%`,
        tax.addedBy,
        tax.createdAt
      ]);

      doc.autoTable({
        head: [headers],
        body: rows,
        startY: 30, // Starts the table below the title
      });

      doc.save('taxes_list.pdf');
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
