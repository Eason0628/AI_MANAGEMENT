<template>
    <div>
        <h1>Home</h1>
    </div>
</template>

<script>
import { userInfo } from "@/service/auth";
import { reactive, toRefs, ref } from "vue";
export default {
    name: "Home",
    setup() {
        let state = reactive({
            menuList: [],
        });
        userInfo().then((res) => {
            console.log(res);
        });
        return {
            ...toRefs(state),
        }
    }
}
</script>
