<template>
    <div>
        <h1>Login</h1>
    </div>
</template>

<script>
import { reactive, toRefs } from "vue";
export default {
    name: "Login",
    setup() {
        let state = reactive({

        });
        return {
            ...toRefs(state),
        }
    },
}
</script>


<style lang="less" scoped>
</style>