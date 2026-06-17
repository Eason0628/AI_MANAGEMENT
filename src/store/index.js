import { createStore } from "vuex";
import user from "./module/user";

export const store = createStore({
    modules: {
        user,
    },
});