<template>
  <div class="bg-gray-100 h-screen flex flex-col">
    <SideBar />
    <NavBar />
    <div class="flex-grow ml-60">
      <div class="card m-4 bg-white shadow rounded-lg">
        <div class="card-datatable p-4 table-responsive">
          <div class="md:flex block justify-between items-center mb-4">
            <h5 class="text-2xl text-blue-500 font-semibold">Expense Items</h5>
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
                placeholder="Search by Expense Item Name or Description"
              />
            </div>
          </div>

          <!-- Table Display -->
          <div class="overflow-x-auto border-t-[3px] border-b-2 border-blue-500">
            <table class="table-auto w-full">
              <thead>
              <tr>
                <th class="p-2 text-left cursor-pointer">
                  SN
                </th>
                <th class="p-2 text-left cursor-pointer" @click="sortTable('name')">
                  Expense Item Name
                  <font-awesome-icon :icon="sortColumn === 'name' ? (sortDirection === 'asc' ? 'caret-up' : 'caret-down') : ''" class="text-blue-500" />
                </th>
                <th class="p-2 text-left cursor-pointer" @click="sortTable('description')">
                  Description
                  <font-awesome-icon :icon="sortColumn === 'description' ? (sortDirection === 'asc' ? 'caret-up' : 'caret-down') : ''" class="text-blue-500" />
                </th>
                <th class="p-2 text-left cursor-pointer">
                  Added By (JAFFA'Z)
                </th>
                <th class="p-2 text-center cursor-pointer" @click="sortTable('date')">
                  Date
                  <font-awesome-icon :icon="sortColumn === 'date' ? (sortDirection === 'asc' ? 'caret-up' : 'caret-down') : ''" class="text-blue-500" />
                </th>
                <th class="p-2 text-center">Actions</th>
              </tr>
              </thead>

              <tbody>
              <tr v-for="(item, index) in filteredAndSortedItems" :key="index" class="border-t-2 border-gray-200">
                <td class="p-2">{{ index + 1 }}</td>
                <td class="p-2">{{ item.name }}</td>
                <td class="p-2">{{ item.description }}</td>
                <td class="p-2">JAFFA'Z</td>
                <td class="p-2 text-center">{{ new Date(item.date).toLocaleDateString() }}</td>
                <td class="flex p-2 justify-center gap-1">
                  <button @click="viewItem(item)" class="text-blue-500 hover:text-blue-700">
                    <font-awesome-icon icon="eye" />
                  </button>
                  <button @click="editItem(item)" class="text-green-500 hover:text-green-700">
                    <font-awesome-icon icon="pen-to-square" />
                  </button>
                  <button @click="deleteItem(item)" class="text-red-500 hover:text-red-700">
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
      items: [
        { name: "Burger", description: "Cheeseburger", date: "2025-01-01" },
        { name: "Fries", description: "Medium Fries", date: "2025-01-02" },
        { name: "Chicken Sandwich", description: "Grilled Chicken Sandwich", date: "2025-01-03" },
        { name: "Veggie Burger", description: "Veggie Burger", date: "2025-01-04" },
        { name: "Milkshake", description: "Chocolate Milkshake", date: "2025-01-05" },
        { name: "Nuggets", description: "Chicken Nuggets", date: "2025-01-06" },
        { name: "Pizza", description: "Pepperoni Pizza", date: "2025-01-07" },
        { name: "Taco", description: "Soft Taco", date: "2025-01-08" },
        { name: "Sandwich", description: "BLT Sandwich", date: "2025-01-09" },
        { name: "Wrap", description: "Chicken Wrap", date: "2025-01-10" },
        { name: "Soda", description: "Cola Soda", date: "2025-01-11" },
        { name: "Donut", description: "Glazed Donut", date: "2025-01-12" },
        { name: "Hotdog", description: "Classic Hotdog", date: "2025-01-13" },
        { name: "Waffle", description: "Belgian Waffle", date: "2025-01-14" }
      ]
    };
  },
  computed: {
    filteredAndSortedItems() {
      let filtered = this.items.filter(item => {
        const searchTerm = this.searchQuery.toLowerCase();

        // Filter based on search query (Name or Description)
        const matchesSearch =
          item.name.toLowerCase().includes(searchTerm) ||
          item.description.toLowerCase().includes(searchTerm);

        // Filter by date range
        const matchesDateRange = (this.startDate ? new Date(item.date) >= new Date(this.startDate) : true) &&
          (this.endDate ? new Date(item.date) <= new Date(this.endDate) : true);

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
    viewItem(item) {
      console.log('View Item', item);
    },
    editItem(item) {
      console.log('Edit Item', item);
    },
    deleteItem(item) {
      this.items = this.items.filter(i => i !== item);
      console.log('Deleted Item', item);
    },
    exportToPDF() {
      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text('Expense Item List', 20, 20);
      doc.setFontSize(12);
      const headers = ['SN', 'Expense Item Name', 'Description', 'Added By', 'Date'];
      const rows = this.filteredAndSortedItems.map((item, index) => [
        index + 1,
        item.name,
        item.description,
        "JAFFA'Z",
        new Date(item.date).toLocaleDateString()
      ]);

      doc.autoTable({
        head: [headers],
        body: rows,
        startY: 30, // Starts the table below the title
      });

      doc.save('expense_item_list.pdf');
    },
    clearSearch() {
      this.searchQuery = '';
    }
  }
};
</script>
