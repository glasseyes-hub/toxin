import { Block } from '../../services/js/block';
export class Content extends Block {
	constructor(options = {}) {
		const { attr } = options;
		const template = require('./content.pug');
		require('./content.sass');

		super({ template, attr });

		const content = [];

		this.addContent(content);
	}
}
