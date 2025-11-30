import { first } from "lodash-es";
import { useGlobalStore } from "../store/global";
import { get, post } from "./request";
import { t } from "/@/locale";

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
		let typea = "";
		let typev = "";
		let typeT = "";
		let typeB = "";
		res.advertPlaceConfigs.forEach((element) => {
			if (element.title == "config_adv") {
				globalStore.adv.config_a = {};
				typea = element.advertTypeId;
				// advType.value["artical"] = element;
			}
			if (element.title == "config_vid") {
				globalStore.adv.config_vid = {};
				typev = element.advertTypeId;
				// advType.value["video"] = element;
			}
			if (element.title == "top_index") {
				typeT = element.advertTypeId;
				globalStore.adv.top_global = {
					status: element.status,
					every: element?.acticleCnt,
					type: element.advertTypeId,
				};
			}
			if (element.title == "bottom_index") {
				typeB = element.advertTypeId;
				globalStore.adv.bottom_global = {
					status: element.status,
					every: element?.acticleCnt,
					type: element.advertTypeId,
				};
			}
		});
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
			if (typea == ele.type) {
				globalStore.adv.config_a.advId = ele.content?.trim();
				globalStore.adv.config_a.typeAd = ele.typeAd;
			}
			if (typev == ele.type) {
				globalStore.adv.config_v.advId = ele.content?.trim();
				globalStore.adv.config_v.typeAd = ele.typeAd;
			}
			if (typeT == ele.type) {
				globalStore.adv.top_global.advId = ele.content?.trim();
				globalStore.adv.top_global.typeAd = ele.typeAd;
			}
			if (typeB == ele.type) {
				globalStore.adv.bottom_global.advId = ele.content?.trim();
				globalStore.adv.bottom_global.typeAd = ele.typeAd;
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
		console.log(1, res);
		globalStore.tabBarList = res.xcxPageList;
		console.log(globalStore.tabBarList, "tabBarList");
	});
}
export function getVideoList(page, title, type) {
	return get("/video/index", {
		pageNum: page,
		appid: useGlobalStore().appId,
		// title: title,
		reasonable: false,
		pageSize: 10,
		videoType: type,
	});
}
export function videoInfoHome(data) {
	return new Promise((resolve, reject) => {
		get("/video/typeShow", { id: data.id, typeId: data.cateId, first: data.first }).then(
			(data) => {
				resolve(data);
			}
		);
	});
}
export function videoInfo(data) {
	return new Promise((resolve, reject) => {
		get("/video/show", {
			id: data.id,
			appid: useGlobalStore().appId,
			first: data.first,
		}).then((res) => {
			resolve(res.data);
		});
	});
}
// export const videoInfoHome = (data) => {
// 	let _data = {
// 		id: data.id,
// 		typeId: data.cateId,
// 	};
// 	if (data.first) {
// 		_data.first = data.first;
// 	}
// 	return new Promise((resolve, reject) => {
// 		get("/video/typeShow", _data).then((res) => {
// 			resolve(res.data);
// 		});
// 	});
// };
// //视频详情
// export const videoInfo = (data) => {
// 	let _data = {
// 		id: data.id,
// 		appId: data.appId,
// 	};
// 	if (data.first) {
// 		_data.first = data.first;
// 	}
// 	return new Promise((resolve, reject) => {
// 		// uni.showLoading({
// 		// 	title: '数据加载中',
// 		// 	icon: 'loading',
// 		// 	mask: true
// 		// });
// 		get("/video/show", _data).then((res) => {
// 			resolve(res.data);
// 		});
// 	});
// };
