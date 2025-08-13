import { createRouter, createWebHistory } from "vue-router";
import UserLayout from "../layouts/UserLayout.vue";
import AdminLayout from "../layouts/AdminLayout.vue";

import Home from "../pages/Home.vue";
import About from "../pages/About.vue";
import Services from "../pages/Services.vue";
import Portfolio from "../pages/Portfolio.vue";
import Blog from "../pages/Blog.vue";
import Contact from "../pages/Contact.vue";
const routes = [
  {
    path: "/",
    component: UserLayout,
    children: [
      { path: "", name: "Home", component: Home },
      { path: "about", name: "About", component: About },
      { path: "services", name: "Services", component: Services },
      { path: "portfolio", name: "Portfolio", component: Portfolio },
      { path: "blog", name: "Blog", component: Blog },
      { path: "contact", name: "Contact", component: Contact },
    ],
  },
  {
    path: "/admin",
    component: AdminLayout,
    children: [
      { path: "", name: "AdminDashboard", component: () => import("../components/admin/AdminDashboard.vue") },
      { path: "users", name: "AdminUsers", component: () => import("../components/admin/AdminUsers.vue") },
      { path: "settings", name: "AdminSettings", component: () => import("../components/admin/AdminSettings.vue") },
      { path: "reports", name: "AdminReports", component: () => import("../components/admin/AdminReports.vue") },
      { path: "messages", name: "AdminMessages", component: () => import("../components/admin/AdminMessages.vue") },
      { path: "profile", name: "AdminProfile", component: () => import("../components/admin/AdminProfile.vue") },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
