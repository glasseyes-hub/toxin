import { Component } from '../../services/js/Component';
import { RangeSlider } from '../rangeSlider/rangeSlider';

export class PriceRange extends Component {
	constructor(state) {
		require('./priceRange.sass');
		require('webpack-jquery-ui');
		require('webpack-jquery-ui/css');

		state = {
			template: require('./priceRange.pug'),
			min: 0,
			...state,
		};

		super(state);
	}
	render() {
		super.render();
		this.renderSlider();
	}
	renderSlider() {
		const slider = this.node.querySelector('.priceRange-rangeSlider');

		const rangeSlider = new RangeSlider({
			className: 'priceRange-rangeSlider',
			title: 'Диапазон цены',
			start: this.state.start,
			min: this.state.min,
			end: this.state.end,
			max: this.state.max,
		});

		rangeSlider.addObserver((state) => {
			this.state = { ...state };
		});

		slider.replaceWith(rangeSlider.node);
	}
}
