import { store } from "../store/index";
import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/login/index.vue";
import MainWindow from "@/views/layout/index.vue";

const routes = [
    {
        path: "/",
        name: "index",
        component: MainWindow,
    },
    {
        path: "/login",
        component: Login,
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

router.beforeEach((to, from, next) => {
    let token = store.getters["user/token"];
    debugger;
    if (token) {
        if (Object.keys(store.getters["user/userInfo"]).length === 0) {
            store.dispatch("user/SetMenus").then((asyncRoutes) => {
                asyncRoutes.forEach((route) => {
                    if (route.component && route.path) router.addRoute("index", route);
                });
                router.addRoute("index", {
                    path: "/:pathMatch(.*)*",
                    name: "未找到",
                    component: () => import("@/views/layout/NotFound.vue"),
                    meta: { closable: true },
                });
                // 登录首次访问 "/" 时，默认跳转到第一个菜单
                if (to.path === "/" && asyncRoutes.length > 0) {
                    next({
                        path: asyncRoutes[0].path,
                        replace: true,
                    });
                } else {
                    next({
                        ...to,
                        replace: true,
                    });
                }
            });
        } else {
            if (to.path === "/login") next("/");
            else {
                next();
                store.commit("user/setRoute", to);
            }
        }
    } else {
        if (to.path === "/login") {
            next();
            store.commit("user/setRoute", to);
        }
        else next({ path: "/login", query: { redirect: to.fullPath } });
    }
});



export default router;