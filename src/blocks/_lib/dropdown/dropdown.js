import { Block } from '../../../services/js/block';
import { Title } from '../title/title';
import { Button } from '../button/button';
import { Container } from '../container/container';

export class Dropdown extends Block {
	constructor(options = {}) {
		const { attr } = options;
		const template = require('./dropdown.pug');
		require('./dropdown.sass');

		super({ template, attr });

		this.opened = false;
		this.button = new Button({ attr: { class: 'dropdown_button' } });
		this.container = new Container({
			attr: { class: 'dropdown_container -hidden-' },
			content: options.content,
		});

		const content = [
			new Title({
				attr: { class: 'dropdown_title' },
				...options.title,
				content: [this.button],
			}),
			this.container,
		];

		this.addContent(content);
		this.addEvents();
	}
	addEvents() {
		this.button.onClick(() => {
			this.container.hidden ? this.open() : this.close();
		});
	}
	open() {
		this.button.node.classList.add('dropdown_button_reverse');
		this.container.show();
	}
	close() {
		this.button.node.classList.remove('dropdown_button_reverse');
		this.container.hide();
	}
}
