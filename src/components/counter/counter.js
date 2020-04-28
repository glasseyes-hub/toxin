import { Component } from '../../services/js/Component';
import { Button } from '../button/button';

export class Counter extends Component {
	constructor(state) {
		require('./counter.sass');

		state = {
			template: require('./counter.pug'),
			...state,
		};

		super(state);
	}
	render() {
		super.render();

		this.state.controls && this.renderControls();
	}
	renderControls() {
		this.controls = {
			node: document.createElement('div'),
			clear: new Button({
				className: 'counter-clear',
				text: 'Очистить',
			}),
			apply: new Button({
				className: 'counter-apply',
				text: 'Применить',
			}),
		};
		this.controls.node.classList.add('counter-controls');

		this.controls.node.appendChild(this.controls.clear.node);
		this.controls.node.appendChild(this.controls.apply.node);
		this.node.appendChild(this.controls.node);
	}
	handlers() {
		const elements = this.node.querySelectorAll('.counter-element');
		const list = this.state.list;

		elements.forEach((element, index) => {
			const minusButton = element.querySelector('.counter-button_minus');
			const plusButton = element.querySelector('.counter-button_plus');
			const input = element.querySelector('.counter-input');

			minusButton.addEventListener('click', (event) => {
				event.preventDefault();
				input.value = input.value > 0 ? --input.value : input.value;

				if (!this.state.controls) {
					list[index].value = input.value;
					this.state = { list };
				}
			});

			plusButton.addEventListener('click', (event) => {
				event.preventDefault();
				input.value = ++input.value;

				if (!this.state.controls) {
					list[index].value = input.value;
					this.state = { list };
				}
			});
		});

		if (this.controls) {
			this.controls.clear.node.addEventListener('click', (event) => {
				event.preventDefault();

				elements.forEach((element, index) => {
					const input = element.querySelector('.counter-input');

					input.value = 0;
					list[index].value = input.value;
				});

				this.state = { list };
			});

			this.controls.apply.node.addEventListener('click', (event) => {
				event.preventDefault();

				elements.forEach((element, index) => {
					const input = element.querySelector('.counter-input');

					list[index].value = input.value;
				});

				this.state = { list };
			});
		}
	}
}
