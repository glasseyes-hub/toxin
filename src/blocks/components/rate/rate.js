import { Component } from '../../../services/js/Component';

export class Rate extends Component {
	constructor(state) {
		require('./rate.sass');

		state = {
			template: require('./rate.pug'),
			rate: 0,
			disabled: false,
			...state,
		};

		super(state);
	}
	render() {
		super.render();
		this.select(this.state.rate);

		this.state.disabled && this.disableRate();
	}
	handlers() {
		const buttons = this.node.querySelectorAll('.rate-button');

		if (!this.state.disabled) {
			buttons.forEach((button, index) => {
				button.addEventListener('click', (event) => {
					event.preventDefault();
					this.select(index + 1);
				});
			});
		}
	}
	select(rate) {
		this.buttons = this.buttons
			? this.buttons
			: this.node.querySelectorAll('.rate-button');

		this.buttons.forEach((button, index) => {
			index < rate
				? button.classList.add('rate-button_selected')
				: button.classList.remove('rate-button_selected');
		});

		this.state = { rate };
	}
	disableRate() {
		this.node.classList.add('rate_disabled');
	}
}
