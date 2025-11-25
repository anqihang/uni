import { defineStore } from "pinia";

export const useGlobalStore = defineStore("global", () => {
	const token = uni.getStorageSync("token");
	const openid = uni.getStorageSync("openid");
	const appId = uni.getAccountInfoSync().miniProgram.appId;
	const share = { shareTitle: "", shareImg: "" };

	return {
		openid,
		token,
		appId,
		share,
	};
});
