import { Component } from '../../services/js/Component';

export class Radio extends Component {
	constructor(state) {
		require('./radio.sass');

		state = {
			template: require('./radio.pug'),
			...state,
		};

		super(state);
	}
	render() {
		super.render();

		this.elements = this.node.querySelectorAll('.radio-element');

		this.state.check !== undefined && this.check(this.state.check);
	}
	handlers() {
		this.elements.forEach((element, index) => {
			element.addEventListener('click', () => {
				this.check(index);
			});
		});
	}
	check(index) {
		if (index < this.elements.length) {
			const input = this.elements[index].querySelector('.radio-input');
			const button = this.elements[index].querySelector('.radio-button');

			this.node
				.querySelectorAll('.radio-button')
				.forEach((button) => button.classList.remove('radio-button_checked'));
			this.node
				.querySelectorAll('.radio-input')
				.forEach((input) => (input.checked = false));

			input.checked = true;
			button.classList.add('radio-button_checked');
		}
	}
}
