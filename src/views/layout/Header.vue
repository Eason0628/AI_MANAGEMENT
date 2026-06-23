<template>
    <a-layout-header>
        <div class="logo">
            <img class="titlePic" :src="imgSrc" />
            <h1>{{ title }}</h1>
        </div>
    </a-layout-header>
</template>

<script>
export default {
    name: "Header",

}

</script>
<style scoped lang="less">
.ant-layout-header {
    height: 70px;
    // background: #1f9cdc;
    // background-image: linear-gradient(to right, #26c0eb, v#1f9cdc);
    // border: 1px solid black;
    background: #fff;
}
</style>
