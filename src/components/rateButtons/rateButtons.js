import { Component } from '../../services/js/Component';
import { Rate } from '../rate/rate';
import { Title } from '../title/title';

export class RateButtons extends Component {
	constructor(state) {
		require('./rateButtons.sass');

		state = {
			template: require('./rateButtons.pug'),
			...state,
		};

		super(state);
	}
	render() {
		super.render();
		this.renderTitle();
		this.renderRate();
	}
	renderTitle() {
		const title = new Title({
			className: 'rateButtons-title',
			title: 'Rate button',
		});

		this.node.appendChild(title.node);
	}
	renderRate() {
		const firstRate = new Rate({
			rate: 4,
		});
		const secondRate = new Rate({
			rate: 5,
		});

		this.node.appendChild(firstRate.node);
		this.node.appendChild(secondRate.node);
	}
}
