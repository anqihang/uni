<template>
	<view class="thms-flex thms-flex-col">
		<navBar></navBar>
		<view class="thms-flex-1 thms-overflow-hidden">
			<view>
				<swiper>
					<swiper-item></swiper-item>
					<swiper-item></swiper-item>
					<swiper-item></swiper-item>
					<swiper-item></swiper-item>
					<swiper-item></swiper-item>
				</swiper>
			</view>
			<view></view>
		</view>
	</view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import navBar from "/components/nav-bar.vue";
const InfoList = ref([
	{ id: 0, ref: uni.createVideoContext("") },
	{ id: 1 },
	{ id: 2 },
	{ id: 3 },
	{ id: 4 },
]);
</script>

<style scoped></style>
