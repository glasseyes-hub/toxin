import { Component } from '../../services/js/Component';
import { Title } from '../title/title';
import { Slider } from '../slider/slider';

export class RangeSlider extends Component {
	constructor(state) {
		require('./rangeSlider.sass');

		state = {
			template: require('./rangeSlider.pug'),
			min: 0,
			...state,
		};

		super(state);
	}
	render() {
		super.render();

		this.renderTitle();
		this.renderSlider();
	}
	renderTitle() {
		const title = new Title({
			className: 'rangeSlider-title',
			title: 'Range slider',
			subtitle: this.getSubtitle(),
		});

		this.subtitle = title.node.querySelector('.title-subtext');

		this.node.appendChild(title.node);
	}
	renderSlider() {
		const slider = new Slider({
			min: this.state.min,
			max: this.state.max,
			start: this.state.start || this.state.min,
			end: this.state.end || this.state.max,
		});

		slider.addObserver((state) => {
			const { start, end } = state;
			this.state = { start, end };

			this.subtitle.innerHTML = this.getSubtitle();
		});

		this.node.appendChild(slider.node);
	}
	getSubtitle() {
		return `${this.state.start || this.state.min}₽ - ${
			this.state.end || this.state.max
		}₽`;
	}
}
