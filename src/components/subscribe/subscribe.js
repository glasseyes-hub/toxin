import { Component } from '../../services/js/Component';
import { Input } from '../input/input';

export class Subscribe extends Component {
	constructor(state) {
		require('./subscribe.sass');

		state = {
			template: require('./subscribe.pug'),
			...state,
		};

		super(state);
	}
	render() {
		super.render();

		this.renderInput();
	}
	renderInput() {
		const input = new Input({
			className: 'subscribe-input',
			name: 'email',
			placeholder: 'Email',
			title: this.state.title,
			subtitle: this.state.subtitle,
			button: true,
		});

		this.node.appendChild(input.node);
	}
}
