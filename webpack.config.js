const path = require('path');

module.exports = {
	entry: "./src/cIDEr.App/index.tsx",
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist")
	},
	devtool: "source-map",
	module: {
		rules: [
			{
				test: /\.tsx?$/, 
				loader: 'awesome-typescript-loader',
			},
			{
				enforce: "pre",
				test: /\.js$/, 
				use: "source-map-loader"
			}
		]
	},
	resolve: {
		extensions: [".js", ".json", ".ts", ".tsx"]
	},
	externals: {
		"react": "React",
		"react-dom": "ReactDOM"
	}
}