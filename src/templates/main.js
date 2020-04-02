import './main.sass';
import { Header } from '../blocks/components/header/header';
import { Footer } from '../blocks/components/footer/footer';
import { Copyright } from '../blocks/components/copyright/copyright';

export const template = {
	node: document.querySelector('.page'),
	header: {
		node: document.querySelector('header'),
	},
	main: {
		node: document.querySelector('main'),
	},
	footer: {
		node: document.querySelector('footer'),
	},
	copyright: {
		node: document.querySelector('.copyright'),
	},
};

const header = new Header({
	list: [
		{ name: 'О нас', src: './about.html' },
		[
			{ name: 'Услуги', src: './services.html' },
			{ name: 'Трансфер', src: './transfer.html' },
			{ name: 'Поиск номеров', src: './search.html' },
		],
		{ name: 'Вакансии', src: './jobs.html' },
		{ name: 'Новости', src: './news.html' },
		[
			{ name: 'Соглашения', src: './agreement.html' },
			{ name: 'Договор', src: './contract.html' },
		],
	],
});

const footer = new Footer({
	menuList: [
		[
			{ name: 'Навигация' },
			{ name: 'О нас', src: './about.html' },
			{ name: 'Новости', src: './news.html' },
			{ name: 'Служба поддержки', src: './support.html' },
			{ name: 'Услуги', src: './services.html' },
		],
		[
			{ name: 'О нас' },
			{ name: 'О сервисе', src: './about.html' },
			{ name: 'Наша команда', src: './team.html' },
			{ name: 'Вакансии', src: './vacancy.html' },
			{ name: 'Инвесторы', src: './invest.html' },
		],
		[
			{ name: 'Служба поддержки', src: './support.html' },
			{ name: 'Соглашения', src: './agreement.html' },
			{ name: 'Сообщества', src: './social.html' },
			{ name: 'Связь с нами', src: './communication.html' },
		],
	],
});
const copyright = new Copyright({
	socialPages: [
		{ icon: 'twitter', src: 'http://twitter.com' },
		{ icon: 'facebook', src: 'http://facebook.com' },
		{ icon: 'instagram', src: 'http://instagram.com' },
	],
});

footer.addObserver(state => {
	console.log(state);
});

template.header.node.appendChild(header.node);
template.footer.node.appendChild(footer.node);
template.copyright.node.replaceWith(copyright.node);
