import { Component } from '../../services/js/Component';
import { Input } from '../input/input';

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
		const form = this.node.querySelector('.footer-form');
		this.input = new Input({
			className: 'input_send',
			name: 'email',
			placeholder: 'Email',
			button: true,
		});

		form.appendChild(this.input.node);

		this.input.addObserver((state) => {
			this.state = { subscriberEmail: { value: state.value } };
		});
	}
}
