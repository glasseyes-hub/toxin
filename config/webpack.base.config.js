const webpack = require('webpack');
const path = require('path'); // Абсолютные пути
const fs = require('fs'); // Работа с файловой системой
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Управляет html файлами
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // Вырезает css из js в отдельный файл
const CopyWebpackPlugin = require('copy-webpack-plugin'); // Копирует файлов

// Пути к основным директориям
class ProjectPaths {
	constructor() {
		let srcPath = path.join(__dirname, '../src');
		let distPath = path.join(__dirname, '../dist');

		this.src = {
			root: srcPath,
			entires: {
				root: `${srcPath}`,
			},
			pages: {
				root: `${srcPath}`,
			},
			blocks: {
				root: `${srcPath}/_blocks`,
			},
			js: {
				root: `${srcPath}/_js`,
			},
			sass: {
				root: `${srcPath}/_sass`,
			},
			img: {
				root: `${srcPath}/_img`,
			},
			fonts: {
				root: `${srcPath}/_fonts`,
			},
			special: {
				root: `${srcPath}/_special`,
			},
		};
		this.dist = {
			root: distPath,
			fonts: {
				root: `${distPath}/_fonts`,
			},
		};

		this.load();
	}
	load() {
		this.loadEntiresList();
		this.src.js.list = this.findFiles('js', this.src.blocks.root);
		this.src.img.list = [
			...this.findFiles('png', this.src.blocks.root),
			...this.findFiles('png, svg', this.src.img.root),
		];
		this.src.fonts.list = this.findFolders('js', this.src.fonts.root, false);
		this.src.pages.list = this.findFiles('pug', this.src.pages.root);
	}
	find(type, patterns, path, nested) {
		let founded = [];
		let items = fs.readdirSync(path);
		let folders = items.filter(name => !name.match(/\./));
		let files = items.filter(name => name.match(/\./));
		let matchingItems = type == 'file' && files.length > 0 ? items : folders;

		if (matchingItems) {
			matchingItems.forEach(name => {
				if (name.charAt(0) === '_') return; // Escape files and folders starts with _

				let itemPath = `${path}/${name}`;
				let patternsArray = patterns.split(',');

				if (type == 'file') name = name.split('.')[1]; // получаем расширение файла

				patternsArray.forEach(pattern => {
					pattern = pattern.replace(/\s+/g, '');

					if (
						(!pattern && (type != 'file' || name)) ||
						(pattern && name == pattern)
					) {
						founded.push(itemPath);
					} else if ((type == 'folder' || !name) && nested)
						founded = founded.concat(this.find(type, pattern, itemPath));
				});
			});
		}

		return founded;
	}
	findFolders(patterns, path, nested = true) {
		return this.find('folder', patterns, path, nested);
	}
	findFiles(patterns, path, nested = true) {
		return this.find('file', patterns, path, nested);
	}
	loadEntiresList() {
		this.src.entires.list = {};
		this.findFiles('sass, js', this.src.entires.root).forEach(path => {
			path = './' + path.split('\\')[path.split('\\').length - 1]; // Относительный путь
			let [filename, extension] = path
				.split('/')
				[path.split('/').length - 1].split('.');
			this.src.entires.list[filename] = path;
		});
	}
}

const paths = new ProjectPaths();

console.log('Entires files: ');
console.log(paths.src.entires.list);
console.log('Pages files: ');
console.log(paths.src.pages.list);
console.log('JS files: ');
console.log(paths.src.js.list);
console.log('IMG folders: ');
console.log(paths.src.img.list);
console.log('FONTS folders: ');
console.log(paths.src.fonts.list);

module.exports = {
	externals: {
		paths: paths, // Подключение внешних объектов,
	},
	entry: paths.src.entires.list,
	output: {
		filename: 'js/[name].js', // Точка выхода
		// path: paths.dist.root, // Путь сохранения файла при сборке
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
		...paths.src.pages.list.map(
			path =>
				new HtmlWebpackPlugin({
					template: path, // Файл шаблона
					filename: path
						.split('/')
						[path.split('/').length - 1].replace('pug', 'html'),
					// inject: false
				})
		),
		new MiniCssExtractPlugin({
			filename: `css/[name].css`, // [hash] для добавления хеша к имени файла
		}),
		new CopyWebpackPlugin([
			{ from: paths.src.special.root },
			{ from: paths.src.js.root, to: 'js' },
			...paths.src.js.list.map(path => ({ from: path, to: `js` })),
			...paths.src.img.list.map(path => ({ from: path, to: `img` })),
		]),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
		}),
	],
};
