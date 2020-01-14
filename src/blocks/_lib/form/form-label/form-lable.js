import { Block } from '../../../../services/js/block';

export class FormLabel extends Block {
	constructor(options = {}) {
		const { attr, content } = options;
		const template = require('./form-label.pug');
		require('./form-label.sass');

		super({ template, attr, content });
	}
}
