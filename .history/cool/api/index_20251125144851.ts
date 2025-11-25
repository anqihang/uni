import { useGlobalStore } from "../store/global";
import { post } from "./request";

export function login() {
	const globalStore = useGlobalStore();
	return new Promise((resolve, reject) => {
		uni.login({
			success: function (res) {
				if (res.code) {
					uni.request({
						url: "https://xcx.wujingchuanmei.com/api/xcx/login",
						method: "POST",
						data: {
							code: res.code,
							appId: globalStore.appId,
						},
						success: (res) => {
							const data = res.data as any;
							uni.setStorageSync("token", data.token);
							uni.setStorageSync("openid", data.openid);
							globalStore.token = data.token;
							globalStore.openid = data.openid;
							globalStore.share = {
								shareTitle: data.wechatApp.shareTitle,
								shareImg: data.wechatApp.sharePic,
							};
							resolve(data);
						},
					});
				}
			},
		});
	});
}
export function getAdv() {
	const globalStore = useGlobalStore();
	post("/getAdvConfig", { appId: globalStore.appId }).then((res) => {
		res.advertTypes.forEach((element) => {
			//底部广告
			if (element.type == 6) {
				advB.value.typeAd = element.typeAd;
			}
			if (element.type == 6 || element.type == 7 || element.type == 8) {
				advList.value.push(element.content?.trim());
				if (element.intervalNum > 0) {
					ysTime.value = element.intervalNum;
				}
			}

			oldAdvList.value = advList.value;

			if (advList.value.length > 0) {
				let n = Math.floor(Math.random() * advList.value.length);
				advB.value.advId = advList.value[n];
				num.value.push(n);
			}
			//插屏广告
			if (element.type == 2) {
				advC.value.status = element.status;
				advC.value.advId = element.content?.trim();
				advC.value.intervalNum = element.intervalNum;
				advC.value.typeAd = element.typeAd;
			}
			//激励广告
			if (element.type == 4) {
				advReward.value.id = element.content?.trim();
				advReward.value.time = element.intervalNum;
				advReward.value.title = element.title;
				advReward.value.status = element.status;
				advReward.value.every = element.num;
				advReward.value.isFirst = element.first;
				advReward.value.typeAd = element.typeAd;
				if (advReward.value.typeAd == 0) {
					//todo
					rewardAdv.value = null;
					createReward();
				}
			}
			//前贴广告
			if (element.type == 5) {
				advS.value.status = element.status;
				advS.value.advId = element.content?.trim();
			}
			//
			if (element.type == 9) {
				halfO.value.appId = element.content;
				half.value = element.status == 1;
				halfO.value.time = element.intervalNum;
				halfO.value.interval = element.num;
				halfO.value.title = element.title;
			}

			if (element.type == 10) {
				getApp().globalData.agreeShow = false;
				advScreenEnter.value.advId = element.content;
				advScreenEnter.value.time = element.intervalNum;
				advScreenEnter.value.typeAd = element.typeAd;
				advScreenEnter.value.status = element.status;
				half.value = true;

				if (element.intervalNum > 0) {
					setTimeout(() => {
						firstShow.value = false;
						getApp().globalData.agreeShow = true;
						// videoContent.value.play();
					}, advScreenEnter.value.time * 1000);
				}

				if (element.typeAd == 1 && element.status == 1 && element.intervalNum != 0) {
					getApp().globalData.agreeShow = false;
				}
			}

			if (element.type == 11 || element.type == 12) {
				let temp = {
					intervalNum: element.num,
					advId: element.content,
					typeAd: element.typeAd,
					status: element.status,
				};
				advScreenList.value.push(temp);
			}
		});
	});
}
