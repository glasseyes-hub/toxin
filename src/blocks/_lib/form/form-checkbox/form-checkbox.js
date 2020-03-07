import { Block } from '../../../../services/js/block';
import { Title } from '../../title/title';
import { Container } from '../../container/container';
import { Button } from '../../button/button';
import { Input } from '../input/input';

export class FormCheckbox extends Block {
	constructor(options = {}) {
		const { attr, title, list, onValuesChange } = options;
		const template = require('./form-checkbox.pug');
		require('./form-checkbox.sass');

		super({ template, attr });

		this.elements = this.getCheckboxElements(list);

		this.title = title
			? new Title({
					text: {
						tag: 'h3',
						content: title,
					},
			  })
			: '';
		this.container = new Container({
			attr: { class: 'form-checkbox_elements' },
			content: this.elements,
		});

		const content = [this.title, this.container];

		this.addContent(content);

		this.onValuesChange = () => {
			onValuesChange && onValuesChange(this.values);
		};
	}
	getCheckboxElements(list) {
		return list.map(element => {
			element = new Element(element);

			element.on('click', () => {
				this.values = this.getValues();
			});

			return element;
		});
	}
	getValues() {
		return this.elements.reduce((acc, element) => {
			const name = element.input.node.name;
			acc[name] = element.input.isChecked();
			return acc;
		}, {});
	}
	set values(values) {
		this._values = values;
		this.hasOwnProperty('onValuesChange') && this.onValuesChange();
	}
	get values() {
		return this._values;
	}
}

class Element extends Block {
	constructor({ text, subtext, name, isChecked = false }) {
		super({ attr: { class: 'element_container' } });

		this.title = new Title({
			text: { content: text },
			subtext: { content: subtext },
		});

		this.button = new Button();
		this.input = new Input({ attr: { name } }).hide();

		this.setContent([this.button, this.title, this.input]);
		this.setEvents();

		subtext && this.addClass('element_container_withSubtext');
		isChecked && this.check();
	}
	setEvents() {
		this.on('click', () => {
			this.input.isChecked() ? this.uncheck() : this.check();
		});
	}
	check() {
		this.button.addClass('button_checked');
		this.input.check();
	}
	uncheck() {
		this.button.removeClass('button_checked');
		this.input.uncheck();
	}
}
