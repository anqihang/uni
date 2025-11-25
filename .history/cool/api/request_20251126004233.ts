const $request = (url: string, data: any, method: "POST" | "GET") => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: "https://xcx.wujingchuanmei.com/api/xcx" + url,
			method,
			data: data,
			header: {
				Authorization: "Bearer " + uni.getStorageSync("token"),
			},
			success(res) {
				resolve(res.data);
			},
			fail(error) {
				reject(error);
			},
			complete() {},
		});
	});
};
export const get = (url: string, data?: any) => {
	return $request(url, data, "GET");
};

export const post = (url: string, data?: any) => {
	return $request(url, data, "POST");
};
