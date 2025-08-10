<template>
  <div>
    <!-- Toggle Button for Mobile -->
    <button
      @click="toggleSidebar"
      aria-label="Toggle Menu"
      class="fixed top-4 left-4 z-10 bg-blue-500 text-white p-2 rounded md:hidden">
      Toggle Menu
    </button>

    <div
      :id="sidebarId"
      :class="[
        'fixed top-0 left-0 h-full bg-gradient-to-r from-[#404E67] to-[#2C3A50] text-white  transition-all duration-300',
        { 'w-[230px]': isSidebarExpanded, 'w-0 overflow-hidden': !isSidebarExpanded }
      ]">
      <div class="flex justify-center items-center">
        <img src="/Images/logo_white.png" alt="Food Image 1" class="w-15 h-15 mt-2">
      </div>

      <div class="mt-2  p-0.5 h-full overflow-y-auto custom-scroll">
        <ul class="mt-2 mb-12">
          <li>
            <router-link
              to="/admin/home"
              @click="closeSidebar"
              class="flex items-center px-3 py-3 text-[#dcdcdc] text-14 hover:text-white"
              :class="{ 'bg-gray-300 text-white': isActive('/admin/dashboard') }">
              <font-awesome-icon icon="house-chimney" class="text-[14px]" />
              <span class="ml-2  text-[14px]"
                    :class="{ 'hidden': !isSidebarExpanded }">Home</span>
            </router-link>
          </li>

          <li>
            <router-link
              to="/admin/restaurant-setting"
              @click="closeSidebar"
              class="flex items-center px-3 py-3 text-[#dcdcdc] text-14 hover:text-white"
              :class="{ 'bg-gray-300 text-white': isActive('/admin/dashboard') }">
              <font-awesome-icon icon="gear" class="text-[14px]" />
              <span class="ml-2  text-[14px]"
                    :class="{ 'hidden': !isSidebarExpanded }">Restaurant Setting</span>
            </router-link>
          </li>


            <li>
              <router-link
                to="#"
                @click="toggleDropdown"
                class="flex items-center justify-between px-3 py-3 text-[#dcdcdc] text-14 hover:text-white">
                <!-- Left side: Icon and text -->
                <div class="flex items-center">
                  <font-awesome-icon icon="tablet" class="text-[14px]" />
                  <span class="ml-2  text-[14px]"
                        :class="{ 'hidden': !isSidebarExpanded }">All Screens</span>
                </div>

                <!-- Right side: Conditional Dropdown Icon -->
                <font-awesome-icon
                  size="sm"
                  color="white"
                  class="mr-2"
                  :icon="dropdownOpen ? 'angle-down' : 'angle-left'"
                />
              </router-link>



              <!-- Dropdown content that appears when open -->
              <ul v-if="dropdownOpen" class="ml-3">
                <!-- Add your dropdown items here -->
                <li class="mt-2"><router-link to="/admin/all-screen/pos" class=" text-[#dcdcdc] text-14 hover:text-white">
                  <font-awesome-icon icon="angles-right" class="text-xs" />
                  <span class="ml-4 text-sm"
                        :class="{ 'hidden': !isSidebarExpanded }">POS</span>
                </router-link></li>
                <li class="mt-2"><router-link to="/admin/all-screen/kitchen-panel" class="text-[#dcdcdc] text-14 hover:text-white">
                  <font-awesome-icon icon="angles-right" class="text-xs" />
                  <span class="ml-4 text-sm"
                        :class="{ 'hidden': !isSidebarExpanded }">Kitchen</span>
                </router-link></li>
                <li class="mt-2"><router-link to="/admin/all-screen/bar-screen" class="text-[#dcdcdc] text-14 hover:text-white">
                  <font-awesome-icon icon="angles-right" class="text-xs" />
                  <span class="ml-4 text-sm"
                        :class="{ 'hidden': !isSidebarExpanded }">Bar</span>
                </router-link></li>
                <li class="mt-2"><router-link to="/admin/all-screen/waiter-screen" class="text-[#dcdcdc] text-14 hover:text-white">
                  <font-awesome-icon icon="angles-right" class="text-xs" />
                  <span class="ml-4 text-sm"
                        :class="{ 'hidden': !isSidebarExpanded }">Waiter</span>
                </router-link></li>
              </ul>

            </li>




          <li>
            <router-link
              to="/"
              @click="closeSidebar"
              class="flex items-center px-3 py-3 text-[#dcdcdc] text-14 hover:text-white">
              <font-awesome-icon icon="gauge-high" class="text-[14px]" />
              <span class="ml-2  text-[14px]"
                    :class="{ 'hidden': !isSidebarExpanded }">Dashboard</span>
            </router-link>
          </li>

          <li>
            <router-link
              to="/admin/purchase-view"
              @click="closeSidebar"
              class="flex items-center px-3 py-3 text-[#dcdcdc] text-14 hover:text-white">
              <font-awesome-icon icon="cart-shopping" class="text-[14px]" />
              <span class="ml-2  text-[14px]"
                    :class="{ 'hidden': !isSidebarExpanded }">Purchase</span>
            </router-link>
          </li>


          <li>
            <router-link
              to="/admin/sale-view"
              @click="closeSidebar"
              class="flex items-center px-3 py-3 text-[#dcdcdc] text-14 hover:text-white">
              <font-awesome-icon icon="utensils" class="text-[14px]" />
              <span class="ml-2  text-[14px]"
                    :class="{ 'hidden': !isSidebarExpanded }">Sale</span>
            </router-link>
          </li>

          <li>
            <router-link
              to="/admin/inventory-view"
              @click="closeSidebar"
              class="flex items-center px-3 py-3 text-[#dcdcdc] text-14 hover:text-white">
              <font-awesome-icon icon="warehouse" class="text-[14px]" />
              <span class="ml-2  text-[14px]"
                    :class="{ 'hidden': !isSidebarExpanded }">Inventory</span>
            </router-link>
          </li>

          <li>
            <router-link
              to="/admin/inventory-adjustments"
              @click="closeSidebar"
              class="flex items-center px-3 py-3 text-[#dcdcdc] text-14 hover:text-white">
              <font-awesome-icon icon="vault" class="text-[14px]" />
              <span class="ml-2  text-[14px]"
                    :class="{ 'hidden': !isSidebarExpanded }">Inventory Adjustments</span>
            </router-link>
          </li>

          <li>
            <router-link
              to="/admin/waste"
              @click="closeSidebar"
              class="flex items-center px-3 py-3 text-[#dcdcdc] text-14 hover:text-white">
              <font-awesome-icon icon="trash-can" class="text-[14px]" />
              <span class="ml-2  text-[14px]"
                    :class="{ 'hidden': !isSidebarExpanded }">Waste</span>
            </router-link>
          </li>

          <li>
            <router-link
              to="/admin/expense"
              @click="closeSidebar"
              class="flex items-center px-3 py-3 text-[#dcdcdc] text-14 hover:text-white">
              <font-awesome-icon icon="ticket" class="text-[14px]" />
              <span class="ml-2  text-[14px]"
                    :class="{ 'hidden': !isSidebarExpanded }">Expense</span>
            </router-link>
          </li>

          <li>
            <router-link
              to="/admin/supplier-Due"
              @click="closeSidebar"
              class="flex items-center px-3 py-3 text-[#dcdcdc] text-14 hover:text-white">
              <font-awesome-icon icon="money-bill-1" class="text-[14px]" />
              <span class="ml-2  text-[14px]"
                    :class="{ 'hidden': !isSidebarExpanded }">Supplier Due Payment</span>
            </router-link>
          </li>


          <li>
            <router-link
              to="/admin/customer-Due"
              @click="closeSidebar"
              class="flex items-center px-3 py-3 text-[#dcdcdc] text-14 hover:text-white">
              <font-awesome-icon icon="wallet" class="text-[14px]" />
              <span class="ml-2  text-[14px]"
                    :class="{ 'hidden': !isSidebarExpanded }">Customer Due Receive</span>
            </router-link>
          </li>






          <li>
            <router-link
              to="/admin/send-sms"
              @click="closeSidebar"
              class="flex items-center px-3 py-3 text-[#dcdcdc] text-14 hover:text-white">
              <font-awesome-icon icon="message" class="text-[14px]" />
              <span class="ml-2  text-[14px]"
                    :class="{ 'hidden': !isSidebarExpanded }">Send SMS</span>
            </router-link>
          </li>

          <li>
            <router-link
              to="/admin/attendance"
              @click="closeSidebar"
              class="flex items-center px-3 py-3 text-[#dcdcdc] text-14 hover:text-white">
              <font-awesome-icon icon="clock" class="text-[14px]" />
              <span class="ml-2  text-[14px]"
                    :class="{ 'hidden': !isSidebarExpanded }">Attendance</span>
            </router-link>
          </li>

          <li>
            <router-link
              to="#"
              @click="toggleReportDropdown"
              class="flex items-center justify-between px-3 py-3 text-[#dcdcdc] text-14 hover:text-white"
              :class="{ 'bg-gray-300 text-white': isActive('/admin/dashboard') }"
            >
              <!-- Left side: Icon and text -->
              <div class="flex items-center">
                <font-awesome-icon icon="clipboard" class="text-[14px]" />
                <span class="ml-2  text-[14px]"
                      :class="{ 'hidden': !isSidebarExpanded }">Report</span>
              </div>

              <!-- Right side: Conditional Dropdown Icon -->
              <font-awesome-icon
                size="sm"
                color="white"
                class="mr-2"
                :icon="reportDropdownOpen ? 'angle-down' : 'angle-left'"
              />
            </router-link>



            <!-- Dropdown content that appears when open -->
            <ul v-if="reportDropdownOpen" class="ml-3">
              <!-- Add your dropdown items here -->
              <li class="mt-2"><router-link to="/admin/report/register" class=" text-[#BFC1C6] text-14 hover:text-white">
                <font-awesome-icon icon="angles-right" class="text-xs" />
                <span class="ml-2 text-sm"
                      :class="{ 'hidden': !isSidebarExpanded }">Register Report</span>
              </router-link></li>

              <li class="mt-2.5"><router-link to="/admin/report/daily-summary" class=" text-[#BFC1C6] text-14 hover:text-white">
                <font-awesome-icon icon="angles-right" class="text-xs" />
                <span class="ml-2 text-sm"
                      :class="{ 'hidden': !isSidebarExpanded }">Daily Summary Report</span>
              </router-link></li>

              <li class="mt-2.5"><router-link to="/admin/report/food-sale" class=" text-[#BFC1C6] text-14 hover:text-white">
                <font-awesome-icon icon="angles-right" class="text-xs" />
                <span class="ml-2 text-sm"
                      :class="{ 'hidden': !isSidebarExpanded }">Food Sale Report</span>
              </router-link></li>

              <li class="mt-2.5"><router-link to="/admin/report/daily-sale" class=" text-[#BFC1C6] text-14 hover:text-white">
                <font-awesome-icon icon="angles-right" class="text-xs" />
                <span class="ml-2 text-sm"
                      :class="{ 'hidden': !isSidebarExpanded }">Daily Sale Report</span>
              </router-link></li>

              <li class="mt-2.5"><router-link to="/admin/report/detailed-sale" class=" text-[#BFC1C6] text-14 hover:text-white">
                <font-awesome-icon icon="angles-right" class="text-xs" />
                <span class="ml-2 text-sm"
                      :class="{ 'hidden': !isSidebarExpanded }">Detailed Sale Report</span>
              </router-link></li>

              <li class="mt-2.5"><router-link to="/admin/report/consumption" class=" text-[#BFC1C6] text-14 hover:text-white">
                <font-awesome-icon icon="angles-right" class="text-xs" />
                <span class="ml-2 text-sm"
                      :class="{ 'hidden': !isSidebarExpanded }">Consumption Report</span>
              </router-link></li>

              <li class="mt-2.5"><router-link to="/admin/report/inventory" class=" text-[#BFC1C6] text-14 hover:text-white">
                <font-awesome-icon icon="angles-right" class="text-xs" />
                <span class="ml-2 text-sm"
                      :class="{ 'hidden': !isSidebarExpanded }">Inventory Report</span>
              </router-link></li>

              <li class="mt-2.5"><router-link to="/admin/report/low-inventory" class=" text-[#BFC1C6] text-14 hover:text-white">
                <font-awesome-icon icon="angles-right" class="text-xs" />
                <span class="ml-2 text-sm"
                      :class="{ 'hidden': !isSidebarExpanded }">Low Inventory Report</span>
              </router-link></li>

              <li class="mt-2.5"><router-link to="/admin/report/profit-loss" class=" text-[#BFC1C6] text-14 hover:text-white">
                <font-awesome-icon icon="angles-right" class="text-xs" />
                <span class="ml-2 text-sm"
                      :class="{ 'hidden': !isSidebarExpanded }">Profit Loss Report</span>
              </router-link></li>

              <li class="mt-2.5"><router-link to="/admin/report/vat-report" class=" text-[#BFC1C6] text-14 hover:text-white">
                <font-awesome-icon icon="angles-right" class="text-xs" />
                <span class="ml-2 text-sm"
                      :class="{ 'hidden': !isSidebarExpanded }">Vat Report</span>
              </router-link></li>

              <li class="mt-2.5"><router-link to="/admin/report/kitchen" class=" text-[#BFC1C6] text-14 hover:text-white">
                <font-awesome-icon icon="angles-right" class="text-xs" />
                <span class="ml-2 text-sm"
                      :class="{ 'hidden': !isSidebarExpanded }">Kitchen Report</span>
              </router-link></li>

              <li class="mt-2.5"><router-link to="/admin/report/attendance" class=" text-[#BFC1C6] text-14 hover:text-white">
                <font-awesome-icon icon="angles-right" class="text-xs" />
                <span class="ml-2 text-sm"
                      :class="{ 'hidden': !isSidebarExpanded }">Attendance Report</span>
              </router-link></li>

              <li class="mt-2.5"><router-link to="/admin/report/supplier-ledger" class=" text-[#BFC1C6] text-14 hover:text-white">
                <font-awesome-icon icon="angles-right" class="text-xs" />
                <span class="ml-2 text-sm"
                      :class="{ 'hidden': !isSidebarExpanded }">Supplier Ledger</span>
              </router-link></li>

              <li class="mt-2.5"><router-link to="/admin/report/supplier-due" class=" text-[#BFC1C6] text-14 hover:text-white">
                <font-awesome-icon icon="angles-right" class="text-xs" />
                <span class="ml-2 text-sm"
                      :class="{ 'hidden': !isSidebarExpanded }">Supplier Due Report</span>
              </router-link></li>

              <li class="mt-2.5"><router-link to="/admin/report/customer-due" class=" text-[#BFC1C6] text-14 hover:text-white">
                <font-awesome-icon icon="angles-right" class="text-xs" />
                <span class="ml-2 text-sm"
                      :class="{ 'hidden': !isSidebarExpanded }">Customer Due Report</span>
              </router-link></li>

              <li class="mt-2.5"><router-link to="/admin/report/customer-ledger" class=" text-[#BFC1C6] text-14 hover:text-white">
                <font-awesome-icon icon="angles-right" class="text-xs" />
                <span class="ml-2 text-sm"
                      :class="{ 'hidden': !isSidebarExpanded }">Customer Ledger</span>
              </router-link></li>

              <li class="mt-2.5"><router-link to="/admin/report/purchase" class=" text-[#BFC1C6] text-14 hover:text-white">
                <font-awesome-icon icon="angles-right" class="text-xs" />
                <span class="ml-2 text-sm"
                      :class="{ 'hidden': !isSidebarExpanded }">Purchase Report</span>
              </router-link></li>

              <li class="mt-2.5"><router-link to="/admin/report/expense" class=" text-[#BFC1C6] text-14 hover:text-white">
                <font-awesome-icon icon="angles-right" class="text-xs" />
                <span class="ml-2 text-sm"
                      :class="{ 'hidden': !isSidebarExpanded }">Expense Report</span>
              </router-link></li>

              <li class="mt-2.5"><router-link to="/admin/report/waste" class=" text-[#BFC1C6] text-14 hover:text-white">
                <font-awesome-icon icon="angles-right" class="text-xs" />
                <span class="ml-2 text-sm"
                      :class="{ 'hidden': !isSidebarExpanded }">Waste Report</span>
              </router-link></li>


            </ul>

          </li>



          <li>
            <router-link
              to="#"
              @click="toggleMasterDropdown"
              class="flex items-center justify-between px-3 py-3
              text-[#dcdcdc] text-14 hover:text-white">
              <!-- Left side: Icon and text -->
              <div class="flex items-center">
                <font-awesome-icon icon="bars" class="text-[14px]" />
                <span class="ml-2  text-[14px]"
                      :class="{ 'hidden': !isSidebarExpanded }">Master</span>
              </div>

              <!-- Right side: Conditional Dropdown Icon -->
              <font-awesome-icon
                size="sm"
                color="white"
                class="mr-2"
                :icon="masterDropdownOpen ? 'angle-down' : 'angle-left'"
              />
            </router-link>



            <!-- Dropdown content that appears when open -->
            <ul v-if="masterDropdownOpen" class="ml-3">
              <!-- Add your dropdown items here -->
              <li class="mt-0">
                <router-link to="/admin/master/ingredient-categories" class=" text-[#BFC1C6]
              text-14 hover:text-white">
                <font-awesome-icon icon="angles-right" class="text-xs" />
                <span class="ml-2 text-sm"
                      :class="{ 'hidden': !isSidebarExpanded }">Ingredient Categories</span>
              </router-link></li>

              <li class="mt-2.5">
                <router-link to="/admin/master/ingredient-units" class=" text-[#BFC1C6]
              text-14 hover:text-white">
                <font-awesome-icon icon="angles-right" class="text-xs" />
                <span class="ml-2 text-sm"
                      :class="{ 'hidden': !isSidebarExpanded }">Ingredient Units</span>
              </router-link></li>

              <li class="mt-2.5">
                <router-link to="/admin/master/ingredient" class=" text-[#BFC1C6] text-14
              hover:text-white">
                <font-awesome-icon icon="angles-right" class="text-xs" />
                <span class="ml-2 text-sm"
                      :class="{ 'hidden': !isSidebarExpanded }">Ingredient </span>
              </router-link></li>


              <li class="mt-2.5">
                <router-link to="/admin/master/vats" class=" text-[#BFC1C6] text-14 hover:text-white">
                <font-awesome-icon icon="angles-right" class="text-xs" />
                <span class="ml-2 "
                      :class="{ 'hidden': !isSidebarExpanded }">VAT's</span>
              </router-link></li>

              <li class="mt-2.5">
                <router-link to="/admin/master/modifiers" class=" text-[#BFC1C6] text-14 hover:text-white">
                <font-awesome-icon icon="angles-right" class="text-xs" />
                <span class="ml-2 text-sm"
                      :class="{ 'hidden': !isSidebarExpanded }">Modifiers</span>
              </router-link></li>

              <li class="mt-2.5">
                <router-link to="/admin/master/food-menu-categories" class=" text-[#BFC1C6] text-14 hover:text-white">
                <font-awesome-icon icon="angles-right" class="text-xs" />
                <span class="ml-2 text-sm"
                      :class="{ 'hidden': !isSidebarExpanded }">Food Menu Categories</span>
              </router-link></li>

              <li class="mt-2.5">
                <router-link to="/admin/master/food-menus" class=" text-[#BFC1C6] text-14 hover:text-white">
                <font-awesome-icon icon="angles-right" class="text-xs" />
                <span class="ml-2 text-sm"
                      :class="{ 'hidden': !isSidebarExpanded }">Food Menus</span>
              </router-link></li>

              <li class="mt-2.5"><router-link to="/admin/master/supplier" class=" text-[#BFC1C6] text-14 hover:text-white">
                <font-awesome-icon icon="angles-right" class="text-xs" />
                <span class="ml-2 text-sm"
                      :class="{ 'hidden': !isSidebarExpanded }">Suppliers</span>
              </router-link></li>

              <li class="mt-2.5">
                <router-link to="/admin/master/customer" class=" text-[#BFC1C6] text-14 hover:text-white">
                <font-awesome-icon icon="angles-right" class="text-xs" />
                <span class="ml-2 text-sm"
                      :class="{ 'hidden': !isSidebarExpanded }">Customers</span>
              </router-link></li>

              <li class="mt-2.5">
                <router-link to="/admin/master/expense-item" class=" text-[#BFC1C6] text-14 hover:text-white">
                <font-awesome-icon icon="angles-right" class="text-xs" />
                <span class="ml-2 text-sm"
                      :class="{ 'hidden': !isSidebarExpanded }">Expense Items</span>
              </router-link></li>

              <li class="mt-2.5">
                <router-link to="/admin/master/payment-method" class=" text-[#BFC1C6] text-14 hover:text-white">
                <font-awesome-icon icon="angles-right" class="text-xs" />
                <span class="ml-2 text-sm"
                      :class="{ 'hidden': !isSidebarExpanded }">Payment Method</span>
              </router-link></li>

              <li class="mt-2.5">
                <router-link to="/admin/master/tables" class=" text-[#BFC1C6] text-14 hover:text-white">
                <font-awesome-icon icon="angles-right" class="text-xs" />
                <span class="ml-2 text-sm"
                      :class="{ 'hidden': !isSidebarExpanded }">Tables</span>
              </router-link></li>


            </ul>

          </li>


          <li>
            <router-link
              to="#"
              @click="toggleSettingsDropdown"
              class="flex items-center justify-between px-3 py-3 text-[#dcdcdc] text-14 hover:text-white"
              :class="{ 'bg-gray-300 text-white': isActive('/admin/dashboard') }"
            >
              <!-- Left side: Icon and text -->
              <div class="flex items-center">
                <font-awesome-icon icon="gear" class="text-[14px]" />
                <span class="ml-2  text-[14px]"
                      :class="{ 'hidden': !isSidebarExpanded }">Settings</span>
              </div>

              <!-- Right side: Conditional Dropdown Icon -->
              <font-awesome-icon
                size="sm"
                color="white"
                class="mr-2"
                :icon="settingsDropdownOpen ? 'angle-down' : 'angle-left'"
              />
            </router-link>



            <!-- Dropdown content that appears when open -->
            <ul v-if="settingsDropdownOpen" class="ml-3">
              <!-- Add your dropdown items here -->
              <li class="mt-0">
                <router-link to="/admin/Settings/general" class=" text-[#dcdcdc]  hover:text-white">
                <font-awesome-icon icon="angles-right" class="text-xs" />
                <span class="ml-4 text-sm"
                      :class="{ 'hidden': !isSidebarExpanded }">General Settings</span>
              </router-link></li>
              <li class="mt-2">
                <router-link to="/admin/Settings/sms" class="text-[#dcdcdc] text-14 hover:text-white">
                <font-awesome-icon icon="angles-right" class="text-xs" />
                <span class="ml-4 text-sm"
                      :class="{ 'hidden': !isSidebarExpanded }">SMS Settings</span>
              </router-link></li>
              <li class="mt-2">
                <router-link to="/admin/Settings/manage-users" class="text-[#dcdcdc] text-14 hover:text-white">
                <font-awesome-icon icon="angles-right" class="text-xs" />
                <span class="ml-4 text-sm"
                      :class="{ 'hidden': !isSidebarExpanded }">Manage Users</span>
              </router-link></li>

              <li class="mt-2">
                <router-link to="/admin/Settings/change-profile" class="text-[#dcdcdc] text-14 hover:text-white">
                <font-awesome-icon icon="angles-right" class="text-xs" />
                <span class="ml-4 text-sm"
                      :class="{ 'hidden': !isSidebarExpanded }">Change Profile</span>
              </router-link></li>

              <li class="mt-2">
                <router-link to="/admin/Settings/change-password" class="text-[#dcdcdc] text-14 hover:text-white">
                <font-awesome-icon icon="angles-right" class="text-xs" />
                <span class="ml-4 text-sm"
                      :class="{ 'hidden': !isSidebarExpanded }">Change Password</span>
              </router-link></li>


              <li class="mt-2"><router-link to="/admin/Settings/logout" class="text-[#dcdcdc] text-14 hover:text-white">
                <font-awesome-icon icon="angles-right" class="text-xs" />
                <span class="ml-4 text-sm"
                      :class="{ 'hidden': !isSidebarExpanded }">Logout</span>
              </router-link></li>


            </ul>

          </li>


        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'

// Sidebar state
const isSidebarExpanded = ref(false)
const dropdownOpen = ref(false)
const settingsDropdownOpen = ref(false) // New state for Settings dropdown
const masterDropdownOpen = ref(false)
const reportDropdownOpen = ref(false)
// Check if the screen is less than 768px
const isMobile = computed(() => window.innerWidth < 768)

// Use Vue Router's `useRoute` to get current route
const route = useRoute()

// Toggle sidebar function
function toggleSidebar() {
  isSidebarExpanded.value = !isSidebarExpanded.value
}

// Toggle dropdown (for All Screens)
function toggleDropdown(event) {
  event.preventDefault()
  dropdownOpen.value = !dropdownOpen.value
}

// Toggle dropdown (for Settings)
function toggleSettingsDropdown(event) {
  event.preventDefault()
  settingsDropdownOpen.value = !settingsDropdownOpen.value // Only affects settings dropdown
}

function toggleMasterDropdown(event) {  // New function for Master dropdown
  event.preventDefault()
  masterDropdownOpen.value = !masterDropdownOpen.value  // Toggles the Master dropdown
}

function toggleReportDropdown(event) {  // New function for Reports dropdown
  event.preventDefault()
  reportDropdownOpen.value = !reportDropdownOpen.value  // Toggles the Reports dropdown
}

// Event listener for resizing
function handleResize() {
  if (window.innerWidth >= 768) {
    isSidebarExpanded.value = true // Expand sidebar on larger screens
  } else {
    isSidebarExpanded.value = false // Collapse sidebar on smaller screens
  }
}

// Close the sidebar when any item is clicked
function closeSidebar() {
  if (isMobile.value) {
    isSidebarExpanded.value = false
  }
}

// Function to check if a link is active
function isActive(path) {
  return route.path === path
}

// Set up event listeners on mount and clean up on unmount
onMounted(() => {
  window.addEventListener('resize', handleResize)
  handleResize() // Initial check
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>




<style scoped>
/* Optional: Style for active links */
.bg-gray-300 {
  background-color: #e2e8f0;
}
.transition-all {
  transition: width 0.3s ease;
}
.custom-scroll::-webkit-scrollbar {
  width: 2px;
}

.custom-scroll::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.custom-scroll::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

.custom-scroll::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
