<template>
    <div>
        <h1>Login</h1>
        <a-button type="primary" @click="login">登录</a-button>
    </div>
</template>

<script>
import { loginApi } from "@/service/auth";
import { reactive, toRefs } from "vue";
export default {
    name: "Login",
    setup() {
        let state = reactive({
            user: {
                username: "admin",
                password: "admin123123",
            },
        });
        const login = async () => {
            let res = await loginApi(state.user);
            if (res.code === 200) {
                console.log(res);
            }
        }
        return {
            ...toRefs(state),
            login,
        }
    },
}
</script>


<style lang="less" scoped></style>