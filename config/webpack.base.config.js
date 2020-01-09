const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Управляет html файлами
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // Вырезает css из js в отдельный файл
const CopyWebpackPlugin = require('copy-webpack-plugin'); // Копирует файлов

function getEntires(pages) {
	return Object.assign(
		{},
		...pages.map(({ name, path }) => {
			return { [name]: path };
		})
	);
}
const pages = [
	{
		name: 'index',
		path: './src/pages/index.js',
		HtmlWebpackPlugin: new HtmlWebpackPlugin({
			template: './src/pages/templates/index.pug',
			chunks: ['vendors', 'index'],
			filename: 'index.html',
		}),
	},
	{
		name: 'search',
		path: './src/pages/search.js',
		HtmlWebpackPlugin: new HtmlWebpackPlugin({
			template: './src/pages/templates/index.pug',
			chunks: ['vendors', 'search'],
			filename: 'search.html',
		}),
	},
	{
		name: 'room',
		path: './src/pages/room.js',
		HtmlWebpackPlugin: new HtmlWebpackPlugin({
			template: './src/pages/templates/index.pug',
			chunks: ['vendors', 'room'],
			filename: 'room.html',
		}),
	},
];

const entires = getEntires(pages);

console.log('Entires:', entires);

module.exports = {
	entry: entires,
	output: {
		filename: 'js/[name].js', // Точка выхода
	},
	optimization: {
		// Выносит подключенные модули в отдельный файл
		splitChunks: {
			cacheGroups: {
				vendor: {
					name: 'vendors',
					test: /node_modules/,
					chunks: 'all',
					enforce: true,
				},
			},
		},
	},
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
			{
				test: /\.pug/, // Регулярное выражение для обробатываемых файлов
				loader: 'pug-loader', // Используемый loader
			},
			{
				test: /\.(css|scss|sass)$/,
				use: [
					'style-loader',
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true,
							config: {
								path: './config/postcss.config.js', // Файл конфига postcss
							},
						},
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
						},
					},
				],
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'url-loader',
				options: {
					limit: false,
					name: 'img/[name].[ext]', // Путь, куда копировать файлы
				},
			},
			{
				test: /\.(woff|woff2|ttf|eot|svg)$/,
				loader: 'url-loader',
				options: {
					limit: false,
					name: 'fonts/[name].[ext]',
					publicPath: '../', // Путь к корневой папке
				},
			},
		],
	},
	plugins: [
		...pages.map(({ HtmlWebpackPlugin }) => HtmlWebpackPlugin),
		new MiniCssExtractPlugin({
			filename: `css/[name].css`, // [hash] для добавления хеша к имени файла
		}),
		new CopyWebpackPlugin([{ from: './src/assets' }]),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
		}),
	],
};
