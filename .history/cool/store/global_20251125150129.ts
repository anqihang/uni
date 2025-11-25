import { defineStore } from "pinia";
import { ref } from "vue";

export const useGlobalStore = defineStore("global", () => {
	const token = ref(uni.getStorageSync("token"));
	const openid = ref(uni.getStorageSync("openid"));
	const appId = ref(uni.getAccountInfoSync().miniProgram.appId);
	const share = ref({ shareTitle: "", shareImg: "" });
	const adv = ref({
		bottom: {
			type: 0,
			id: "",
			status: false,
			intervalNum: "",
			time: "",
		},
		reward: {
			type: 0,
			id: "",
			status: false,
			intervalNum: "",
			time: "",
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
		},
		screen: {
			type: 0,
			id: "",
			status: false,
			intervalNum: "",
			time: "",
		},
		insert: {
			typr: 0,
			id: "",
			status: false,
			intervalNum: "",
			time: "",
		},
	});

	return {
		openid,
		token,
		appId,
		share,
	};
});
