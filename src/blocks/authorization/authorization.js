import { Block } from '../../services/js/block';
import { Container } from '../_lib/container/container';
import { Button } from '../_lib/button/button';

export class Authorization extends Block {
	constructor(options = {}) {
		const { attr } = options;
		const template = require('./authorization.pug');
		require('./authorization.sass');

		super({ template, attr });

		const content = [
			new Button({
				attr: {
					class:
						'button_bordered authorization_button authorization_button_bordered',
				},
				content: 'ВОЙТИ',
			}),
			new Button({
				attr: { class: 'button_filled authorization_button' },
				content: 'ЗАРЕГИСТРИРОВАТЬСЯ',
			}),
		];

		this.addContent(content);
	}
}
