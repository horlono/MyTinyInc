import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignUp from "@/views/SignUp.vue";
import Dashboard from "@/views/dashboard/Dashboard.vue";
import LogIn from "@/views/LogIn.vue";
import MyAccount from "@/views/dashboard/MyAccount.vue";
import Clients from "@/views/dashboard/Clients.vue";
import Client from "@/views/dashboard/Client.vue";
import AddClient from "@/views/dashboard/AddClient.vue";
import EditClient from "@/views/dashboard/EditClient.vue";
import EditTeam from "@/views/dashboard/EditTeam.vue";
import Invoices from "@/views/dashboard/Invoices.vue";
import store from "@/store";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/sign-up",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/log-in",
    name: "LogIn",
    component: LogIn,
  },
  {
    path: "/dashboard",
    name: "DashboardView",
    component: Dashboard,
    meta: {
      requireLogin: true,
    },
  },
  {
    path: "/dashboard/invoices",
    name: "DashboardInvoices",
    component: Invoices,
    meta: {
      requireLogin: true,
    },
  },
  {
    path: "/dashboard/clients",
    name: "DashboardClients",
    component: Clients,
    meta: {
      requireLogin: true,
    },
  },
  {
    path: "/dashboard/clients/add",
    name: "AddClient",
    component: AddClient,
    meta: {
      requireLogin: true,
    },
  },
  {
    path: "/dashboard/clients/:id",
    name: "ClientView",
    component: Client,
    meta: {
      requireLogin: true,
    },
  },
  {
    path: "/dashboard/clients/:id/edit",
    name: "EditClient",
    component: EditClient,
    meta: {
      requireLogin: true,
    },
  },
  {
    path: "/dashboard/my-account",
    name: "MyAccount",
    component: MyAccount,
    meta: {
      requireLogin: true,
    },
  },
  {
    path: "/dashboard/my-account/edit-team",
    name: "EditTeam",
    component: EditTeam,

    meta: {
      requireLogin: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  if (
    to.matched.some((record) => record.meta.requireLogin) &&
    !store.state.isAuthenticated
  ) {
    next("/log-in");
  } else {
    next();
  }
});

export default router;
