import { Component } from '../../services/js/Component';

export class Slider extends Component {
	constructor(state) {
		require('./slider.sass');
		require('webpack-jquery-ui');
		require('webpack-jquery-ui/css');

		state = {
			template: require('./slider.pug'),
			min: 0,
			max: 100000,
			start: 0,
			end: 100000,
			...state,
		};

		super(state);
	}
	render() {
		super.render();
		this.renderSlider();
	}
	renderSlider() {
		$(this.node).slider({
			range: true,
			min: this.state.min,
			max: this.state.max,
			values: [this.state.start, this.state.end],
			slide: (event, obj) => {
				this.state = { start: obj.values[0], end: obj.values[1] };
			},
		});
	}
}
