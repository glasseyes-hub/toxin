import { Component } from '../../services/js/Component';
import { Input } from '../input/input';
import { Subscribe } from '../subscribe/subscribe';

export class Footer extends Component {
	constructor(state) {
		require('./footer.sass');

		state = {
			template: require('./footer.pug'),
			...state,
		};

		super(state);
	}
	render() {
		super.render();

		this.renderForm();
	}
	renderForm() {
		const container = this.node.querySelector('.footer-subscribe');

		const subscribe = new Subscribe({
			className: 'footer-subscribe',
		});

		container.replaceWith(subscribe.node);
	}
}
