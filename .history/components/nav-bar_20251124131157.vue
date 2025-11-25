<template>
	<view
		class="navBar thms-flex"
		style="height: calc(env(safe-area-inset-top) + 44px); padding-top: env(safe-area-inset-top)"
	>
		<view></view>
		<view></view>
		<view></view>
	</view>
</template>

<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";
const statusBarHeight = ref(0);
onLoad(() => {
	const menuButton = uni.getMenuButtonBoundingClientRect();
	console.log(menuButton);
	const systemInfo = uni.getSystemInfoSync();
	statusBarHeight.value = systemInfo.statusBarHeight || 0;
	console.log(statusBarHeight.value);
});
</script>

<style scoped></style>
