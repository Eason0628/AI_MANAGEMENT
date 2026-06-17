export default {
    namespaced: true,
    state: {
        token: "token",
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
        }
    },
    actions: {
        setToken({ commit }, token) {
            commit("setToken", token);
        }
    },
    getters: {
        getToken(state) {
            return state.token;
        }
    }
}