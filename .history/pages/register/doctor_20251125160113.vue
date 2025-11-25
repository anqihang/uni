<template>
	<view class="thms-flex thms-flex-col thms-h-screen" style="background: #e2e2e2">
		<navBar title="医生详情"></navBar>
		<view class="thms-flex-1 thms-px-2">
			<view class="dotor thms-bg-white thms-rounded-md thms-px-3 thms-py-2">
				<view class="thms-px-3 thms-pt-2">
					<view
						class="thms-py-3 thms-round-6 thms-flex thms-flex-col thms-box-shadow-md thms-zIndex-1 thms-bg-white thms-relative"
					>
						<view class="thms-flex thms-flex-between thms-px-3">
							<view class="thms-flex thms-flex-col">
								<text class="thms-text-black-800 thms-text-xl thms-text-weight-b">{{
									"暂无"
								}}</text>
								<text
									class="thms-my-8 thms-round-2 thms-px-8 thms-bg-yellow-240 thms-text-yellow-800 thms-text-weight-b text-xs mt-8"
									style="font-size: 11px"
								>
									第一执业：{{ "暂无" }}
								</text>
								<view class="thms-mt-22 thms-text-weight-b thms-text-sm">
									<text class="thms-text-blue-500"> 专业 </text>
									<text class="thms-text-orange-600"> 擅长 </text>
								</view>
								<view class="thms-flex thms-mt-10">
									<!-- <view
										style="font-size: 11px"
										class="mr-8 xs-border-2 border-solid text-xs px-6 round-2 border-Brand_03 text-blue-550"
										v-for="(item, index) in doctorInfo.specialized?.length &&
										doctorInfo.specialized?.replace(/\,/g, '，')?.split('，')"
										:key="index"
									>
										{{ item }}
									</view> -->
									<!-- v-if="!doctorInfo.specialized?.length" -->
									<view class="thms-text-gray-300 thms-text-sm"> 暂无 </view>
								</view>
							</view>
							<view class="thms-rounded-md">
								<image
									:src="'/static/svg/doctorAvatar.svg'"
									style="width: 128rpx; height: 128rpx"
								></image>
							</view>
						</view>
						<view
							class="thms-text-sm thms-text-black-800 thms-mt-26 thms-text-weight-b thms-px-24"
							>简介</view
						>
						<view class="thms-info thms-mt-8 thms-relative">
							<scroll-view
								scroll-y
								class="thms-fulled thms-fulled-height thms-overflow"
								style="max-height: 250rpx"
							>
								<view
									class="thms-text-gray-200 thms-text-xs thms-px-24"
									style="word-break: break-all"
								>
									{{ "暂未填写" }}
								</view>
							</scroll-view>
						</view>
					</view>
				</view>
			</view>
			<view></view>
		</view>
	</view>
</template>

<script setup lang="ts">
import navBar from "/@/components/nav-bar.vue";
</script>

<style scoped></style>
