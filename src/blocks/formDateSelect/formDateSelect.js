import { Block } from '../../services/js/block';
import { FormDropdown } from '../_lib/form/form-dropdown/form-dropdown';
import { Calendar } from '../calendar/calendar';
import { Container } from '../_lib/container/container';

export class FormDateSelect extends Block {
	constructor(options = {}) {
		const { attr } = options;
		const template = require('./formDateSelect.pug');
		require('./formDateSelect.sass');

		super({ template, attr });

		this.container = new Container({
			attr: { class: 'form-dropdown_container -hidden-' },
		});

		this.arrival = new FormDropdown({
			formInput: {
				title: {
					text: { content: 'Прибытие' },
				},
				input: {
					attr: { name: 'arrival', placeholder: 'ДД.ММ.ГГГГ', readonly: '' },
					mask: '99.99.9999',
				},
			},
			container: this.container,
		});
		this.leave = new FormDropdown({
			formInput: {
				title: {
					text: { content: 'Выезд' },
				},
				input: {
					attr: { name: 'leave', placeholder: 'ДД.ММ.ГГГГ', readonly: '' },
					mask: '99.99.9999',
				},
			},
			container: this.container,
		});

		this.container.setContent([
			new Calendar({
				interactionBlocks: {
					container: this.container,
					arrival: this.arrival.formInput.input,
					leave: this.leave.formInput.input,
				},
			}),
		]);

		const content = [this.arrival, this.leave, this.container];

		this.setContent(content);
	}
}
