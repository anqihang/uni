<template>
	<view class="thms-flex thms-flex-col thms-h-full">
		<navBar title="首页"></navBar>
		<view class="thms-flex-1 thms-overflow-hidden thms-flex thms-flex-col">
			<!-- <cl-tabs v-model="active" :list="tabList"></cl-tabs> -->
			<t-tabs
				:defaultValue="0"
				class="thms-flex-1 thms-flex thms-flex-col thms-overflow-hidden"
				t-class-content="h-full"
			>
				<t-tab-panel
					label="选项"
					:value="index"
					v-for="(tab, index) in tabList"
					:key="index"
					custom-style="height: 100%"
				>
					<scroll-view scroll-y class="thms-h-full">
						<view v-for="(item, index) in tab.list" :key="index" class="thms-px-4">
							<view>{{ index }}</view>
							<view class="thms-rounded-md thms-relateive" @tap="toDetail(item)">
								<view></view>
								<view
									class="thms-absolute thms-bottom-0 thms-left-0 thms-right-0"
								></view>
							</view>
						</view>
					</scroll-view>
				</t-tab-panel>
			</t-tabs>
		</view>
	</view>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import navBar from "/@/components/nav-bar.vue";
const props = defineProps({
	cur: {
		type: Number,
		default: 0,
	},
});
const tabList = reactive([
	{
		label: "数码",
		list: [{ id: 0, name: "1", type: 0 }],
	},
	{
		label: "服装",
		list: [{ id: 0, name: "1", type: 0 }],
	},
]);
const active = ref("");
function toDetail(item) {
	uni.navigateTo({ url: "" });
}
watch(
	() => props.cur,
	(newVal) => {
		if (newVal) {
			show();
		}
	}
);
function show() {}
function getList() {}
</script>

<style lang="scss">
.h-full {
	height: 100%;
}
</style>
