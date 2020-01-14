import { Block } from '../../services/js/block';

export class Logout extends Block {
	constructor(options = {}) {
		const { attr, content } = options;
		const template = require('./logout.pug');
		require('./logout.sass');

		super({ template, attr, content });
	}
}
