import { Block } from '../../services/js/block';
import { Container } from '../_lib/container/container';
import { Button } from '../_lib/button/button';
import { Input } from '../_lib/form/input/input';

export class Calendar extends Block {
	constructor(options = {}) {
		const { attr, outputs, container, dates = null } = options;
		const template = require('./calendar.pug');
		require('./calendar.sass');
		require('./datepicker.js');
		require('./datepicker.min.css');

		super({ template, attr });

		this.outputs = outputs;
		this.container = container;

		this.datepicker = new Container({
			attr: { class: 'calendar_container_datepicker' },
		});

		this.api = $(this.datepicker.node)
			.datepicker({
				navTitles: {
					days: 'MM yyyy',
				},
				range: true,
				autoClose: true,
			})
			.data('datepicker');

		dates && this.api.selectDate(Object.values(dates));

		const content = [this.datepicker];

		this.setContent(content);
	}
}
