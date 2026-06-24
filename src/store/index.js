import { createStore } from "vuex";
import user from "./module/user";
import menu from "./module/menu";

export const store = createStore({
    modules: {
        user,
        menu,
    },
});