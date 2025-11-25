<template>
	<view class="thms-flex thms-flex-col thms-h-full thms-bg-green-300">
		<navBar></navBar>
		<view class="thms-flex-1 thms-overflow-hidden">
			<view v-for="(item, index) in list" :key="index" @tap="item.id === 6 ? scan : ''">
				<view></view>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import navBar from "/components/nav-bar.vue";
const list = ref([
	{ id: 0, name: "同步患者" },
	{ id: 1, name: "我的设置" },
	{ id: 2, name: "同步患者" },
	{ id: 3, name: "联系客服" },
	{ id: 4, name: "设备管理" },
	{ id: 5, name: "邀请好友" },
	{ id: 6, name: "扫码" },
]);
function scan() {
	uni.scanCode({
		success: function (res) {
			console.log(res);
		},
	});
}
</script>

<style scoped></style>
