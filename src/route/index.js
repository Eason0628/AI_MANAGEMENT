import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/login/index.vue";
import Home from "@/views/home/index.vue";

const routes = [
    {
        path: "/",
        component: Login,
    },
    {
        path: "/home",
        component: Home,
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

export default router;