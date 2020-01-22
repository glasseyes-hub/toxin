import { Block } from '../../../../services/js/block';
import { FormLabel } from '../form-label/form-lable';
import { Title } from '../../title/title';
import { Input } from '../input/input';
import { Button } from '../../button/button';

export class FormInput extends Block {
	constructor(options = {}) {
		const { attr, title, input, button } = options;
		const template = require('./form-input.pug');
		require('./form-input.sass');

		super({ template, attr });

		this.input = new Input({
			attr: { class: 'form-input_input' },
			...input,
		});

		const content = [
			new FormLabel({
				attr: { class: 'form-input_label' },
				content: [
					new Title({
						attr: { class: 'form-input_title' },
						...title,
					}),
					this.input,
					new Button({
						attr: { class: 'form-input_button' },
						...button,
					}),
				],
			}),
		];

		this.addContent(content);
	}
}
