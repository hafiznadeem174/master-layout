<template>
  <div class="bg-gray-100 h-auto flex flex-col">
    <!-- Sidebar and Navbar components will be rendered here -->
    <SideBar />
    <NavBar />


    <div class="flex-grow ml-60">
      <div class="flex">
      <div class="w-1/2 mx-10 my-4">
        <div class="bg-white rounded-lg shadow-md mb-4">
          <h5 class="bg-gray-100 text-gray-800 p-4 rounded-t-lg text-lg font-medium">Basic Badge</h5>
          <div class="p-4">
            <div class="text-gray-500 text-sm font-medium my-4">Default</div>

            <div class="space-x-2 space-y-2 flex flex-wrap">

              <span class="bg-blue-400 text-white px-3 py-1 ">Primary</span>

              <span class="bg-gray-500 text-white px-3 py-1 ">Secondary</span>

              <span class="bg-green-500 text-white px-3 py-1 ">Success</span>

              <span class="bg-red-500 text-white px-3 py-1 ">Danger</span>

              <span class="bg-yellow-500 text-white px-3 py-1 ">Warning</span>

              <span class="bg-teal-100 text-teal-800 px-3 py-1 ">Info</span>

              <span class="bg-black text-white px-3 py-1 ">Dark</span>
            </div>
          </div>
          <hr class="border-t border-gray-200">
          <div class="p-4">
            <div class="text-gray-500 text-sm font-medium my-4">Pills</div>

            <div class="space-x-2 space-y-2 flex flex-wrap">

              <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">Primary</span>

              <span class="bg-gray-100 text-gray-800 px-3 py-1 rounded-full">Secondary</span>

              <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full">Success</span>

              <span class="bg-red-100 text-red-800 px-3 py-1 rounded-full">Danger</span>

              <span class="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">Warning</span>

              <span class="bg-teal-100 text-teal-800 px-3 py-1 rounded-full">Info</span>

              <span class="bg-black text-white px-3 py-1 rounded-full">Dark</span>
            </div>
          </div>
        </div>
      </div>
      <div class="w-1/2 mx-10 my-4">
        <div class="bg-white rounded-lg shadow-md mb-4">
          <h5 class="bg-gray-100 text-gray-800 p-4 rounded-t-lg text-lg font-medium">Label Badge's</h5>
          <div class="p-4">
            <div class="text-gray-500 text-sm font-medium my-4">Label Default</div>

            <div class="space-x-2 space-y-2 flex flex-wrap">

              <span class="bg-blue-100 text-blue-800 px-3 py-1 ">Primary</span>

              <span class="bg-gray-100 text-gray-800 px-3 py-1 ">Secondary</span>

              <span class="bg-green-100 text-green-800 px-3 py-1 ">Success</span>

              <span class="bg-red-100 text-red-800 px-3 py-1 ">Danger</span>

              <span class="bg-yellow-100 text-yellow-800 px-3 py-1 ">Warning</span>

              <span class="bg-teal-100 text-teal-800 px-3 py-1 ">Info</span>

              <span class="bg-black text-white px-3 py-1 ">Dark</span>
            </div>
          </div>
          <hr class="border-t border-gray-200">
          <div class="p-4">
            <div class="text-gray-500 text-sm font-medium my-4">Label Pills</div>

            <div class="space-x-2 space-y-2 flex flex-wrap">

              <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">Primary</span>

              <span class="bg-gray-100 text-gray-800 px-3 py-1 rounded-full">Secondary</span>

              <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full">Success</span>

              <span class="bg-red-100 text-red-800 px-3 py-1 rounded-full">Danger</span>

              <span class="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">Warning</span>

              <span class="bg-teal-100 text-teal-800 px-3 py-1 rounded-full">Info</span>

              <span class="bg-black text-white px-3 py-1 rounded-full">Dark</span>
            </div>
          </div>
        </div>
      </div>
      </div>

      <!-- image-picker -->
      <div class="m-10">
        <div class="image-picker">
        <label for="image-upload" class="cursor-pointer">
          <span class="text-blue-500 text-2xl">Click to select an image</span>
          <input
            type="file"
            id="image-upload"
            ref="fileInput"
            accept="image/*"
            @change="handleFileChange"
            class="hidden"
          />
        </label>

        <!-- Image preview -->
        <div v-if="image" class="mt-4">
          <img :src="image" alt="Selected Image" class="w-32 h-32 object-cover rounded-lg" />
        </div>
      </div>
      </div>
      <!-- Check button -->
      <div class=" flex justify-center mx-10 items-center bg-gray-400  p-4">
        <div class="flex items-center space-x-2">
          <input
            type="checkbox"
            id="checkButton"
            v-model="isChecked"
            class="w-5 h-5 border-2 border-gray-300 rounded-sm checked:bg-blue-600 focus:ring-2 focus:ring-blue-500"
          />
          <label for="checkButton" class="text-sm text-gray-700">Accept Terms and Conditions</label>
        </div>
      </div>
      <!-- Radio button -->
      <div class="flex justify-center mx-10 items-center mt-4 bg-blue-400 p-4">
        <div class="space-y-4">
          <div class="flex items-center space-x-2">
            <input
              type="radio"
              id="option1"
              value="option1"
              v-model="selectedOption"
              class="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500"
            />
            <label for="option1" class="text-sm text-gray-700">Option 1</label>
          </div>

          <div class="flex items-center space-x-2">
            <input
              type="radio"
              id="option2"
              value="option2"
              v-model="selectedOption"
              class="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500"
            />
            <label for="option2" class="text-sm text-gray-700">Option 2</label>
          </div>

          <div class="flex items-center space-x-2">
            <input
              type="radio"
              id="option3"
              value="option3"
              v-model="selectedOption"
              class="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500"
            />
            <label for="option3" class="text-sm text-gray-700">Option 3</label>
          </div>

          <p class="mt-4 text-sm text-gray-600">Selected Option: {{ selectedOption }}</p>
        </div>
      </div>


      <div class="card-body p-8 my-4 mx-10  bg-gray-300">
        <small class="text-light font-medium mr-4">Basic</small>
        <div class="inline-flex space-x-4">

          <!-- Primary Dropdown -->
          <div class="relative">
            <button
              @click="toggleDropdown('primary')"
              class="px-4 py-2 bg-blue-500 text-white rounded-lg focus:outline-none"
            >
              Primary
              <font-awesome-icon icon="angle-down" class="ml-2" />
            </button>
            <ul v-if="openDropdown === 'primary'" class="absolute left-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
              <li><a class="block px-4 py-2 text-gray-700" href="javascript:void(0);">Action</a></li>
              <li><a class="block px-4 py-2 text-gray-700" href="javascript:void(0);">Another action</a></li>
              <li><a class="block px-4 py-2 text-gray-500 cursor-not-allowed" href="javascript:void(0);" tabindex="-1">Something else here</a></li>
              <li class="border-t border-gray-200"></li>
              <li><a class="block px-4 py-2 text-gray-700" href="javascript:void(0);">Separated link</a></li>
            </ul>
          </div>

          <!-- Secondary Dropdown -->
          <div class="relative">
            <button
              @click="toggleDropdown('secondary')"
              class="px-4 py-2 bg-gray-500 text-white rounded-lg focus:outline-none"
            >
              Secondary
              <font-awesome-icon icon="angle-down" class="ml-2" />
            </button>
            <ul v-if="openDropdown === 'secondary'" class="absolute left-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
              <li><a class="block px-4 py-2 text-gray-700" href="javascript:void(0);">Action</a></li>
              <li><a class="block px-4 py-2 text-gray-700" href="javascript:void(0);">Another action</a></li>
              <li><a class="block px-4 py-2 text-gray-700" href="javascript:void(0);">Something else here</a></li>
              <li class="border-t border-gray-200"></li>
              <li><a class="block px-4 py-2 text-gray-700" href="javascript:void(0);">Separated link</a></li>
            </ul>
          </div>

          <!-- Success Dropdown -->
          <div class="relative">
            <button
              @click="toggleDropdown('success')"
              class="px-4 py-2 bg-green-500 text-white rounded-lg focus:outline-none"
            >
              Success
              <font-awesome-icon icon="angle-down" class="ml-2 " />
            </button>
            <ul v-if="openDropdown === 'success'" class="absolute left-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
              <li><a class="block px-4 py-2 text-gray-700" href="javascript:void(0);">Action</a></li>
              <li><a class="block px-4 py-2 text-gray-700" href="javascript:void(0);">Another action</a></li>
              <li><a class="block px-4 py-2 text-gray-700" href="javascript:void(0);">Something else here</a></li>
              <li class="border-t border-gray-200"></li>
              <li><a class="block px-4 py-2 text-gray-700" href="javascript:void(0);">Separated link</a></li>
            </ul>
          </div>

          <!-- Danger Dropdown -->
          <div class="relative">
            <button
              @click="toggleDropdown('danger')"
              class="px-4 py-2 bg-red-500 text-white rounded-lg focus:outline-none"
            >
              Danger
              <font-awesome-icon icon="angle-down" class="ml-2 " />
            </button>
            <ul v-if="openDropdown === 'danger'" class="absolute left-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
              <li><a class="block px-4 py-2 text-gray-700" href="javascript:void(0);">Action</a></li>
              <li><a class="block px-4 py-2 text-gray-700" href="javascript:void(0);">Another action</a></li>
              <li><a class="block px-4 py-2 text-gray-700" href="javascript:void(0);">Something else here</a></li>
              <li class="border-t border-gray-200"></li>
              <li><a class="block px-4 py-2 text-gray-700" href="javascript:void(0);">Separated link</a></li>
            </ul>
          </div>

          <!-- Warning Dropdown -->
          <div class="relative">
            <button
              @click="toggleDropdown('warning')"
              class="px-4 py-2 bg-yellow-500 text-white rounded-lg focus:outline-none"
            >
              Warning
              <font-awesome-icon icon="angle-down" class="ml-2 " />
            </button>
            <ul v-if="openDropdown === 'warning'" class="absolute left-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
              <li><a class="block px-4 py-2 text-gray-700" href="javascript:void(0);">Action</a></li>
              <li><a class="block px-4 py-2 text-gray-700" href="javascript:void(0);">Another action</a></li>
              <li><a class="block px-4 py-2 text-gray-700" href="javascript:void(0);">Something else here</a></li>
              <li class="border-t border-gray-200"></li>
              <li><a class="block px-4 py-2 text-gray-700" href="javascript:void(0);">Separated link</a></li>
            </ul>
          </div>

          <!-- Info Dropdown -->
          <div class="relative">
            <button
              @click="toggleDropdown('info')"
              class="px-4 py-2 bg-teal-500 text-white rounded-lg focus:outline-none"
            >
              Info
              <font-awesome-icon icon="angle-down" class="ml-2 " />
            </button>
            <ul v-if="openDropdown === 'info'" class="absolute left-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
              <li><a class="block px-4 py-2 text-gray-700" href="javascript:void(0);">Action</a></li>
              <li><a class="block px-4 py-2 text-gray-700" href="javascript:void(0);">Another action</a></li>
              <li><a class="block px-4 py-2 text-gray-700" href="javascript:void(0);">Something else here</a></li>
              <li class="border-t border-gray-200"></li>
              <li><a class="block px-4 py-2 text-gray-700" href="javascript:void(0);">Separated link</a></li>
            </ul>
          </div>

        </div>
      </div>

      <!-- Date Picker -->
      <div class="flex  my-12 mx-10">
        <div class="w-full max-w-xs">
          <label for="datepicker" class="block text-gray-700 text-sm font-semibold mb-2">Select Date</label>
          <Datepicker
            v-model="selectedDate"
            :format="'dd MMM yyyy'"
            class="w-full p-2 border border-gray-300 rounded-lg shadow-sm"
          />
        </div>
      </div>






        <div class="flex justify-center items-center my-12 bg-gray-100">
          <div class="w-full max-w-xs">

            <label for="toggle" class="block text-gray-700 text-sm font-semibold mb-2">Enable Feature</label>
            <div
              class="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in"
              :class="isOn ? 'bg-blue-500' : 'bg-gray-300'"
            >
              <input
                type="checkbox"
                id="toggle"
                v-model="isOn"
                class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
              />
              <span
                class="toggle-label block overflow-hidden h-6 rounded-full bg-white cursor-pointer"
              ></span>
            </div>
          </div>
        </div>



      <div class="flex w-full  bg-gray-100">
        <!-- Card Container -->
        <div class="bg-white shadow-lg rounded-lg p-6  ">
          <h2 class="text-xl font-semibold text-center mb-4">Icon List</h2>

          <!-- Icon List -->
          <div class="grid grid-cols-4 gap-4">
            <div
              v-for="(icon, index) in icons"
              :key="index"
              class="flex  space-y-2"
            >
              <FontAwesomeIcon :icon="icon" class="text-3xl text-gray-600" />
              <p class="text-center text-sm text-gray-700 ml-2">{{ icon.iconName }}</p>
            </div>
          </div>
        </div>
      </div>



      </div>



    </div>

</template>
<script>
import { defineComponent } from 'vue';
import SideBar from '@/admin/Sidebar/SideBar.vue';
import NavBar from '@/admin/TopBar/NavBar.vue';
import Datepicker from "vue3-datepicker";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';

import {
  faHouseChimney, faGear, faCartShopping, faUtensils,
  faTablet, faGaugeHigh, faWarehouse, faVault, faTrashCan,
  faTicket, faMoneyBill1, faWallet, faMessage, faClock,
  faClipboard, faCircleXmark, faBars, faAngleLeft,
  faAngleDown, faAnglesRight, faTruck, faList, faRegistered,
  faUsers, faPhone, faEnvelope, faPenToSquare, faEye,
  faCaretUp, faCaretDown,faCalendar,faArrowRightLong,
} from '@fortawesome/free-solid-svg-icons';

// Adding icons to library
library.add(
  faHouseChimney, faGear, faCartShopping, faUtensils,
  faTablet, faGaugeHigh, faWarehouse, faVault, faTrashCan,
  faTicket, faMoneyBill1, faWallet, faMessage, faClock,
  faClipboard, faCircleXmark, faBars, faAngleLeft,
  faAngleDown, faAnglesRight, faTruck, faList, faRegistered,
  faUsers, faPhone, faEnvelope, faPenToSquare, faEye,
  faCaretUp, faCaretDown,faCalendar,faArrowRightLong
);

export default defineComponent({
  name: 'IconCard',
  components: {
    NavBar,
    SideBar,
    Datepicker,
    FontAwesomeIcon,
  },
  data() {
    return {
      image: null, // To store the selected image URL
      isChecked: false,
      selectedOption: '',
      openDropdown: null,
      selectedDate: null,
      isOn: false,
      icons: [
        faHouseChimney, faGear, faCartShopping, faUtensils,
        faTablet, faGaugeHigh, faWarehouse, faVault, faTrashCan,
        faTicket, faMoneyBill1, faWallet, faMessage, faClock,
        faClipboard, faCircleXmark, faBars, faAngleLeft,
        faAngleDown, faAnglesRight, faTruck, faList, faRegistered,
        faUsers, faPhone, faEnvelope, faPenToSquare, faEye,
        faCaretUp, faCaretDown,
      ],
    };
  },
  methods: {
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.image = e.target.result; // Set the image URL
        };
        reader.readAsDataURL(file); // Read the file as a data URL
      }
    },
    toggleDropdown(dropdown) {
      if (this.openDropdown === dropdown) {
        this.openDropdown = null; // Close dropdown if already open
      } else {
        this.openDropdown = dropdown; // Open the clicked dropdown
      }
    },
  },
});
</script>


<style scoped>
/* Add some basic styling */
.image-picker {
  text-align: center;
  font-family: Arial, sans-serif;
}

input[type="file"] {
  display: none;
}

img {
  object-fit: cover;
  width: 100px;
  height: 100px;
  margin-top: 10px;
  border-radius: 8px;
}
.toggle-checkbox:checked {
  transform: translateX(100%); /* Move the switch slider to the right when checked */
}

/* Transition effect for smooth switching */
.toggle-label {
  transition: background-color 0.2s ease; /* Smooth background transition */
}
</style>
