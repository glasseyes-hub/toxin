import { Block } from '../../services/js/block';
import { Container } from '../_lib/container/container';
import { Button } from '../_lib/button/button';

export class Calendar extends Block {
	constructor(options = {}) {
		const { attr, outputs, container, dates } = options;
		const template = require('./calendar.pug');
		require('./calendar.sass');
		require('./datepicker.js');
		require('./datepicker.min.css');

		super({ template, attr });

		this.outputs = outputs;
		this.container = container;

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

		dates && this.datepicker.api.selectDate(dates);

		const content = [this.datepicker, this.controls];

		this.setContent(content);
		this.setEvents();
		this.outputs && this.setOutputs();
	}
	setEvents() {
		this.controls.clear.onClick(() => {
			this.datepicker.api.clear();
			this.outputs && this.clearOutputs();
		});

		this.controls.confirm.onClick(() => {
			this.outputs && this.setOutputs();
			this.container && this.container.hide();
		});
	}
	clearOutputs() {
		this.outputs.forEach(output => {
			output.node.value = '';
		});
	}
	setOutputs() {
		switch (this.outputs.length) {
			case 1:
				this.setSingleOutputDate();
				break;
			case 2:
				this.setDoubleOutputDate();
				break;
		}
	}
	setSingleOutputDate() {
		this.outputs[0].node.value = this.datepicker.api.selectedDates
			.map(date => {
				return date
					.toLocaleDateString('ru-RU', {
						day: 'numeric',
						month: 'short',
					})
					.slice(0, -1);
			})
			.join(' - ');
	}
	setDoubleOutputDate() {
		const dates = this.datepicker.api.selectedDates;

		dates.length &&
			this.outputs.forEach((output, index) => {
				output.node.value = dates[index].toLocaleDateString();
			});
	}
}
