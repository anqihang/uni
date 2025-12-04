<template>
	<view class="thms-flex thms-flex-col thms-h-full thms-overflow-hidden">
		<navBar title="" style="background: red"></navBar>
		<view class="thms-px-2 thms-py-1">
			<t-search placeholder="请输入搜索内容/关键字" shape="round" v-model="searchText" />
		</view>
		<view class="thms-flex-1 thms-overflow-hidden thms-flex thms-flex-col">
			<t-tabs
				:defaultValue="0"
				class="thms-flex-1 thms-flex thms-flex-col thms-oveflow-hidden bigger"
				t-class-content="h-full"
				:space-evenly="false"
				@click="changeTab"
				t-class="hFull"
			>
				<t-tab-panel
					:label="tab.title"
					:value="index"
					v-for="(tab, index) in tabList"
					:key="index"
					custom-style="height: 100%"
				>
					<scroll-view scroll-y class="thms-h-full" @scrolltolower="loadmore">
						<view class="" style="width: 100%">
							<ad
								v-if="
									globalStore.adv.top_global.typeAd == 0 &&
									globalStore.adv.top_global.status == 1 &&
									globalStore.adv.top_global.advId &&
									globalStore.adv.top_global.type == 3
								"
								ad-type="video"
								ad-theme="white"
								:unit-id="globalStore.adv.top_global.advId"
							>
							</ad>
							<ad
								v-if="
									globalStore.adv.top_global.typeAd == 0 &&
									globalStore.adv.top_global.status == 1 &&
									globalStore.adv.top_global.advId &&
									globalStore.adv.top_global.type == 1
								"
								:unit-id="globalStore.adv.top_global.advId"
							></ad>
							<coral-adv
								v-if="globalStore.adv.top_global.typeAd == 1"
								:appid="globalStore.adv.appid"
								:type="globalStore.adv.top_global.type == 1 ? 1 : 10"
							></coral-adv>
						</view>
						<view
							v-for="(item, index) in tab.list"
							:key="index"
							class="thms-px-4 thms-mb-2"
							@tap="toDetail(item, tab)"
						>
							<view class="thms-relative">
								<t-image
									:src="
										'https://xcx.wujingchuanmei.com/api' +
										(item?.picPath ? item.picPath : item.icon)
									"
									mode="aspectFill"
									height="180"
									shape="round"
									aria-label="img"
									style="width: 100%; vertical-align: top"
								/>
								<view
									class=""
									v-if="tab.colType == 2"
									style="
										position: absolute;
										z-index: 10;
										top: 50%;
										transform: translateY(-50%);
										display: flex;
										justify-content: center;
										width: 100%;
									"
								>
									<view
										class=""
										style="
											background-color: rgba(0, 0, 0, 0.6);
											height: 100rpx;
											width: 100rpx;
											border-radius: 50%;
											display: flex;
											justify-content: center;
											align-items: center;
											border: 2px solid white;
										"
									>
										<view
											class=""
											style="
												border: 40rpx solid white;
												width: 0;
												border-top: 30rpx solid transparent;
												border-right: 0;
												border-bottom: 30rpx solid transparent;
												transform: translateX(20%);
											"
										>
										</view>
									</view>
								</view>
								<view
									class="thms-absolute thms-bottom-0 thms-left-0 thms-right-0"
									style="
										background-color: rgba(0, 0, 0, 0.4);
										text-overflow: ellipsis;
										display: -webkit-box;
										-webkit-line-clamp: 2;
										-webkit-box-orient: vertical;
										word-break: break-all;
										color: white;
										padding: 0 10rpx;
										border-radius: 8rpx;
									"
								>
									<text class="thms-text-lg thms-text-white thms-font-bold">
										{{ item.title }}
									</text>
								</view>
								<view
									class=""
									v-if="tab.colType == 2"
									style="
										position: absolute;
										top: 10rpx;
										right: 10rpx;
										height: 60rpx;
										display: flex;
										align-items: center;
										margin-right: 10rpx;
										padding: 0 20rpx;
									"
								>
									<view class="" style="display: flex; margin-right: 14rpx">
										<view class="" style="width: 40rpx; height: 40rpx"
											><img
												src="/static/fire.png"
												alt=""
												style="width: 100%; height: 100%"
										/></view>
										<text style="color: white; margin: 0 8rpx">
											{{
												item.playNum + item.readNum > 10000
													? parseInt(
															(item.playNum + item.readNum) / 10000
													  ) + "W+"
													: item.playNum + item.readNum
											}}
										</text>
									</view>
								</view>
							</view>
							<view class="" style="width: 100%; margin-bottom: 10rpx">
								<ad
									v-if="
										globalStore.adv.config_v.advId &&
										globalStore.adv.config_v?.typeAd == 0 &&
										globalStore.adv.config_v.status == 1 &&
										globalStore.adv.config_v?.acticleCnt != 0 &&
										index != 0 &&
										(index + 1) % globalStore.adv.config_v.articleCnt == 0 &&
										globalStore.adv.config_v.advertTypeId == 1
									"
									:unit-id="item.adv.advId"
								></ad>
								<!-- <ad
									v-if="
										item.adv &&
										item.adv?.typeAd == 0 &&
										item.adv.status == 1 &&
										item.adv.advId &&
										item.adv?.acticleCnt != 0 &&
										index1 != 0 &&
										(index1 + 1) % item.adv?.acticleCnt == 0 &&
										item.adv.advertTypeId == 3
									"
									ad-type="video"
									ad-theme="white"
									:unit-id="item.adv.advId"
									@load="f_adLoad(item.list, index1, $event, 3)"
									@error="f_adError(item.list, index1, $event, 3)"
								></ad>
								<coral-adv
									v-if="
										item.adv?.typeAd == 1 &&
										item.adv?.status == 1 &&
										item.adv?.acticleCnt != 0 &&
										index1 != 0 &&
										(index1 + 1) % item.adv?.acticleCnt == 0
									"
									:appid="globalStore.adv.appid"
									:type="item.adv.advertTypeId == '1' ? 1 : 10"
								></coral-adv> -->
							</view>
						</view>
						<ad
							v-if="
								globalStore.adv.bottom_global.typeAd == 0 &&
								globalStore.adv.bottom_global.status == 1 &&
								globalStore.adv.bottom_global.advId &&
								globalStore.adv.bottom_global.type == 3
							"
							ad-type="video"
							ad-theme="white"
							:unit-id="globalStore.adv.bottom_global.advId"
						></ad>
						<ad
							v-if="
								globalStore.adv.bottom_global.typeAd == 0 &&
								globalStore.adv.bottom_global.status == 1 &&
								globalStore.adv.bottom_global.advId &&
								globalStore.adv.bottom_global.type == 1
							"
							:unit-id="globalStore.adv.bottom_global.advId"
						></ad>
						<coral-adv
							v-if="
								globalStore.adv.bottom_global.typeAd == 1 &&
								globalStore.adv.bottom_global.status == 1
							"
							:appid="globalStore.adv.appid"
							:type="globalStore.adv.bottom_global.type == 1 ? 1 : 10"
						></coral-adv>
					</scroll-view>
				</t-tab-panel>
			</t-tabs>
		</view>
	</view>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import navBar from "/@/components/nav-bar.vue";
import { router } from "/@/cool";
import { getTabBarList, getVideoList } from "/@/cool/api";
import { useGlobalStore } from "/@/cool/store/global";
const globalStore = useGlobalStore();
const props = defineProps({
	show: {
		type: Boolean,
		default: false,
	},
});
onMounted(() => {});

const searchText = ref("");
const active = ref(0);
function changeTab(e) {
	console.log(e.detail.value);
	active.value = e.detail.value;
	const target = tabList.value?.[active.value];
	if (!target?.list?.length) {
		getList();
	}
}
function toDetail(item, tab) {
	console.log("跳转");
	uni.navigateTo({
		url: `/pages/video/index?id=${item.id}&cateId=${tab.type}&from=home`,
	});
}
watch(
	() => props.show,
	(newVal) => {
		if (newVal) {
			show();
		}
	}
);
function show() {
	console.log("homeshow");
}
function getList() {
	const target = tabList.value?.[active.value];
	console.log(target);
	console.log(target?.list.length / 10 + 1);
	uni.showLoading();
	getVideoList({
		page: (target?.list?.length || 0) / 10 + 1,
		title: target?.title,
		type: target?.type,
	})
		.then((data) => {
			console.log(data, 1);
			target.list = target.list.concat(data.videoList);
		})
		.finally(() => {
			uni.hideLoading();
		});
}

const tabList = ref<any[]>([]);
watch(
	() => globalStore.tabBarList,
	() => {
		tabList.value = globalStore.tabBarList
			?.find((i) => i.pageType == 1)
			?.pageConfigs?.map((i: any) => ({
				title: i.baseTitle,
				sort: i.baseSort,
				pageId: i.pageId,
				page: 1,
				type: i.baseVideoType,
				list: [],
			}));
		getList();
	}
);
function loadmore(tabItem: any) {
	tabItem.page++;
	getList();
}
</script>

<style>
.hFull {
	height: 100%;
}
.bigger {
	--td-tab-font-size: 32rpx;
}
</style>
