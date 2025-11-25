<template>
	<view class="thms-flex thms-flex-col thms-h-full thms-bg-green-300">
		<navBar title="我的"></navBar>
		<view class="thms-flex-1 thms-overflow-hidden">
			<view v-for="(item, index) in list" :key="index" @tap="clickMethod(item)">
				<view v-if="item.id === 3">
					<button open-type="share"></button>
				</view>
				<view v-else></view>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import navBar from "/components/nav-bar.vue";
import { router } from "/@/cool";
const list = ref([
	{ id: 0, name: "同步患者" },
	{ id: 1, name: "我的设置" },
	{ id: 3, name: "联系客服" },
	{ id: 4, name: "设备管理" },
	{ id: 5, name: "邀请好友" },
	{ id: 6, name: "扫码" },
]);

function clickMethod(item) {
	if (item.id === 0) {
		router.push({
			path: "/pages/mine/patient/async",
		});
	}
	if (item.id === 1) {
		router.push({
			path: "/pages/mine/setting/index",
		});
	}
	if (item.id === 2) {
		router.push({
			path: "/pages/mine/",
		});
	}
	if (item.id === 4) {
		router.push({
			path: "/pages/mine/device/index",
		});
	}
	if (item.id === 5) {
		invite();
	}
	if (item.id === 6) {
		scan();
	}
}
function scan() {
	uni.scanCode({
		success: function (res) {
			console.log(res);
			const str = res.path.indexOf("scene=")
				? decodeURIComponent(res.path.split("?scene=")[1])
				: "";

			const options = {
				action: "",
			};
		},
	});
}
function invite() {
	uni.share({
		title: "小手健康",
		imageUrl: "",
		href: "/pages/index/index",
	});
}
</script>

<style scoped></style>
