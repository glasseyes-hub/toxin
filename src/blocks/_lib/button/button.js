import { Block } from '../../../services/js/block';
import { Container } from '../container/container';

// export class Button {
// 	constructor(options = {}) {
// 		Object.assign(this, options);
// 		this.tag = 'button';
// 		this.class = 'button';

// 		this.node = this.node || this.create(options.class || this.class);
// 	}
// 	onClick(callback) {
// 		if (callback) {
// 			this.node.addEventListener('click', () => callback());
// 		} else {
// 			console.log('onClick:');
// 			console.log(this.node);
// 		}
// 	}
// 	create(...classes) {
// 		let node = document.createElement(this.tag);
// 		node.classList.add(this.class, ...classes);
// 		return node;
// 	}
// }

export class Button extends Block {
	constructor(options) {
		const { attr } = options;
		const template = require('./button.pug');
		require('./button.sass');

		super({ template, attr });

		const content = [
			new Container({
				attr: { class: 'button_container' },
				content: options.content,
			}),
		];

		this.addContent(content);
	}
}
