import { Component } from '../../services/js/Component';
import { DateSelect } from '../dateSelect/dateSelect';
import { GuestsSelect } from '../guestsSelect/guestsSelect';
import { Button } from '../button/button';

export class FindRooms extends Component {
	constructor(state) {
		require('./findRooms.sass');

		state = {
			template: require('./findRooms.pug'),
			...state,
		};

		super(state);
	}
	render() {
		super.render();
		this.renderForm();
	}
	renderForm() {
		const form = this.node.querySelector('.findRooms-form');

		const dateSelect = new DateSelect(this.state.dates);
		const guestsSelect = new GuestsSelect(this.state.guests);
		const button = new Button({
			className: 'findRooms-button button_filled button_arrow button_big',
			text: 'Подобрать номер',
		});

		form.appendChild(dateSelect.node);
		form.appendChild(guestsSelect.node);
		form.appendChild(button.node);
	}
}
