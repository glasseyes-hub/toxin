import { Block } from '../../../services/js/block';
import { Title } from '../title/title';
import { Button } from '../button/button';
import { Container } from '../container/container';
// import { Container, Title, Button } from '../../blocks';

// export class Dropdown {
// 	constructor(options) {
// 		this.opened = false;

// 		Object.assign(this, options);

// 		this.title = new Title({
// 			node: this.node.querySelector('.dropdown_title'),
// 		});
// 		this.button = new Button({
// 			node: this.node.querySelector('.dropdown_button'),
// 		});
// 		this.container = new Container({
// 			node: this.node.querySelector('.dropdown_container'),
// 		});

// 		this.opened ? this.open() : this.close();
// 		this.button.onClick(() => (this.opened ? this.close() : this.open()));
// 	}
// 	open() {
// 		this.opened = true;
// 		this.button.node.classList.add('dropdown_button_reverse');
// 		this.container.node.classList.remove('dropdown_container_hidden');
// 	}
// 	close() {
// 		this.opened = false;
// 		this.button.node.classList.remove('dropdown_button_reverse');
// 		this.container.node.classList.add('dropdown_container_hidden');
// 	}
// }

export class Dropdown extends Block {
	constructor(options = {}) {
		const { attr, title } = options;
		const template = require('./dropdown.pug');
		require('./dropdown.sass');

		super({ template, attr });

		const content = [
			new Title({ attr: { class: 'dropdown_title' }, ...title }),
			new Button({ attr: { class: 'dropdown_button' } }),
			new Container({
				attr: { class: 'dropdown_container' },
				content: [...options.content],
			}),
		];

		this.addContent(content);
	}
}
