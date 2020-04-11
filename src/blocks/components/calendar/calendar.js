import { Component } from '../../../services/js/Component';
import { Button } from '../button/button';

export class Calendar extends Component {
	constructor(state) {
		require('./calendar.sass');
		require('./datepicker.js');
		require('./datepicker.min.css');

		state = {
			template: require('./calendar.pug'),
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

		this.state.values && this.datepicker.selectDate(this.state.values);
	}
	renderButtons() {
		const container = this.node.querySelector('.calendar-buttons');

		this.clearButton = new Button({
			className: 'calendar-button_clear',
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
			this.state = { values: [] };
			this.datepicker.clear();
		});
		this.applyButton.node.addEventListener('click', (event) => {
			event.preventDefault();
			this.state = { values: this.datepicker.selectedDates };
		});
	}
	hide() {
		this.node.classList.add('-hidden-');
	}
	show() {
		this.node.classList.remove('-hidden-');
	}
}
