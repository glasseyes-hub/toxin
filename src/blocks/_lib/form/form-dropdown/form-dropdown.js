// import { form, Button, Title } from '../../../blocks';

// export class FormDropdown {
// 	constructor(options) {
// 		this.closed = true;

// 		Object.assign(this, options);

// 		this.body = {
// 			node: this.node.querySelector('.form-dropdown_body'),
// 		};
// 		this.input = new form.Input({
// 			node: this.node.querySelector('.form-dropdown_input'),
// 		});
// 		this.button = new Button({
// 			node: this.node.querySelector('.form-dropdown_button'),
// 		});
// 		this.initBody();
// 		this.initButton();
// 	}
// 	initButton() {
// 		this.button.onClick(() => {
// 			if (this.closed) this.open();
// 			else this.close();
// 		});
// 	}
// 	initBody() {
// 		if (this.closed) this.close();
// 		else this.open();
// 	}
// 	open() {
// 		this.closed = false;
// 		this.body.node.classList.remove('form-dropdown_body_hidden');
// 	}
// 	close() {
// 		this.closed = true;
// 		this.body.node.classList.add('form-dropdown_body_hidden');
// 	}
// 	hasClass(nodeClass) {
// 		return this.node.classList.contains(nodeClass);
// 	}
// }

import { Block } from '../../../../services/js/block';
import { FormInput } from '../form-input/form-input';
import { Container } from '../../container/container';

export class FormDropdown extends Block {
	constructor(options = {}) {
		const { attr, formInput, container } = options;
		const template = require('./form-dropdown.pug');
		require('./form-dropdown.sass');

		super({ template, attr });

		this.formInput = new FormInput({
			...formInput,
		});
		this.container =
			container ||
			new Container({
				attr: { class: 'form-dropdown_container -hidden-' },
				content: options.content,
			});

		const content = [this.formInput, this.container];

		this.setContent(content);
		this.setEvents();
	}
	setEvents() {
		this.formInput.onClick(() => {
			if (this.container.isHidden) {
				this.container.show();
				this.setStatus('open');
			} else {
				this.container.hide();
				this.removeStatus('open');
			}
		});
	}
}
