import { Button } from '../../button/button';
import { Input } from '../input/input';

class FormRateButton extends Button {
	check() {
		this.node.classList.add('form-rate_button_checked');
	}
	uncheck() {
		this.node.classList.remove('form-rate_button_checked');
	}
}

export class FormRate {
	constructor(options) {
		Object.assign(this, options);

		this.inputs = { list: [] };
		this.buttons = { list: [] };

		this.node.querySelectorAll('.form-rate_input').forEach(node => {
			this.inputs.list.push(new Input({ node }));
		});
		this.node.querySelectorAll('.form-rate_button').forEach((node, index) => {
			let button = new FormRateButton({ node });

			this.buttons.list.push(button);

			button.onClick(() => {
				this.setRate(index + 1);
			});
		});

		this.setRate(1);
	}
	setRate(rate) {
		function updateRate(rate) {
			for (let key in this.list) {
				if (key <= rate - 1) this.list[key].check();
				else this.list[key].uncheck();
			}
		}

		updateRate.call(this.buttons, rate);
		updateRate.call(this.inputs, rate);
	}
}
