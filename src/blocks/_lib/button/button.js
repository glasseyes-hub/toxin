import { Block } from '../../../services/js/block';
import { Container } from '../container/container';

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
