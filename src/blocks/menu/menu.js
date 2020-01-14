import { Button } from '../_lib/button/button';
import { Block } from '../../services/js/block';
import { Dropdown } from '../_lib/dropdown/dropdown';
import { Title } from '../_lib/title/title';

export class Menu extends Block {
	constructor(options = {}) {
		const { attr, direction = 'row' } = options;
		const template = require('./menu.pug');
		require('./menu.sass');

		super({ template, attr });

		const content =
			direction === 'row'
				? this.createRowMenu(options.content)
				: this.createColumnMenu(options.content);

		this.addContent(content);
	}
	createRowMenu(menu) {
		return menu.map(({ dropdown, button }) => {
			return dropdown
				? new Dropdown({
						attr: { class: 'menu_dropdown' },
						title: {
							text: {
								content: dropdown.title,
							},
							subtext: {
								content: dropdown.subtitle,
							},
						},
						content: this.createRowMenu(dropdown.content),
				  })
				: new Button({
						attr: { class: 'menu_button' },
						content: button,
				  });
		});
	}
	createColumnMenu(menu) {
		return menu.map(({ title, subtitle, button }) => {
			return title
				? new Title({
						attr: { class: 'menu_title' },
						text: {
							content: title,
						},
						subtext: {
							content: subtitle,
						},
				  })
				: new Button({ content: button });
		});
	}
}
