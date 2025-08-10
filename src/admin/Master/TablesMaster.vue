<template>
  <div class="bg-gray-100 h-screen flex flex-col">
    <SideBar />
    <NavBar />
    <div class="flex-grow ml-60">
      <div class="card m-4 bg-white shadow rounded-lg">
        <div class="card-datatable p-4 table-responsive">
          <div class="md:flex block justify-between items-center mb-4">
            <h5 class="text-2xl text-blue-500 font-semibold">Tables</h5>
            <div class="flex justify-between gap-3">
              <button
                class="btn bg-blue-100 text-blue-400 hover:bg-blue-400 hover:text-white px-4 py-2 rounded"
                @click="exportToPDF">
                <span class="pt-2.5 mr-1"><font-awesome-icon icon="file-arrow-down" /></span>
                Export
              </button>
            </div>
          </div>

          <!-- Search Box -->
          <div class="md:flex block justify-between items-center mb-4">
            <div class="flex items-center w-full space-x-4">
              <label for="search" class="mr-2">Search:</label>
              <input
                v-model="searchQuery"
                type="text"
                id="search"
                class="form-input border border-gray-300 rounded-lg p-2"
                placeholder="Search by Table Name, Position, or Added By"
              />
            </div>
          </div>

          <!-- Table Display -->
          <div class="overflow-x-auto border-t-[3px] border-b-2 border-blue-500">
            <table class="table-auto w-full">
              <thead>
              <tr>
                <th class="p-2 text-left">SN</th>
                <th class="p-2 text-left" @click="sortTable('tableName')">
                  Table Name
                  <font-awesome-icon :icon="sortColumn === 'tableName' ? (sortDirection === 'asc' ? 'caret-up' : 'caret-down') : ''" class="text-blue-500" />
                </th>

                <th class="p-2 text-left">Position</th>
                <th class="p-2 text-left">Description</th>
                <th class="p-2 text-center">Seat Capacity</th>
                <th class="p-2 text-left">Added By</th>
                <th class="p-2 text-center">Actions</th>
              </tr>
              </thead>

              <tbody>
              <tr v-for="(table, index) in filteredAndSortedTables" :key="index" class="border-t-2 border-gray-200">
                <td class="p-2">{{ index + 1 }}</td>
                <td class="p-2">{{ table.tableName }}</td>
                <td class="p-2">{{ table.position }}</td>
                <td class="p-2">{{ table.description }}</td>
                <td class="p-2 text-center">{{ table.seatCapacity }}</td>
                <td class="p-2">{{ table.addedBy }}</td>
                <td class="flex p-2 justify-center gap-1">
                  <button @click="viewTable(table)" class="text-blue-500 hover:text-blue-700">
                    <font-awesome-icon icon="eye" />
                  </button>
                  <button @click="editTable(table)" class="text-green-500 hover:text-green-700">
                    <font-awesome-icon icon="pen-to-square" />
                  </button>
                  <button @click="deleteTable(table)" class="text-red-500 hover:text-red-700">
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
      sortColumn: '',
      sortDirection: 'asc',
      tables: [
        { tableName: "Table 1", seatCapacity: 4, position: "Front", description: "Near window", addedBy: "Admin" },
        { tableName: "Table 2", seatCapacity: 2, position: "Back", description: "Near kitchen", addedBy: "Admin" },
        { tableName: "Table 3", seatCapacity: 6, position: "Middle", description: "VIP section", addedBy: "Admin" },
        { tableName: "Table 4", seatCapacity: 4, position: "Front", description: "Near door", addedBy: "Admin" },
        { tableName: "Table 5", seatCapacity: 8, position: "Side", description: "Near bar", addedBy: "Admin" },
        { tableName: "Table 6", seatCapacity: 10, position: "Front", description: "Corner", addedBy: "Admin" },
        { tableName: "Table 7", seatCapacity: 2, position: "Middle", description: "By the window", addedBy: "Admin" },
        { tableName: "Table 8", seatCapacity: 4, position: "Back", description: "Quiet area", addedBy: "Admin" },
        { tableName: "Table 9", seatCapacity: 6, position: "Side", description: "Near stage", addedBy: "Admin" },
        { tableName: "Table 10", seatCapacity: 4, position: "Middle", description: "By the entrance", addedBy: "Admin" },
        { tableName: "Table 11", seatCapacity: 6, position: "Back", description: "Near bar", addedBy: "Admin" },
        { tableName: "Table 12", seatCapacity: 8, position: "Side", description: "Near window", addedBy: "Admin" },
        { tableName: "Table 13", seatCapacity: 10, position: "Front", description: "Near lounge", addedBy: "Admin" },
        { tableName: "Table 14", seatCapacity: 2, position: "Middle", description: "Near window", addedBy: "Admin" },
        { tableName: "Table 15", seatCapacity: 4, position: "Side", description: "Near entrance", addedBy: "Admin" },
        { tableName: "Table 16", seatCapacity: 6, position: "Back", description: "Quiet area", addedBy: "Admin" },
        { tableName: "Table 17", seatCapacity: 8, position: "Front", description: "Near stage", addedBy: "Admin" },
        { tableName: "Table 18", seatCapacity: 10, position: "Side", description: "Near kitchen", addedBy: "Admin" },
        { tableName: "Table 19", seatCapacity: 2, position: "Back", description: "Near exit", addedBy: "Admin" },
        { tableName: "Table 20", seatCapacity: 4, position: "Middle", description: "Near bar", addedBy: "Admin" },
        { tableName: "Table 21", seatCapacity: 6, position: "Front", description: "Near door", addedBy: "Admin" },
        { tableName: "Table 22", seatCapacity: 8, position: "Side", description: "Near lounge", addedBy: "Admin" },
        { tableName: "Table 23", seatCapacity: 4, position: "Back", description: "Near window", addedBy: "Admin" },
        { tableName: "Table 24", seatCapacity: 10, position: "Middle", description: "By the stage", addedBy: "Admin" }
      ]
    };
  },
  computed: {
    filteredAndSortedTables() {
      let filtered = this.tables.filter(table => {
        const searchTerm = this.searchQuery.toLowerCase();

        // Filter based on search query (Table Name, Position, or Added By)
        const matchesSearch =
          table.tableName.toLowerCase().includes(searchTerm) ||
          table.position.toLowerCase().includes(searchTerm) ||
          table.addedBy.toLowerCase().includes(searchTerm);

        return matchesSearch;
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
    viewTable(table) {
      console.log('View Table', table);
    },
    editTable(table) {
      console.log('Edit Table', table);
    },
    deleteTable(table) {
      this.tables = this.tables.filter(t => t !== table);
      console.log('Deleted Table', table);
    },
    exportToPDF() {
      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text('Table List', 20, 20);
      doc.setFontSize(12);
      const headers = ['SN', 'Table Name', 'Seat Capacity', 'Position', 'Description', 'Added By'];
      const rows = this.filteredAndSortedTables.map((table, index) => [
        index + 1,
        table.tableName,
        table.seatCapacity,
        table.position,
        table.description,
        table.addedBy
      ]);

      doc.autoTable({
        head: [headers],
        body: rows,
        startY: 30,
      });

      doc.save('table_list.pdf');
    },
  }
};
</script>
