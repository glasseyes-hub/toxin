import { Block } from '../../../services/js/block';
import { Title } from '../title/title';
import { Button } from '../button/button';
import { Container } from '../container/container';

export class Dropdown extends Block {
	constructor(options = {}) {
		const { attr, header, title, body } = options;
		const template = require('./dropdown.pug');
		require('./dropdown.sass');

		super({ template, attr });

		this.header =
			header ||
			new Title({
				...title,
			});

		this.headerContainer = new Container({
			attr: { class: 'dropdown_header' },
		});

		this.button = new Button({ attr: { class: 'dropdown_button' } });

		this.headerContainer.setContent([this.header, this.button]);

		this.body =
			body ||
			new Container({
				attr: { class: '-hidden-' },
				content: options.content,
			});

		this.body.addClass('dropdown_body');

		const content = [this.headerContainer, this.body];

		this.setContent(content);
		this.setEvents();
	}
	setEvents() {
		this.headerContainer.onClick(() => {
			this.body.isHidden ? this.open() : this.close();
		});
	}
	open() {
		this.button.node.classList.add('dropdown_button_reverse');
		this.setStatus('open');
		this.body.show();
	}
	close() {
		this.button.node.classList.remove('dropdown_button_reverse');
		this.removeStatus('open');
		this.body.hide();
	}
}
