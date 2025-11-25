<template>
	<view :style="`height:${height}px`"></view>
</template>

<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";

const height = ref(0);
onLoad(() => {
	const statusBarHeight = uni.getSystemInfoSync().statusBarHeight;
	const menuButton = uni.getMenuButtonBoundingClientRect();
	height.value = menuButton.bottom + menuButton.top - statusBarHeight!;
});
</script>

<style scoped></style>
