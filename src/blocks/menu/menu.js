import { Button } from '../_lib/button/button';
import { Block } from '../../services/js/block';
import { Dropdown } from '../_lib/dropdown/dropdown';

export class Menu extends Block {
	constructor(options = {}) {
		const { attr } = options;
		const template = require('./menu.pug');
		require('./menu.sass');

		super({ template, attr });

		const content = this.createContent(options.content);

		this.addContent(content);
	}
	createContent(content) {
		return content.map(({ content, submenu }) => {
			if (submenu) {
				return new Dropdown({
					attr: { class: 'menu_dropdown' },
					title: {
						text: {
							content: submenu.title,
						},
						subtext: {
							content: submenu.subtitle,
						},
					},
					content: this.createContent(submenu.content),
				});
			}
			return new Button({
				attr: { class: 'menu_button' },
				content,
			});
		});
	}
}
