import uni from "@dcloudio/vite-plugin-uni"; // ！此依赖不能安装
import path from "path";
import { defineConfig } from "vite";
import { cool } from "@cool-vue/vite-plugin";
import { proxy } from "./config/proxy";
import { UnifiedViteWeappTailwindcssPlugin as uvwt } from "weapp-tailwindcss/vite";

function resolve(dir: string) {
	return path.resolve(__dirname, dir);
}
const isH5 = process.env.UNI_PLATFORM === "h5";

const isApp = process.env.UNI_PLATFORM === "app";

const WeappTailwindcssDisabled = isH5 || isApp;
// https://vitejs.dev/config

export default defineConfig(() => {
	return {
		plugins: [
			uni(),
			uvwt({
				rem2rpx: true,
				disabled: WeappTailwindcssDisabled,
				// 由于 hbuilderx 会改变 process.cwd 所以这里必须传入当前目录的绝对路径
				tailwindcssBasedir: __dirname,
				// 微信小程序专用配置
				appType: "uni-app",
				// 确保样式正确处理
				cssPreflight: {
					"box-sizing": false,
					"border-color": false,
				},
				cssChildCombinatorReplaceValue: " > ",
			}),
			cool({
				type: "app",
				proxy,
			}),
		],
		server: {
			port: 9900,
			proxy,
			hmr: {
				overlay: true,
			},
		},
		resolve: {
			alias: {
				"/@": resolve("./"),
				"/$": resolve("./uni_modules/"),
			},
		},
		css: {
			postcss: {
				plugins: [
					require("tailwindcss")({
						// 注意此处，手动传入你 `tailwind.config.js` 的绝对路径
						config: resolve("./tailwind.config.js"),
					}),
					require("autoprefixer"),
				],
			},
		},
	};
});
