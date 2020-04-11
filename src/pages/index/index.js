import { template } from '../../templates/main';
import { Component } from '../../services/js/Component';
import { DateSelect } from '../../blocks/components/dateSelect/dateSelect';
import { GuestsSelect } from '../../blocks/components/guestsSelect/guestsSelect';
import { Button } from '../../blocks/components/button/button';

class Index extends Component {
	constructor() {
		require('./index.sass');

		const state = {
			template: require('./index.pug'),
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

		const dateSelect = new DateSelect({
			arrival: new Date(2019, 7, 19),
			leave: new Date(2019, 7, 23),
		});

		const guestsSelect = new GuestsSelect({
			adult: 2,
			children: 1,
			baby: 1,
		});

		const button = new Button({
			className: 'index-button button_bordered button_filled button_arrow',
			text: 'Подобрать номер',
		});

		form.appendChild(dateSelect.node);
		form.appendChild(guestsSelect.node);
		form.appendChild(button.node);
	}
}

const index = new Index();

template.main.node.appendChild(index.node);
