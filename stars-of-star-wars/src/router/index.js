import { createWebHistory, createRouter } from "vue-router";
import ListView from "@/components/ListView.vue";
import ReviewView from "@/components/ReviewView.vue";

const routes = [
  {
    path: "/",
    name: "Character List",
    component: ListView,
  },
  {
    path: "/review/:name",
    name: "Review",
    component: ReviewView,    
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;