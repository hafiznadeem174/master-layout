<template>
  <div class="bg-gray-100 h-screen flex flex-col">
    <SideBar />
    <NavBar />
    <div class="flex-grow ml-60">
      <div class="card m-4 bg-white shadow rounded-lg">
        <div class="card-datatable p-4 table-responsive">
          <div class="md:flex block justify-between items-center mb-4">
            <h5 class="text-2xl text-blue-500 font-semibold">Low Inventory Report</h5>
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

          <!-- Search Filters -->
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
                <th class="p-2 text-left cursor-pointer" @click="sortTable('ingredient')">
                  Ingredient (Code)
                  <font-awesome-icon :icon="sortColumn === 'ingredient' ? (sortDirection === 'asc' ? 'caret-up' : 'caret-down') : ''" class="text-blue-500" />
                </th>
                <th class="p-2 text-left cursor-pointer" @click="sortTable('category')">
                  Category
                  <font-awesome-icon :icon="sortColumn === 'category' ? (sortDirection === 'asc' ? 'caret-up' : 'caret-down') : ''" class="text-blue-500" />
                </th>
                <th class="p-2 text-left cursor-pointer" @click="sortTable('stockQty')">
                  Stock Amount
                  <font-awesome-icon :icon="sortColumn === 'stockQty' ? (sortDirection === 'asc' ? 'caret-up' : 'caret-down') : ''" class="text-blue-500" />
                </th>
                <th class="p-2 text-left cursor-pointer" @click="sortTable('alertQty')">
                  Alert Amount
                  <font-awesome-icon :icon="sortColumn === 'alertQty' ? (sortDirection === 'asc' ? 'caret-up' : 'caret-down') : ''" class="text-blue-500" />
                </th>
                <th class="p-2 text-left">Date</th>
                <th class="p-2 text-left">Actions</th>
              </tr>
              </thead>

              <tbody>
              <tr v-for="(ingredient, index) in filteredAndSortedIngredients" :key="index" class="border-t-2 border-gray-200">
                <td class="p-2">{{ index + 1 }}</td>
                <td class="p-2">{{ ingredient.ingredient }} ({{ ingredient.code }})</td>
                <td class="p-2">{{ ingredient.category }}</td>
                <td class="p-2">{{ ingredient.stockQty }}</td>
                <td class="p-2">{{ ingredient.alertQty }}</td>
                <td class="p-2">{{ ingredient.date }}</td>
                <td class="p-2">
                  <div class="flex gap-2">
                    <button @click="viewIngredient(ingredient)" class="text-blue-500 hover:text-blue-700">
                      <font-awesome-icon icon="eye" />
                    </button>
                    <button @click="editIngredient(ingredient)" class="text-green-500 hover:text-green-700">
                      <font-awesome-icon icon="pen-to-square" />
                    </button>
                    <button @click="deleteIngredient(ingredient)" class="text-red-500 hover:text-red-700">
                      <font-awesome-icon icon="trash-can" />
                    </button>
                  </div>
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
import { faEye, faPenToSquare, faTrashCan, faCaretUp, faCaretDown, faFileArrowDown } from '@fortawesome/free-solid-svg-icons';
import jsPDF from 'jspdf';

import SideBar from '@/admin/Sidebar/SideBar.vue';
import NavBar from '@/admin/TopBar/NavBar.vue';

library.add(faEye, faPenToSquare, faTrashCan, faCaretUp, faCaretDown, faFileArrowDown);

export default {
  components: { NavBar, SideBar, FontAwesomeIcon },
  data() {
    return {
      searchQuery: '',
      startDate: '',
      endDate: '',
      sortColumn: '',
      sortDirection: 'asc',
      ingredients: [
        { ingredient: 'Tomato', code: 'T001', category: 'Vegetable', stockQty: '10kg', alertQty: '2kg', date: '2025-01-01' },
        { ingredient: 'Onion', code: 'O002', category: 'Vegetable', stockQty: '5kg', alertQty: '1kg', date: '2025-01-02' },
        { ingredient: 'Cheese', code: 'C003', category: 'Dairy', stockQty: '3kg', alertQty: '0.5kg', date: '2025-01-03' },
        { ingredient: 'Lettuce', code: 'L004', category: 'Vegetable', stockQty: '8 heads', alertQty: '2 heads', date: '2025-01-04' },
        { ingredient: 'Cucumber', code: 'C005', category: 'Vegetable', stockQty: '6 pieces', alertQty: '1 piece', date: '2025-01-05' },
        { ingredient: 'Chicken', code: 'CH006', category: 'Meat', stockQty: '20kg', alertQty: '5kg', date: '2025-01-06' },
        { ingredient: 'Beef', code: 'B007', category: 'Meat', stockQty: '15kg', alertQty: '3kg', date: '2025-01-07' },
        { ingredient: 'Eggplant', code: 'E008', category: 'Vegetable', stockQty: '5kg', alertQty: '1.5kg', date: '2025-01-08' },
        { ingredient: 'Spinach', code: 'S009', category: 'Vegetable', stockQty: '3kg', alertQty: '0.5kg', date: '2025-01-09' },
        { ingredient: 'Carrot', code: 'CA010', category: 'Vegetable', stockQty: '4kg', alertQty: '1kg', date: '2025-01-10' },
        { ingredient: 'Garlic', code: 'G011', category: 'Spices', stockQty: '500g', alertQty: '100g', date: '2025-01-11' },
        { ingredient: 'Potato', code: 'P012', category: 'Vegetable', stockQty: '30kg', alertQty: '5kg', date: '2025-01-12' }
      ]
    };
  },
  computed: {
    filteredAndSortedIngredients() {
      let filtered = this.ingredients.filter(ingredient => {
        const searchTerm = this.searchQuery.toLowerCase();
        const startDate = this.startDate ? new Date(this.startDate) : null;
        const endDate = this.endDate ? new Date(this.endDate) : null;

        // Filter by search query (Ingredient Name or Code)
        const matchesSearch = ingredient.ingredient.toLowerCase().includes(searchTerm) || ingredient.code.toLowerCase().includes(searchTerm);

        // Filter by date range
        const ingredientDate = new Date(ingredient.date);
        const matchesDateRange =
          (!startDate || ingredientDate >= startDate) &&
          (!endDate || ingredientDate <= endDate);

        return matchesSearch && matchesDateRange;
      });

      // Sorting functionality
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
    viewIngredient(ingredient) {
      console.log('View Ingredient', ingredient);
    },
    editIngredient(ingredient) {
      console.log('Edit Ingredient', ingredient);
    },
    deleteIngredient(ingredient) {
      this.ingredients = this.ingredients.filter(i => i !== ingredient);
      console.log('Deleted Ingredient', ingredient);
    },
    exportToPDF() {
      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text('Ingredient Stock List', 20, 20);
      doc.setFontSize(12);
      const headers = ['SN', 'Ingredient (Code)', 'Category', 'Stock Qty/Amount', 'Alert Qty/Amount', 'Date'];
      const rows = this.filteredAndSortedIngredients.map((ingredient, index) => [
        index + 1,
        `${ingredient.ingredient} (${ingredient.code})`,
        ingredient.category,
        ingredient.stockQty,
        ingredient.alertQty,
        ingredient.date
      ]);

      doc.autoTable({
        head: [headers],
        body: rows,
        startY: 30,
      });

      doc.save('ingredient_stock_list.pdf');
    }
  }
};
</script>
