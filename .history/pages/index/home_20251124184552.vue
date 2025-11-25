<template>
	<view class="thms-flex thms-flex-col thms-h-full">
		<navBar title="首页"></navBar>
		<view class="thms-flex-1 thms-overflow-hidden thms-flex thms-flex-col">
			<cl-tabs v-model="active" :list="tabList"></cl-tabs>
			<scroll-view scroll-y class="thms-flex-1">
				<view v-for="(item, index) in list" :key="index" class="thms-px-4">
					<view></view>
					<view class="thms-rounded-md thms-relateive" @tap="toDetail(item)">
						<view></view>
						<view class="thms-absolute thms-bottom-0 thms-left-0 thms-right-0"></view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import navBar from "/@/components/nav-bar.vue";
const tabList = reactive([
	{
		label: "数码",
	},
]);
const active = ref("");
const list = ref([{ id: 0, name: "1", type: 0 }]);
function toDetail(item) {
	uni.navigateTo({ url: "" });
}
</script>

<style scoped></style>
