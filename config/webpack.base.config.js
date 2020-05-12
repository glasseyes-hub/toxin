const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Управляет html файлами
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // Вырезает css из js в отдельный файл
const CopyWebpackPlugin = require('copy-webpack-plugin'); // Копирует файлов

function getEntires(pages) {
	return Object.assign(
		{},
		...pages.map(({ template }) => {
			if (!template) return {};

			return {
				[template]: [`./src/templates/${template}/${template}.js`],
			};
		}),
		...pages.map(({ name }) => {
			if (!name) return {};

			return {
				[name]: ['@babel/polyfill', `./src/pages/${name}/${name}.js`],
			};
		})
	);
}
const pages = [
	{
		name: 'colorsAndTypes',
		template: 'main',
	},
	{
		name: 'formElements',
		template: 'main',
	},
	{
		name: 'cards',
		template: 'main',
	},
	{
		name: 'headersAndFooters',
		template: 'main',
	},
	{
		name: 'index',
		template: 'main',
	},
	{
		name: 'search',
		template: 'main',
	},
	{
		name: 'room',
		template: 'main',
	},
	{
		name: 'login',
		template: 'main',
	},
	{
		name: 'registration',
		template: 'main',
	},
];

module.exports = {
	entry: getEntires(pages),
	output: {
		filename: 'js/[name].[hash].js', // Точка выхода
	},
	resolve: {
		extensions: ['.js', '.ts'],
		alias: {
			'@components': path.resolve(__dirname, 'src/components'),
			'@services': path.resolve(__dirname, 'src/services'),
		},
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
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env'],
							plugins: ['@babel/plugin-proposal-class-properties'],
						},
					},
				],
			},
			{
				test: /\.ts$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-typescript'],
						plugins: ['@babel/plugin-proposal-class-properties'],
					},
				},
			},
			{
				test: /\.jsx$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react'],
						plugins: ['@babel/plugin-proposal-class-properties'],
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
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							hmr: true,
							reloadAll: true,
						},
					},
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
					name: '../img/[name].[ext]', // Путь, куда копировать файлы
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
		...pages.map(({ name, template }) => {
			const conf = {
				chunks: ['vendors', template, name],
				filename: `${name}.html`,
			};

			if (template)
				conf.template = `./src/templates/${template}/${template}.pug`;

			return new HtmlWebpackPlugin(conf);
		}),
		new MiniCssExtractPlugin({
			filename: `css/[name].css`, // [hash] для добавления хеша к имени файла
		}),
		new CopyWebpackPlugin([
			{ from: './src/assets/img', to: './img' },
			{ from: './src/assets/favicon.ico' },
		]),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': "jquery'",
			'window.$': 'jquery',
		}),
	],
};
