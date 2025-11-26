<template>
	<view class="thms-flex thms-flex-col thms-h-full">
		<navBar title="" style="background: red"></navBar>
		<view class="thms-px-2 thms-py-1">
			<t-search placeholder="请输入搜索内容/关键字" shape="round" />
		</view>
		<view class="thms-flex-1 thms-overflow-hidden thms-flex thms-flex-col">
			<t-tabs
				:defaultValue="0"
				class="thms-flex-1 thms-flex thms-flex-col thms-oveflow-hidden"
				t-class-content="h-full"
				:space-evenly="false"
			>
				<t-tab-panel
					:label="tab.title"
					:value="index"
					v-for="(tab, index) in tabList"
					:key="index"
					custom-style="height: 100%"
				>
					<scroll-view scroll-y class="thms-h-full">
						<view
							v-for="(item, index) in tab.list"
							:key="index"
							class="thms-px-4"
							@tap="toDetail(item)"
						>
							<view></view>
							<view class="thms-rounded-md thms-relateive">
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
import { computed, onMounted, reactive, ref, watch } from "vue";
import navBar from "/@/components/nav-bar.vue";
import { router } from "/@/cool";
import { getTabBarList, getVideoList } from "/@/cool/api";
import { useGlobalStore } from "/@/cool/store/global";
const globalStore = useGlobalStore();
const props = defineProps({
	cur: {
		type: Number,
		default: 0,
	},
});
watch(
	() => props.cur,
	(newVal) => {
		if (newVal) {
			show();
		}
	}
);
function show() {}
onMounted(() => {});

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
				type: i.baseType,
				list: [],
			}));
		getList(tabList.value[0]);
	}
);
function getList(tabItem: any) {
	getVideoList({ page: tabItem.page, title: tabItem.title, type: tabItem.type })
		.then((res) => {})
		.then((data: any) => {
			tabList.value.find((i: any) => i.id === tabItem.id)?.list?.push(...data);
		});
}
function loadMore(tabItem: any) {
	tabItem.page++;
	getList(tabItem);
}
function toDetail(item) {
	console.log("跳转");
	router.push({
		path: "/pages/register/doctor",
	});
}
</script>

<style lang="scss">
.h-full {
	height: 100%;
}
</style>
