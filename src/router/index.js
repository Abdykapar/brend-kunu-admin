import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import VueCookies from "vue-cookies";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { auth: true },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/admin",
    name: "Admin",
    meta: { auth: true },
    component: () => import("../views/AdminLayout.vue"),
    children: [
      {
        path: "categories",
        name: "Categories",
        meta: { auth: true },
        component: () => import("../views/Categories.vue"),
      },
      {
        path: "posts",
        name: "Posts",
        meta: { auth: true },
        component: () => import("../views/Posts.vue"),
      },
      {
        path: "posts/create",
        name: "PostCreate",
        meta: { auth: true },
        component: () => import("../views/PostCreate.vue"),
      },
      {
        path: "posts/edit/:id",
        meta: { auth: true },
        name: "PostEdit",
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

router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
    const authData = VueCookies.get("data");
    if (authData) next();
    else next({ name: "Login" });
  } else next();
});

export default router;
