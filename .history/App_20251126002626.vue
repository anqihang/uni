<script setup lang="ts">
import { getAdv, getTabBarList, login } from "./cool/api";
import { useGlobalStore } from "./cool/store/global";
import { useStore } from "/@/cool";
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
const globalStore = useGlobalStore();
onLaunch(() => {
	console.log("App Launch");

	if (globalStore.token) {
		// 获取登录用户信息
		getAdv();
		getTabBarList();
	} else {
		login().then(() => {
			getAdv();
			getTabBarList();
		});
	}
});

onShow(() => {
	console.log("App Show");
});

onHide(() => {
	console.log("App Hide");
});
</script>

<style lang="scss">
/* tailwindcss 配置 */
@import "tailwindcss/base";
@import "tailwindcss/utilities";
@import "tailwindcss/components";
//
@import "/$/cool-ui/index.scss";
@import "/@/static/css/index.scss";

.t-tabs__track {
	background-color: red !important;
}

.t-tabs__item--active {
	color: red !important;
}
</style>
