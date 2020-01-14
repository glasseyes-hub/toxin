import { Block } from '../../../services/js/block';

export class Form extends Block {
	constructor(options = {}) {
		const { attr, content } = options;
		const template = require('./form.pug');
		require('./form.sass');

		super({ template, attr, content });
	}
}
