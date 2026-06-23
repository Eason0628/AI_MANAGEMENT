<template>
    <a-layout>
        <Header />
        <a-layout>
            <Sider />
            <Content />
        </a-layout>
    </a-layout>
</template>

<script setup>
import Header from './Header.vue'
import Sider from './Sider.vue'
import Content from './Content.vue'
</script>

<style lang="less" scoped>
.ant-layout {
    background: #f0f2f5;
    height: 100%;
}
</style>
