<template>
    <a-layout-sider :width="width" v-model:collapsed="collapsed" collapsible :collapsedWidth="0" theme="light"
        class="menuLayout">

        <a-menu mode="inline" :openKeys="openKeys" v-model:selectedKeys="selectedKeys" @openChange="onOpenChange">
            <template v-for="item in $store.getters['user/menus'].sort((t1, t2) => t1.sortNum - t2.sortNum)">
                <template v-if="!item.children || !item.children.length">
                    <a-menu-item :key="item.menuId">
                        <template #icon>
                            <Icon :icon="item.meta.icon" />
                        </template>
                        <template v-if="item.path">
                            <router-link :to="item.path">{{ $t(item.name) }}</router-link>
                        </template>
                        <template v-else>{{ $t(item.name) }}</template>
                    </a-menu-item>
                </template>
                <template v-else>
                    <sub-menu :menu="item" :key="item.menuId" />
                </template>
            </template>
        </a-menu>
        <template #trigger>
            <left-outlined></left-outlined>
        </template>
    </a-layout-sider>
</template>
<script>
import { useStore } from "vuex";
import { reactive, toRefs, onMounted, watch } from "vue";
import { Icon } from "@/common/icons"
import { LeftOutlined } from "@ant-design/icons-vue";
import SubMenu from "./SubMenu.vue"
import { tree2listForSider } from "@/service/utils";

export default {
    name: "Sider",
    props: {
        width: {
            type: Number,
            default: 240,
        },
    },
    components: {
        Icon,
        LeftOutlined,
        SubMenu
    },
    setup() {
        const store = useStore();

        const state = reactive({
            collapsed: false,
            openKeys: [],
            rootSubmenuKeys: [],
            selectedKeys: [],
            menuList: [],
        });

        /**
         * 初始化一级菜单ID
         */
        const initRootKeys = () => {
            state.rootSubmenuKeys = store.getters["user/menus"].map(item => item.menuId);
        };

        /**
         * 初始化菜单列表（树 => 数组）
         */
        const initMenuList = () => {
            const menuList = JSON.parse(JSON.stringify(store.getters["user/menus"]));
            state.menuList = tree2listForSider(menuList);
        };

        /**
         * 更新选中菜单
         */
        const updateSelectedKeys = (keys) => {
            state.selectedKeys = keys;
            store.commit("menu/setSelectedKeys", keys);
        };

        /**
         * 更新展开菜单
         */
        const updateOpenKeys = (keys) => {
            state.openKeys = keys;
            store.commit("menu/setOpenKeys", keys);
        };

        /**
         * 根据菜单计算所有父菜单
         */
        const calcOpenKeys = (menu) => {
            const keys = [];
            let parentId = menu.menuParentId;
            while (parentId) {
                keys.unshift(parentId);
                parentId = state.menuList.find(
                    item => item.menuId === parentId
                )?.menuParentId;

            }
            return keys;
        };

        /**
         * 根据路由恢复菜单状态
         */
        const showNowPage = (route) => {
            if (!route) return;
            const menu = state.menuList.find(
                item => item.path === route.path
            );
            if (!menu) {
                updateSelectedKeys([]);
                updateOpenKeys([]);
                return;
            }

            updateSelectedKeys([menu.menuId]);
            updateOpenKeys(
                calcOpenKeys(menu)
            );

        };

        /**
         * 菜单展开事件
         */
        const onOpenChange = (keys) => {
            const latestOpenKey = keys.find(
                key => !state.openKeys.includes(key)
            );
            if (!state.rootSubmenuKeys.includes(latestOpenKey)) {
                updateOpenKeys(keys);
            } else {
                updateOpenKeys(
                    latestOpenKey ? [latestOpenKey] : []
                );
            }

        };

        /**
         * 初始化
         */
        onMounted(() => {
            initRootKeys();
            initMenuList();
            state.selectedKeys = store.getters["menu/getSelecteKeys"];
            state.openKeys = store.getters["menu/getOpenKeys"];
            showNowPage(
                store.getters["user/route"]
            );

        });


        watch(
            () => store.getters["user/route"],
            (route) => {
                showNowPage(route);
            }

        );

        watch(
            () => store.getters["menu/getSelecteKeys"],
            (keys) => {
                state.selectedKeys = keys;
            }
        );

        // watch(
        //     () => store.getters["menu/getOpenKeys"],
        //     (keys) => {
        //         state.openKeys = keys;
        //     }
        // );

        return {
            ...toRefs(state),
            onOpenChange,

        };
    }

}

</script>
<style scoped lang="less">
.ant-layout-sider {
    box-shadow: 1px 0 6px rgb(0 0 0 / 20%);
}

.menuLayout {
    background: url(/images/menuBack.png);
}

:deep(.ant-menu-root) {
    margin-top: 5px;
    background: transparent;
    height: calc(100% - 5px);
    overflow-x: hidden;
    overflow-y: auto;

    &>.ant-menu-item,
    .ant-menu-submenu-title {
        color: #000;
        background: linear-gradient(to right, #b2e1f8, #7acaf2);
        margin: 5px 20px;
        width: calc(100% - 40px);
        border-radius: 8px;

        &:hover,
        &:focus {
            background: linear-gradient(to right, #45b7f0, #1591d0);
            color: #000;
        }

        .ant-menu-title-content a {
            color: #000;
        }

        &.ant-menu-item-selected {
            background: linear-gradient(to right, #45b7f0, #1591d0);
            color: #fff;

            .router-link-active {
                color: #fff;
            }
        }
    }

    .ant-menu-submenu-title {
        margin-bottom: 0 !important;
    }

    .ant-menu-sub {
        background: transparent;

        .ant-menu-item {
            background: transparent;

            &:hover,
            &:focus {
                color: var(--primary-color);
                background: transparent;

                .ant-menu-title-content a {
                    color: var(--primary-color);
                }
            }

            &.ant-menu-item-selected {
                color: var(--primary-color);

                a {
                    color: #000;
                }

                .router-link-exact-active {
                    color: var(--primary-color);
                }

                &:after {
                    display: none;
                }
            }
        }
    }
}

:deep(.ant-layout-sider-zero-width-trigger) {
    width: 16px !important;
    height: 32px !important;
    line-height: 32px !important;
    right: -16px !important;
    top: 50% !important;
    transform: translateY(-50%);
    border-radius: 0 16px 16px 0 !important;
    border-top: 1px solid var(--border-color-split);
    border-right: 1px solid var(--border-color-split);
    border-bottom: 1px solid var(--border-color-split);
    transition: all 0.3s;
    font-size: 16px;
    cursor: pointer;
}

:deep(.ant-layout-sider-zero-width-trigger):hover {
    color: var(--primary-color);
}

:deep(.ant-layout-sider-zero-width-trigger) .anticon {
    transform: translate(-3px);
    transition: all 0.3s ease-in-out;
}

.ant-layout-sider-collapsed .ant-layout-sider-zero-width-trigger .anticon {
    transform: rotate(180deg) translateX(5px);
}
</style>
