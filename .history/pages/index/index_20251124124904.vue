<template>
	<view class="thms-h-screen thms-flex thms-flex-col">
		<home
			v-show="cur === 0"
			class="thms-flex-1"
			:class="cur === 0 ? 'thms-relative' : 'thms-absolute'"
		></home>
		<view class="thms-flex-1" :class="cur === 1 ? 'thms-relative' : 'thms-absolute'"></view>
		<view class="thms-flex-1" :class="cur === 2 ? 'thms-relative' : 'thms-absolute'"></view>
		<view class="thms-flex-1" :class="cur === 3 ? 'thms-relative' : 'thms-absolute'"></view>
		<mine
			v-show="cur === 4"
			class="thms-flex-1"
			:class="cur === 4 ? 'thms-relative' : 'thms-absolute'"
		></mine>
		<tabBar @switchPage="cur = $event"></tabBar>
	</view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import tabBar from "/components/tab-bar.vue";
import home from "./home.vue";
import mine from "./mine.vue";
const cur = ref(0);
</script>

<style scoped></style>
