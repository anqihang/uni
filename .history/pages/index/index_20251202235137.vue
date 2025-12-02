<template>
	<view class="thms-h-screen thms-flex thms-flex-col">
		<view class="thms-overflow-hidden thms-flex-1 thms-relative">
			<home
				class="thms-top-0"
				v-show="cur == 1"
				:class="
					cur == 1
						? 'thms-relative thms-z-10 thms-opacity-100'
						: 'thms-absolute thms-z-0 thms-opacity-0'
				"
				:show="cur == 1"
			></home>
			<!-- <home1
				class="thms-top-0"
				:class="
					cur == 1
						? 'thms-relative thms-z-10 thms-opacity-100'
						: 'thms-absolute thms-z-0 thms-opacity-0'
				"
			></home1> -->
			<view
				class="thms-top-0"
				:class="
					cur == 2
						? 'thms-relative thms-z-10 thms-opacity-100'
						: 'thms-absolute thms-z-0 thms-opacity-0'
				"
				:show="cur == 2"
			></view>
			<view
				class="thms-top-0"
				:class="
					cur == 3
						? 'thms-relative thms-z-10 thms-opacity-100'
						: 'thms-absolute thms-z-0 thms-opacity-0'
				"
				:show="cur == 3"
			></view>
			<!-- <mine
				v-show="cur == 4"
				class="thms-top-0"
				:class="
					cur == 4
						? 'thms-relative thms-z-10 thms-opacity-100'
						: 'thms-absolute thms-z-0 thms-opacity-0'
				"
				:show="cur == 4"
			></mine> -->
		</view>
		<tabBar v-model="cur" class="thms-relative thms-z-10"></tabBar>
	</view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import tabBar from "/components/tab-bar.vue";
import home from "./home.vue";
import { useGlobalStore } from "/@/cool/store/global";
import { onLoad } from "@dcloudio/uni-app";
const globalStore = useGlobalStore();
const cur = ref(0);
onLoad(() => {});
</script>

<style scoped></style>
