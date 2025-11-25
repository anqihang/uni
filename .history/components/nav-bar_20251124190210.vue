<template>
	<view class="navBar thms-flex" :style="`padding-top:${statusBarHeight}px;height:${height}px`">
		<view :style="`width:${width / 2}px`">
			<view
				class="thms-py-2 thms-h-full thms-box-border"
				@tap="backHome(back ? 'back' : home ? 'home' : '')"
			>
				<image
					v-if="back"
					src="/static/svg/back.svg"
					class="thms-w-full"
					style="height: 100%"
				></image>
				<image
					v-if="home"
					src="/static/svg/home.svg"
					class="thms-w-full"
					style="height: 100%"
				></image>
			</view>
		</view>
		<view
			class="thms-flex-1 thms-flex thms-items-center thms-justify-center"
			:style="`padding-left:${width / 2}px`"
		>
			{{ title }}
		</view>
		<view :style="`width:${width}px`"></view>
	</view>
</template>

<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";
import { router } from "../cool";
const statusBarHeight = ref(0);
const height = ref(0);
const width = ref(0);
const back = ref(false);
const home = ref(false);
const props = defineProps({
	title: {
		type: String,
		default: "",
	},
});

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
function backHome(type: String) {
	if (type === "back") {
		uni.navigateBack();
	}
	if (type === "home") {
		uni.reLaunch({ url: "/pages/index/index" });
	}
}
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
