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
			new Container({
				attr: { class: 'header_authorization' },
				content: [
					new Button({
						attr: { class: 'button_bordered hader_authorization_button' },
						content: 'LOGIN',
					}),
					new Button({
						attr: { class: 'button_bordered hader_authorization_button' },
						content: 'REGISTER',
					}),
				],
			}),
		];

		this.addContent(content);
	}
}
