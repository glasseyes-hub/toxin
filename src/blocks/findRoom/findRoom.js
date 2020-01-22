import { Block } from '../../services/js/block';
import { Title } from '../_lib/title/title';
import { Form } from '../_lib/form/form';
import { FormDateSelect } from '../formDateSelect/formDateSelect';
import { FormGuestsSelect } from '../formGuestsSelect/formGuestsSelect';
import { Button } from '../_lib/button/button';

export class FindRoom extends Block {
	constructor(options = {}) {
		const { attr } = options;
		const template = require('./findRoom.pug');
		require('./findRoom.sass');

		super({ template, attr });

		this.title = new Title({
			text: {
				tag: 'h1',
				content: 'Найдем номера под ваши пожелания',
			},
		});

		this.form = new Form({
			attr: { action: 'search.html', method: 'get' },
			content: [
				new FormDateSelect(),
				new FormGuestsSelect(),
				new Button({
					attr: {
						class: 'button_big button_icon button_icon_arrowRight',
						type: 'submit',
					},
					content: 'Подобрать номер',
				}),
			],
		});

		const content = [this.title, this.form];

		this.setContent(content);
	}
}
