<template>
  <div class="bg-gray-100 h-screen flex flex-col">
    <!-- Sidebar and Navbar components will be rendered here -->
    <SideBar />
    <NavBar />

    <div class="flex-grow ml-60">
      <div class="max-w-7xl mx-auto p-4">


        <!-- SMS Settings Section -->
        <div class="bg-white shadow-md rounded-lg mb-4">
          <div class="px-4 py-4 flex justify-between items-center border-b">
            <h5 class="text-2xl text-blue-500 font-semibold">SMS Settings</h5>
          </div>
          <div class="p-4">
            <form @submit.prevent="handleSmsSubmit">
              <div class="mb-4">
                <label for="smsPhone" class="block text-sm font-medium text-gray-700">SMS Phone No</label>
                <input
                  type="text"
                  id="smsPhone"
                  v-model="smsForm.phone"
                  class="mt-1 p-2 border border-gray-300 rounded-md w-9/12
                    focus:border-custom-blue focus:ring-0 focus:outline-none"
                  placeholder="123 456 7890"
                />
              </div>

              <div class="mb-4">
                <label for="smsMessage" class="block text-sm font-medium text-gray-700">SMS Message</label>
                <textarea
                  id="smsMessage"
                  v-model="smsForm.message"
                  class="mt-1 p-2 border border-gray-300 rounded-md w-9/12
                   focus:border-custom-blue focus:ring-0 focus:outline-none"
                  placeholder="Your message here"
                ></textarea>
              </div>

              <div class="flex justify-start">
                <button type="submit" class="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-700">
                  Send SMS
                </button>
              </div>
            </form>
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

export default defineComponent({
  components: {
    NavBar,
    SideBar
  },
  data() {
    return {
      form: {
        name: '',
        company: '',
        email: '',
        phone: '',
        message: ''
      },
      smsForm: {
        phone: '',
        message: ''
      }
    };
  },
  methods: {
    handleSubmit() {
      console.log(this.form);
      // Handle form submission
    },
    handleSmsSubmit() {
      console.log('SMS Sent:', this.smsForm);
      // Handle SMS submission (for example, call an API to send SMS)
    }
  }
});
</script>
