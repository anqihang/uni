<template>
	<view class="navBar thms-flex" :style="`padding-top:${statusBarHeight}px;height:${height}px`">
		<view :style="`width:${width / 2}px`">
			<view class="back" v-if="back"></view>
			<view class="home" v-if="home"></view>
		</view>
		<view class="thms-flex-1"></view>
		<view :style="`width:${width}px`"></view>
	</view>
</template>

<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";
const statusBarHeight = ref(0);
const height = ref(0);
const width = ref(0);
const back = ref(false);
const home = ref(false);

onLoad(() => {
	const menuButton = uni.getMenuButtonBoundingClientRect();
	console.log(menuButton);
	const systemInfo = uni.getSystemInfoSync();
	statusBarHeight.value = systemInfo.statusBarHeight || 0;
	console.log(statusBarHeight.value);
	height.value =
		menuButton.bottom + menuButton.top - statusBarHeight.value - statusBarHeight.value;
	width.value = systemInfo.windowWidth - menuButton.left;

	const pages = getCurrentPages();
	if (pages.length > 1) {
		back.value = true;
		home.value = false;
	} else if (pages[0].route !== "pages/index/index") {
		home.value = true;
		back.value = false;
	}
});
</script>

<style scoped lang="scss">
.navBar {
	padding-top: env(safe-area-inset-top);
}
.back {
}
.home {
}
</style>
