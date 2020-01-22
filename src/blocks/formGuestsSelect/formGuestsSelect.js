import { Block } from '../../services/js/block';
import { FormDropdown } from '../_lib/form/form-dropdown/form-dropdown';
import { FormQuantity } from '../_lib/form/form-quantity/form-quantity';

export class FormGuestsSelect extends Block {
	constructor(options = {}) {
		const { attr } = options;
		const template = require('./formGuestsSelect.pug');
		require('./formGuestsSelect.sass');

		super({ template, attr });

		this.formDropdown = new FormDropdown({
			attr: { class: 'form-dropdown_solid' },
			formInput: {
				input: { attr: { placeholder: 'Сколько гостей', readonly: true } },
				title: {
					text: { content: 'Гости' },
				},
			},
		});
		this.formQuantity = new FormQuantity({
			elements: [
				{ content: 'Взрослые', name: 'adult' },
				{ content: 'Дети', name: 'children' },
				{ content: 'Младенцы', name: 'baby' },
			],
			title: {
				node: this.formDropdown.formInput.input.node,
				type: 'summury',
				declensions: ['гость', 'гостя', 'гостей'],
			},
			parent: this.formDropdown,
		});

		this.formDropdown.setContent(
			this.formQuantity,
			this.formDropdown.container.node
		);

		const content = [this.formDropdown];

		this.addContent(content);
	}
}
