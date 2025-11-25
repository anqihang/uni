<template>
	<view class="thms-h-full thms-flex thms-flex-col">
		<home v-show="cur === 0"></home>
		<view></view>
		<view></view>
		<view></view>
		<mine v-show="cur === 4"></mine>
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
