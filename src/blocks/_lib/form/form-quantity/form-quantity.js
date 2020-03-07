import { Block } from '../../../../services/js/block';
import { Title } from '../../title/title';
import { Button } from '../../button/button';
import { Input } from '../input/input';
import { Container } from '../../container/container';

export class FormQuantity extends Block {
	constructor(options = {}) {
		const { attr, elements } = options;

		const template = require('./form-quantity.pug');
		require('./form-quantity.sass');

		super({ template, attr });

		this.title = '';
		this.values = [];

		this.elements = this.createElements(elements);
		this.elementsBlocks = this.getElementsBlocks();

		this.setContent(this.elementsBlocks);
		this.title = this.getTitle();
	}

	getElementsBlocks(elements = this.elements) {
		const blocks = elements.map(element => {
			if (element.group) return this.getElementsBlocks(element.group);

			return element;
		});

		return [].concat(...blocks);
	}
	createElements(elements) {
		return elements.map(({ group, declensions, ...element }) => {
			if (group)
				return Object.assign(
					{},
					{
						group: this.createElements(group),
						declensions,
					}
				);

			const elementBlock = new Element({ declensions, ...element });

			elementBlock.addButton.on('click', () => {
				this.title = this.getTitle();
				this.values = this.getValues();
			});
			elementBlock.removeButton.on('click', () => {
				this.title = this.getTitle();
				this.values = this.getValues();
			});

			return elementBlock;
		});
	}
	clear() {
		this.elementsBlocks.forEach(elementBlock => (elementBlock.input.value = 0));
		this.title = this.getTitle();
		this.values = this.getValues();
	}
	getTitle(elements = this.elements) {
		const title = elements
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

		return this.prepareTitleByLength(title);
	}
	getValues() {
		return this.elementsBlocks.reduce((acc, elem) => {
			const { name, value } = elem.input.node;
			acc[name] = value;
			return acc;
		}, {});
	}
	prepareTitleByLength(title) {
		const maxLength = 30;

		return title.split(', ').reduce((acc, element) => {
			if (!acc) return element;

			if ((acc + ', ' + element).length <= maxLength)
				return acc + ', ' + element;

			return acc + '...';
		});
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
	constructor({ content, name, value, declensions }) {
		super({ attr: { class: 'form-quantity_element' } });

		this.isGroup = false;
		if (declensions) this.declensions = declensions;

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
			attr: { class: 'form-quantity_input', name, value: value || 0 },
		});

		this.setContent([
			this.title,
			this.removeButton,
			this.input,
			this.addButton,
		]);
		this.setEvents();
	}
	setEvents() {
		this.removeButton.on('click', () => {
			this.input.value -= this.input.value > 0 ? 1 : 0;
		});

		this.addButton.on('click', () => {
			this.input.value -= -1;
		});
	}
}
