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
// export function getAdv() {
// 	// let _data = {
// 	// 	appId: data.appId,
// 	// };
// 	return new Promise((resolve, reject) => {
// 		// post("/getAdvConfig", _data).then((res) => {
// 		// 	resolve(res.data);
// 		// });
// 	});
// }
