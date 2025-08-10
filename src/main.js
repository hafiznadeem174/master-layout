// main.js
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Import FontAwesome library and specific icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHouseChimney,faGear,faCartShopping,faUtensils } from '@fortawesome/free-solid-svg-icons'
import { faTablet,faGaugeHigh,faWarehouse,faVault,faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { faTicket,faMoneyBill1,faWallet,faMessage,faClock,faClipboard,faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { faBars,faAngleLeft,faAngleDown,faAnglesRight,faTruck,faList,faRegistered } from '@fortawesome/free-solid-svg-icons'
import { faUsers,faPhone,faEnvelope,faPenToSquare,faEye,faCaretUp,faCaretDown,faCalendar } from '@fortawesome/free-solid-svg-icons'
import { faArrowRightLong,faPlus,faFileArrowDown,faRotateLeft,faBell,faRectangleList } from '@fortawesome/free-solid-svg-icons'
import { faCalculator,faXmark,faBackwardStep,faRightFromBracket,faDiceFour,faGhost } from '@fortawesome/free-solid-svg-icons'
import { faSquarePlus,faCircleMinus,faCirclePlus,faShield,faReceipt } from '@fortawesome/free-solid-svg-icons'
// Import the FontAwesomeIcon component
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Add the icon to the library
library.add(faHouseChimney,faGear,faTablet,faGaugeHigh,faCartShopping,faUtensils,faWarehouse)
library.add(faVault,faTrashCan,faTicket,faMoneyBill1,faWallet,faMessage,faClock,faClipboard)
library.add(faBars,faAngleLeft,faAngleDown,faAnglesRight,faTruck,faList,faRegistered,faCircleXmark)
library.add(faUsers,faPhone,faEnvelope,faPenToSquare,faEye,faCaretUp,faCaretDown,faCalendar)
library.add(faArrowRightLong,faPlus,faFileArrowDown,faRotateLeft,faBell,faRectangleList)
library.add(faCalculator,faXmark,faBackwardStep,faRightFromBracket,faDiceFour,faGhost)
library.add(faSquarePlus,faCircleMinus,faCirclePlus,faShield,faReceipt)
// Create the Vue app
const app = createApp(App)

// Register Pinia and Router
app.use(createPinia())
app.use(router)

// Register FontAwesomeIcon globally
app.component('font-awesome-icon', FontAwesomeIcon)

// Mount the app
app.mount('#app')
