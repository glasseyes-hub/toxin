import { Button } from '../_lib/button/button.js';

export class Calendar {
	constructor(options) {
		Object.assign(this, options);

		require('./datepicker.min.js');
		require('./datepicker.min.css');

		this.datepicker = {
			node: this.node.querySelector('.calendar_container_datepicker'),
		};

		this.datepicker.api = $(this.datepicker.node)
			.datepicker({
				navTitles: {
					days: 'MM yyyy',
				},
				range: true,
			})
			.data('datepicker');

		this.controls = {
			clear: new Button({
				node: this.node.querySelector('.calendar_button_clear'),
			}),
			confirm: new Button({
				node: this.node.querySelector('.calendar_button_confirm'),
			}),
		};

		this.controls.clear.onClick(() => {
			this.datepicker.api.clear();
		});
		this.controls.confirm.onClick(() => {
			console.log(this.datepicker.api.selectedDates);
		});
	}
}
