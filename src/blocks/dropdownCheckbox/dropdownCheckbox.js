import { Block } from '../../services/js/block';
import { Dropdown } from '../_lib/dropdown/dropdown';
import { FormCheckbox } from '../_lib/form/form-checkbox/form-checkbox';

export class DropdownCheckbox extends Block {
	constructor(options = {}) {
		const { attr, title, list, onValuesChange } = options;
		const template = require('./dropdownCheckbox.pug');
		require('./dropdownCheckbox.sass');

		super({ template, attr });
		this.checkbox = new FormCheckbox({
			list,
			onValuesChange,
		});
		this.dropdown = new Dropdown({
			attr: { class: 'dropdown_simple' },
			title: {
				text: { tag: 'h3', content: title },
			},
			content: this.checkbox,
		});

		const content = [this.dropdown];

		this.addContent(content);
	}
}
