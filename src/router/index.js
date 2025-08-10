import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import homeAdmin from '@/admin/Home/HomeAdmin.vue'
import RestaurentSetting from '@/admin/Restaurant Settings/RestaurantSetting.vue'

//All Screen
import PeooSs from '@/admin/All Screen/PeooSs.vue'
import KitchenPanel from '@/admin/All Screen/KitchenPanel.vue'
import BarScreen from '@/admin/All Screen/BarScreen.vue'
import WaiterScreen from '@/admin/All Screen/WaiterScreen.vue'


import DashBoard from '@/admin/Dashboard/DashBoard.vue'
import PurchaseView from '@/admin/Purchase/PurchaseView.vue'
import SaleView from '@/admin/Sale/SaleView.vue'
import InventoryView from '@/admin/Inventory/InventoryView.vue'
import InventoryAdjustments from '@/admin/Inventory Adjustments/InventoryAdjustments.vue'
import WasteView from '@/admin/Waste/WasteView.vue'
import ExpenseView from '@/admin/Expense/ExpenseView.vue'
import SupplierDuePayment from '@/admin/SupplierDue/SupplierDuePayment.vue'
import CustomerDueReceive from '@/admin/Customer Due/CustomerDueReceive.vue'
import SendSms from '@/admin/Send SMS/SendSms.vue'
import AttendanceView from '@/admin/Attedance/AttendanceView.vue'

// Report components
import RegisterReport from '@/admin/Reports/RegisterReport.vue'
import DailySummary from '@/admin/Reports/DailySummary.vue'
import FoodSale from '@/admin/Reports/FoodSale.vue'
import DailySale from '@/admin/Reports/DailySale.vue'
import DetailedSale from '@/admin/Reports/DetailedSale.vue'
import ConsumptionView from '@/admin/Reports/ConsumptionView.vue'
import InventoryReport from '@/admin/Reports/InventoryReport.vue'
import LowInventory from '@/admin/Reports/LowInventory.vue'
import ProfitLoss from '@/admin/Reports/ProfitLoss.vue'
import VatReport from '@/admin/Reports/VatReport.vue'
import KitchenPerformance from '@/admin/Reports/KitchenPerformance.vue'
import AttendanceReport from '@/admin/Reports/AttendanceReport.vue'
import SupplierLedger from '@/admin/Reports/SupplierLedger.vue'
import SupplierDue from '@/admin/Reports/SupplierDue.vue'
import CustomerDue from '@/admin/Reports/CustomerDue.vue'
import CustomerLedger from '@/admin/Reports/CustomerLedger.vue'
import PurchaseReport from '@/admin/Reports/PurchaseReport.vue'
import ExpenseReport from '@/admin/Reports/ExpenseReport.vue'
import WasteReport from '@/admin/Reports/WasteReport.vue'

// Master components
import IngredientCategories from '@/admin/Master/IngredientCategories.vue'
import IngredientUnits from '@/admin/Master/IngredientUnits.vue'
import IngredientView from '@/admin/Master/IngredientView.vue'
import VatsView from '@/admin/Master/VatsView.vue'
import ModifiersView from '@/admin/Master/ModifiersView.vue'
import FoodMenuCategories from '@/admin/Master/FoodMenuCategories.vue'
import FoodMenus from '@/admin/Master/FoodMenus.vue'
import SupplierView from '@/admin/Master/SupplierView.vue'
import CustomerView from '@/admin/Master/CustomerView.vue'
import ExpenseItems from '@/admin/Master/ExpenseItems.vue'
import PaymentMethod from '@/admin/Master/PaymentMethod.vue'
import TablesMaster from '@/admin/Master/TablesMaster.vue'

// Settings components
import GeneralSetting from '@/admin/Settings/GeneralSetting.vue'
import SmsSetting from '@/admin/Settings/SmsSetting.vue'
import ManageUsers from '@/admin/Settings/ManageUsers.vue'
import ChangeProfile from '@/admin/Settings/ChangeProfile.vue'
import ChangePassword from '@/admin/Settings/ChangePassword.vue'
import LogOut from '@/admin/Settings/LogOut.vue'


//Top Bar
import AddPurchase from '@/admin/TopBar/AddPurchase.vue'
import TodaySummary from '@/admin/TopBar/TodaySummary.vue'
import RegisterDetails from '@/admin/TopBar/RegisterDetails.vue'
import CloseRegister from '@/admin/TopBar/CloseRegister.vue'

import FormLayout from '@/Sample work/FormLayout.vue'
import TableLayout from '@/Sample work/TableLayout.vue'
import DataStore from '@/Sample work/DataStore.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/admin/home',
      name: 'homeadmin',
      component: homeAdmin,
    },
    {
      path: '/admin/restaurant-setting',
      name: 'RestaurantSetting',
      component: RestaurentSetting,
    },
    {
      path: '/admin/all-screen/pos',
      name: 'PeooSs',
      component: PeooSs,
    },
    {
      path: '/admin/all-screen/kitchen-panel',
      name: 'KitchenPanel',
      component: KitchenPanel,
    },
    {
      path: '/admin/all-screen/bar-screen',
      name: 'BarScreen',
      component: BarScreen,
    },
    {
      path: '/admin/all-screen/waiter-screen',
      name: 'WaiterScreen',
      component: WaiterScreen,
    },
    {
      path: '/admin/dashboards',
      name: 'DashBoard',
      component: DashBoard,
    },
    {
      path: '/admin/purchase-view',
      name: 'PurchaseView',
      component: PurchaseView,
    },
    {
      path: '/admin/sale-view',
      name: 'SaleView',
      component: SaleView,
    },
    {
      path: '/admin/inventory-view',
      name: 'InventoryView',
      component: InventoryView,
    },
    {
      path: '/admin/inventory-adjustments',
      name: 'InventoryAdjustments',
      component: InventoryAdjustments,
    },
    {
      path: '/admin/waste',
      name: 'WasteView',
      component: WasteView,
    },
    {
      path: '/admin/expense',
      name: 'ExpenseView',
      component: ExpenseView,
    },
    {
      path: '/admin/supplier-Due',
      name: 'Supplier',
      component: SupplierDuePayment,
    },
    {
      path: '/admin/customer-Due',
      name: 'CustomerDueReceive',
      component: CustomerDueReceive,
    },
    {
      path: '/admin/send-sms',
      name: 'SendSms',
      component: SendSms,
    },
    {
      path: '/admin/attendance',
      name: 'AttendanceView',
      component: AttendanceView,
    },


    //Report //
    {
      path: '/admin/report/register',
      name: 'RegisterReport',
      component: RegisterReport,
    },
    {
      path: '/admin/report/daily-summary',
      name: 'DailySummary',
      component: DailySummary,
    },
    {
      path: '/admin/report/food-sale',
      name: 'FoodSale',
      component: FoodSale,
    },
    {
      path: '/admin/report/daily-sale',
      name: 'DailySale',
      component: DailySale,
    },
    {
      path: '/admin/report/detailed-sale',
      name: 'DetailedSale',
      component: DetailedSale,
    },
    {
      path: '/admin/report/consumption',
      name: 'ConsumptionView',
      component: ConsumptionView,
    },
    {
      path: '/admin/report/inventory',
      name: 'InventoryReport',
      component: InventoryReport,
    },
    {
      path: '/admin/report/low-inventory',
      name: 'LowInventory',
      component: LowInventory,
    },
    {
      path: '/admin/report/profit-loss',
      name: 'ProfitLoss',
      component: ProfitLoss,
    },
    {
      path: '/admin/report/vat-report',
      name: 'VatReport',
      component: VatReport,
    },
    {
      path: '/admin/report/kitchen',
      name: 'KitchenPerformance',
      component: KitchenPerformance,
    },
    {
      path: '/admin/report/attendance',
      name: 'AttendanceReport',
      component: AttendanceReport,
    },
    {
      path: '/admin/report/supplier-ledger',
      name: 'SupplierLedger',
      component: SupplierLedger,
    },
    {
      path: '/admin/report/supplier-due',
      name: 'SupplierDue',
      component: SupplierDue,
    },
    {
      path: '/admin/report/customer-due',
      name: 'CustomerDue',
      component: CustomerDue,
    },
    {
      path: '/admin/report/customer-ledger',
      name: 'CustomerLedger',
      component: CustomerLedger,
    },
    {
      path: '/admin/report/purchase',
      name: 'PurchaseReport',
      component: PurchaseReport,
    },
    {
      path: '/admin/report/expense',
      name: 'ExpenseReport',
      component: ExpenseReport,
    },
    {
      path: '/admin/report/waste',
      name: 'WasteReport',
      component: WasteReport,
    },
    // End Report//

    //Master//

    {
      path: '/admin/master/ingredient-categories',
      name: 'IngredientCategories',
      component: IngredientCategories,
    },
    {
      path: '/admin/master/ingredient-units',
      name: 'IngredientUnits',
      component: IngredientUnits,
    },
    {
      path: '/admin/master/ingredient',
      name: 'IngredientView',
      component: IngredientView,
    },
    {
      path: '/admin/master/vats',
      name: 'VatsView',
      component: VatsView,
    },
    {
      path: '/admin/master/modifiers',
      name: 'ModifiersView',
      component: ModifiersView,
    },
    {
      path: '/admin/master/food-menu-categories',
      name: 'FoodMenu',
      component: FoodMenuCategories,
    },
    {
      path: '/admin/master/food-menus',
      name: 'FoodMenus',
      component: FoodMenus,
    },
    {
      path: '/admin/master/supplier',
      name: 'SupplierView',
      component: SupplierView,
    },
    {
      path: '/admin/master/customer',
      name: 'CustomerView',
      component: CustomerView,
    },
    {
      path: '/admin/master/expense-item',
      name: 'ExpenseItems',
      component: ExpenseItems,
    },
    {
      path: '/admin/master/payment-method',
      name: 'PaymentMethod',
      component: PaymentMethod,
    },
    {
      path: '/admin/master/tables',
      name: 'TablesMaster',
      component: TablesMaster,
    },

    //End Master//

    //Setting//
    {
      path: '/admin/Settings/general',
      name: 'GeneralSetting',
      component: GeneralSetting,
    },
    {
      path: '/admin/Settings/sms',
      name: 'SmsSetting',
      component: SmsSetting,
    },
    {
      path: '/admin/Settings/manage-users',
      name: 'ManageUsers',
      component: ManageUsers,
    },
    {
      path: '/admin/Settings/change-profile',
      name: 'ChangeProfile',
      component: ChangeProfile,
    },
    {
      path: '/admin/Settings/change-password',
      name: 'ChangePassword',
      component: ChangePassword,
    },
    {
      path: '/admin/Settings/logout',
      name: 'LogOut',
      component: LogOut,
    },

    //End Settings//
    //Top Bar//

    {
      path: '/admin/navbar/add-purchase',
      name: ' AddPurchase',
      component:  AddPurchase,
    },
    {
      path: '/admin/navbar/today-summary',
      name: ' TodaySummary',
      component:  TodaySummary,
    },
    {
      path: '/admin/navbar/register-details',
      name: ' RegisterDetails',
      component:  RegisterDetails,
    },
    {
      path: '/admin/navbar/close-register',
      name: ' CloseRegister',
      component:  CloseRegister,
    },

    {
      path: '/admin/sample-work/form-layout',
      name: ' FormLayout',
      component:  FormLayout,
    },
    {
      path: '/admin/sample-work/table-layout',
      name: ' TableLayout',
      component:  TableLayout,
    },
    {
      path: '/admin/sample-work/DataStore',
      name: ' DataStore',
      component:  DataStore,
    },

  ],
})

export default router
