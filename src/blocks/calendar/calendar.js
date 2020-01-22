// import { Button } from '../_lib/button/button.js';

// export class Calendar {
// 	constructor(options) {
// 		Object.assign(this, options);

// 		require('./datepicker.min.js');
// 		require('./datepicker.min.css');

// 		this.datepicker = {
// 			node: this.node.querySelector('.calendar_container_datepicker'),
// 		};

// 		this.datepicker.api = $(this.datepicker.node)
// 			.datepicker({
// 				navTitles: {
// 					days: 'MM yyyy',
// 				},
// 				range: true,
// 			})
// 			.data('datepicker');

// 		this.controls = {
// 			clear: new Button({
// 				node: this.node.querySelector('.calendar_button_clear'),
// 			}),
// 			confirm: new Button({
// 				node: this.node.querySelector('.calendar_button_confirm'),
// 			}),
// 		};

// 	}
// }

import { Block } from '../../services/js/block';
import { Container } from '../_lib/container/container';
import { Button } from '../_lib/button/button';

export class Calendar extends Block {
	constructor(options = {}) {
		const { attr, interactionBlocks } = options;
		const template = require('./calendar.pug');
		require('./calendar.sass');
		require('./datepicker.js');
		require('./datepicker.min.css');

		super({ template, attr });

		this.datepicker = new Container({
			attr: { class: 'calendar_container_datepicker' },
		});

		this.datepicker.api = $(this.datepicker.node)
			.datepicker({
				navTitles: {
					days: 'MM yyyy',
				},
				range: true,
				autoClose: true,
			})
			.data('datepicker');

		this.controls = new Container({
			attr: { class: 'calendar_container_controls' },
		});

		this.controls.clear = new Button({
			attr: { class: 'calendar_button calendar_button_clear' },
			content: 'Очистить',
		});

		this.controls.confirm = new Button({
			attr: { class: 'calendar_button calendar_button_confirm' },
			content: 'Применить',
		});

		this.controls.setContent([this.controls.clear, this.controls.confirm]);

		const content = [this.datepicker, this.controls];

		this.setContent(content);

		interactionBlocks && this.setEvents(interactionBlocks);
	}
	setEvents({ container, arrival, leave }) {
		this.controls.clear.onClick(() => {
			this.datepicker.api.clear();
			arrival.node.value = '';
			leave.node.value = '';
		});

		this.controls.confirm.onClick(() => {
			let [arrivalDate, leaveDate] = this.datepicker.api.selectedDates;

			arrivalDate = this.getParsedDate(arrivalDate);
			leaveDate = this.getParsedDate(leaveDate);

			arrival.node.value = arrivalDate;
			leave.node.value = leaveDate;
			container.hide();
		});
	}
	getParsedDate(date) {
		const day = date.getDate(),
			month = date.getMonth() + 1,
			year = date.getFullYear();

		return `${day < 10 ? '0' + day : day}.${
			month < 10 ? '0' + month : month
		}.${year}`;
	}
}
