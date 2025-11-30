import { useGlobalStore } from "../store/global";
import { get, post } from "./request";

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
	post("/getAdvConfig", { appId: globalStore.appId }).then((res: any) => {
		res.advertTypes?.forEach((ele: any) => {
			if (ele.type === 6) {
				globalStore.adv.bottom.type = ele.typeAd;
			}
			if ([6, 7, 8].includes(ele.type)) {
				globalStore.adv.bottom.list.push(ele.content?.trim());
			}
			if (ele.type === 2) {
				globalStore.adv.insert.status = ele.status;
				globalStore.adv.insert.id = ele.content?.trim();
				globalStore.adv.insert.type = ele.typeAd;
				globalStore.adv.insert.intervalNum = ele.intervalNum;
			}
			if (ele.type === 4) {
				globalStore.adv.reward.id = ele.content?.trim();
				globalStore.adv.reward.time = ele.intervalNum;
				globalStore.adv.reward.title = ele.title;
				globalStore.adv.reward.status = ele.status;
				globalStore.adv.reward.intervalNum = ele.num;
				globalStore.adv.reward.isFirst = ele.first;
				globalStore.adv.reward.type = ele.typeAd;
			}
			if (ele.type === 5) {
				globalStore.adv.previousPost.status = ele.status;
				globalStore.adv.previousPost.id = ele.content?.trim();
			}
			if (ele.type === 9) {
				globalStore.adv.half.id = ele.content?.trim();
				globalStore.adv.half.time = ele.intervalNum;
				globalStore.adv.half.interval = ele.num;
				globalStore.adv.half.title = ele.title;
			}
			if (ele.type === 10) {
				globalStore.adv.pop.id = ele.content?.trim();
				globalStore.adv.pop.time = ele.intervalNum;
				globalStore.adv.pop.type = ele.typeAd;
				globalStore.adv.pop.status = ele.status;
			}
			if ([11, 12].includes(ele.type)) {
				globalStore.adv.screen.push({
					id: ele.content?.trim(),
					time: ele.intervalNum,
					type: ele.typeAd,
					status: ele.status,
				});
			}
		});

		// 	if (element.type == 4) {
		// 		if (advReward.value.typeAd == 0) {
		// 			//todo
		// 			rewardAdv.value = null;
		// 			createReward();
		// 		}
		// 	}
		// 	if (element.type == 9) {
		// 		half.value = element.status == 1;
		// 	}
		// 	if (element.type == 10) {
		// 		getApp().globalData.agreeShow = false;
		// 		advScreenEnter.value.typeAd = element.typeAd;
		// 		advScreenEnter.value.status = element.status;
		// 		half.value = true;
		// 		if (element.intervalNum > 0) {
		// 			setTimeout(() => {
		// 				firstShow.value = false;
		// 				getApp().globalData.agreeShow = true;
		// 				// videoContent.value.play();
		// 			}, advScreenEnter.value.time * 1000);
		// 		}
		// 		if (element.typeAd == 1 && element.status == 1 && element.intervalNum != 0) {
		// 			getApp().globalData.agreeShow = false;
		// 		}
		// 	}
		// 	if (element.type == 11 || element.type == 12) {
		// 		let temp = {
		// 			intervalNum: element.num,
		// 			advId: element.content,
		// 			typeAd: element.typeAd,
		// 			status: element.status,
		// 		};
		// 		advScreenList.value.push(temp);
		// 	}
		// });
	});
}
//获取tabBar列表
export function getTabBarList() {
	const globalStore = useGlobalStore();
	get("/xcxPageBottom", { appId: useGlobalStore().appId }).then((res) => {
		console.log(res);
		globalStore.tabBarList = res.xcxPageList;
		console.log(globalStore.tabBarList, "tabBarList");
	});
}
export function getVideoList(data) {
	return get("/video/index", {
		pageNum: data.page,
		pageSize: 10,
		appid: useGlobalStore().appId,
		title: data.title,
		reasonable: false,
		videoType: data.type,
	});
}
//视频列表
export const videoList = (data) => {
	return new Promise((resolve, reject) => {
		// uni.showLoading({
		// 	title: '数据加载中',
		// 	icon: 'loading',
		// 	mask: true
		// });
		get("/video/index", {
			pageNum: data.page,
			pageSize: 10,
			appid: useGlobalStore().appId,
			title: data.title,
			reasonable: false,
			videoType: data.type,
		}).then((res) => {
			resolve(res.data);
		});
	});
};
