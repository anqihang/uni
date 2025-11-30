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
			@tap="switchPage(tab.id)"
		>
			<image
				:src="
					'https://xcx.wujingchuanmei.com/api' + (cur == tab.id ? tab.imgSelect : tab.img)
				"
				class="thms-w-8 thms-h-8"
			></image>

			<view class="thms-mt-1 thms-text-sm">{{ tab.title }}</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useGlobalStore } from "../cool/store/global";
const props = defineProps({
	modelValue: {
		type: String,
		default: "",
	},
});
const emits = defineEmits(["switchPage", "update:modelValue"]);
const tabList = computed(() => {
	const globalStore = useGlobalStore();
	const tabBarList = globalStore.tabBarList?.map((i) => ({
		id: i.pageType,
		title: i.title,
		img: i.icon,
		imgSelect: i.iconIng,
	}));
	cur.value = tabBarList[0]?.id;
	emits("update:modelValue", cur.value);

	return tabBarList;
});
onMounted(() => {});
const cur = ref(1);
function switchPage(id: number) {
	cur.value = id;
	emits("update:modelValue", id);
}
</script>

<style scoped></style>
