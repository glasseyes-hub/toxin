import { Block } from '../../services/js/block';
import { Logo } from '../logo/logo';
import { Container } from '../_lib/container/container';

export class Header extends Block {
	constructor(options = {}) {
		const { attr } = options;
		const template = require('./header.pug');
		require('./header.sass');

		super({ template, attr });

		this.controls = new Container({
			attr: { class: 'header_controls' },
		});

		const content = [new Logo(), this.controls];

		this.setContent(content);
	}
}
