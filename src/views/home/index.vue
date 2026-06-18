<template>
    <a-space direction="vertical">
        <a-input v-model:value="value" placeholder="Basic usage" />
    </a-space>
</template>
<script setup>
import { watch, ref } from 'vue';
const value = ref('');
watch(value, () => {
    console.log(value.value);
});
</script>
