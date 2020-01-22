const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config.js');

const devWebpackConfig = merge(baseWebpackConfig, {
	mode: 'development',
	devtool: 'cheap-module-eval-source-map',
	devServer: {
		port: 8081,
		overlay: {
			warnings: true,
			errors: true,
		},
		contentBase: './dist',
		hot: true,
	},
	plugins: [
		new webpack.SourceMapDevToolPlugin({
			filename: '[file].map',
		}),
		new webpack.HotModuleReplacementPlugin(),
	],
});

module.exports = new Promise((resolve, reject) => {
	resolve(devWebpackConfig);
});
