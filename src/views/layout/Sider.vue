<template>
    <a-layout-sider class="menuLayout">

    </a-layout-sider>
</template>
<script>
import { useStore } from "vuex";
import { reactive, toRefs } from "vue";
export default {
    name: "Sider",
    props: {
        width: {
            type: Number,
            default: 240,
        },
    },
    setup() {
        const store = useStore();
        
        let state = reactive({
            collapsed: false,
            openKeys: [],
            rootSubmenuKeys: [],
            selectedKeys: [],
            menuList: [],
        });
        return { ...toRefs(state), store };
    }
}

</script>
<style scoped lang="less">
.ant-layout-sider {
    // box-shadow: 1px 0 6px rgb(0 0 0 / 20%);
    background: #fff;
}
</style>
