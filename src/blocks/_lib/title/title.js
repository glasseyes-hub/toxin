import { Block } from '../../../services/js/block';

export class Title extends Block {
	constructor(options = {}) {
		const { attr, text, subtext } = options;
		const template = require('./title.pug');
		require('./title.sass');

		super({ template, attr });

		options.content = options.content || [];

		this.text = new Block({
			template: require('./title-text/title-text.pug'),
			tag: 'span',
			...text,
		});

		this.subtext = new Block({
			template: require('./title-subtext/title-subtext.pug'),
			tag: 'span',
			...subtext,
		});

		const content = [this.text, this.subtext, ...options.content];

		this.addContent(content);
	}
}
