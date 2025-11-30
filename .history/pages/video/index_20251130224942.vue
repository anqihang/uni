<template>
	<view style="position: relative; height: 100vh; display: flex; flex-direction: column">
		<navBar
			title=""
			style="
				background: transparent;
				position: absolute;
				top: 0;
				right: 0;
				left: 0;
				z-index: 10;
			"
		></navBar>
		<view
			class=""
			style="
				height: 100%;
				width: 100%;
				position: fixed;
				z-index: 9999;
				background-color: black;
			"
			v-if="firstShow && advScreenEnter.status == 1 && advScreenEnter.time != 0"
		>
			<ad-custom
				v-if="
					advScreenEnter.typeAd == 0 && advScreenEnter.advId && advScreenEnter.time != 0
				"
				:unit-id="advScreenEnter.advId"
				@load="adLoad1"
				style="height: 100%"
				@error="adError12"
			></ad-custom>
			<coral-adv
				v-if="advScreenEnter.typeAd == 1"
				:appid="adAppid"
				@loadCb="adLoad2"
				@errorCb="adError2"
				:type="9"
			></coral-adv>
		</view>
		<coral-adv
			v-if="advReward.typeAd == 1"
			:appid="adAppid"
			:type="2"
			:isshow="isShow0"
			@loadCb="loadCb1"
			@finishedCb="finishedCb0"
			@quitCb="quitCb0"
			@errorCb="errorCb0"
		></coral-adv>
		<coral-adv
			v-if="advC.typeAd == 1"
			:appid="adAppid"
			:type="4"
			:isshow="isShow"
			@loadCb="loadCb"
			@quitCb="quitCb"
		></coral-adv>
		<view class="" style="position: fixed; top: 0; z-index: 999">
			<ax-topNav
				ref="topNav"
				:back="true"
				:isShare="isFromShare"
				:backId="backId"
				:backPage="backPage"
				typePage="videoDetail"
				:lastPage="lastPage"
				:options="options"
				:title="`看更多热门`"
				background="transparent"
				iconBackground="#00000080"
				borderColor="white"
			></ax-topNav>
		</view>
		<view
			class=""
			v-if="showYinDao"
			@touchend="closeYinDao"
			style="
				background-color: rgba(0, 0, 0, 0.4);
				height: 100vh;
				width: 100vw;
				position: absolute;
				z-index: 100;
				display: flex;
				justify-content: center;
			"
			:style="{ 'margin-top': topH }"
		>
			<t-image
				src="/static/yd.gif"
				mode="aspectFill"
				shape="round"
				aria-label="img"
				style="
					height: 800rpx;
					position: absolute;
					z-index: 30;
					top: 400rpx;
					background-color: transparent;
				"
			/>
		</view>
		<swiper
			:indicator-dots="false"
			:vertical="true"
			style="flex: 1"
			@change="f_change"
			:circular="!preEnd"
			@animationfinish="f_animEnd"
		>
			<swiper-item style="height: 100%; background: red">
				<scroll-view style="height: 100%">
					<view class="video" style="height: 100vh">
						<video
							id="video0"
							:src="videoInfoList[0].src"
							style="width: 100%; height: 100%"
							:autoplay="!half && true"
						></video>
						<view
							class=""
							style="
								display: flex;
								justify-content: flex-end;
								margin: 10rpx 8px 40rpx 0;
							"
						>
							<view
								class=""
								style="
									display: flex;
									justify-content: center;
									overflow: hidden;
									align-items: center;
								"
							>
								<view
									class=""
									style="
										background-color: #f96400;
										display: flex;
										border-radius: 999px;
										margin-right: 8px;
										padding: 20rpx 18rpx;
									"
								>
									<button
										style="
											border: 0;
											background-color: #f96400;
											margin: 0;
											display: flex;
											padding: 0;
											align-items: center;
											line-height: 0;
											outline: none;
										"
										open-type="share"
									>
										<t-icon
											name="logo-wechat"
											size="32rpx"
											style="color: white"
										/>
										<text style="color: white; font-size: 14px">分享到群</text>
									</button>
								</view>
								<view
									class=""
									style="
										background-color: limegreen;
										display: flex;
										border-radius: 999px;
										margin-right: 8px;
										padding: 20rpx 18rpx;
									"
								>
									<button
										style="
											border: 0;
											background-color: limegreen;
											margin: 0;
											display: flex;
											padding: 0;
											align-items: center;
											line-height: 0;
											outline: none;
										"
										open-type="share"
									>
										<t-icon
											name="logo-wechat"
											size="32rpx"
											style="color: white"
										/>
										<text style="color: white; font-size: 14px">发给好友</text>
									</button>
								</view>
							</view>
						</view>
					</view>
					<!-- <view
						style=" width:100%;height:100%;background-color:#000000aa;display:flex;justify-content:center;align-items:center;position:absolute;top:0;"
						v-if="half && isShowPlay" @tap="f_clickPlay">
						<view style="width: 100rpx;height: 100rpx;border: 1px solid white;border-radius: 100%;background-color: #00000050;display: flex;justify-content: center;align-items: center;">
							<view style="border: 30rpx solid white;border-top-color: transparent;border-right-color: transparent;border-bottom-color: transparent;transform: translateX(30%);border-top-width: 20rpx;border-bottom-width: 20rpx;">
							</view>
						</view>
						<text style="position: absolute; color: white; top: calc(50% + 50rpx); margin-top: 30rpx">{{ halfO.title }}</text>
					</view>
					<view class="" style="color:white;padding:8px 24px 0;word-break: break-all;">
						{{title}}
					</view> -->
				</scroll-view>
			</swiper-item>
			<swiper-item style="height: 100%">
				<scroll-view style="height: 100%">
					<video
						id="video1"
						:src="videoInfoList[1].src"
						style="width: 100%; height: 100%"
					></video>
				</scroll-view>
			</swiper-item>
			<swiper-item style="height: 100%">
				<scroll-view style="height: 100%">
					<video
						id="video2"
						:src="videoInfoList[2].src"
						style="width: 100%; height: 100%"
					></video>
				</scroll-view>
			</swiper-item>
			<swiper-item style="height: 100%">
				<scroll-view style="height: 100%">
					<video
						id="video3"
						:src="videoInfoList[3].src"
						style="width: 100%; height: 100%"
					></video>
				</scroll-view>
			</swiper-item>
			<swiper-item style="height: 100%">
				<scroll-view style="height: 100%">
					<video
						id="video4"
						:src="videoInfoList[4].src"
						style="width: 100%; height: 100%"
					></video>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script setup lang="ts">
import {
	onLoad,
	onShow,
	onHide,
	onUnload,
	onShareAppMessage,
	onReady,
	onShareTimeline,
} from "@dcloudio/uni-app";
import navBar from "/@/components/nav-bar.vue";
import { ref } from "vue";
import { videoInfo, videoInfoHome } from "/@/cool/api";
import { useGlobalStore } from "/@/cool/store/global";
const globalStore = useGlobalStore();
const topH = ref(uni.getMenuButtonBoundingClientRect().bottom + 10 + "px");
const videoRefList = ref([]);
const videoInfoList = ref([
	{
		id: 0,
		src: "",
		nextId: "",
		prevId: "",
	},
	{
		id: 0,
		src: "",
		nextId: "",
		prevId: "",
	},
	{
		id: 0,
		src: "",
		nextId: "",
		prevId: "",
	},
	{
		id: 0,
		src: "",
		nextId: "",
		prevId: "",
	},
	{
		id: 0,
		src: "",
		nextId: "",
		prevId: "",
	},
]);

const from = ref("");
const cateId = ref("");
const current = ref(0);

onLoad((options) => {
	for (let i = 0; i < 5; i++) {
		videoRefList.value.push(uni.createVideoContext("video" + i));
	}
	console.log(options, "options");
	videoInfoList.value[0].id = options.id;
	from.value = options.from;
	cateId.value = options.cateId;

	getVideo({
		id: options.id,
	}).then((res) => {
		videoInfoList.value[0] = {
			id: res.xcxVideo.id,
			src: res.xcxVideo.video,
			nextId: res.nextId,
			prevId: res.prevId,
		};
		console.log(videoInfoList.value);

		if (res.prevId !== 0) {
			getVideo({
				id: res.prevId,
			}).then((res) => {
				videoInfoList.value[4] = {
					id: res.xcxVideo.id,
					src: res.xcxVideo.video,
					nextId: res.nextId,
					prevId: res.prevId,
				};
				if (res.prevId !== 0) {
					getVideo({
						id: res.prevId,
					}).then((res) => {
						videoInfoList.value[3] = {
							id: res.xcxVideo.id,
							src: res.xcxVideo.video,
							nextId: res.nextId,
							prevId: res.prevId,
						};
					});
				}
			});
		}

		if (res.nextId !== 0) {
			getVideo({
				id: res.nextId,
			}).then((res) => {
				videoInfoList.value[1] = {
					id: res.xcxVideo.id,
					src: res.xcxVideo.video,
					nextId: res.nextId,
					prevId: res.prevId,
				};
				if (res.nextId !== 0) {
					getVideo({
						id: res.nextId,
					}).then((res) => {
						videoInfoList.value[2] = {
							id: res.xcxVideo.id,
							src: res.xcxVideo.video,
							nextId: res.nextId,
							prevId: res.prevId,
						};
						console.log(videoInfoList.value);
					});
				}
			});
		}
	});
});

function getVideo(obj) {
	return new Promise((resolve) => {
		if (from.value == "home") {
			videoInfoHome({
				id: obj.id,
				cateId: cateId.value,
			}).then((data) => {
				resolve(data);
			});
		} else {
			videoInfo({
				id: obj.id,
			}).then((data) => {
				resolve(data);
			});
		}
	});
}
const preEnd = ref(true); // 到顶
const nextEnd = ref(false); // 到底

const dir = ref("");

function f_change(e) {
	let cur = e.detail.current;
	if ((cur > current.value && cur !== 4) || (current.value === 4 && cur === 0)) {
		dir.value = "next";
	} else if (cur < current.value || (cur === 4 && current.value === 0)) {
		dir.value = "pre";
	}
	current.value = cur;
	videoRefList.value.forEach((i) => {
		i.stop();
	});
	videoRefList.value[current.value].play();
	const tabList = globalStore.tabBarList.find((i) => i.pageType == 1)?.pageConfigs;
	const cateIndex = tabList.findIndex((i) => i.baseVideoType == cateId.value);
	if (dir.value === "next") {
		const id = videoInfoList.value[(current.value + 1) % 5].nextId;
		if (id == 0 && cateIndex < tabList.length) {
			cateId.value = tabList[cateIndex + 1]?.baseVideoType;
		)
		if (!(id == 0 && cateIndex == tabList.length)) {
			getVideo({
				id,
			}).then((res) => {
				const index = (current.value + 2) % 5;
				const target = videoInfoList.value[index];
				target.id = res.xcxVideo.id;
				target.src = res.xcxVideo.video;
				target.nextId = res.nextId;
				target.prevId = res.prevId;
			});
		}
	} else {
		console.log("上", current.value, current.value < 1 ? 4 : current.value - 1);
		const id = videoInfoList.value[current.value < 1 ? 4 : current.value - 1].prevId;
		if (id != 0) {
			getVideo({
				id,
			}).then((res) => {
				const index = current.value < 2 ? 3 + current.value : current.value - 2;
				const target = videoInfoList.value[index];
				target.id = res.xcxVideo.id;
				target.src = res.xcxVideo.video;
				target.nextId = res.nextId;
				target.prevId = res.prevId;
			});
		}
	}
}

function f_animEnd(e) {
	if (dir.value == "next") {
		if (videoInfoList.value[current.value].nextId == 0) {
			nextEnd.value = true;
		}
		preEnd.value = false;
	}
	if (dir.value == "pre") {
		if (videoInfoList.value[current.value].prevId == 0) {
			preEnd.value = true;
		}
		nextEnd.value = false;
	}
}

//
const isFromShare = ref("");
const backId = ref("");
const backPage = ref("");
const lastPage = ref("");
const options = ref("");
const firstShow = ref(false);
const adAppid = getApp().globalData.adAppid;
const isShow = ref(false);
const isShow0 = ref(false);

function adLoad1() {}

function adError12() {}

function adLoad2() {}

function adError2() {}

function loadCb() {}

function quitCb() {}

function loadCb1() {}

function finishedCb0() {}

function quitCb0() {}

function errorCb0() {}

const showYinDao = ref();

function closeYinDao() {}
//
const half = ref(false);
const isShowPlay = ref(false);

function f_clickPlay() {}
//
const advScreenList = ref([]);
const advScreen = ref({
	advId: null,
	typeAd: null,
	intervalNum: 0,
	status: 0,
});
const advScreenEnter = ref({
	status: null,
	advId: null,
	time: null,
	typeAd: null,
});
const advReward = ref({
	time: 0,
	title: "",
	id: "",
	status: 0,
	every: null,
	typeAd: null,
});
const advS = ref({
	status: null,
	advId: null,
	finish: false,
});
// 底部
const advB = ref({
	status: null,
	// every: null,
	advId: null,
	type: null,
});
const advList = ref([]);
const oldAdvList = ref([]);
//全局广告
const advC = ref({
	status: null,
	advId: null,
	intervalNum: null,
	interstitialAd: null,
	firstNow: false,
	timer: null,
});
// 半屏
const halfO = ref({
	appId: "",
	time: 0,
	interval: "",
	status: false,
	path: [],
	title: "",
});

const ysTime = ref(8);
const tt = ref(null);

// function f_getAdv(o) {
// 	Adv(o).then((res) => {
// 		half.value = false;
// 		halfO.value.path = res.advertThrConfigs;

// 		// res.advertPlaceConfigs.forEach((element) => {});
// 		res.advertTypes.forEach((element) => {
// 			//底部广告
// 			if (element.type == 6) {
// 				advB.value.typeAd = element.typeAd;
// 			}
// 			if (element.type == 6 || element.type == 7 || element.type == 8) {
// 				advList.value.push(element.content?.trim());
// 				if (element.intervalNum > 0) {
// 					ysTime.value = element.intervalNum;
// 				}
// 			}

// 			oldAdvList.value = advList.value;

// 			if (advList.value.length > 0) {
// 				let n = Math.floor(Math.random() * advList.value.length);
// 				advB.value.advId = advList.value[n];
// 				num.value.push(n);
// 			}
// 			//插屏广告
// 			if (element.type == 2) {
// 				advC.value.status = element.status;
// 				advC.value.advId = element.content?.trim();
// 				advC.value.intervalNum = element.intervalNum;
// 				advC.value.typeAd = element.typeAd;
// 			}
// 			//激励广告
// 			if (element.type == 4) {
// 				advReward.value.id = element.content?.trim();
// 				advReward.value.time = element.intervalNum;
// 				advReward.value.title = element.title;
// 				advReward.value.status = element.status;
// 				advReward.value.every = element.num;
// 				advReward.value.isFirst = element.first;
// 				advReward.value.typeAd = element.typeAd;
// 				if (advReward.value.typeAd == 0) {
// 					//todo
// 					rewardAdv.value = null;
// 					createReward();
// 				}
// 			}
// 			//前贴广告
// 			if (element.type == 5) {
// 				advS.value.status = element.status;
// 				advS.value.advId = element.content?.trim();
// 			}
// 			//
// 			if (element.type == 9) {
// 				halfO.value.appId = element.content;
// 				half.value = element.status == 1;
// 				halfO.value.time = element.intervalNum;
// 				halfO.value.interval = element.num;
// 				halfO.value.title = element.title;
// 			}

// 			if (element.type == 10) {
// 				getApp().globalData.agreeShow = false;
// 				advScreenEnter.value.advId = element.content;
// 				advScreenEnter.value.time = element.intervalNum;
// 				advScreenEnter.value.typeAd = element.typeAd;
// 				advScreenEnter.value.status = element.status;
// 				half.value = true;

// 				if (element.intervalNum > 0) {
// 					setTimeout(() => {
// 						firstShow.value = false;
// 						getApp().globalData.agreeShow = true;
// 						// videoContent.value.play();
// 					}, advScreenEnter.value.time * 1000);
// 				}

// 				if (element.typeAd == 1 && element.status == 1 && element.intervalNum != 0) {
// 					getApp().globalData.agreeShow = false;
// 				}
// 			}

// 			if (element.type == 11 || element.type == 12) {
// 				let temp = {
// 					intervalNum: element.num,
// 					advId: element.content,
// 					typeAd: element.typeAd,
// 					status: element.status,
// 				};
// 				advScreenList.value.push(temp);
// 			}
// 		});
// 		if (advScreenList.value.length > 0) advScreen.value = advScreenList.value[0];

// 		advS.value.finish = true;
// 		if (advC.value.status && advC.value.typeAd == 0) {
// 			//todo
// 			createAdv(advC.value);
// 		}
// 		if (tt.value) {
// 			clearTimeout(tt.value);
// 		}
// 		tt.value = setTimeout(() => {
// 			advRefresh.value = true;
// 			clearTimeout(tt.value);
// 		}, ysTime.value * 1000);
// 	});
// }
</script>

<style></style>
