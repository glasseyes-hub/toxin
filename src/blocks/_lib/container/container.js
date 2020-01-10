import { Block } from '../../../services/js/block';

export class Container extends Block {
	constructor(options = {}) {
		const { attr, content } = options;
		const template = require('./container.pug');
		require('./container.sass');

		super({ template, attr, content });
	}
}
