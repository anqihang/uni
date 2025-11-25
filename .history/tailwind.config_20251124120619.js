const path = require("path");

const resolve = (p) => {
	return path.resolve(__dirname, p);
};
/** @type {import('tailwindcss').Config} */

module.exports = {
	// 增加前辍避免样式冲突
	prefix: "thms-",
	// 注意此处，一定要 `path.resolve` 一下, 传入绝对路径
	// 你要有其他目录，比如 components，也必须在这里，添加一下
	content: [
		"./index.html",
		"./pages/**/*.{html,js,ts,jsx,tsx,vue}",
		"./components/**/*.{html,js,ts,jsx,tsx,vue}",
		"./uni_modules/**/*.{html,js,ts,jsx,tsx,vue}",
		"./static/css/**/*.scss",
	].map(resolve),
	// 医疗应用主题配置
	theme: {
		extend: {
			colors: {
				// 医疗主题色系 - 基于医生工作台设计
				primary: {
					DEFAULT: "#1d8afe",
					50: "#f0f8ff",
					100: "#e0f1ff",
					200: "#bae3ff",
					300: "#7dd0ff",
					400: "#38bbff",
					500: "#1d8afe",
					600: "#0570de",
					700: "#0659b4",
					800: "#0a4d95",
					900: "#0f427a",
				},
				// 医疗专用色彩
				medical: {
					blue: "#1d8afe",
					green: "#00c896",
					orange: "#ff8a00",
					red: "#ff4757",
					purple: "#6c5ce7",
					gray: "#74b9ff",
				},
				// 状态色系
				success: {
					DEFAULT: "#00c896",
					light: "#6ce584",
					dark: "#00a085",
				},
				warning: {
					DEFAULT: "#ff8a00",
					light: "#ffb84d",
					dark: "#e67e00",
				},
				error: {
					DEFAULT: "#ff4757",
					light: "#ff6b7a",
					dark: "#e63946",
				},
				// 中性色系
				gray: {
					50: "#f8fafc",
					100: "#f1f5f9",
					200: "#e2e8f0",
					300: "#cbd5e1",
					400: "#94a3b8",
					500: "#64748b",
					600: "#475569",
					700: "#334155",
					800: "#1e293b",
					900: "#0f172a",
				},
			},
			// 字体配置 - 使用系统字体，避免版权问题
			fontFamily: {
				// 主要字体族 - 中文优先，跨平台兼容
				sans: [
					// iOS/macOS 系统字体
					"-apple-system",
					"BlinkMacSystemFont",
					// 苹果中文字体
					"PingFang SC",
					"PingFang TC",
					// Android 系统字体
					"Roboto",
					// 华为鸿蒙字体
					"HarmonyOS Sans",
					"HarmonyOS Sans SC",
					// 小米系统字体
					"MiSans",
					// Windows 系统字体
					"Microsoft YaHei",
					"Segoe UI",
					// 通用中文字体
					"Noto Sans CJK SC",
					"Source Han Sans SC",
					// 备用字体
					"Helvetica Neue",
					"Arial",
					"sans-serif",
				],
				// 等宽字体族 - 代码显示
				mono: ["SF Mono", "Monaco", "Consolas", "Courier New", "Menlo", "monospace"],
				// 数字字体族 - 数据展示优化
				numeric: ["SF Pro Display", "Helvetica Neue", "Arial", "PingFang SC", "sans-serif"],
			},
			// 圆角配置
			borderRadius: {
				none: "0",
				sm: "4px",
				DEFAULT: "8px",
				md: "12px",
				lg: "16px",
				xl: "24px",
				"2xl": "32px",
				"3xl": "48px",
				full: "9999px",
			},
			// 阴影配置
			boxShadow: {
				sm: "0 2px 8px rgba(0, 0, 0, 0.06)",
				DEFAULT: "0 4px 16px rgba(0, 0, 0, 0.08)",
				md: "0 8px 24px rgba(0, 0, 0, 0.12)",
				lg: "0 16px 48px rgba(0, 0, 0, 0.16)",
				xl: "0 24px 64px rgba(0, 0, 0, 0.20)",
				card: "0 4px 20px rgba(29, 138, 254, 0.08)",
			},
			// 间距配置
			spacing: {
				"safe-top": "env(safe-area-inset-top)",
				"safe-bottom": "env(safe-area-inset-bottom)",
				"safe-left": "env(safe-area-inset-left)",
				"safe-right": "env(safe-area-inset-right)",
			},
		},
	},
	corePlugins: {
		// 微信小程序环境需要关闭preflight避免冲突
		preflight: process.env.UNI_PLATFORM !== "mp-weixin",
	},
	// 微信小程序专用配置
	weapp: {
		// 小程序样式隔离
		transform: true,
		// 样式重写
		styleIsolation: "shared",
	},
};
