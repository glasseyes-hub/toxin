import { Component } from '../../../services/js/Component';

export class Toggle extends Component {
	constructor(state) {
		require('./toggle.sass');

		state = {
			template: require('./toggle.pug'),
			...state,
		};

		super(state);
	}
	render() {
		super.render();

		this.state.check && this.check();
	}
	handlers() {
		this.node.addEventListener('click', () => {
			this.check();
		});
	}
	check() {
		const input = this.node.querySelector('.toggle-input');
		const button = this.node.querySelector('.toggle-button');

		if (input.checked) button.classList.remove('toggle-button_checked');
		else button.classList.add('toggle-button_checked');

		input.checked = !input.checked;
	}
}
