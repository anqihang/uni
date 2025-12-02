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
			type: 0,
			id: "",
			status: false,
			intervalNum: "",
			time: "",
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

	return {
		openid,
		token,
		appId,
		share,
		adv,
		tabBarList,
		rewardAdv,
		showReward,
	};
});
