<template>
  <div class="bg-gray-100 h-screen flex flex-col">
    <SideBar />
    <NavBar />
    <div class="flex-grow ml-60">
      <div class="card m-4 bg-white shadow rounded-lg">
        <div class="card-datatable p-4 table-responsive">
          <div class="md:flex block justify-between items-center mb-4">
            <h5 class="text-2xl text-blue-500 font-semibold">Consumption Report</h5>
            <div class="flex justify-between gap-3">
              <button
                class="btn bg-blue-100 text-blue-400 hover:bg-blue-400 hover:text-white px-4 py-2 rounded"
                @click="exportToPDF">
                <span class="pt-2.5 mr-1"><font-awesome-icon icon="file-arrow-down" /></span>
                Export
              </button>
            </div>
          </div>

          <!-- Search Filter -->
          <div class="md:flex block justify-between items-center mb-4">
            <div class="flex items-center">
              <label for="search" class="mr-2">Search:</label>
              <input
                v-model="searchQuery"
                type="text"
                id="search"
                class="form-input border border-gray-300 rounded-lg p-2"
                placeholder="Search by Ingredient Name or Code"
              />
            </div>
          </div>

          <!-- Table Display -->
          <div class="overflow-x-auto border-t-[3px] border-b-2 border-blue-500">
            <table class="table-auto w-full">
              <thead>
              <tr>
                <th class="p-2 text-left cursor-pointer">SN</th>
                <th class="p-2 text-left cursor-pointer" @click="sortTable('ingredientName')">
                  Ingredient Name (Code)
                  <font-awesome-icon :icon="sortColumn === 'ingredientName' ? (sortDirection === 'asc' ? 'caret-up' : 'caret-down') : ''" class="text-blue-500" />
                </th>
                <th class="p-2 text-left cursor-pointer" @click="sortTable('quantity')">
                  Quantity/Amount
                  <font-awesome-icon :icon="sortColumn === 'quantity' ? (sortDirection === 'asc' ? 'caret-up' : 'caret-down') : ''" class="text-blue-500" />
                </th>
                <th class="p-2 text-center">Actions</th>
              </tr>
              </thead>

              <tbody>
              <tr v-for="(ingredient, index) in filteredAndSortedIngredients" :key="index" class="border-t-2 border-gray-200">
                <td class="p-2">{{ index + 1 }}</td>
                <td class="p-2">{{ ingredient.ingredientName }} ({{ ingredient.code }})</td>
                <td class="p-2">{{ ingredient.quantity }}</td>
                <td class="p-2 text-center">
                  <button @click="viewIngredient(ingredient)" class="text-blue-500 hover:text-blue-700">
                    <font-awesome-icon icon="eye" />
                  </button>
                  <button @click="editIngredient(ingredient)" class="text-green-500 hover:text-green-700">
                    <font-awesome-icon icon="pen-to-square" />
                  </button>
                  <button @click="deleteIngredient(ingredient)" class="text-red-500 hover:text-red-700">
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
      sortColumn: '',
      sortDirection: 'asc',
      ingredients: [
        { ingredientName: 'Tomato', code: 'T001', quantity: '2kg' },
        { ingredientName: 'Onion', code: 'O002', quantity: '1kg' },
        { ingredientName: 'Cheese', code: 'C003', quantity: '500g' },
        { ingredientName: 'Lettuce', code: 'L004', quantity: '1 head' },
        { ingredientName: 'Cucumber', code: 'C005', quantity: '3 pieces' },
        { ingredientName: 'Chicken', code: 'CH006', quantity: '1kg' },
        { ingredientName: 'Beef', code: 'B007', quantity: '1.5kg' },
        { ingredientName: 'Eggplant', code: 'E008', quantity: '1kg' },
        { ingredientName: 'Spinach', code: 'S009', quantity: '300g' },
        { ingredientName: 'Carrot', code: 'CA010', quantity: '1kg' },
        { ingredientName: 'Garlic', code: 'G011', quantity: '100g' },
        { ingredientName: 'Potato', code: 'P012', quantity: '5kg' }
      ]
    };
  },
  computed: {
    filteredAndSortedIngredients() {
      let filtered = this.ingredients.filter(ingredient => {
        const searchTerm = this.searchQuery.toLowerCase();

        // Filter by search query (Ingredient Name or Code)
        return ingredient.ingredientName.toLowerCase().includes(searchTerm) ||
          ingredient.code.toLowerCase().includes(searchTerm);
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
      console.log('View Ingredient:', ingredient);
    },
    editIngredient(ingredient) {
      console.log('Edit Ingredient:', ingredient);
    },
    deleteIngredient(ingredient) {
      this.ingredients = this.ingredients.filter(i => i !== ingredient);
      console.log('Deleted Ingredient:', ingredient);
    },
    exportToPDF() {
      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text('Ingredient List', 20, 20);
      doc.setFontSize(12);
      const headers = ['SN', 'Ingredient Name (Code)', 'Quantity/Amount'];
      const rows = this.filteredAndSortedIngredients.map((ingredient, index) => [
        index + 1,
        `${ingredient.ingredientName} (${ingredient.code})`,
        ingredient.quantity
      ]);

      doc.autoTable({
        head: [headers],
        body: rows,
        startY: 30,
      });

      doc.save('ingredient_list.pdf');
    }
  }
};
</script>
