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
	set value(value) {
		this.inputNode.value = value;
	}
	get value() {
		return this.inputNode.value;
	}
	render() {
		super.render();

		this.inputNode = this.node.querySelector('input');

		this.inputNode.value = this.state.value;

		this.state.mask && this.setMask();
		this.state.button && this.renderButton();
	}
	handlers() {
		this.inputNode.addEventListener('change', (event) => {
			this.state = { value: event.target.value };
		});
	}
	renderButton() {
		this.state.button.className =
			'input-button' +
			(this.state.button.className ? ' ' + this.state.button.className : '');

		const button = new Button(this.state.button);

		this.node.querySelector('.input-button').replaceWith(button.node);
	}
	setMask() {
		$(this.inputNode).mask(this.state.mask);
	}
}
