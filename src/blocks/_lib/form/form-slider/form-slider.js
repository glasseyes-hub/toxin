import { Block } from '../../../../services/js/block';
import { Container } from '../../container/container';
import { Title } from '../../title/title';

export class FormSlider extends Block {
	constructor(options = {}) {
		const { attr, min = 0, max } = options;
		const template = require('./form-slider.pug');
		require('./form-slider.sass');
		require('webpack-jquery-ui');
		require('webpack-jquery-ui/css');

		super({ template, attr });

		const { values = [min, max] } = options;

		this.title = new Title({
			text: {
				tag: 'h3',
				content: 'Диапазон цены',
			},
			subtext: {
				content: `${values[0]}₽ - ${values[1]}₽`,
			},
		});

		console.log(this.title);

		this.container = new Container({
			attr: { class: 'form-slider_container' },
		});

		this.footnote = new Container({
			attr: { class: 'form-slider_footnote' },
			content: 'Стоимость за сутки пребывания в номере',
		});

		const content = [this.title, this.container, this.footnote];

		this.setContent(content);

		$(this.container.node).slider({
			range: true,
			min,
			max,
			values,
			slide: (event, obj) => {
				const [start, end] = obj.values;
				this.title.subtext.node.innerHTML = `${start}₽ - ${end}₽`;
				// $(this.title.subtext.node).val(
				// 	'$' + ui.values[0] + ' - $' + ui.values[1]
				// );
			},
		});
	}
}
