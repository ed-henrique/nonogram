import HtmlWebpackPlugin from "html-webpack-plugin";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
	entry: "./js/index.ts",
	mode: "production",
	devtool: "inline-source-map",
	output: {
		filename: "main.js",
		path: path.resolve(__dirname, "dist"),
	},
	experiments: {
		outputModule: true,
	},
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"],
				exclude: "/node_modules/",
			},
			{
				test: /\.ts$/i,
				use: "ts-loader",
				exclude: "/node_modules/",
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			favicon: "./public/favicon.ico",
			template: "./public/index.html",
		}),
	],
	resolve: {
		extensions: [".ts", ".js"],
	},
};
