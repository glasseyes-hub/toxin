import { Component } from '../../services/js/Component';
import { ImageSlider } from '../imageSlider/imageSlider';
import { Rate } from '../rate/rate';

export class Room extends Component {
	constructor(state) {
		require('./room.sass');

		state = {
			template: require('./room.pug'),
			images: [],
			...state,
		};

		super(state);
	}
	render() {
		super.render();
		this.renderImageSlider();
		this.renderRate();
	}
	renderImageSlider() {
		const roomSlider = this.node.querySelector('.room-imageSlider');

		const imageSlider = new ImageSlider({
			className: 'room-imageSlider',
			list: this.state.images,
		});

		roomSlider.replaceWith(imageSlider.node);
	}
	renderRate() {
		const roomRate = this.node.querySelector('.room-rate');

		const rate = new Rate({
			className: 'room-rate',
			rate: this.state.rating,
			disabled: true,
		});

		roomRate.replaceWith(rate.node);
	}
}
