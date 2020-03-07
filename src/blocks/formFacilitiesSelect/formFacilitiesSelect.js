import { Block } from '../../services/js/block';
import { FormDropdown } from '../_lib/form/form-dropdown/form-dropdown';
import { FormQuantity } from '../_lib/form/form-quantity/form-quantity';

export class FormFacilitiesSelect extends Block {
	constructor(options = {}) {
		const { attr, rooms = {}, onValuesChange } = options;
		const template = require('./FormFacilitiesSelect.pug');
		require('./FormFacilitiesSelect.sass');

		super({ template, attr });

		this.formDropdown = new FormDropdown({
			attr: { class: 'form-dropdown_solid' },
			formInput: {
				input: { attr: { placeholder: 'Выберите удобства', readonly: true } },
				title: {
					text: { content: 'Удобства номера' },
				},
			},
		});

		const elements = [
			{
				content: 'Спальни',
				name: 'bedrooms',
				value: rooms.bedrooms,
				declensions: ['спальня', 'спальни', 'спален'],
			},
			{
				content: 'Кровати',
				name: 'beds',
				value: rooms.beds,
				declensions: ['кровать', 'кровати', 'кроватей'],
			},
			{
				content: 'Ванные комнаты',
				name: 'bathrooms',
				value: rooms.bathrooms,
				declensions: ['ванная комната', 'ванные комнаты', 'ванных комнат'],
			},
		];

		this.formQuantity = new FormQuantity({
			elements,
			titleNode: this.formDropdown.formInput.input.node,
			parent: this.formDropdown,
			hideControls: true,
		});

		this.formDropdown.setContent(
			this.formQuantity,
			this.formDropdown.container.node
		);

		const content = [this.formDropdown];

		this.addContent(content);

		this.onValuesChange = () => {
			onValuesChange && onValuesChange(this.values);
		};
	}
	set values(values) {
		this._values = values;
		this.hasOwnProperty('onValuesChange') && this.onValuesChange();
	}
	get values() {
		return this._values;
	}
}
