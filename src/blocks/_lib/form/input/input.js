import { Block } from '../../../../services/js/block';

export class Input extends Block {
	constructor(options = {}) {
		const { attr } = options;
		const template = require('./input.pug');
		require('./input.sass');
		require('./jquery.maskedinput.js');

		super({ template, attr });

		const content = [];

		this.addContent(content);
		options.mask && this.setMask(options.mask);
	}

	set value(value) {
		this.node.value = value;
		this.node.setAttribute('value', value);
	}
	get value() {
		return this.node.value;
	}
	check() {
		this.node.checked = true;
	}
	uncheck() {
		this.node.checked = false;
	}
	isChecked() {
		return this.node.checked;
	}
	clear() {
		this.node.value = 0;
	}
	setMask(mask) {
		$(this.node).mask(mask);
	}
}
