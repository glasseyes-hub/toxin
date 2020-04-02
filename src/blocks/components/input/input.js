import { Component } from '../../../services/js/Component';
import { Button } from '../../components/button/button';

export class Input extends Component {
	constructor(state) {
		require('./input.sass');
		require('./jquery.maskedinput.js');

		state = {
			template: require('./input.pug'),
			type: 'text',
			value: '',
			...state,
		};

		super(state);
	}
	render() {
		super.render();

		this.inputNode = this.node.querySelector('.input-node');

		this.inputNode.value = this.state.value;

		this.state.mask && this.setMask();
		this.state.button && this.renderButton();
	}
	handlers() {
		this.inputNode.addEventListener('change', event => {
			this.state = { value: event.target.value };
		});
	}
	renderButton() {
		const button = new Button({
			type: this.state.button,
			attr: { class: 'input-button' },
		});

		this.node.querySelector('.input-button').replaceWith(button.node);
	}
	setMask() {
		$(this.inputNode).mask(this.state.mask);
	}
}
