<template>
	<view
		class="tabBar thms-flex thms-justify-evenly thms-pt-1"
		style="
			padding-bottom: calc(env(safe-area-inset-bottom) / 2 + 12rpx);
			box-shadow: 0 -1px 6px rgba(0, 0, 0, 0.1);
		"
	>
		<view
			v-for="(tab, index) in tabList"
			:key="index"
			class="thms-flex thms-flex-col thms-items-center"
			@tap="switchPage(index)"
		>
			<image
				:src="tab.img + (cur === index ? '2' : '') + '.png'"
				class="thms-w-8 thms-h-8"
			></image>
			<view class="thms-mt-1 thms-text-sm">{{ tab.title }}</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import { ref } from "vue";
const emits = defineEmits(["switchPage"]);
const tabList = ref([
	{ id: 1, title: "首页", img: "/static/icon/tabbar/home" },
	{ id: 2, title: "分类", img: "/static/icon/tabbar/admin" },
	{ id: 3, title: "购物车", img: "/static/icon/tabbar/cool" },
	{ id: 4, title: "购物车", img: "" },
	{ id: 5, title: "我的", img: "/static/icon/tabbar/my" },
]);
const cur = ref(0);
function switchPage(index: number) {
	console.log(index);
	cur.value = index;
	emits("switchPage", index);
}
</script>

<style scoped></style>
