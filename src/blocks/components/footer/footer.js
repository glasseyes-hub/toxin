import { Component } from '../../../services/js/Component';
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

		this.renderInput();
	}
	renderInput() {
		this.input = new Input({
			value: '12312321',
			button: {
				className: 'input-button_send',
			},
		});

		this.node.querySelector('.footer-input').replaceWith(this.input.node);

		this.input.addObserver(state => {
			this.state = { subscriberEmail: { value: state.value } };
		});
	}
}
