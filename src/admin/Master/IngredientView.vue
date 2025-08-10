<template>
  <div class="bg-gray-100 h-screen flex flex-col">
    <SideBar />
    <NavBar />
    <div class="flex-grow ml-60">
      <div class="card m-4 bg-white shadow rounded-lg">
        <div class="card-datatable p-4 table-responsive">
          <div class="md:flex block justify-between items-center mb-4">
            <h5 class="text-2xl text-blue-500 font-semibold">Ingredient</h5>
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
                placeholder="Search by Category, Description, or Created At"
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
                <th class="p-2 text-left" @click="sortTable('categoryName')">
                  Category Name
                  <font-awesome-icon v-if="sortColumn === 'categoryName'" :icon="sortDirection === 'asc' ? 'caret-up' : 'caret-down'" class="text-blue-500"/>
                </th>
                <th class="p-2 text-left" @click="sortTable('description')">
                  Description
                  <font-awesome-icon v-if="sortColumn === 'description'" :icon="sortDirection === 'asc' ? 'caret-up' : 'caret-down'" class="text-blue-500"/>
                </th>
                <th class="p-2 text-left" @click="sortTable('price')">
                  Price
                  <font-awesome-icon v-if="sortColumn === 'price'" :icon="sortDirection === 'asc' ? 'caret-up' : 'caret-down'" class="text-blue-500"/>
                </th>
                <th class="p-2 text-left" @click="sortTable('addedBy')">
                  Added By
                  <font-awesome-icon v-if="sortColumn === 'addedBy'" :icon="sortDirection === 'asc' ? 'caret-up' : 'caret-down'" class="text-blue-500"/>
                </th>
                <th class="p-2 text-left" @click="sortTable('createdAt')">
                  Created At
                  <font-awesome-icon v-if="sortColumn === 'createdAt'" :icon="sortDirection === 'asc' ? 'caret-up' : 'caret-down'" class="text-blue-500"/>
                </th>
                <th class="p-2 text-center" @click="sortTable('status')">
                  Status
                  <font-awesome-icon v-if="sortColumn === 'status'" :icon="sortDirection === 'asc' ? 'caret-up' : 'caret-down'" class="text-blue-500"/>
                </th>
                <th class="p-2 text-center">Actions</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(record, index) in filteredAndSortedRecords" :key="index" class="border-t-2 border-gray-200">
                <td class="p-2">{{ index + 1 }}</td>
                <td class="p-2">{{ record.categoryName }}</td>
                <td class="p-2">{{ record.description }}</td>
                <td class="p-2">{{ record.price }} Rs</td>
                <td class="p-2">{{ record.addedBy }}</td>
                <td class="p-2">{{ record.createdAt }}</td>
                <td class="p-2 text-center">
                    <span v-if="record.status === 'Available'" class="inline-block w-[100px] px-3 py-1 text-sm font-semibold bg-green-100 text-green-900 rounded-full text-center">
                      Available
                    </span>
                  <span v-else-if="record.status === 'Unavailable'" class="inline-block w-[100px] px-3 py-1 text-sm font-semibold bg-yellow-100 text-yellow-900 rounded-full text-center">
                      Unavailable
                   </span>
                  <span v-else class="inline-block w-[100px] px-3 py-1 text-sm font-semibold bg-gray-100 text-gray-900 rounded-full text-center">
                    Unknown
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
      records: [
        { categoryName: "Burgers", description: "Cheeseburger with lettuce and tomato", price: 500, addedBy: "Admin", createdAt: "2025-01-01", status: "Available" },
        { categoryName: "Burgers", description: "Classic Burger with pickles and onions", price: 450, addedBy: "Admin", createdAt: "2025-01-02", status: "Unavailable" },
        { categoryName: "Fries", description: "Crispy French Fries", price: 150, addedBy: "Admin", createdAt: "2025-01-03", status: "Available" },
        { categoryName: "Pizza", description: "Pepperoni Pizza with mozzarella", price: 800, addedBy: "Admin", createdAt: "2025-01-04", status: "Available" },
        { categoryName: "Pizza", description: "Vegetarian Pizza with bell peppers and olives", price: 750, addedBy: "Admin", createdAt: "2025-01-05", status: "Unavailable" },
        { categoryName: "Burgers", description: "Bacon Cheeseburger with special sauce", price: 600, addedBy: "Admin", createdAt: "2025-01-06", status: "Available" },
        { categoryName: "Drinks", description: "Coca Cola - 500ml", price: 100, addedBy: "Admin", createdAt: "2025-01-07", status: "Unavailable" },
        { categoryName: "Drinks", description: "Lemonade - Freshly squeezed", price: 120, addedBy: "Admin", createdAt: "2025-01-08", status: "Unavailable" },
        { categoryName: "Fries", description: "Sweet Potato Fries", price: 180, addedBy: "Admin", createdAt: "2025-01-09", status: "Available" },
        { categoryName: "Pizza", description: "BBQ Chicken Pizza", price: 850, addedBy: "Admin", createdAt: "2025-01-10", status: "Available" },
        { categoryName: "Burgers", description: "Vegan Burger with plant-based patty", price: 700, addedBy: "Admin", createdAt: "2025-01-11", status: "Unavailable" },
        { categoryName: "Pizza", description: "Margarita Pizza with fresh basil", price: 720, addedBy: "Admin", createdAt: "2025-01-12", status: "Available" },
        { categoryName: "Fries", description: "Truffle Fries with parmesan", price: 350, addedBy: "Admin", createdAt: "2025-01-13", status: "Available" },
        { categoryName: "Drinks", description: "Iced Tea with lemon", price: 110, addedBy: "Admin", createdAt: "2025-01-14", status: "Available" }
      ]
    };
  },
  computed: {
    filteredAndSortedRecords() {
      let filtered = this.records.filter(record => {
        const searchTerm = this.searchQuery.toLowerCase();
        const searchByDateRange = (
          (this.startDate === '' || new Date(record.createdAt) >= new Date(this.startDate)) &&
          (this.endDate === '' || new Date(record.createdAt) <= new Date(this.endDate))
        );
        return (
          searchByDateRange &&
          (record.categoryName.toLowerCase().includes(searchTerm) ||
            record.description.toLowerCase().includes(searchTerm) ||
            record.createdAt.includes(searchTerm)
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
      doc.text('Ingredient ', 20, 20);
      doc.setFontSize(12);
      const headers = ['SN', 'Category Name', 'Description', 'Price', 'Added By', 'Created At'];
      const rows = this.filteredAndSortedRecords.map((record, index) => [
        index + 1,
        record.categoryName,
        record.description,
        record.price,
        record.addedBy,
        record.createdAt
      ]);

      doc.autoTable({
        head: [headers],
        body: rows,
        startY: 30, // Starts the table below the title
      });

      doc.save('ingredient_units.pdf');
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
