import { Block } from '../../../../services/js/block';
import { Title } from '../../title/title';
import { Button } from '../../button/button';
import { Input } from '../input/input';
import { Container } from '../../container/container';

export class FormQuantity extends Block {
	constructor(options = {}) {
		const { attr, elements, titleNode, parent = {} } = options;
		const template = require('./form-quantity.pug');
		require('./form-quantity.sass');

		super({ template, attr });

		this.elements = this.createElements(elements);
		this.titleNode = titleNode;
		this.parent = parent;

		this.clear = new Button({
			attr: { class: 'form-quantity_button form-quantity_button_clear' },
		});
		this.confirm = new Button({
			attr: { class: 'form-quantity_button form-quantity_button_confirm' },
		});
		this.controls = new Container({
			attr: { class: 'form-quantity_controls' },
			content: [this.clear, this.confirm],
		});

		this.setContent([...this.getElementsBlocks(), this.controls]);
		this.setEvents();

		this.titleNode.value = this.getTitle();
	}
	getElementsBlocks(elements = this.elements) {
		const blocks = elements.map(element => {
			if (element.group) return this.getElementsBlocks(element.group);

			return element;
		});

		return [].concat(...blocks);
	}
	createElements(elements) {
		return elements.map(element => {
			if (element.group) {
				return {
					...element,
					group: this.createElements(element.group),
				};
			}

			element = new Element(element);

			element.removeButton.on('click', () => {
				element.input.value -= element.input.value > 0 ? 1 : 0;

				this.titleNode.value = this.getTitle();
			});

			element.addButton.on('click', () => {
				element.input.value -= -1;

				this.titleNode.value = this.getTitle();
			});

			element.input.on('change', () => {
				this.titleNode.value = this.getTitle();
			});

			return element;
		});
	}
	setEvents() {
		this.clear.on('click', () => {
			this.elements.forEach(element => {
				element.input.value = 0;
			});
			this.updateTitle();
		});
		this.confirm.on('click', () => {
			this.parent.container.hide();
			this.parent.removeStatus('open');
		});
	}
	updateTitle() {
		this.titleNode.value = this.getTitle();
	}
	getTitle(elements = this.elements) {
		return elements
			.map(element => {
				if (element.declensions) {
					const summury = element.group
						? element.group.reduce((current, element) => {
								return current + +element.input.value;
						  }, 0)
						: element.input.value;

					return summury > 0
						? summury + ' ' + this.getDeclension(summury, element.declensions)
						: '';
				}

				return element.input.value > 0
					? `${
							element.input.value
					  } ${element.title.text.node.innerHTML.toLowerCase()}`
					: false;
			})
			.filter(title => title)
			.join(', ');
	}
	getDeclension(num, expressions) {
		let result;
		let count = num % 100;
		if (count >= 5 && count <= 20) {
			result = expressions[2];
		} else {
			count = count % 10;
			if (count == 1) {
				result = expressions[0];
			} else if (count >= 2 && count <= 4) {
				result = expressions[1];
			} else {
				result = expressions[2];
			}
		}
		return result;
	}
}

export class Element extends Block {
	constructor({ content, name, value = 0, declensions }) {
		super({ attr: { class: 'form-quantity_element' } });

		this.isGroup = false;
		this.declensions = declensions;

		this.title = new Title({
			text: { content },
		});
		this.removeButton = new Button({
			attr: { class: 'form-quantity_button form-quantity_button_remove' },
		});
		this.addButton = new Button({
			attr: { class: 'form-quantity_button form-quantity_button_add' },
		});
		this.input = new Input({
			attr: { class: 'form-quantity_input', name, value },
		});

		this.setContent([
			this.title,
			this.removeButton,
			this.input,
			this.addButton,
		]);
	}
}
