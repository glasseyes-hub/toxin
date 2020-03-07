import { Block } from '../../../../services/js/block';
import { Container } from '../../container/container';
import { Title } from '../../title/title';

export class FormSlider extends Block {
	constructor(options = {}) {
		const { attr, values, min = 0, max, onValuesChange } = options;
		const template = require('./form-slider.pug');
		require('./form-slider.sass');
		require('webpack-jquery-ui');
		require('webpack-jquery-ui/css');

		super({ template, attr });

		values.startPrice = values.startPrice ? values.startPrice : min;
		values.endPrice = values.endPrice ? values.endPrice : max;

		this.title = new Title({
			text: {
				tag: 'h3',
				content: 'Диапазон цены',
			},
			subtext: {
				content: `${values.startPrice}₽ - ${values.endPrice}₽`,
			},
		});

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
			values: Object.values(values),
			slide: (event, obj) => {
				this.updateTitle(obj.values);
			},
			stop: (event, obj) => {
				this.values = { startPrice: obj.values[0], endPrice: obj.values[1] };
			},
		});

		this.onValuesChange = () => {
			onValuesChange && onValuesChange(this.values);
		};
	}
	set values(values) {
		this._values = values;
		this.hasOwnProperty('onValuesChange') && this.onValuesChange();
	}
	get values() {
		return this._values;
	}
	updateTitle([startPrice, endPrice]) {
		this.title.subtext.node.innerHTML = `${startPrice}₽ - ${endPrice}₽`;
	}
}
