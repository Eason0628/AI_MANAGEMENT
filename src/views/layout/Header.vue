<template>
    <a-layout-header>
        <div class="logo">
            <img class="titlePic" :src="imgSrc" />
            <h1>{{ $t("header.title") }}</h1>
        </div>
        <div>
            <div>
                {{ $store.getters["user/userInfo"].data.current_user.display_name }}
                <Icon icon="UserOutlined"></Icon>
            </div>
            <div @click="logout" class="logout">{{ $t("header.exit") }}
                <Icon icon="PoweroffOutlined"></Icon>
            </div>
        </div>
    </a-layout-header>
</template>

<script>
import { Icon } from "@/common/icons"
import { reactive, toRefs } from "vue";
import { useStore } from "vuex";
import router from "@/route";

export default {
    name: "Header",
    components: { Icon },
    setup() {
        const store = useStore();

        let state = reactive({
            isFull: false,
            imgSrc: "/images/intesim_logo.png",
        });
        const logout = () => {
            store.commit("user/setToken", "");
            router.push({ name: "Login" });
        }
        return {
            ...toRefs(state),
            logout,
        };
    }
}

</script>
<style scoped lang="less">
.ant-layout-header {
    background-image: linear-gradient(to right, #26c0eb, var(--primary-color));
    padding: 0 0 0 24px;
    display: flex;
    color: #fff;
    justify-content: space-between;
    height: 70px;
    line-height: 70px;

    h1 {
        margin: 0 0 0 4px;
        font-weight: 500;
        font-size: 30px;
        line-height: 70px;
        max-height: 70px;
        animation: fade-in;
        animation-duration: var(--animation-duration-slow);
        white-space: nowrap;
        color: #fff;
    }

    &>div {
        display: flex;
        font-size: 16px;

        &>div {
            margin-left: 16px;
            cursor: pointer;
        }
    }

    .logo img {
        width: 150px;
        height: 70px;
        margin-right: 11px;
    }


}

.logout {
    background: #0774ab;
    z-index: 1;
    margin-left: 0 !important;
    width: 120px;
    padding-left: 50px;
    background: linear-gradient(-300deg, transparent 29%, transparent, 1%, transparent, 1%, #0774ab 67%);
}
</style>
