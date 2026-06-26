import { menus } from "@/service/menu";
import { userInfo } from "@/service/auth";
import { list2tree, tree2list } from "@/service/utils";
import { TOKEN_KEY } from "@/service/constant";

const routeAllPathToCompMap = import.meta.glob(`@/views/**/*.vue`);
export default {
    namespaced: true,
    state: {
        token: localStorage.getItem(TOKEN_KEY) ? localStorage.getItem(TOKEN_KEY) : "",
        userInfo: {},
        menus: [],
        route: {},
        routes: [],
        theme: localStorage.getItem("THEME_TYPE") ? localStorage.getItem("THEME_TYPE") : "1",
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
            if (token) localStorage.setItem(TOKEN_KEY, token);
            else {
                localStorage.removeItem(TOKEN_KEY);
                location.href = "/login";
            }
        },
        setMenus(state, val) {
            state.menus = val;
        },
        setRoutes(state, val) {
            state.routes = val;
        },
        setRoute(state, val) {
            state.route = val;
        },
        setUserInfo(state, val) {
            state.userInfo = val;
        },
        setTheme(state, val) {
            state.theme = val;
        },

    },
    actions: {
        SetMenus({ commit, state }) {
            return new Promise((resolve, reject) => {
                userInfo().then((res) => {
                    if (!res.data) return;
                    commit("setUserInfo", res.data);
                });
                menus()
                    .then((res) => {
                        if (!res.data) return;
                        let data = tree2list(res.data);
                        data.forEach((t) => {
                            if (t.path && !t.path.startsWith("/layout")) t.path = "/layout" + t.path;
                        });
                        commit("setMenus", list2tree(data, "menuId", "menuParentId", "children"));
                        commit("setRoutes", data.sort((a, b) => a.sortNum - b.sortNum));
                        data.forEach((r) => {
                            if (r.component) {
                                try {
                                    r.component = routeAllPathToCompMap[`/src/views/${r.component}`];
                                } catch {
                                    r.component = null;
                                }
                            }
                        });
                        ("data:", JSON.stringify(data));
                        resolve(data);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
    },
    getters: {
        token(state) {
            return state.token;
        },
        menus(state) {
            return state.menus;
        },
        routes(state) {
            return state.routes;
        },
        route(state) {
            return state.route;
        },
        userInfo(state) {
            return state.userInfo;
        },
        theme(state) {
            return state.theme;
        },
    }
}