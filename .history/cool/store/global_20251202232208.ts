import { clear } from "console";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useGlobalStore = defineStore("global", () => {
	const token = ref(uni.getStorageSync("token"));
	const openid = ref(uni.getStorageSync("openid"));
	const appId = ref(uni.getAccountInfoSync().miniProgram.appId);
	const share = ref({ shareTitle: "", shareImg: "" });
	const adv = ref<any>({
		appid: 121328,
		bottom: {
			type: 0,
			id: "",
			status: false,
			intervalNum: "",
			time: "",
			list: [],
		},
		reward: {
			type: 0,
			id: "",
			status: false,
			intervalNum: "",
			time: "",
			isFirst: false,
			title: "",
		},
		previousPost: {
			type: 0,
			id: "",
			status: false,
			intervalNum: "",
			time: "",
		},
		half: {
			type: 0,
			id: "",
			status: false,
			intervalNum: "",
			time: "",
			interval: "",
			title: "",
		},
		screen: [],
		pop: {
			type: 0,
			id: "",
			status: false,
			intervalNum: "",
			time: "",
		},
		insert: {
			instance: null,
			type: 0,
			id: "",
			status: false,
			intervalNum: "",
			time: "",
			timer: 0,
			firstShow: true,
		},
		top_global: {},
		bottom_global: {},
		config_v: {},
		config_a: {},
	});
	const tabBarList = ref<any[]>([]);

	const rewardAdv = ref();
	function showReward() {
		rewardAdv.value = uni.createRewardedVideoAd({
			adUnitId: adv.value.reward.id,
		});
		rewardAdv.value.onLoad(() => {});
		rewardAdv.value.onError(() => {});
		rewardAdv.value.onClose((res) => {});
	}

	// 创建插屏广告
	function createInterAdv() {
		console.log("创建插屏广告");
		adv.value.insert.instance = uni.createInterstitialAd({
			adUnitId: adv.value.insert.id,
		});
		adv.value.insert.instance.onLoad(() => {});
		adv.value.insert.instance.onError((err) => {
			console.log("插屏广告错误", err);
		});
		adv.value.insert.instance.onClose((res) => {
			showInterAdv();
		});
		showInterAdv();
	}
	function showInterAdv() {
		console.log("显示插屏广告");
		// 进入立即显示
		if (adv.value.insert.firstShow) {
			console.log("进入立即显示", adv.value.insert);
			adv.value.insert.timer = setTimeout(() => {
				if (adv.value.insert.instance) {
					adv.value.insert.instance
						.show()
						.then(() => {
							clearInterval(adv.value.insert.timer);
							adv.value.insert.firstShow = false;
						})
						.catch((err) => {
							console.log(err, "guanggao");
							if (err.errCode == 2001) {
								clearTimeout(adv.value.insert.timer);
								showInterAdv();
							} else if (err.errCode == 2002) {
							} else if (err.errMsg == "no ad data") {
								clearTimeout(adv.value.insert.timer);
								createInterAdv();
							}
						});
				}
			}, 1000);
		} else {
			adv.value.insert.timer = setInterval(() => {
				if (adv.value.insert.interstitialAd) {
					adv.value.insert.interstitialAd
						.show()
						.then(() => {
							clearInterval(adv.value.insert.timer);
						})
						.catch((err) => {
							if (err.errMsg == "no ad data") {
								createInterAdv();
							} else if (err.errCode == 2005) {
								clearInterval(adv.value.insert.timer);
							}
						});
				}
			}, adv.value.insert.intervalNum * 1000);
		}
	}

	return {
		openid,
		token,
		appId,
		share,
		adv,
		tabBarList,
		rewardAdv,
		showReward,
		createInterAdv,
		showInterAdv,
	};
});
