import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../pages/home.vue";
import Category from "../pages/category.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      layout: "full"
    }
  },
  {
    path: "/:storeid/category",
    name: "Category",
    component: Category,
    meta: {
      layout: "full"
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
