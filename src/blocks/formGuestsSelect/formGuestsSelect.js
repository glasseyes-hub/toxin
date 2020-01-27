import { Block } from '../../services/js/block';
import { FormDropdown } from '../_lib/form/form-dropdown/form-dropdown';
import { FormQuantity } from '../_lib/form/form-quantity/form-quantity';

export class FormGuestsSelect extends Block {
	constructor(options = {}) {
		const { attr, guests = {} } = options;
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

		const elements = [
			{
				group: [
					{ content: 'Взрослые', name: 'adult', value: guests.adult },
					{ content: 'Дети', name: 'children', value: guests.children },
				],
				declensions: ['гость', 'гостя', 'гостей'],
			},
			{
				content: 'Младенцы',
				name: 'baby',
				value: guests.baby,
				declensions: ['младенец', 'младенца', 'младенцев'],
			},
		];

		this.formQuantity = new FormQuantity({
			elements,
			titleNode: this.formDropdown.formInput.input.node,
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
