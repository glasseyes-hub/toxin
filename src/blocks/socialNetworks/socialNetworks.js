import { Block } from '../../services/js/block';
import { Button } from '../_lib/button/button';

export class SocialNetworks extends Block {
	constructor(options = {}) {
		const { attr } = options;
		const template = require('./socialNetworks.pug');
		require('./socialNetworks.sass');

		super({ template, attr });

		const content = [
			new Button({
				attr: { class: 'socialNetworks_button socialNetworks_button_twitter' },
			}),
			new Button({
				attr: { class: 'socialNetworks_button socialNetworks_button_facebook' },
			}),
			new Button({
				attr: {
					class: 'socialNetworks_button socialNetworks_button_instagram',
				},
			}),
		];

		this.addContent(content);
	}
}
