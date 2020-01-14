import { Block } from '../../services/js/block';
import { Container } from '../_lib/container/container';
import { SocialNetworks } from '../socialNetworks/socialNetworks';

export class Copyright extends Block {
	constructor(options = {}) {
		const { attr } = options;
		const template = require('./copyright.pug');
		require('./copyright.sass');

		super({ template, attr });

		const content = [
			new Container({
				attr: { class: 'copyright_text' },
				content: 'Copyright © 2018 Toxin отель. Все права зачищены.',
			}),
			new SocialNetworks(),
		];

		this.setContent(content);
	}
}
