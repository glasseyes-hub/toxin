import { Block } from '../../services/js/block';
import { FormDropdown } from '../_lib/form/form-dropdown/form-dropdown';
import { Calendar } from '../calendar/calendar';
import { Container } from '../_lib/container/container';

export class FormDateSelect extends Block {
	constructor(options = {}) {
		const { attr, type, dates = {} } = options;
		const template = require('./formDateSelect.pug');
		require('./formDateSelect.sass');

		super({ template, attr });

		this.container = new Container({
			attr: { class: 'calendar_container -hidden-' },
		});

		const outputs = this.getOutputs(type, this.container);

		this.calendar = new Calendar({
			dates,
			container: this.container,
			outputs: outputs.map(output => output.formInput.input),
		});

		this.container.setContent(this.calendar);

		const content = [...outputs, this.container];

		this.setContent(content);
	}
	getOutputs(type, container) {
		return type === 'single'
			? [
					new FormDropdown({
						formInput: {
							title: {
								text: { content: 'Даты пребывания в отеле' },
							},
							input: {
								attr: {
									name: 'arrival',
									placeholder: 'Даты пребывания',
									readonly: '',
								},
							},
						},
						container,
					}),
			  ]
			: [
					new FormDropdown({
						formInput: {
							title: {
								text: { content: 'Прибытие' },
							},
							input: {
								attr: {
									name: 'arrival',
									placeholder: 'ДД.ММ.ГГГГ',
									readonly: '',
								},
								mask: '99.99.9999',
							},
						},
						container,
					}),
					new FormDropdown({
						formInput: {
							title: {
								text: { content: 'Выезд' },
							},
							input: {
								attr: {
									name: 'leave',
									placeholder: 'ДД.ММ.ГГГГ',
									readonly: '',
								},
								mask: '99.99.9999',
							},
						},
						container,
					}),
			  ];
	}
}
