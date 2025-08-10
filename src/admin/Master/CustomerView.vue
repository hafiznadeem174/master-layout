<template>
  <div class="bg-gray-100 h-screen flex flex-col">
    <SideBar />
    <NavBar />
    <div class="flex-grow ml-60">
      <div class="card m-4 bg-white shadow rounded-lg">
        <div class="card-datatable p-4 table-responsive">
          <div class="md:flex block justify-between items-center mb-4">
            <h5 class="text-2xl text-blue-500 font-semibold">Customers</h5>
            <div class="flex justify-between gap-3">
              <button
                class="btn bg-blue-100 text-blue-400 hover:bg-blue-400 hover:text-white px-4 py-2 rounded"
                @click="exportToPDF">
                <span class="pt-2.5 mr-1"><font-awesome-icon icon="file-arrow-down" /></span>
                Export
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
                placeholder="Search by Name, Email or Phone"
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
                  Name
                  <font-awesome-icon :icon="sortColumn === 'name' ? (sortDirection === 'asc' ? 'caret-up' : 'caret-down') : ''" class="text-blue-500" />
                </th>
                <th class="p-2 text-left cursor-pointer" @click="sortTable('email')">
                  Email
                  <font-awesome-icon :icon="sortColumn === 'email' ? (sortDirection === 'asc' ? 'caret-up' : 'caret-down') : ''" class="text-blue-500" />
                </th>
                <th class="p-2 text-left cursor-pointer" @click="sortTable('description')">
                  Description
                  <font-awesome-icon :icon="sortColumn === 'description' ? (sortDirection === 'asc' ? 'caret-up' : 'caret-down') : ''" class="text-blue-500" />
                </th>
                <th class="p-2 text-left cursor-pointer" @click="sortTable('phone')">
                  Phone No
                  <font-awesome-icon :icon="sortColumn === 'phone' ? (sortDirection === 'asc' ? 'caret-up' : 'caret-down') : ''" class="text-blue-500" />
                </th>
                <th class="p-2 text-left cursor-pointer" @click="sortTable('address')">
                  Address
                  <font-awesome-icon :icon="sortColumn === 'address' ? (sortDirection === 'asc' ? 'caret-up' : 'caret-down') : ''" class="text-blue-500" />
                </th>
                <th class="p-2 text-center cursor-pointer" @click="sortTable('createdAt')">
                  Created At
                  <font-awesome-icon :icon="sortColumn === 'createdAt' ? (sortDirection === 'asc' ? 'caret-up' : 'caret-down') : ''" class="text-blue-500" />
                </th>
                <th class="p-2 text-center">Actions</th>
              </tr>
              </thead>

              <tbody>
              <tr v-for="(user, index) in filteredAndSortedUsers" :key="index" class="border-t-2 border-gray-200">
                <td class="p-2">{{ index + 1 }}</td>
                <td class="p-2">{{ user.name }}</td>
                <td class="p-2">{{ user.email }}</td>
                <td class="p-2">{{ user.description }}</td>
                <td class="p-2">{{ user.phone }}</td>
                <td class="p-2">{{ user.address }}</td>
                <td class="p-2 text-center">{{ new Date(user.createdAt).toLocaleDateString() }}</td>
                <td class="flex p-2 justify-center gap-1">
                  <button @click="viewUser(user)" class="text-blue-500 hover:text-blue-700">
                    <font-awesome-icon icon="eye" />
                  </button>
                  <button @click="editUser(user)" class="text-green-500 hover:text-green-700">
                    <font-awesome-icon icon="pen-to-square" />
                  </button>
                  <button @click="deleteUser(user)" class="text-red-500 hover:text-red-700">
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
      users: [
        { name: "John Burger", email: "john.burger@example.com", description: "Cheeseburger", phone: "1234567890", address: "123 Burger St, Fast City", addedBy: "Admin", createdAt: "2025-01-01" },
        { name: "Jane Fries", email: "jane.fries@example.com", description: "Medium Fries", phone: "1234567891", address: "456 Fry Ave, Fast City", addedBy: "Admin", createdAt: "2025-01-02" },
        { name: "Robert Chicken", email: "robert.chicken@example.com", description: "Grilled Chicken Sandwich", phone: "1234567892", address: "789 Chicken Blvd, Fast City", addedBy: "Admin", createdAt: "2025-01-03" },
        { name: "Emily Veggie", email: "emily.veggie@example.com", description: "Veggie Burger", phone: "1234567893", address: "101 Veggie Rd, Fast City", addedBy: "Admin", createdAt: "2025-01-04" },
        { name: "Michael Shake", email: "michael.shake@example.com", description: "Chocolate Milkshake", phone: "1234567894", address: "102 Milkshake Ln, Fast City", addedBy: "Admin", createdAt: "2025-01-05" },
        { name: "Sarah Nuggets", email: "sarah.nuggets@example.com", description: "Chicken Nuggets", phone: "1234567895", address: "103 Nugget St, Fast City", addedBy: "Admin", createdAt: "2025-01-06" },
        { name: "David Pizza", email: "david.pizza@example.com", description: "Pepperoni Pizza", phone: "1234567896", address: "104 Pizza Ave, Fast City", addedBy: "Admin", createdAt: "2025-01-07" },
        { name: "Laura Taco", email: "laura.taco@example.com", description: "Soft Taco", phone: "1234567897", address: "105 Taco Blvd, Fast City", addedBy: "Admin", createdAt: "2025-01-08" },
        { name: "James Sandwich", email: "james.sandwich@example.com", description: "BLT Sandwich", phone: "1234567898", address: "106 Sandwich Rd, Fast City", addedBy: "Admin", createdAt: "2025-01-09" },
        { name: "Olivia Wrap", email: "olivia.wrap@example.com", description: "Chicken Wrap", phone: "1234567899", address: "107 Wrap Ln, Fast City", addedBy: "Admin", createdAt: "2025-01-10" },
        { name: "William Soda", email: "william.soda@example.com", description: "Cola Soda", phone: "1234567800", address: "108 Soda St, Fast City", addedBy: "Admin", createdAt: "2025-01-11" },
        { name: "Sophia Donut", email: "sophia.donut@example.com", description: "Glazed Donut", phone: "1234567801", address: "109 Donut Blvd, Fast City", addedBy: "Admin", createdAt: "2025-01-12" },
        { name: "Matthew Hotdog", email: "matthew.hotdog@example.com", description: "Classic Hotdog", phone: "1234567802", address: "110 Hotdog Rd, Fast City", addedBy: "Admin", createdAt: "2025-01-13" },
        { name: "Isabella Waffle", email: "isabella.waffle@example.com", description: "Belgian Waffle", phone: "1234567803", address: "111 Waffle St, Fast City", addedBy: "Admin", createdAt: "2025-01-14" },
        { name: "Ethan Onion", email: "ethan.onion@example.com", description: "Onion Rings", phone: "1234567804", address: "112 Onion Ln, Fast City", addedBy: "Admin", createdAt: "2025-01-15" },
        { name: "Chloe Salad", email: "chloe.salad@example.com", description: "Caesar Salad", phone: "1234567805", address: "113 Salad Blvd, Fast City", addedBy: "Admin", createdAt: "2025-01-16" },
        { name: "Liam Nacho", email: "liam.nacho@example.com", description: "Nachos with Cheese", phone: "1234567806", address: "114 Nacho Ave, Fast City", addedBy: "Admin", createdAt: "2025-01-17" },
        { name: "Mia Burrito", email: "mia.burrito@example.com", description: "Beef Burrito", phone: "1234567807", address: "115 Burrito Rd, Fast City", addedBy: "Admin", createdAt: "2025-01-18" },
        { name: "Noah Fries", email: "noah.fries@example.com", description: "Curly Fries", phone: "1234567808", address: "116 Fries Blvd, Fast City", addedBy: "Admin", createdAt: "2025-01-19" },
        { name: "Amelia Pudding", email: "amelia.pudding@example.com", description: "Chocolate Pudding", phone: "1234567809", address: "117 Pudding Ln, Fast City", addedBy: "Admin", createdAt: "2025-01-20" },
        { name: "Oliver Chicken", email: "oliver.chicken@example.com", description: "Fried Chicken", phone: "1234567810", address: "118 Chicken St, Fast City", addedBy: "Admin", createdAt: "2025-01-21" },
        { name: "Ava Pizza", email: "ava.pizza@example.com", description: "Margarita Pizza", phone: "1234567811", address: "119 Pizza Blvd, Fast City", addedBy: "Admin", createdAt: "2025-01-22" },
        { name: "Lucas Icecream", email: "lucas.icecream@example.com", description: "Vanilla Ice Cream", phone: "1234567812", address: "120 Icecream Rd, Fast City", addedBy: "Admin", createdAt: "2025-01-23" },
        { name: "Charlotte Coffee", email: "charlotte.coffee@example.com", description: "Espresso Coffee", phone: "1234567813", address: "121 Coffee Ln, Fast City", addedBy: "Admin", createdAt: "2025-01-24" },
        { name: "Eli Burger", email: "eli.burger@example.com", description: "Double Cheeseburger", phone: "1234567814", address: "122 Burger Blvd, Fast City", addedBy: "Admin", createdAt: "2025-01-25" },
        { name: "Amos Salad", email: "amos.salad@example.com", description: "Greek Salad", phone: "1234567815", address: "123 Salad Ave, Fast City", addedBy: "Admin", createdAt: "2025-01-26" },
        { name: "Harper Soup", email: "harper.soup@example.com", description: "Tomato Soup", phone: "1234567816", address: "124 Soup Blvd, Fast City", addedBy: "Admin", createdAt: "2025-01-27" },
        { name: "Evelyn Tacos", email: "evelyn.tacos@example.com", description: "Hard Shell Tacos", phone: "1234567817", address: "125 Tacos Rd, Fast City", addedBy: "Admin", createdAt: "2025-01-28" },
        { name: "James Bagel", email: "james.bagel@example.com", description: "Sesame Bagel", phone: "1234567818", address: "126 Bagel Blvd, Fast City", addedBy: "Admin", createdAt: "2025-01-29" },
        { name: "Mila Pancakes", email: "mila.pancakes@example.com", description: "Blueberry Pancakes", phone: "1234567819", address: "127 Pancake Rd, Fast City", addedBy: "Admin", createdAt: "2025-01-30" },
        { name: "Jack Kebab", email: "jack.kebab@example.com", description: "Lamb Kebab", phone: "1234567820", address: "128 Kebab Ave, Fast City", addedBy: "Admin", createdAt: "2025-01-31" }
      ]
    };
  },
  computed: {
    filteredAndSortedUsers() {
      let filtered = this.users.filter(user => {
        const searchTerm = this.searchQuery.toLowerCase();

        // Filter based on search query (Name, Email, Phone, Description)
        const matchesSearch =
          user.name.toLowerCase().includes(searchTerm) ||
          user.email.toLowerCase().includes(searchTerm) ||
          user.phone.includes(searchTerm) ||
          user.description.toLowerCase().includes(searchTerm); // Added description here

        // Filter by date range
        const matchesDateRange = (this.startDate ? new Date(user.createdAt) >= new Date(this.startDate) : true) &&
          (this.endDate ? new Date(user.createdAt) <= new Date(this.endDate) : true);

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
    viewUser(user) {
      console.log('View User', user);
    },
    editUser(user) {
      console.log('Edit User', user);
    },
    deleteUser(user) {
      this.users = this.users.filter(u => u !== user);
      console.log('Deleted User', user);
    },
    exportToPDF() {
      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text('User List', 20, 20);
      doc.setFontSize(12);
      const headers = ['SN', 'Name', 'Email', 'Description', 'Phone No', 'Address', 'Added By', 'Created At'];
      const rows = this.filteredAndSortedUsers.map((user, index) => [
        index + 1,
        user.name,
        user.email,
        user.description,
        user.phone,
        user.address,
        user.addedBy,
        new Date(user.createdAt).toLocaleDateString()
      ]);

      doc.autoTable({
        head: [headers],
        body: rows,
        startY: 30, // Starts the table below the title
      });

      doc.save('user_list.pdf');
    },
    clearSearch() {
      this.searchQuery = '';
    }
  }
};
</script>




