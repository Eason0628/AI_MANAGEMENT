import { store } from "@/store/index";
import { message } from "ant-design-vue";
import { TOKEN_KEY } from "@/service/constant";
import axios from "axios";
import router from "@/route";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const service = axios.create({
    baseURL: "/api",
    timeout: 100000,
});

let loadingNum = 0;

function startLoading() {
    if (loadingNum === 0) NProgress.start();
    loadingNum++;
}

function endLoading() {
    loadingNum--;
    if (loadingNum <= 0) NProgress.done();
}

service.defaults.headers["Content-Type"] = "application/json; charset=utf-8";

service.interceptors.request.use(
    (config) => {
        const token = store.getters["user/token"];
        if (token && config.url !== "/login") {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        config.headers["Content-Type"] = "application/json";
        startLoading();
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
service.interceptors.response.use(
    (response) => {
        endLoading();
        if (response.headers[TOKEN_KEY]) store.commit("user/setToken", response.headers[TOKEN_KEY]);
        return response.data;
    },
    (error) => {
        endLoading();
        if (error.response) {
            if (error.response.status === 401) {
                store.commit("user/setToken", "");
                router.push({
                    path: "/login",
                    query: {
                        redirect: router.currentRoute.value.path !== "/login" ? router.currentRoute.value.path : undefined,
                    },
                });
            } else if (error.response.status === 404) {
                message.error("Not Found!");
            } else message.error(error.response.data.message);
        }
        return Promise.reject(error);
    }
);
export default service;
