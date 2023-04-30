import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
	entry: "./js/index.js",
	mode: "production",
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
			},
		],
	},
};
