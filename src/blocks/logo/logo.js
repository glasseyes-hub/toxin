import { Block } from '../../services/js/block';

export class Logo extends Block {
	constructor(options = {}) {
		const { attr } = options;
		const template = require('./logo.pug');
		require('./logo.sass');

		super({ template, attr });

		const content = [];
	}
}
