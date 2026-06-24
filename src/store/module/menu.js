export default {
    namespaced:  true,
    state: {
        selectedKeys:[],
        openKeys: []
    },
    mutations: {
        setSelectedKeys(state, val) {
            state.selectedKeys = val
        },
        setOpenKeys(state, val) {
            state.openKeys = val
        }
    },
    actions: {
        // updateSelectedKeys({commit}, keys) {
        //     commit('set_selected_keys', keys)
        // },
        // updateOpendKeys({commit}, keys) {
        //     commit('set_open_keys', keys)
        // }
    },
    getters: {
        getSelecteKeys(state) {
            return state.selectedKeys
        },
        getOpenKeys(state) {
            return state.openKeys
        }
    }
}