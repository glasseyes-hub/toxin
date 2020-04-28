import { Component } from '../../services/js/Component';
import { Page } from '../../services/js/Page';
import { DateSelect } from '../../blocks/components/dateSelect/dateSelect';
import { GuestsSelect } from '../../blocks/components/guestsSelect/guestsSelect';
import { Button } from '../../blocks/components/button/button';
import { Header } from '../../blocks/components/header/header';
import { fakeData } from '../../services/js/fakeData';
import { Footer } from '../../blocks/components/footer/footer';
import { Copyright } from '../../blocks/components/copyright/copyright';

class Index extends Component {
	constructor(state) {
		require('./index.sass');

		state = {
			template: require('./index.pug'),
			...state,
		};

		super(state);
	}
	render() {
		super.render();
		this.renderForm();
	}
	renderForm() {
		const form = this.node.querySelector('.index-form');
		form.action = 'search.html';

		const dateSelect = new DateSelect(this.state.dates);

		const guestsSelect = new GuestsSelect(this.state.guests);

		const button = new Button({
			className: 'index-button button_filled button_arrow button_big',
			text: 'Подобрать номер',
		});

		form.appendChild(dateSelect.node);
		form.appendChild(guestsSelect.node);
		form.appendChild(button.node);
	}
}

const index = new Index({
	dates: {
		arrival: new Date(2019, 7, 19),
		leave: new Date(2019, 7, 23),
	},
	guests: {
		adult: 2,
		children: 1,
		baby: 1,
	},
});

const page = new Page();
const header = new Header({
	menu: fakeData.header.menu,
});
const footer = new Footer({
	menu: fakeData.footer.menu,
});
const copyright = new Copyright();

page.header.appendChild(header.node);
page.main.appendChild(index.node);
page.footer.appendChild(footer.node);
page.body.appendChild(copyright.node);
