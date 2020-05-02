import { Component } from '../../services/js/Component';
import { Button } from '../button/button';

export class Calendar extends Component {
	constructor(state) {
		require('./calendar.sass');
		require('./datepicker.js');
		require('./datepicker.min.css');

		state = {
			template: require('./calendar.pug'),
			arrival: undefined,
			leave: undefined,
			...state,
		};

		super(state);
	}
	render() {
		super.render();

		this.renderDatepicker();
		this.renderButtons();
	}
	renderDatepicker() {
		const container = this.node.querySelector('.calendar-datepicker');

		this.datepicker = $(container)
			.datepicker({
				navTitles: {
					days: 'MM yyyy',
				},
				dateFormat: 'dd.mm.yyyy',
				range: true,
				autoClose: true,
			})
			.data('datepicker');

		this.datepicker.selectDate([this.state.arrival, this.state.leave]);
	}
	renderButtons() {
		const container = this.node.querySelector('.calendar-buttons');

		this.clearButton = new Button({
			className: 'calendar-button_clear button_grey',
			text: 'Очистить',
		});
		this.applyButton = new Button({
			className: 'calendar-button_apply',
			text: 'Применить',
		});

		container.appendChild(this.clearButton.node);
		container.appendChild(this.applyButton.node);
	}
	handlers() {
		this.clearButton.node.addEventListener('click', (event) => {
			event.preventDefault();
			this.state = { arrival: undefined, leave: undefined };
			this.datepicker.clear();
		});
		this.applyButton.node.addEventListener('click', (event) => {
			event.preventDefault();
			const [arrival, leave] = this.datepicker.selectedDates;

			this.state = { arrival, leave };
		});
	}
	hide() {
		this.node.classList.add('-hidden-');
	}
	show() {
		this.node.classList.remove('-hidden-');
	}
}
