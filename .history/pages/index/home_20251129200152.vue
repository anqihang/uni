<template>
	<view class="thms-flex thms-flex-col thms-h-full thms-overflow-hidden">
		<navBar title="" style="background: red"></navBar>
		<view class="thms-px-2 thms-py-1">
			<t-search placeholder="请输入搜索内容/关键字" shape="round" v-model="searchText" />
		</view>
		<view class="thms-flex-1 thms-overflow-hidden thms-flex thms-flex-col">
			<t-tabs
				:defaultValue="0"
				class="thms-flex-1 thms-flex thms-flex-col thms-oveflow-hidden"
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
						<view
							v-for="(item, index) in tab.list"
							:key="index"
							class="thms-px-4 thms-mb-2"
							@tap="toDetail(item)"
						>
							<view class="thms-relative">
								<t-image
									:src="
										'https://xcx.wujingchuanmei.com/api' +
										(item.picPath ? item.picPath : item.icon)
									"
									mode="aspectFill"
									height="180"
									shape="round"
									aria-label="img"
									style="width: 100%; vertical-align: top"
								/>
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
							</view>
						</view>
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
onMounted(() => {
	tabList.value = globalStore.tabBarList
		.find((i) => i.pageType == 1)
		?.pageConfigs?.map((i) => ({
			title: i.baseTitle,
			sort: i.baseSort,
			pageId: i.pageId,
			type: i.baseVideoType,
			list: [],
		}));
});
const tabList = ref<any>([]);

watch(tabList, () => {
	console.log(123);
	if (tabList.value) getList();
});
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
function toDetail(item) {
	console.log("跳转");
	router.push({
		path: "/pages/register/doctor",
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
	uni.showLoading();
	getVideoList((target?.list?.length || 0) / 10 + 1, target.title, target.type)
		.then((data) => {
			console.log(data, 1);
			target.list = target.list.concat(data.videoList);
		})
		.finally(() => {
			uni.hideLoading();
		});
}
function loadmore() {
	getList();
}
</script>

<style>
.hFull {
	height: 100%;
}
</style>
