import Vue from "vue";
import VueRouter, { Route, RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import Book from "../views/Book.vue";
import store from "@/store/root.store";

Vue.use(VueRouter);

const handleEnterBooking = async (to: Route, from: Route, next: any) => {
  if (store.state["email"]) {
    return next();
  }
  router.push("/");
};

const routes: Array<RouteConfig> = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "*",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/book",
    name: "Book",
    component: Book,
    beforeEnter: handleEnterBooking,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
