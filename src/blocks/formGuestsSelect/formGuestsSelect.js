import { Block } from '../../services/js/block';
import { FormQuantity } from '../_lib/form/form-quantity/form-quantity';
import { Title } from '../_lib/title/title';
import { Dropdown } from '../_lib/dropdown/dropdown';
import { Container } from '../_lib/container/container';
import { Button } from '../_lib/button/button';
import { Input } from '../_lib/form/input/input';

export class FormGuestsSelect extends Block {
	constructor(options = {}) {
		const { attr, title, placeholder, elements, onValuesChange } = options;
		const template = require('./formGuestsSelect.pug');
		require('./formGuestsSelect.sass');

		super({ template, attr });

		this.title = new Title({
			text: { tag: 'h3', content: title },
		});

		this.formQuantity = new FormQuantity({
			elements,
		});

		this.controls = new Container({
			attr: { class: 'formGuestsSelect_controls' },
		});
		this.controls.clear = new Button({
			attr: { class: 'button_clear' },
			content: 'Очистить',
		});
		this.controls.confirm = new Button({
			attr: { class: 'button_confirm' },
			content: 'Применить',
		});
		this.controls.setContent([this.controls.clear, this.controls.confirm]);

		this.formDropdown = new Dropdown({
			attr: { class: 'dropdown_solid' },
			header: new Input({
				attr: { placeholder: placeholder, readonly: '' },
			}),
			content: [this.formQuantity, this.controls],
		});
		this.formDropdown.header.value = this.formQuantity.title;

		const content = [this.title, this.formDropdown];

		this.addContent(content);
		this.setEvents();

		this.onValuesChange = () => {
			onValuesChange && onValuesChange(this.values);
		};
	}
	setEvents() {
		this.controls.clear.on('click', () => {
			this.formQuantity.clear();
			this.values = this.formQuantity.values;

			this.formDropdown.header.value = this.formQuantity.title;
			this.formDropdown.close();
		});
		this.controls.confirm.on('click', () => {
			this.values = this.formQuantity.values;

			this.formDropdown.header.value = this.formQuantity.title;
			this.formDropdown.close();
		});
	}
	set values(values) {
		this._values = values;
		this.onValuesChange();
	}
	get values() {
		return this._values;
	}
}
