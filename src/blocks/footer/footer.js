import { Block } from '../../services/js/block';
import { Container } from '../_lib/container/container';

export class Footer extends Block {
	constructor(options = {}) {
		const { attr } = options;
		const template = require('./footer.pug');
		require('./footer.sass');

		super({ template, attr });

		this.about = new Container({
			attr: { class: 'footer_about' },
		});
		this.menu = new Container({
			attr: { class: 'footer_menu' },
		});
		this.subscribe = new Container({
			attr: { class: 'footer_subscribe' },
		});

		const content = [this.about, this.menu, this.subscribe];

		this.addContent(content);
	}
}
