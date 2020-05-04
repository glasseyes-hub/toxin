import { Component } from '../../services/js/Component';
import { Header } from '../../components/header/header';
import { Page } from '../../services/js/Page';
import { Footer } from '../../components/footer/footer';

class HeadersAndFooters extends Component {
	constructor(state) {
		require('./headersAndFooters.sass');

		state = {
			template: require('./headersAndFooters.pug'),
			...state,
		};

		super(state);
	}
	render() {
		super.render();
		this.renderHeaders();
		this.renderFooters();
	}
	renderHeaders() {
		const menu = [
			['О нас', './about.html'],
			[
				'Услуги',
				'./services.html',
				[
					['Трансфер', './transfer.html'],
					['Завтрак', './dinner.html'],
				],
			],
			['Вакансии', './vacancies.html'],
			['Новости', './news.html'],
			['Соглашения', './agreement.html', [['Договор', './contract.html']]],
		];

		const header = new Header({
			menu,
		});

		const headerAuthorized = new Header({
			menu,
			user: {
				id: 1,
				username: 'Cosmin Negoita',
			},
		});

		this.node.appendChild(header.node);
		this.node.appendChild(headerAuthorized.node);
	}
	renderFooters() {
		const menu = [
			[
				'Навигация',
				'./navigation.html',
				[
					['О нас', './about.html'],
					['Новости', './news.html'],
					['Служба поддержки', './support.html'],
					['Услуги', './services.html'],
				],
			],
			[
				'О нас',
				'./about.html',
				[
					['О сервисе', './aboutService.html'],
					['Наша команда', './team.html'],
					['Вакансии', './vacancies.html'],
					['Инвесторы', './investors.html'],
				],
			],
			[
				'Служба поддержки',
				'./support.html',
				[
					['Соглашения', './agreement.html'],
					['Сообщества', './social.html'],
					['Связь с нами', './feedback.html'],
				],
			],
		];

		const footer = new Footer({
			menu,
		});
		const footerLight = new Footer({
			className: 'footer_light',
			menu,
		});

		this.node.appendChild(footer.node);
		this.node.appendChild(footerLight.node);
	}
}

const headersAndFooters = new HeadersAndFooters();
const page = new Page();

page.main.appendChild(headersAndFooters.node);
