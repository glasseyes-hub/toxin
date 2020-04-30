import { Component } from '../../services/js/Component';
import { Button } from '../button/button';
import { Title } from '../title/title';

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

		this.state.title && this.renderTitle();

		this.inputNode = this.node.querySelector('input');

		this.state.mask && this.setMask();
	}
	renderTitle() {
		const title = new Title({
			className: 'input-title',
			title: this.state.title,
			subtitle: this.state.subtitle,
		});

		this.node.prepend(title.node);
	}
	handlers() {
		this.inputNode.addEventListener('change', (event) => {
			this.state = { value: event.target.value };
		});
	}
	setMask() {
		$(this.inputNode).mask(this.state.mask);
	}
}
