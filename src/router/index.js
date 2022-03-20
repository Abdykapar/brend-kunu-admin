import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/admin",
    name: "Admin",
    component: () => import("../views/AdminLayout.vue"),
    children: [
      {
        path: "categories",
        name: "Categories",
        component: () => import("../views/Categories.vue"),
      },
      {
        path: "posts",
        name: "Posts",
        component: () => import("../views/Posts.vue"),
      },
      {
        path: "posts/create",
        name: "PostCreate",
        component: () => import("../views/PostCreate.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
