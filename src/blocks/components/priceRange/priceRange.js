import { Component } from '../../../services/js/Component';

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
		const slider = this.node.querySelector('.priceRange-slider');

		$(slider).slider({
			range: true,
			min: this.state.min,
			max: this.state.max || this.state.min,
			values: [
				this.state.start || this.state.min,
				this.state.end || this.state.max,
			],
			slide: (event, obj) => {
				this.state = { start: obj.values[0], end: obj.values[1] };
				this.updateInfo();
			},
		});

		this.updateInfo();
	}
	updateInfo() {
		this.info = this.info
			? this.info
			: this.node.querySelector('.priceRange-info');

		this.info.innerHTML = `${this.state.start || this.state.min}₽ - ${
			this.state.end || this.state.max
		}₽`;
	}
}
